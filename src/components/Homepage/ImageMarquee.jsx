import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Papa from 'papaparse';

function useGoogleSheetData(spreadsheetUrl) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(spreadsheetUrl, { cache: "no-cache" })
      .then(response => {
        if (!response.ok) throw new Error("Gagal mengambil data Spreadsheet.");
        return response.text();
      })
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: header => header.toLowerCase().trim(),
          complete: (results) => {
            const validData = results.data.filter(row => row.id && row.src);
            setData(validData);
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

const MarqueeImages = ({ images }) => (
  <div className="flex flex-shrink-0 gap-4">
    {images.map((image, index) => {
      const sizeClass = index % 2 === 0 
        ? "w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]" 
        : "w-[180px] h-[120px] sm:w-[220px] sm:h-[150px]";
      
      return (
        <img
          key={image.id || index}
          className={`${sizeClass} rounded-2xl object-cover p-2 bg-white/10`}
          src={image.src}
          alt={image.title || `Image ${index}`}
        />
      );
    })}
  </div>
);

export default function ImageMarquee() {
  const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRjOBJTdcNoh1jI25nxRWzcgG-mDTbbFQ662h-4KdHdBwHv7lMTlQ5q0muOf0c-et-cBMdiHx20mmeL/pub?gid=891145410&single=true&output=csv';
  
  const { data: images, loading, error } = useGoogleSheetData(SPREADSHEET_URL);

  const marqueeVariants = {
    animate: {
      x: ["0%", "-100%"], 
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 40,
          ease: "linear",
        },
      },
    },
  };

  if (loading) return <div className="text-center py-8 ">Loading images...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (images.length === 0) return null;

  return (
    <div className="w-full overflow-x-hidden whitespace-nowrap py-9 ">
      <motion.div
        className="flex gap-4"
        variants={marqueeVariants}
        animate="animate"
      >
        <MarqueeImages images={images} />
        <MarqueeImages images={images} />
        <MarqueeImages images={images} />
        <MarqueeImages images={images} />
      </motion.div>
    </div>
  );
}