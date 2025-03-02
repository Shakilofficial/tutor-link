import { Schema, model } from 'mongoose';
import { IStudent } from './student.interface';

const studentSchema = new Schema<IStudent>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    enrolledSubjects: [
      { type: Schema.Types.ObjectId, ref: 'Subject', default: [] },
    ],
    tutors: [{ type: Schema.Types.ObjectId, ref: 'Tutor', default: [] }],
  },
  { timestamps: true },
);

export const Student = model<IStudent>('Student', studentSchema);
