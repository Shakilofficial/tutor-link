/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
  TUTOR = 'tutor',
}

// Common User Interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  profileImage?: string;
  isDeleted?: boolean;
  otpToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel extends Model<IUser> {
  //instance methods for checking if passwords are matched and user exists
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isUserExistsByEmail(email: string): Promise<IUser>;
  checkUserExist(userId: string): Promise<IUser>;
}
