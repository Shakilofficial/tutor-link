import { model, Schema } from 'mongoose';
import {
  BookingStatus,
  IBooking,
  PaymentMethod,
  PaymentStatus,
} from './booking.interface';

const bookingSchema = new Schema<IBooking>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student ID is required'],
    },
    tutor: {
      type: Schema.Types.ObjectId,
      ref: 'Tutor',
      required: [true, 'Tutor ID is required'],
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
      required: [true, 'Subject ID is required'],
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required'],
      index: true,
    },
    endTime: {
      type: Date,
      required: [true, 'End time is required'],
      validate: {
        validator: function (this: IBooking, value: Date) {
          return value > this.startTime;
        },
        message: 'End time must be after start time',
      },
    },
    durationHours: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [0.5, 'Minimum booking duration is 0.5 hours'],
      max: [8, 'Maximum booking duration is 8 hours'],
    },
    hourlyRate: {
      type: Number,
      required: [true, 'Hourly rate is required'],
      min: [100, 'Hourly rate must be at least 100 BDT'],
    },
    amount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    paymentMethod: { type: String, enum: Object.values(PaymentMethod) },
    status: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.PENDING,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    tran_id: { type: String, unique: true },
    gatewayResponse: {
      type: Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  },
);

bookingSchema.index({ tutor: 1, startTime: 1 });
bookingSchema.index({ student: 1, status: 1 });

export const Booking = model<IBooking>('Booking', bookingSchema);
