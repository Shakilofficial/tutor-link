import { Types } from 'mongoose';

export interface ITutor {
  user: Types.ObjectId;
  bio: string;
  location: string;
  subjects: Types.ObjectId[];
  hourlyRate: number;
  availability: Array<{
    day:
      | 'Monday'
      | 'Tuesday'
      | 'Wednesday'
      | 'Thursday'
      | 'Friday'
      | 'Saturday'
      | 'Sunday';
    slots: Array<{ start: string; end: string }>;
  }>;
  averageRating: number;
  totalReviews: number;
  totalEarnings: number;
  createdAt: Date;
  updatedAt: Date;
}
