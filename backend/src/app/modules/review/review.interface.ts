import { Types } from 'mongoose';

export interface IReview {
  student: Types.ObjectId;
  tutor: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
