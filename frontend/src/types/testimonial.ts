interface User {
  _id: string;
  name: string;
  profileImage: string;
}

interface Student {
  _id: string;
  user: User;
}

export interface Testimonial {
  _id: string;
  student: Student;
  tutor: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}
