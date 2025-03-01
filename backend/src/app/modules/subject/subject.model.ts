import { Schema, model } from 'mongoose';
import { categories, gradeLevels } from './subject.const';
import { ISubject } from './subject.interface';

const subjectSchema = new Schema<ISubject>(
  {
    name: { type: String, required: true },
    gradeLevel: { type: String, required: true, enum: gradeLevels },
    category: { type: String, required: true, enum: categories },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator ID is required'],
    },
  },
  { timestamps: true },
);

export const Subject = model<ISubject>('Subject', subjectSchema);
