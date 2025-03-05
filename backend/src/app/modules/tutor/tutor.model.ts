import { Schema, model } from 'mongoose';
import { ITutor } from './tutor.interface';

const tutorSchema = new Schema<ITutor>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    bio: {
      type: String,
      required: true,
      minlength: [50, 'Bio should be at least 50 characters'],
      maxlength: [500, 'Bio cannot exceed 500 characters'],
    },
    location: {
      type: String,
      required: true,
    },
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        index: true,
      },
    ],
    hourlyRate: {
      type: Number,
      required: true,
      min: [100, 'Hourly rate must be at least 100 BDT'],
    },
    availability: [
      {
        day: {
          type: String,
          enum: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          required: true,
        },
        slots: [
          {
            start: { type: String, match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ },
            end: { type: String, match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ },
          },
        ],
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      set: (v: number) => Math.round(v * 10) / 10,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const Tutor = model<ITutor>('Tutor', tutorSchema);
