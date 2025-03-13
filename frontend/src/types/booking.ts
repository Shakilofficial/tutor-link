/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IBooking {
  id: string;
  student: {
    _id: string;
    user: {
      _id: string;
      name: string;
      email: string;
      role: string;
      profileImage: string;
      isVerified: boolean;
      isDeleted: boolean;
      createdAt: string;
      updatedAt: string;
      phone: string;
    };
    location: string;
    enrolledSubjects: any[];
    tutors: any[];
    createdAt: string;
    updatedAt: string;
  };
  tutor: {
    _id: string;
    user: {
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
    };
    bio: string;
    location: string;
    subjects: string[];
    hourlyRate: number;
    availability: Array<{
      day: string;
      slots: Array<{
        start: string;
        end: string;
        _id: string;
        id: string;
      }>;
      _id: string;
      id: string;
    }>;
    averageRating: number;
    totalReviews: number;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
  subject: {
    _id: string;
    name: string;
  };
  startTime: string;
  endTime: string;
  durationHours: number;
  hourlyRate: number;
  amount: number;
  paymentMethod: string;
  status: string;
  paymentStatus: string;
  gatewayResponse: any;
  createdAt: string;
  updatedAt: string;
}
