/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';

/* eslint-disable no-unused-vars */
export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  ACCEPTED = 'accepted',
}

export enum PaymentMethod {
  ONLINE = 'online',
  CASH = 'cash',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  REFUNDED = 'refunded',
}

export type TBookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
export type TPaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export type TPaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export interface IBooking {
  student: Types.ObjectId;
  tutor: Types.ObjectId;
  subject: Types.ObjectId;
  startTime: Date;
  endTime: Date;
  durationHours: number;
  hourlyRate: number;
  amount: number;
  paymentMethod: TPaymentMethod;
  status: TBookingStatus;
  paymentStatus: TPaymentStatus;
  tran_id?: string;
  gatewayResponse?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}
