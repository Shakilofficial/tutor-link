import { Schema, model } from 'mongoose';
import { ITutor } from './tutor.interface';

const tutorSchema = new Schema<ITutor>({
  bio: { type: String, required: true },
  subjects: { type: [String], required: true },
  hourlyRate: { type: Number, required: true },
  availability: { type: [String], required: true },
  ratings: {
    rating: { type: Number, required: true },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
  },
});

const Tutor = model<ITutor>('Tutor', tutorSchema);

export default Tutor;
