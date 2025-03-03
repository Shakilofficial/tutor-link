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
  profileImage: string;
  isVerified: boolean;
  isDeleted: boolean;
  otpToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel extends Model<IUser> {
  // Instance methods for checking password match and user existence
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isUserExistsByEmail(email: string): Promise<IUser | null>;
  checkUserExist(userId: string): Promise<IUser>;
}
