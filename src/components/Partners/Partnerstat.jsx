import React, { useState, useEffect, useCallback } from 'react';
import Papa from 'papaparse';
import RandomNumber from '../../utils/Randomnumber'; 

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
            setData(results.data);
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

export default function PartnersStats() {
  const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRjOBJTdcNoh1jI25nxRWzcgG-mDTbbFQ662h-4KdHdBwHv7lMTlQ5q0muOf0c-et-cBMdiHx20mmeL/pub?gid=1474762779&single=true&output=csv';
  
  const { data: statsData, loading, error } = useGoogleSheetData(SPREADSHEET_URL);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const getStatValue = (id) => {
    if (loading || error) return 0;
    const stat = statsData.find(item => item.id?.toLowerCase().trim() === id.toLowerCase());
    return stat ? parseInt(stat.value, 10) : 0;
  };

  const cardTransitionClasses = "transition-all duration-700 ease-in-out transform";

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
      <div
        className={`bg-[var(--white)] text-[var(--main-blue)] p-4 rounded-xl ${cardTransitionClasses} ${
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold">
          <RandomNumber n={getStatValue('Achievement')} />+
        </div>
        <div className="text-sm mt-1">Achievement</div>
      </div>

      <div
        className={`bg-[var(--white)] text-[var(--main-blue)] p-4 rounded-xl ${cardTransitionClasses} ${
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "150ms" }}
      >
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold">
          <RandomNumber n={getStatValue('Engagement')} />+
        </div>
        <div className="text-sm mt-1">Engagement</div>
      </div>

      <div
        className={`bg-[var(--white)] text-[var(--main-blue)] p-4 rounded-xl col-span-2 sm:col-span-1 ${cardTransitionClasses} ${
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "300ms" }}
      >
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold">
          <RandomNumber n={getStatValue('Member')} />+
        </div>
        <div className="text-sm mt-1">Member</div>
      </div>
    </div>
  );
}