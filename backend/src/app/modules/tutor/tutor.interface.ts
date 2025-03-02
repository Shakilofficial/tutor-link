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
  teachingExperience: number;
  education: string;
  createdAt?: Date;
  updatedAt?: Date;
}
