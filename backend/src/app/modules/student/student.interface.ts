import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export interface IStudent extends IUser {
  subjects: string[];
  bookingHistory: Types.ObjectId[];
}
