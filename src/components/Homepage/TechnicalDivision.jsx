import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Papa from 'papaparse';
import { motion } from 'framer-motion';

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
            const parsedData = results.data.map(row => ({
              ...row,
              id: parseInt(row.id, 10),
            })).filter(row => row.id && row.title && row.image); // Filter data valid
            
            // Urutkan berdasarkan ID untuk memastikan urutan layout benar
            parsedData.sort((a, b) => a.id - b.id);
            setData(parsedData);
          },
          error: (err) => setError(`Gagal memproses CSV: ${err.message}`),
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [spreadsheetUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
}


// ====================================================================
// Komponen Card (Dibuat lebih responsif)
// ====================================================================
const DivisionCard = ({ item }) => {
  return (
    <Link
      to={item.link}
      // PERBAIKAN: Tinggi kartu dibuat responsif. Lebar diambil dari 'item.widthClass'
      className={`relative rounded-2xl overflow-hidden shadow-lg h-64 md:h-80 flex items-end group cursor-pointer transform transition-all duration-300 hover:scale-105 w-full ${item.widthClass}`}
    >
      <img
        src={item.image}
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
        <div className="absolute inset-x-2 bottom-2 h-24 bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-xl border border-white/20"></div>
        <div className="flex flex-col z-20 transition-all duration-300 gap-0 group-hover:gap-1">
          <h3 className="text-[var(--white)] text-2xl md:text-3xl font-bold drop-shadow-lg font-glancyr transition-all duration-300 mb-2 group-hover:mb-0">
            {item.title}
          </h3>
          <p className="text-[var(--white)] text-sm md:text-base font-sfpro opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-full transition-all duration-300 leading-relaxed">
            {item.desc}
          </p>
        </div>
      </div>
    </Link>
  );
};


// ====================================================================
// Komponen Utama (Integrasi, Layout Dinamis, & Responsif)
// ====================================================================
export default function TechnicalDivision() {
  const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQeH6GPT_zewQGOeZcDKZQowl7FVcSiQZr-JDSwSL9tnQpIGhI_2a8wk5YhTWMNRUxXTj5kZDxQ-b6T/pub?gid=921487176&single=true&output=csv';
  
  const { data, loading, error } = useGoogleSheetData(SPREADSHEET_URL);

  // Definisikan kelas lebar yang spesifik untuk layout 2x2
  const widthClasses = ["md:w-3/5", "md:w-2/5", "md:w-2/5", "md:w-3/5"];

  // Tambahkan 'widthClass' ke setiap item data berdasarkan urutannya
  const divisionCardData = data.slice(0, 4).map((item, index) => ({
    ...item,
    widthClass: widthClasses[index],
  }));

  if (loading) return <section className="bg-[var(--cream)] py-40 text-center"><p>Loading divisions...</p></section>;
  if (error) return <section className="bg-[var(--cream)] py-40 text-center"><p className="text-red-500">Error: {error}</p></section>;

  return (
    // PERBAIKAN: Padding dibuat responsif
    <section className="bg-[var(--cream)] py-20 md:py-28 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="w-full mx-auto max-w-7xl">
        <motion.div 
          className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16 mb-16 md:mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-full lg:w-2/5 space-y-4">
            <h3 className="text-base font-bold font-glancyr uppercase tracking-widest text-[var(--black)]">
              [Technical Division]
            </h3>
            <p className="text-3xl md:text-4xl font-bold font-display leading-snug text-[var(--black)]">
              The core pillars of our technological development.
            </p>
          </div>
          <div className="w-full lg:w-3/5">
            <p className="text-base md:text-lg text-[var(--black)] font-sfpro leading-relaxed">
              Explore diverse technical divisions that push boundaries, sharpen
              skills, and open new opportunities through collaboration and
              technological development.
            </p>
          </div>
        </motion.div>

        {/* PERBAIKAN: Layout grid dibuat dinamis dari data */}
        <motion.div 
          className="flex flex-col gap-4 md:gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* Baris Pertama */}
          <div className="flex flex-col md:flex-row w-full gap-4 md:gap-6">
            {divisionCardData.slice(0, 2).map(item => <DivisionCard key={item.id} item={item} />)}
          </div>
          {/* Baris Kedua */}
          <div className="flex flex-col md:flex-row w-full gap-4 md:gap-6">
            {divisionCardData.slice(2, 4).map(item => <DivisionCard key={item.id} item={item} />)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}