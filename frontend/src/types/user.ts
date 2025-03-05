export interface IUser {
  userId: string;
  name: string;
  email: string;
  role: "admin" | "student" | "tutor";
  isDeleted: boolean;
  profileImage: string;
  iat?: number;
  exp?: number;
}
