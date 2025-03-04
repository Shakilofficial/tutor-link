/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import SSLCommerzPayment from 'sslcommerz-lts';
import config from '../../config';
import AppError from '../../errors/appError';
import { EmailHelper } from '../../utils/emailHelpers';
import { generateBookingInvoicePDF } from '../../utils/generateBookingInvoicePDF';
import { Booking } from '../booking/booking.model';

const store_id = config.ssl.store_id as string;
const store_passwd = config.ssl.store_pass as string;
const is_live = false;

export interface PaymentInitData {
  amount: number;
  bookingId: string;
  studentId: string;
  transactionId: string;
}

const initPayment = async (paymentData: PaymentInitData): Promise<string> => {
  const { amount, bookingId, studentId, transactionId } = paymentData;
  const booking = await Booking.findById(bookingId).populate('subject');

  if (!booking) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Booking not found');
  }
  // Ensure subject is not undefined before accessing its name
  const productName = booking.subject
    ? `Tutoring Session - ${(booking as any)?.subject.name}`
    : 'Tutoring Session - Unknown Subject';

  const data = {
    total_amount: amount,
    currency: 'BDT',
    tran_id: transactionId,
    success_url: `${config.ssl.validation_url}?tran_id=${transactionId}`,
    fail_url: config.ssl.failed_url as string,
    cancel_url: config.ssl.cancel_url as string,
    ipn_url: 'http://next-mart-steel.vercel.app/api/v1/ssl/ipn',
    shipping_method: 'Courier',
    product_name: productName || 'N/A',
    product_category: 'N/A',
    product_profile: 'general',
    cus_name: 'N/A',
    cus_email: 'N/A',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'N/A',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  try {
    const apiResponse = await sslcz.init(data);

    if (apiResponse?.GatewayPageURL) {
      return apiResponse.GatewayPageURL;
    } else {
      throw new AppError(
        StatusCodes.BAD_GATEWAY,
        `Failed to generate payment gateway URL. API Response: ${JSON.stringify(apiResponse)}`,
      );
    }
  } catch (error: any) {
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
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

    if (
      !validationResponse ||
      !validationResponse.element ||
      validationResponse.element.length === 0
    ) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Invalid transaction response received',
      );
    }

    const transactionData = validationResponse.element[0];

    const paymentStatus =
      transactionData.status === 'VALID' ||
      transactionData.status === 'VALIDATED'
        ? 'paid'
        : 'failed';

    const updatedBooking = await Booking.findOneAndUpdate(
      { tran_id },
      {
        paymentStatus,
        status: paymentStatus === 'paid' ? 'confirmed' : 'failed',
      },
      { new: true, session },
    )
      .populate({
        path: 'student',
        select: 'location enrolledSubjects tutors',
        populate: {
          path: 'user',
          select: 'name email',
        },
      })
      .populate({
        path: 'tutor',
        select:
          'bio location subjects hourlyRate availability averageRating totalReviews',
        populate: {
          path: 'user',
          select: 'name email',
        },
      })
      .populate({
        path: 'subject',
        select: 'name description',
      });

    if (!updatedBooking) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        'Booking not found for the given transaction ID',
      );
    }

    // Commit the transaction after successfully updating the booking
    await session.commitTransaction();

    // If the payment is successful, send the email with the invoice PDF
    if (paymentStatus === 'paid') {
      const pdfBuffer = await generateBookingInvoicePDF(updatedBooking);
      const emailContent = await EmailHelper.createEmailContent(
        {
          //@ts-ignore
          studentName: updatedBooking.student.user.name || '',
          //@ts-ignore
          tutorName: updatedBooking.tutor.user.name || '',
          bookingDate: new Date(updatedBooking.startTime).toLocaleDateString(),
          //@ts-ignore
          bookingAmount: updatedBooking.amount || 'N/A',
        },
        'bookingInvoice',
      );

      const attachment = {
        filename: `Invoice_${updatedBooking._id}.pdf`,
        content: pdfBuffer,
        encoding: 'base64',
      };

      await EmailHelper.sendEmail(
        //@ts-ignore
        updatedBooking.student.user.email,
        emailContent,
        'Booking Confirmed - Payment Success!',
        attachment,
      );
    }

    // Return success after everything is successful
    session.endSession();
    return true;
  } catch (error) {
    // Ensure that the transaction is aborted only if an error occurs
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    // End the session to avoid leaving an open session
    session.endSession();

    // Log the error for debugging
    console.error(error);
    return false;
  }
};

export const sslService = {
  initPayment,
  validatePaymentService,
};
