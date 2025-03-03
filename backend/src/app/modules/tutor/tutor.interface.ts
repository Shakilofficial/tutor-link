import { Types } from 'mongoose';

export interface ITutor {
  user: Types.ObjectId;
  bio: string;
  location: string;
  subjects: Types.ObjectId[];
  hourlyRate: number;
  availability: Array<{
    day: string;
    timeSlots: string[];
  }>;
  averageRating?: number;
  totalReviews?: number;
  earnings: number;
  teachingExperience: number;
  education: string;
  createdAt?: Date;
  updatedAt?: Date;
}
