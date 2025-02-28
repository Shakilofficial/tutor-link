/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import os from 'os';

const app: Application = express();

// 🌍 Global Middleware Setup
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📌 API Metadata
const API_METADATA = {
  name: 'Tutor-Link API',
  version: '1.0.0',
  description:
    'Tutor-Link is a comprehensive platform designed to connect students with expert tutors. ' +
    'Students can explore available tutors, book personalized sessions, and manage their learning journey. ' +
    'Tutors can create professional profiles, list subjects, schedule availability, and manage bookings. 📚✨',
  developerContact: {
    name: 'Md Shakil Hossain',
    email: 'mrshakilhossain@outlook.com',
    portfolio: 'https://shakil-tawny.vercel.app',
  },
};

// 🚀 API Health Check & Metadata Route
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  const currentDateTime = new Date().toISOString();
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const serverHostname = os.hostname();
  const serverPlatform = os.platform();
  const serverUptime = os.uptime();

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Welcome to the Tutor-Link API! 🎉',
    apiInfo: API_METADATA,
    clientDetails: {
      ipAddress: clientIp,
      accessedAt: currentDateTime,
    },
    serverDetails: {
      hostname: serverHostname,
      platform: serverPlatform,
      uptime: `${Math.floor(serverUptime / 60 / 60)} hours ${Math.floor((serverUptime / 60) % 60)} minutes`,
    },
  });
});

export default app;
