import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Papa from 'papaparse';

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
            const validData = results.data.filter(row => row.src);
            setData(validData);
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
// Komponen untuk me-render satu set logo
// ====================================================================
const LogoSet = ({ brandLogos }) => (
    <div className="flex items-center flex-shrink-0 gap-4 sm:gap-6 md:gap-8">
        {brandLogos.map((logo, index) => (
            <img
                key={index}
                src={logo.src}
                alt={logo.name}
                className="h-48 w-auto max-w-48 sm:h-56 sm:max-w-56 md:h-64 md:max-w-64 lg:h-80 lg:max-w-80 rounded-2xl object-cover p-2"
            />
        ))}
    </div>
);


// ====================================================================
// Komponen Utama
// ====================================================================
export default function Brandhome() {
  const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRjOBJTdcNoh1jI25nxRWzcgG-mDTbbFQ662h-4KdHdBwHv7lMTlQ5q0muOf0c-et-cBMdiHx20mmeL/pub?gid=1831910622&single=true&output=csv';
  
  const { data: brandLogos, loading, error } = useGoogleSheetData(SPREADSHEET_URL);

  const title = "Partners & Sponsors";
  const titleWords = title.split(" ");

  const titleContainerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const marqueeRevealVariant = {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    visible: {
      clipPath: 'inset(0 0 0 0)',
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.5 },
    },
  };

  const marqueeScrollVariant = {
    animate: {
      x: ["0%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 300,
          ease: "linear",
        },
      },
    },
  };

  return (
    // PERUBAHAN: Latar belakang diubah dari transparan menjadi bg-[var(--cream)]
    <section className="py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        
        <motion.h3
          className="text-2xl sm:text-3xl lg:text-4xl font-bold font-sans uppercase tracking-widest text-[var(--black)] mb-10 md:mb-12"
          variants={titleContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {titleWords.map((word, index) => (
            <motion.span key={index} variants={wordVariant} className="inline-block mr-3">
              {word}
            </motion.span>
          ))}
        </motion.h3>

        <motion.div
          className="relative w-full overflow-hidden h-96 flex items-center"
          variants={marqueeRevealVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-r from-[var(--cream)] to-transparent z-10"></div>
          <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-l from-[var(--cream)] to-transparent z-10"></div>
          
          {loading && <p className="w-full text-center text-lg">Loading Partners...</p>}
          {error && <p className="w-full text-center text-red-500">Error: {error}</p>}
          
          {!loading && !error && brandLogos.length > 0 && (
            <motion.div
              className="flex gap-4 sm:gap-6 md:gap-8"
              variants={marqueeScrollVariant}
              animate="animate"
            >
              <LogoSet brandLogos={brandLogos} />
              <LogoSet brandLogos={brandLogos} />
              <LogoSet brandLogos={brandLogos} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}