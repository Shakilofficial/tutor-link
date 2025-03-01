import { Schema, model } from 'mongoose';
import { ITutor } from './tutor.interface';

const tutorSchema = new Schema<ITutor>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bio: { type: String, required: true },
    subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
    hourlyRate: { type: Number, required: true },
    availability: [
      {
        day: { type: String, required: true },
        timeSlots: [{ type: String }],
      },
    ],
    ratings: [{ type: Number, default: 0 }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    earnings: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Tutor = model<ITutor>('Tutor', tutorSchema);
