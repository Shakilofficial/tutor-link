import mongoose from 'mongoose';
import { Tutor } from '../tutor/tutor.model';
import { Review } from './review.model';

export const calculateAverageRating = async (
  tutorId: string,
  session: mongoose.ClientSession,
) => {
  const result = await Review.aggregate([
    {
      $match: { tutor: new mongoose.Types.ObjectId(tutorId) },
    },
    {
      $group: {
        _id: '$tutor',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 },
      },
    },
  ]).session(session);

  const stats = {
    averageRating: result[0]?.averageRating || 0,
    totalReviews: result[0]?.totalReviews || 0,
  };

  await Tutor.findByIdAndUpdate(
    tutorId,
    {
      $set: {
        averageRating: Number(stats.averageRating.toFixed(1)),
        totalReviews: stats.totalReviews,
      },
    },
    { session },
  );
};
