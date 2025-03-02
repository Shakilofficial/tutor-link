import { Schema } from 'mongoose';

export interface IStudent {
  user: Schema.Types.ObjectId;
  enrolledSubjects: Schema.Types.ObjectId[];
  tutors: Schema.Types.ObjectId[];
}
