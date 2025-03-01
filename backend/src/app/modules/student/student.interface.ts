import { Document, Schema } from 'mongoose';

export interface IStudent extends Document {
  user: Schema.Types.ObjectId;
  enrolledTutors: Schema.Types.ObjectId[];
  bookingHistory: Schema.Types.ObjectId[];
  paymentHistory: Schema.Types.ObjectId[];
}
