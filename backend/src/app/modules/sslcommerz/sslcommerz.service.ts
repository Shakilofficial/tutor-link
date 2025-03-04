/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from 'mongoose';
import SSLCommerzPayment from 'sslcommerz-lts';
import config from '../../config';

import { EmailHelper } from '../../utils/emailHelpers';
import { generateBookingInvoicePDF } from '../../utils/generateBookingInvoicePDF';
import { Booking } from '../booking/booking.model';
import { Student } from '../student/student.model';
import { Tutor } from '../tutor/tutor.model';

const store_id = config.ssl.store_id as string;
const store_passwd = config.ssl.store_pass as string;
const is_live = config.ssl.is_live === 'true';

interface PaymentInitData {
  amount: number;
  bookingId: string;
  studentId: string;
  transactionId: string;
}

const initPayment = async (paymentData: PaymentInitData): Promise<string> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, bookingId, studentId, transactionId } = paymentData;

    const student = await Student.findById(studentId)
      .populate('user')
      .session(session);

    if (!student?.user) {
      throw new Error('Student not found');
    }

    const booking = await Booking.findById(bookingId)
      .populate(['tutor', 'subject'])
      .session(session);

    if (!booking) {
      throw new Error('Booking not found');
    }

    const data = {
      total_amount: amount,
      currency: 'BDT',
      tran_id: transactionId,
      success_url: `${config.ssl.validation_url}?tran_id=${transactionId}`,
      fail_url: `${config.ssl.validation_url}`,
      cancel_url: `${config.ssl.validation_url}`,
      ipn_url: config.ssl.ipn_url,
      cus_name: (student as any)?.user?.name,
      cus_email: (student as any)?.user?.email,
      cus_add1: student.location || 'Dhaka',
      cus_city: student.location || 'Dhaka',
      cus_country: 'Bangladesh',
      cus_phone: (student as any)?.user?.phone || '01700000000',
      product_name: `Tutoring Session - ${(booking as any)?.subject.name}`,
      product_category: 'Education',
      product_profile: 'general',
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);

    await Booking.findByIdAndUpdate(
      bookingId,
      { transactionId, paymentStatus: 'pending' },
      { session },
    );

    // Send payment email
    const emailContent = await EmailHelper.createEmailContent(
      {
        userName: (student as any).user.name,
        amount: amount,
        tutorName: (booking.tutor as any).user.name,
        paymentUrl: apiResponse.GatewayPageURL,
      },
      'paymentRequest',
    );

    await EmailHelper.sendEmail(
      (student as any)?.user?.email,
      emailContent,
      'Payment Request for Tutoring Session',
    );

    await session.commitTransaction();
    return apiResponse.GatewayPageURL;
  } catch (error) {
    await session.abortTransaction();
    throw new Error(`Payment initiation failed: ${(error as Error).message}`);
  } finally {
    session.endSession();
  }
};

const validatePaymentService = async (tran_id: string): Promise<boolean> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    //@ts-ignore
    const validationResponse = await sslcz.transactionQueryByTransactionId({
      tran_id,
    });
    const paymentStatus =
      validationResponse.status === 'VALID' ? 'paid' : 'failed';

    const booking = await Booking.findOneAndUpdate(
      { transactionId: tran_id },
      {
        paymentStatus,
        status: paymentStatus === 'paid' ? 'confirmed' : 'failed',
      },
      { new: true, session },
    ).populate(['student', 'tutor', 'subject']);

    if (!booking) {
      throw new Error('Booking not found');
    }

    if (paymentStatus === 'paid') {
      // Calculate platform fee (20%)
      const platformFee = booking.amount * 0.2;
      const tutorEarnings = booking.amount - platformFee;

      await Tutor.findByIdAndUpdate(
        booking.tutor,
        { $inc: { earnings: tutorEarnings } },
        { session },
      );
    }

    // Send confirmation email
    if (paymentStatus === 'paid') {
      const student = await Student.findById(booking.student)
        .populate('user')
        .session(session);

      if ((student as any)?.user?.email) {
        const pdfBuffer = await generateBookingInvoicePDF(booking);
        const emailContent = await EmailHelper.createEmailContent(
          {
            userName: (student as any).user?.name,
            tutorName: (booking.tutor as any).user?.name,
            bookingDate: booking.startTime.toLocaleDateString(),
          },
          'bookingConfirmation',
        );

        await EmailHelper.sendEmail(
          (student as any).user.email,
          emailContent,
          'Booking Confirmation',
          {
            filename: `Booking_${booking._id}.pdf`,
            content: pdfBuffer,
            encoding: 'base64',
          },
        );
      }
    }

    await session.commitTransaction();
    return paymentStatus === 'paid';
  } catch (error) {
    await session.abortTransaction();
    console.error('Payment validation failed:', error);
    return false;
  } finally {
    session.endSession();
  }
};

export const sslService = {
  initPayment,
  validatePaymentService,
};
