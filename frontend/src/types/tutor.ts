export interface ISubject {
  _id: string;
  name: string;
  category: string;
  gradeLevel: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  __v: number;
}

export interface IAvailability {
  day: string;
  slots: ISlot[];
  _id: string;
  id: string;
}

export interface ISlot {
  day: string;
  start: string;
  end: string;
  _id: string;
  id: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  profileImage: string;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ITutor {
  _id: string;
  id: string;
  user: User;
  bio: string;
  location: string;
  hourlyRate: number;
  subjects: ISubject[];
  availability: IAvailability[];
  averageRating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface ITutorResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: ITutor[];
}
