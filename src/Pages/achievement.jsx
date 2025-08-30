import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AchievementCard from "../components/Achievement/AchieveCard";
import useAchievements from "../components/Achievement/AchieveIsi";

export default function Achievement() {
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);

  const SPREADSHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeH6GPT_zewQGOeZcDKZQowl7FVcSiQZr-JDSwSL9tnQpIGhI_2a8wk5YhTWMNRUxXTj5kZDxQ-b6T/pub?output=csv";

  const { achievements, loading, error } = useAchievements(SPREADSHEET_URL);

  const sizePattern = [
    "md:col-span-4",
    "md:col-span-2",
    "md:col-span-2",
    "md:col-span-2",
    "md:col-span-2",
    "md:col-span-2",
    "md:col-span-4",
  ];

  const initialItemsCount = 7;
  const visibleItems = showMore
    ? achievements
    : achievements.slice(0, initialItemsCount);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[var(--main-blue)] to-[#0B1E3D] text-[var(--white)] relative overflow-hidden">
      <header className="pt-24 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide font-display">
          Achievements
        </h1>
      </header>

      <main className="flex-grow flex flex-col items-center">
        {loading && (
          <p className="text-center text-lg font-sans mt-8">
            Loading achievements...
          </p>
        )}
        {error && (
          <p className="text-center text-lg font-sans text-red-400 mt-8">
            Error: {error}
          </p>
        )}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 w-full max-w-7xl mx-auto px-4 md:px-6 mt-8">
              {visibleItems.map((item, index) => (
                <AchievementCard
                  key={item.id}
                  item={item}
                  layoutClass={sizePattern[index % sizePattern.length]}
                />
              ))}
            </div>
            {achievements.length > initialItemsCount && (
              <div className="flex justify-center my-16">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="text-lg font-sans font-semibold hover:text-white/80 transition-colors duration-300"
                >
                  {showMore ? "View Less" : "View More"}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
