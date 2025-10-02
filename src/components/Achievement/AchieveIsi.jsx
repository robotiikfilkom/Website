import { useState, useEffect, useCallback } from "react";
import Papa from "papaparse";

export default function useAchievements(spreadsheetUrl) {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);

    fetch(spreadsheetUrl, { cache: "no-cache" })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch spreadsheet data.");
        return response.text();
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const validData = results.data.filter((row) => row.id && row.title);
            
            const parsedData = validData.map((row) => ({
              id: parseInt(row.id, 10),
              title: row.title,
              desc: row.desc || '',
              image: row.image || '',
              link: row.link || null, 
            }));
            setAchievements(parsedData.reverse());
          },
          error: (err) => setError(`Failed to parse CSV: ${err.message}`),
        });
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [spreadsheetUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { achievements, loading, error, fetchData };
}