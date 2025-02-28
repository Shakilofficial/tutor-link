import { Document, Schema } from 'mongoose';

export interface IStudent extends Document {
  userId: Schema.Types.ObjectId;
  subjects: string[];
  enrolledTutors: Schema.Types.ObjectId[];
  bookingHistory: Schema.Types.ObjectId[];
  paymentHistory: Schema.Types.ObjectId[];
}
