/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs';
import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import * as path from 'path';
import { promisify } from 'util';
import config from '../config';

const readFile = promisify(fs.readFile);
type EmailContentParams = {
  otpCode?: string;
  userName?: string;
  studentName?: string;
  tutorName?: string;
  bookingDate?: string;
};
const sendEmail = async (
  email: string,
  html: string,
  subject: string,
  attachment?: { filename: string; content: Buffer; encoding: string },
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: config.sender_email,
        pass: config.sender_app_password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Email configuration
    const mailOptions: any = {
      from: '"Tutor Link" <no-reply@tutorlink.com>',
      to: email,
      subject,
      html,
    };

    if (attachment) {
      mailOptions.attachments = [
        {
          filename: attachment.filename,
          content: attachment.content,
          encoding: attachment.encoding,
        },
      ];
    }

    // Sending the email
    const info = await transporter.sendMail(mailOptions);

    return info;
  } catch (error: any) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

const createEmailContent = async (
  data: EmailContentParams,
  templateType: string,
) => {
  try {
    const templatePath = path.join(
      process.cwd(),
      `src/templates/${templateType}.template.hbs`,
    );

    const content = await readFile(templatePath, 'utf8');
    const template = Handlebars.compile(content);

    return template(data);
  } catch (error: any) {
    throw new Error(`Failed to create email content: ${error.message}`);
  }
};

export const EmailHelper = {
  sendEmail,
  createEmailContent,
};
