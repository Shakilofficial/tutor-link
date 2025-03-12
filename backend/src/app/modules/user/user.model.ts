import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { model, Schema } from 'mongoose';
import config from '../../config';
import AppError from '../../errors/appError';
import { IUser, UserModel, UserRole } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Invalid email format',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      default: '+880123456789',
    },
    role: {
      type: String,
      enum: {
        values: Object.values(UserRole),
        message: 'Invalid user role',
      },
      default: UserRole.STUDENT,
    },
    profileImage: {
      type: String,
      default:
        'https://res.cloudinary.com/dcyupktj6/image/upload/v1741800856/w2aj93pjo5b6q8s6ke3z.jpg',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    otpToken: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

// Exclude password from JSON responses
userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

// Static method for password matching
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// Static method to check if user exists by email
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

// Check if user exists and is not deleted
userSchema.statics.checkUserExist = async function (userId: string) {
  const existingUser = await this.findById(userId);

  if (!existingUser) {
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'User does not exist!');
  }

  if (!existingUser.isVerified) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is not verified!');
  }

  if (existingUser.isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is deleted!');
  }

  return existingUser;
};

export const User = model<IUser, UserModel>('User', userSchema);
