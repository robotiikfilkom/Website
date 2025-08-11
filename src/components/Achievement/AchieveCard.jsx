import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function AchievementCard({ item, layoutClass }) {
  if (!item || !item.id) return null;

  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-lg min-h-[220px] flex items-end group cursor-pointer transform transition-all duration-300 hover:scale-105 ${layoutClass}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover z-10 brightness-90 transition-all duration-500 group-hover:brightness-75"
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
}
