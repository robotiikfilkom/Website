import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom"; // Link masih digunakan untuk tombol "Explore More"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Papa from "papaparse";

// Custom hook `useAchievements` (tidak ada perubahan)
function useAchievements(spreadsheetUrl) {
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
          complete: (results) => {
            const validData = results.data.filter((row) => row.id && row.title);
            const parsedData = validData.map((row) => ({
              id: parseInt(row.id, 10),
              title: row.title || "No Title",
              desc: row.desc || "No Description",
              image: row.image || "",
              link: row.link || "#",
              src: row.image || "",
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

  return { achievements, loading, error };
}

// PERBAIKAN UTAMA DI SINI: Komponen Card diubah menggunakan tag <a>
const Card = ({ item }) => {
  return (
    <a // Menggunakan tag <a> standar
      href={item.link} // Menggunakan href untuk URL
      target="_blank" // Atribut untuk membuka di tab baru
      rel="noopener noreferrer" // Praktik keamanan untuk target="_blank"
      className="relative flex-shrink-0 w-64 sm:w-72 aspect-[9/16] rounded-3xl p-3 group cursor-pointer transform transition-all duration-300 hover:scale-105"
    >
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        <img
          src={item.src}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover z-10 bg-black/10 brightness-90 transition-all duration-500 group-hover:brightness-75 group-hover:scale-110"
        />
        <div className="relative z-20 p-4 w-full flex flex-col justify-end h-full">
          <div className="absolute inset-x-2 bottom-2 h-28 bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-xl border border-white/20"></div>
          <div className="flex flex-col z-20 transition-all duration-300 gap-0 group-hover:gap-1">
            <h3 className="text-[var(--white)] text-2xl font-bold drop-shadow-lg font-display transition-all duration-300 mb-2 group-hover:mb-0">
              {item.title}
            </h3>
            <p className="text-[var(--white)] text-base font-sans opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-full transition-all duration-300 leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default function Achievementshome() {
  const SPREADSHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeH6GPT_zewQGOeZcDKZQowl7FVcSiQZr-JDSwSL9tnQpIGhI_2a8wk5YhTWMNRUxXTj5kZDxQ-b6T/pub?output=csv";
  const { achievements, loading, error } = useAchievements(SPREADSHEET_URL);
  const [isHoveredExplore, setIsHoveredExplore] = useState(false);
  const recentAchievements = achievements.slice(0, 5);

  return (
    <section className="bg-[var(--cream)] text-[var(--black)] py-20 md:py-28 overflow-hidden">
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16">
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-bold font-display uppercase tracking-wider text-[var(--black)]">
              [Achievements]
            </h2>
          </div>

          <div className="w-full md:w-2/3">
            <p className="text-3xl lg:text-4xl font-sans text-black/90 leading-tight">
              A visual journey through the lens, one snapshot at a time
              capturing the essence of our travel adventures around the world.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-end gap-8">
        <div className="w-full md:w-auto flex-shrink-0 px-4 sm:px-6 md:pl-8">
          <Link
            to="/achievement"
            onMouseEnter={() => setIsHoveredExplore(true)}
            onMouseLeave={() => setIsHoveredExplore(false)}
            className="inline-flex items-center gap-3 text-lg font-semibold text-[var(--main-blue)] group"
          >
            <div className="relative w-28 h-6">
              <span
                className={`absolute transition-opacity duration-500 ${
                  isHoveredExplore ? "opacity-0" : "opacity-100"
                }`}
              >
                Explore More
              </span>
              <span
                className={`absolute transition-opacity duration-500 ${
                  isHoveredExplore ? "opacity-100" : "opacity-0"
                }`}
              >
                See All
              </span>
            </div>
            <FontAwesomeIcon
              icon={faArrowRight}
              className={`w-4 h-4 transition-transform duration-500 group-hover:translate-x-1`}
            />
          </Link>
        </div>

        <div className="w-full overflow-x-auto custom-scrollbar pt-10 overflow-y-hidden">
          <div className="flex gap-3 sm:gap-4 pb-4 -mb-4 snap-x snap-mandatory">
            <div className="flex-shrink-0 w-4 sm:w-6 md:w-8 lg:w-16 snap-center"></div>

            {loading && (
              <p className="py-24 text-center w-full">
                Loading achievements...
              </p>
            )}
            {error && (
              <p className="py-24 text-center w-full text-red-500">
                Error: {error}
              </p>
            )}
            {!loading && !error && recentAchievements.length === 0 && (
              <p className="py-24 text-center w-full text-gray-500">
                No achievements found.
              </p>
            )}
            {!loading &&
              !error &&
              recentAchievements.map((item, index) => (
                <Card key={item.id || index} item={item} />
              ))}

            <div className="flex-shrink-0 w-4 sm:w-6 md:w-8 lg:w-16 snap-center"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
