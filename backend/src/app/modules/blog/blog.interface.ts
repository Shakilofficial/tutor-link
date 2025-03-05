/* eslint-disable no-unused-vars */
import { Document, Types } from 'mongoose';
export enum BlogCategory {
  STUDY_TIPS = 'Study Tips',
  EXAM_GUIDE = 'Exam Guide',
  TUTORING = 'Tutoring',
  PLATFORM_NEWS = 'Platform News',
  ONLINE_LEARNING = 'Online Learning',
  SUCCESS_STORIES = 'Success Stories',
}
export interface IBlog extends Document {
  title: string;
  thumbnail: string;
  slug: string;
  content: string;
  author: Types.ObjectId;
  category: BlogCategory;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
