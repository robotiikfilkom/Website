import { GoogleSpreadsheet } from 'google-spreadsheet';
import nodemailer from 'nodemailer';

// Pastikan Anda sudah menjalankan:
// npm install google-spreadsheet nodemailer

export default async function handler(request, response) {
  // Hanya izinkan metode POST
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }
  
  // Periksa apakah semua environment variables ada
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID_PARTNERS || !process.env.EMAIL_USER) {
    console.error("Satu atau lebih environment variables belum diatur.");
    return response.status(500).json({ error: "Konfigurasi server tidak lengkap." });
  }

  const { name, subject, email, phone, message } = request.body;

  try {
    // --- Bagian 1: Simpan ke Google Sheet ---
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID_PARTNERS);
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow({
      Timestamp: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
      Name: name,
      Subject: subject,
      Email: email,
      Phone: phone,
      Message: message,
    });

    // --- Bagian 2: Kirim Notifikasi Email ---
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gunakan App Password jika memakai Gmail
      },
    });

    await transporter.sendMail({
      from: `"ROBOTIIK Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Partner Inquiry: ${subject}`,
      html: `
        <h3>You have a new partnership inquiry!</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    // --- Kirim respon sukses ---
    response.status(200).json({ message: 'Success! Your message has been sent.' });

  } catch (error) {
    console.error('Error in serverless function:', error);
    response.status(500).json({ error: 'An error occurred while processing your request.' });
  }
}