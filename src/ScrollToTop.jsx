import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Membungkus scroll ke dalam setTimeout dengan delay 0
    // Ini akan menempatkan perintah scroll di akhir antrian eksekusi browser,
    // memastikannya berjalan setelah browser selesai merender.
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    // Cleanup function untuk membersihkan timer
    return () => clearTimeout(timer);
    
  }, [pathname]); // Tetap berjalan setiap kali URL berubah atau saat refresh

  return null; // Komponen ini tidak menampilkan apapun
}