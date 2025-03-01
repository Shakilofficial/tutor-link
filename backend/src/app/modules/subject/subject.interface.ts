import { Types } from 'mongoose';

export type TCategory =
  | 'General'
  | 'Basic'
  | 'Science'
  | 'Arts'
  | 'Commerce'
  | 'Business'
  | 'BBA'
  | 'CSE';

export type TGradeLevel = 'Kindergarten' | 'SSC' | 'HSC' | 'Undergrade';

export interface ISubject {
  name: string;
  gradeLevel: TGradeLevel;
  category: TCategory;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
