import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export interface ITutor extends IUser {
  bio: string;
  subjects: string[];
  hourlyRate: number;
  availability: string[];
  ratings: {
    rating: number;
    student: Types.ObjectId;
  }[];
}
