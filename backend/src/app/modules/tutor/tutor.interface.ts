import { Types } from 'mongoose';

export interface ITutor {
  user: Types.ObjectId;
  bio: string;
  subjects: Types.ObjectId[];
  hourlyRate: number;
  availability: Array<{
    day: string;
    timeSlots: string[];
  }>;
  ratings: number[];
  reviews: Types.ObjectId[];
  earnings: number;
  createdAt: Date;
  updatedAt: Date;
}
