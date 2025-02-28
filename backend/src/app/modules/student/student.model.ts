import { Schema, model } from 'mongoose';
import { IStudent } from './student.interface';

const studentSchema = new Schema<IStudent>({
  subjects: { type: [String], required: true },
  bookingHistory: { type: [Schema.Types.ObjectId], ref: 'Booking', default: [] },
});

const Student = model<IStudent>('Student', studentSchema);

export default Student;
