import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSync } from "@fortawesome/free-solid-svg-icons";
import Papa from "papaparse";

const AchievementCard = ({ item, layoutClass }) => {
  if (!item || !item.id) return null;
  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-lg min-h-[220px] flex items-end group cursor-pointer transform transition-all duration-300 hover:scale-105 ${layoutClass}`}>
      <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover z-10 brightness-90 transition-all duration-500 group-hover:brightness-75" />
      <div className="absolute top-4 right-4 z-30">
        <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center border border-[var(--white)] transition-all duration-300 group-hover:-rotate-45 group-hover:bg-[var(--white)]">
          <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5 text-[var(--white)] transition-colors duration-300 group-hover:text-[var(--black)]" />
        </div>
      </div>
      <div className="relative z-20 p-4 w-full flex flex-col justify-end h-full">
        <div className="absolute inset-x-2 bottom-2 h-28 bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-xl border border-white/20"></div>
        <div className="flex flex-col z-20 transition-all duration-300 gap-0 group-hover:gap-1">
          <h3 className="text-[var(--white)] text-2xl md:text-3xl font-bold drop-shadow-lg font-display transition-all duration-300 mb-2 group-hover:mb-0">
            {item.title}
          </h3>
          <p className="text-[var(--white)] text-base font-sans opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-full transition-all duration-300 leading-relaxed">
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Achievement() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();

  const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQeH6GPT_zewQGOeZcDKZQowl7FVcSiQZr-JDSwSL9tnQpIGhI_2a8wk5YhTWMNRUxXTj5kZDxQ-b6T/pub?output=csv';
  
  const sizePattern = [
    'md:col-span-4', 
    'md:col-span-2', 
    'md:col-span-2',
    'md:col-span-2',
    'md:col-span-2', 
    'md:col-span-2',
    'md:col-span-4',
  ];

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(SPREADSHEET_URL, { cache: 'no-cache' })
      .then(response => {
        if (!response.ok) throw new Error("Gagal mengambil data. Pastikan URL Spreadsheet benar.");
        return response.text();
      })
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const validData = results.data.filter(row => row.id && row.title);
            const parsedData = validData.map(row => ({
              ...row,
              id: parseInt(row.id, 10),
            }));
            const reversedData = [...parsedData].reverse();
            setAchievements(reversedData);
          },
          error: (err) => setError(`Gagal memproses data: ${err.message}`),
        });
      })
      .catch(fetchError => {
        console.error("Error fetching spreadsheet:", fetchError);
        setError(fetchError.message);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, []); 

  useEffect(() => {
    fetchData(); 
  }, [location, fetchData]);

  const initialItemsCount = 7;
  const visibleItems = showMore ? achievements : achievements.slice(0, initialItemsCount);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[var(--main-blue)] to-[#0B1E3D] text-[var(--white)] relative overflow-hidden">
      <header className="pt-16 pb-8 text-center relative">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide font-display">
          Achievements
        </h1>
      </header>

      <main className="flex-grow flex flex-col items-center">
        {loading && <p className="text-center text-lg font-sans mt-8">Loading achievements...</p>}
        {error && <p className="text-center text-lg font-sans text-red-400 mt-8">Error: {error}</p>}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-6xl w-full mx-auto px-4 md:px-6 mt-8">
              {visibleItems.map((item, index) => {
                const layoutClass = sizePattern[index % sizePattern.length];
                return <AchievementCard key={item.id} item={item} layoutClass={layoutClass} />
              })}
            </div>
            {achievements.length > initialItemsCount && (
              <div className="flex justify-center my-16">
                <button onClick={() => setShowMore(!showMore)} className="text-lg font-sans font-semibold hover:text-white/80 transition-colors duration-300">
                  {showMore ? 'View Less' : 'View More'}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}