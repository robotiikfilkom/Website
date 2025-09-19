import React, { useState, useEffect, useCallback } from 'react';
import Papa from 'papaparse';
import PartnersStats from '../components/Partners/Partnerstat';
import PartnerCard from '../components/Partners/PartnerCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

// ====================================================================
// FUNGSI PENGAMBIL DATA (CUSTOM HOOK)
// ====================================================================
function useGoogleSheetData(spreadsheetUrl) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(spreadsheetUrl, { cache: "no-cache" })
      .then(response => {
        if (!response.ok) throw new Error("Gagal mengambil data Spreadsheet. Pastikan URL publikasi CSV sudah benar.");
        return response.text();
      })
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: header => header.toLowerCase().trim(),
          complete: (results) => {
            const parsedData = results.data.map(row => ({
              ...row,
              id: parseInt(row.id, 10)
            }));
            setData(parsedData);
          },
          error: (err) => setError(`Gagal memproses CSV: ${err.message}`),
        });
      })
      .catch(err => {
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

export default function PartnersPage() {
  const googleFormUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLSeiDqLYkDcDVdCoPHa742eLS9SEbYBx9YLUFB6KyhDCRhyaQw/viewform?usp=sf_link';

  const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQeH6GPT_zewQGOeZcDKZQowl7FVcSiQZr-JDSwSL9tnQpIGhI_2a8wk5YhTWMNRUxXTj5kZDxQ-b6T/pub?gid=1474762779&single=true&output=csv';
  const { data: partnersData, loading, error } = useGoogleSheetData(SPREADSHEET_URL);

  const getPartnerLayoutClass = (id) => {
    switch (id) {
      case 1: return 'md:row-start-1 md:col-start-1 md:col-span-3';
      case 2: return 'md:row-start-1 md:col-start-4 md:col-span-2';
      case 3: return 'md:row-start-1 md:col-start-6 md:col-span-3';
      case 4: return 'md:row-start-2 md:col-start-1 md:col-span-3';
      case 5: return 'md:row-start-2 md:col-start-4 md:col-span-2';
      case 6: return 'md:row-start-2 md:col-start-6 md:col-span-3';
      default: return 'md:col-span-2';
    }
  };

  // PERBAIKAN UTAMA DI SINI: Filter data agar hanya menampilkan ID 1-6
  const filteredPartners = partnersData.filter(item => item.id >= 1 && item.id <= 6);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--main-blue)] text-[var(--white)] font-sans relative overflow-hidden">
      {/* ... (bagian header dan "Why Choose" tidak berubah) ... */}
      <header className="px-4 sm:px-6 md:px-8 lg:px-16 pt-24 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--white)] font-display">
          Our Partners
        </h1>
      </header>
      <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div className="text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-[var(--white)] font-display">Why<br />choose<br />ROBOTIIK!</h2>
        </div>
        <div className="lg:col-span-2 space-y-8">
          <p className="text-[var(--white)]/80 text-base md:text-lg">ROBOTIIK provides real benefits to sponsors by reaching students and the community through educational activities, competitions, and social media. Your support will help develop robotics technology while also being an effective and positive promotional tool.</p>
          <PartnersStats />
        </div>
      </section>

      {/* Partners */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-16">
        {loading && <p className="text-center">Loading partners...</p>}
        {error && <p className="text-center text-red-400">Error: {error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 gap-6 max-w-7xl mx-auto">
            {/* Gunakan 'filteredPartners' untuk me-render kartu */}
            {filteredPartners.map((item, index) => (
              <PartnerCard 
                key={item.id} 
                title={item.title} 
                image={item.image} 
                description={item.description} 
                className={getPartnerLayoutClass(item.id)} 
                delay={index * 100} // Tambahkan delay animasi
              />
            ))}
          </div>
        )}
      </section>

      {/* ... (bagian "Become a Partner" tidak berubah) ... */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-20 flex flex-col lg:flex-row gap-12 items-start">
        <div className="lg:w-1/3 text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-[var(--white)] font-display">BECOME<br />A PARTNER</h2>
        </div>
        <a href={googleFormUrl} target="_blank" rel="noopener noreferrer" className="lg:w-2/3 w-full space-y-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg p-8 text-center lg:text-left hover:border-white/60 hover:bg-white/20 transition-all duration-300 group">
          <h3 className="text-2xl font-bold text-white">Fill Out Our Partnership Form</h3>
          <p className="text-white/70">Interested in becoming a partner? Click here to open our official partnership form.</p>
          <div className="font-semibold text-[var(--white)] text-lg group-hover:underline">Open Partnership Form</div>
          <div className="flex justify-center lg:justify-end pt-4">
            <div className="bg-[var(--white)] text-[var(--main-blue)] font-bold px-8 py-3 rounded-full transition text-lg flex items-center gap-2">
              Open Form
              <FontAwesomeIcon icon={faArrowRight} className="text-base" />
            </div>
          </div>
        </a>
      </section>
    </div>
  );
}