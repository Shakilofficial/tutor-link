import { Schema, model } from 'mongoose';
import { ITutor } from './tutor.interface';

const tutorSchema = new Schema<ITutor>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bio: { type: String, required: true },
    location: { type: String, required: true },
    subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject', default: [] }],
    hourlyRate: { type: Number, required: true },
    availability: [
      {
        day: { type: String, required: true },
        timeSlots: [{ type: String, required: true }],
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    earnings: { type: Number, default: 0 },
    teachingExperience: { type: Number, required: true },
    education: { type: String, required: true },
  },
  { timestamps: true },
);

export const Tutor = model<ITutor>('Tutor', tutorSchema);
