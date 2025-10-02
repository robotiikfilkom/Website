import { GoogleSpreadsheet } from 'google-spreadsheet';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  // Ganti dengan ID Spreadsheet Anda
  const SPREADSHEET_ID = '1SIOEnP82XpljuWIkerZQwB9Krms_HeThZ-KYZS9VZoE'; 
  const SHEET_NAME = 'Inquiries'; // Nama sheet yang baru Anda buat

  const { name, email, subject, message } = request.body;

  try {
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[SHEET_NAME];
    
    // Menambahkan ID unik dan timestamp
    const newId = (await sheet.getRows()).length + 1;
    const timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

    await sheet.addRow({
      id: newId,
      timestamp: timestamp,
      name: name,
      email: email,
      subject: subject,
      message: message,
    });

    response.status(200).json({ message: 'Data saved successfully.' });
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({ error: 'Failed to save data.' });
  }
}