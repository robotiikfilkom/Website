import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Papa from "papaparse";

// ====================================================================
// FUNGSI PENGAMBIL DATA (CUSTOM HOOK) - Tidak ada perubahan
// ====================================================================
function useGoogleSheetData(spreadsheetUrl) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(spreadsheetUrl, { cache: "no-cache" })
      .then((response) => {
        if (!response.ok) throw new Error("Gagal mengambil data Spreadsheet.");
        return response.text();
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: header => header.toLowerCase().trim(),
          complete: (results) => {
            const validData = results.data.filter((row) => row.id && row.src && row.title);
            const parsedData = validData.map((row) => ({
              id: parseInt(row.id, 10),
              src: row.src,
              title: row.title,
              desc: row.desc || '',
              link: row.link || '#',
            }));
            setData(parsedData.reverse());
          },
          error: (err) => setError(`Gagal memproses CSV: ${err.message}`),
        });
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [spreadsheetUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
}


// ====================================================================
// CATATAN PENTING: Untuk 'line-clamp-3' berfungsi, Anda perlu
// menginstal plugin Tailwind CSS.
// 1. Jalankan di terminal: npm install -D @tailwindcss/line-clamp
// 2. Tambahkan ke tailwind.config.js: plugins: [require('@tailwindcss/line-clamp')],
// ====================================================================


// ====================================================================
// KOMPONEN CARD (DIBUAT RESPONSIVE)
// ====================================================================
const NewsCard = ({ item }) => {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      // PERUBAHAN: Ukuran kartu dibuat responsif.
      // 1. 'w-full' untuk mobile agar 1 kartu penuh. 'sm:w-96' untuk layar lebih besar.
      // 2. 'h-[500px]' dihapus dan diganti 'aspect-[4/5]' agar tinggi proporsional.
      // 3. 'snap-center' untuk pengalaman swipe yang lebih baik.
      className="relative flex-shrink-0 w-full sm:w-96 snap-center aspect-[4/5] p-2 pb-8 group cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        <img
          src={item.src}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover z-10 brightness-90 transition-all duration-500 group-hover:brightness-75 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 z-30">
          <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center border border-[var(--white)] transition-all duration-300 group-hover:-rotate-45 group-hover:bg-[var(--white)]">
            <FontAwesomeIcon
              icon={faArrowRight}
              className="w-5 h-5 text-[var(--white)] transition-colors duration-300 group-hover:text-[var(--black)]"
            />
          </div>
        </div>
        <div className="relative z-20 p-4 w-full flex flex-col justify-end h-full">
          <div className="absolute inset-x-2 bottom-2 h-28 bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-xl border border-white/20"></div>
          <div className="flex flex-col z-20 transition-all duration-300 gap-0 group-hover:gap-1">
            <h3 className="text-[var(--white)] text-2xl font-bold drop-shadow-lg font-display transition-all duration-300 mb-2 group-hover:mb-0 break-words">
              {item.title}
            </h3>
            <p className="text-[var(--white)] text-base font-sans opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-full transition-all duration-300 leading-relaxed break-words line-clamp-3 group-hover:min-h-12">
              {item.desc}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};

// ====================================================================
// KOMPONEN UTAMA (DIBUAT RESPONSIVE)
// ====================================================================
export default function Newshome() {
  const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQeH6GPT_zewQGOeZcDKZQowl7FVcSiQZr-JDSwSL9tnQpIGhI_2a8wk5YhTWMNRUxXTj5kZDxQ-b6T/pub?gid=1416863627&single=true&output=csv';
  
  const { data: newsData, loading, error } = useGoogleSheetData(SPREADSHEET_URL);

  if (loading) {
    return (
      <section className="bg-[var(--cream)] text-center py-40">
        <p>Loading news...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[var(--cream)] text-center py-40">
        <p className="text-red-500">Error: {error}</p>
      </section>
    );
  }

  return (
    // PERUBAHAN: Padding utama dibuat responsif.
    <section className="bg-[var(--cream)] text-[var(--black)] px-4 sm:px-6 md:px-8 lg:px-12 py-20 md:py-28 overflow-hidden">
      <div className="w-full mx-auto mb-10">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
          
          {/* Kolom Kiri */}
          <div className="w-full lg:w-3/5 space-y-8">
            <h2 className="text-xl font-bold font-display uppercase tracking-wider text-[var(--black)]">
              What's New in Robotics...
            </h2>
            {/* PERUBAHAN: Ukuran font dibuat responsif. */}
            <p className="text-3xl sm:text-4xl lg:text-5xl font-sans text-[var(--black)] leading-tight">
              Stay ahead with exclusive insights on robotics trends, research,
              and innovation.
            </p>
          </div>

          {/* Kolom Kanan */}
          {/* PERUBAHAN: Lebar dan padding-top dibuat responsif. */}
          <div className="w-full lg:w-2/5 pt-8 lg:pt-16">
            <p className="text-base text-[var(--black)] font-sans leading-relaxed">
              Whether you're seeking hands-on innovation, collaborative
              engineering projects, or an inspiring tech driven
              environment ROBOTIIK has the perfect place for you to grow.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto overflow-y-hidden custom-scrollbar">
        {/* PERUBAHAN: Spacer div diganti dengan padding & scroll-padding untuk snap yang lebih baik. */}
        <div className="flex gap-4 sm:gap-6 pb-4 -mb-4 snap-x snap-mandatory scroll-px-4 sm:scroll-px-6 md:scroll-px-8 lg:scroll-px-12">
          {newsData.map((item, index) => (
            <NewsCard key={item.id || index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}