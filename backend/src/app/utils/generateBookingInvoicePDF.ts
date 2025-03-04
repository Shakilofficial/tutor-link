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
        .text('YourTutoringService', { align: 'center' });
      doc
        .fontSize(10)
        .text('Level-4, 34, Awal Centre, Banani, Dhaka', { align: 'center' });
      doc
        .fontSize(10)
        .text('Email: support@yourtutoringservice.com', { align: 'center' });
      doc.fontSize(10).text('Phone: + 06 223 456 678', { align: 'center' });
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
      doc.text(`Tutor Name: ${booking.tutor.toString().user.name}`);
      doc.moveDown(1);

      // Payment Details with graphical design
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

      // Final Table Border
      doc.lineWidth(0.5).moveTo(50, doc.y).lineTo(550, doc.y).stroke();

      doc.moveDown(2);

      const pricingTableTop = doc.y;

      // Pricing Breakdown
      doc
        .fontSize(11)
        .font('Helvetica-Bold')
        .fillColor('#003366')
        .text('Description', 50, pricingTableTop);
      doc.text('Amount', 450, pricingTableTop);

      doc
        .lineWidth(0.5)
        .moveTo(50, pricingTableTop + 20)
        .lineTo(550, pricingTableTop + 20)
        .stroke(); // Pricing header line
      let pricingY = pricingTableTop + 20 + 5;

      // Pricing Breakdown (Normal text)
      doc
        .fontSize(11)
        .fillColor('#000000')
        .text('Total Session Cost', 50, pricingY, {
          width: 300,
          align: 'left',
        });
      doc.text(`${booking.amount} BDT`, 450, pricingY, {
        width: 90,
        align: 'right',
      });
      pricingY += 20;

      // Add platform fee (if applicable)
      if (booking.paymentStatus === 'paid') {
        const platformFee = booking.amount * 0.2;
        const tutorEarnings = booking.amount - platformFee;

        doc.text('Platform Fee (20%)', 50, pricingY, {
          width: 300,
          align: 'left',
        });
        doc.text(`-${platformFee.toFixed(2)} BDT`, 450, pricingY, {
          width: 90,
          align: 'right',
        });
        pricingY += 20;

        doc.text('Tutor Earnings', 50, pricingY, { width: 300, align: 'left' });
        doc.text(`${tutorEarnings.toFixed(2)} BDT`, 450, pricingY, {
          width: 90,
          align: 'right',
        });
      }

      // Final Total
      doc.lineWidth(0.5).moveTo(50, pricingY).lineTo(550, pricingY).stroke();
      doc
        .fontSize(12)
        .fillColor('#000000')
        .text('Total Due', 50, pricingY + 5, { width: 300, align: 'left' });
      doc.text(`${booking.amount} BDT`, 450, pricingY + 5, {
        width: 90,
        align: 'right',
      });

      doc.moveDown(2);

      doc.text(
        'Thank you for using our tutoring service! For any inquiries, please contact us at support@yourtutoringservice.com.',
      );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};
