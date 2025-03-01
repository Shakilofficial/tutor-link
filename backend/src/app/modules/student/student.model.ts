import { Schema, model } from 'mongoose';
import { IStudent } from './student.interface';

const studentSchema = new Schema<IStudent>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    enrolledTutors: [{ type: Schema.Types.ObjectId, ref: 'Tutor' }],
    bookingHistory: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    paymentHistory: [{ type: Schema.Types.ObjectId, ref: 'Payment' }],
  },
  { timestamps: true },
);

export const Student = model<IStudent>('Student', studentSchema);

