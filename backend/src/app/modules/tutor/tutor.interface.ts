import { Types } from 'mongoose';

export interface ITutor {
  userId: Types.ObjectId;
  bio: string;
  subjects: Types.ObjectId[]; 
  hourlyRate: number;
  availability: {
    day: string;
    timeSlots: string[];
  }[];
  ratings: {
    rating: number;
    student: Types.ObjectId;
  }[];
  reviews: Types.ObjectId[];
  earnings: number;
}
