/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import { IJwtPayload } from '../auth/auth.interface';
import { Blog } from '../blog/blog.model';
import { Booking } from '../booking/booking.model';
import { Review } from '../review/review.model';
import { Student } from '../student/student.model';
import { Subject } from '../subject/subject.model';
import { Tutor } from '../tutor/tutor.model';
import { User } from '../user/user.model';

const getMetaData = async (
  query: Record<string, unknown>,
  authUser: IJwtPayload,
) => {
  const { startDate, endDate } = query;

  // Admin Meta Data
  if (authUser.role === 'admin') {
    // User Statistics
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalTutors = await User.countDocuments({ role: 'tutor' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const verifiedUsers = await User.countDocuments({ isVerified: true });
    const unverifiedUsers = totalUsers - verifiedUsers;

    // Tutor Statistics
    const tutorStats = await Tutor.aggregate([
      {
        $group: {
          _id: null,
          avgHourlyRate: { $avg: '$hourlyRate' },
          avgRating: { $avg: '$averageRating' },
          totalTutors: { $sum: 1 },
        },
      },
    ]);

    // Student Statistics
    const totalStudentsCount = await Student.countDocuments();

    // Booking Statistics
    const bookingStats = await Booking.aggregate([
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          totalRevenue: { $sum: '$amount' },
        },
      },
    ]);

    const bookingStatusCounts = await Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $project: { status: '$_id', count: 1, _id: 0 } },
    ]);

    const paymentStatusCounts = await Booking.aggregate([
      { $group: { _id: '$paymentStatus', count: { $sum: 1 } } },
      { $project: { status: '$_id', count: 1, _id: 0 } },
    ]);

    // Subject Statistics
    const subjectCategoryStats = await Subject.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { category: '$_id', count: 1, _id: 0 } },
    ]);

    const subjectGradeStats = await Subject.aggregate([
      { $group: { _id: '$gradeLevel', count: { $sum: 1 } } },
      { $project: { grade: '$_id', count: 1, _id: 0 } },
    ]);

    // Blog Statistics
    const blogStats = await Blog.aggregate([
      { $group: { _id: '$published', count: { $sum: 1 } } },
      { $project: { status: '$_id', count: 1, _id: 0 } },
    ]);

    // Review Statistics
    const reviewStats = await Review.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    return {
      users: {
        total: totalUsers,
        students: totalStudents,
        tutors: totalTutors,
        admins: totalAdmins,
        verified: verifiedUsers,
        unverified: unverifiedUsers,
      },
      tutors: {
        total: tutorStats[0]?.totalTutors || 0,
        avgHourlyRate: tutorStats[0]?.avgHourlyRate || 0,
        avgRating: tutorStats[0]?.avgRating || 0,
      },
      students: {
        total: totalStudentsCount,
      },
      bookings: {
        total: bookingStats[0]?.totalBookings || 0,
        totalRevenue: bookingStats[0]?.totalRevenue || 0,
        statusCounts: bookingStatusCounts,
        paymentStatusCounts: paymentStatusCounts,
      },
      subjects: {
        categories: subjectCategoryStats,
        grades: subjectGradeStats,
      },
      blogs: {
        total: blogStats.reduce((acc, curr) => acc + curr.count, 0),
        published: blogStats.find((b) => b.status === true)?.count || 0,
        draft: blogStats.find((b) => b.status === false)?.count || 0,
      },
      reviews: {
        total: reviewStats[0]?.totalReviews || 0,
        avgRating: reviewStats[0]?.avgRating || 0,
      },
    };
  }

  // Tutor Meta Data
  if (authUser.role === 'tutor') {
    const tutor = await Tutor.findOne({ user: authUser.userId });
    if (!tutor) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Tutor profile not found');
    }

    // Basic Booking Stats
    const totalBookings = await Booking.countDocuments({ tutor: tutor._id });

    const earningsResult = await Booking.aggregate([
      { $match: { tutor: tutor._id, paymentStatus: 'paid' } },
      { $group: { _id: null, totalEarnings: { $sum: '$amount' } } },
    ]);

    // Review Stats
    const reviewStats = await Review.aggregate([
      { $match: { tutor: tutor._id } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    // Upcoming & Completed Bookings
    const upcomingBookings = await Booking.countDocuments({
      tutor: tutor._id,
      startTime: { $gt: new Date() },
      status: { $nin: ['cancelled', 'completed'] },
    });

    const completedBookings = await Booking.countDocuments({
      tutor: tutor._id,
      status: 'completed',
    });

    // Subject Info
    const subjectsTaught = await Subject.find({
      _id: { $in: tutor.subjects },
    }).select('name category gradeLevel');

    // Availability Slots
    const totalAvailabilitySlots = tutor.availability.reduce(
      (acc, day) => acc + day.slots.length,
      0,
    );

    // Platform Average Rates
    const platformAvg = await Tutor.aggregate([
      { $group: { _id: null, avgHourlyRate: { $avg: '$hourlyRate' } } },
    ]);

    return {
      totalBookings: totalBookings,
      totalEarnings: earningsResult[0]?.totalEarnings || 0,
      avgRating: reviewStats[0]?.avgRating || 0,
      totalReviews: reviewStats[0]?.totalReviews || 0,
      upcomingBookings,
      completedBookings,
      subjectsTaught: subjectsTaught,
      hourlyRate: tutor.hourlyRate,
      platformAvgHourlyRate: platformAvg[0]?.avgHourlyRate || 0,
      availabilitySlots: totalAvailabilitySlots,
    };
  }

  // Student Meta Data
  if (authUser.role === 'student') {
    const student = await Student.findOne({ user: authUser.userId }).populate(
      'enrolledSubjects tutors',
    );
    if (!student) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Student profile not found');
    }

    // Booking Stats
    const totalBookings = await Booking.countDocuments({
      student: student._id,
    });
    const totalSpentResult = await Booking.aggregate([
      { $match: { student: student._id, paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    // Upcoming & Completed Bookings
    const upcomingBookings = await Booking.countDocuments({
      student: student._id,
      startTime: { $gt: new Date() },
      status: 'confirmed',
    });

    const completedBookings = await Booking.countDocuments({
      student: student._id,
      status: 'completed',
    });

    // Enrolled Subjects & Tutors
    const enrolledSubjects = student.enrolledSubjects.length;
    const hiredTutors = student.tutors.length;

    // Reviews Written
    const reviewsWritten = await Review.countDocuments({
      student: student._id,
    });

    return {
      totalBookings,
      totalSpent: totalSpentResult[0]?.total || 0,
      upcomingBookings,
      completedBookings,
      enrolledSubjects,
      hiredTutors,
      reviewsWritten,
    };
  }

  throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized access');
};

export const metaServices = {
  getMetaData,
};
