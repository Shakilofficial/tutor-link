/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
import PDFDocument from 'pdfkit';
import { IBooking } from '../modules/booking/booking.interface';

/**
 * Generates a PDF invoice for a tutoring booking.
 * @param {IBooking} booking - The booking object to generate the invoice for.
 * @returns {Promise<Buffer>} - The generated PDF as a Buffer.
 */
export const generateBookingInvoicePDF = async (
  booking: IBooking,
): Promise<Buffer> => {
  return new Promise<Buffer>(async (resolve, reject) => {
    try {
      const logoUrl =
        'https://res.cloudinary.com/dbgrq28js/image/upload/v1736763971/logoipsum-282_ilqjfb_paw4if.png';
      // Download the logo image as a buffer
      const response = await axios.get(logoUrl, {
        responseType: 'arraybuffer',
      });
      const logoBuffer = Buffer.from(response.data);

      const doc = new PDFDocument({ margin: 50 });
      const buffers: Buffer[] = [];

      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (err: Error) => reject(err));

      // Header with graphical design and logo
      const logoWidth = 70; // Set the desired width for the logo
      const logoX = (doc.page.width - logoWidth) / 2; // Center the logo
      doc.image(logoBuffer, logoX, doc.y, { width: logoWidth });
      doc.moveDown(6); // Move down after the logo

      doc
        .fontSize(20)
        .font('Helvetica-Bold')
        .fillColor('#000000')
        .text('Tutor Link', { align: 'center' });
      doc
        .fontSize(10)
        .text('Tanagil, Dahaka, Bangladesh', { align: 'center' });
      doc
        .fontSize(10)
        .text('Email: support@tutor-link.com', { align: 'center' });
      doc.fontSize(10).text('Phone: +8801620521215', { align: 'center' });
      doc.moveDown(0.5);
      doc
        .fontSize(15)
        .font('Helvetica-Bold')
        .fillColor('#003366')
        .text('Invoice', { align: 'center' });
      doc.lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke(); // Horizontal line under header
      doc.moveDown(0.5);

      // Booking Details
      doc
        .fontSize(11)
        .fillColor('#000000')
        //@ts-ignore
        .text(`Booking ID: ${booking._id as string}`);
      doc.text(
        `Booking Date: ${(booking.startTime as Date).toLocaleDateString()}`,
      );
      doc.moveDown(0.5);
      //@ts-ignore
      doc.text(`Student Name: ${booking.student.user.name}`);
      //@ts-ignore
      doc.text(`Tutor Name: ${booking.tutor.user.name}`);
      doc.moveDown(1);

      // Payment Details
      doc
        .fontSize(11)
        .font('Helvetica-Bold')
        .fillColor('#003366')
        .text('Payment Details:', { underline: true });
      doc.text(`Amount: ${booking.amount} BDT`);
      doc.text(`Payment Status: ${booking.paymentStatus}`);
      doc.moveDown(1);

      // Session Details
      doc
        .fontSize(11)
        .font('Helvetica-Bold')
        .fillColor('#003366')
        .text('Session Details:', { underline: true });
      //@ts-ignore
      doc.text(`Subject: ${booking.subject.name}`);
      doc.text(`Scheduled Time: ${booking.startTime.toLocaleString()}`);
      doc.moveDown(1);

      doc.lineWidth(0.5).moveTo(50, doc.y).lineTo(550, doc.y).stroke(); // Final line
      doc.moveDown(2);

      doc.text(
        'Thank you for using our tutoring service! For any inquiries, please contact us at support@Tutor Link.com.',
      );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};
