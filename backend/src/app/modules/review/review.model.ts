import { Schema, model } from 'mongoose';
import { IReview } from './review.interface';

const reviewSchema = new Schema<IReview>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    tutor: {
      type: Schema.Types.ObjectId,
      ref: 'Tutor',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Index to prevent duplicate reviews
reviewSchema.index({ student: 1, tutor: 1 }, { unique: true });

export const Review = model<IReview>('Review', reviewSchema);
