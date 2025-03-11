/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUser {
  _id: string;
  name: string;
  profileImage?: string;
}

export interface IStudent {
  _id: string;
  user: IUser;
}

export interface IReview {
  _id: string;
  student: IStudent;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ReviewResponse {
  success: boolean;
  message?: string;
  error?: any;
  data?: IReview | IReview[];
}
