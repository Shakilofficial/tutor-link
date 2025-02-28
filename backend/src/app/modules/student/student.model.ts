import { Schema, model } from 'mongoose';
import { IStudent } from './student.interface';

const studentSchema = new Schema<IStudent>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    enrolledTutors: [{ type: Schema.Types.ObjectId, ref: 'Tutor' }],
    bookingHistory: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    paymentHistory: [{ type: Schema.Types.ObjectId, ref: 'Payment' }],
  },
  { timestamps: true },
);

const Student = model<IStudent>('Student', studentSchema);

export default Student;
