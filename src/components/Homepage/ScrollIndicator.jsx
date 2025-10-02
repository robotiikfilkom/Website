import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function ScrollIndicator() {
  const [isHovered, setIsHovered] = useState(false);

  const handleScroll = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div
      className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--white)] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleScroll}
    >
      <div className="relative w-[90px] h-5">
        <span className={`absolute inset-0 transition-opacity duration-700 ${isHovered ? "opacity-0" : "opacity-100"}`}>
          Explore More
        </span>
        <span className={`absolute inset-0 transition-opacity duration-700 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          Scroll down
        </span>
      </div>
      <FontAwesomeIcon
        icon={faArrowUp}
        className={`w-4 h-4 transition-transform duration-500 ease-in-out ${isHovered ? "rotate-180" : "rotate-0"}`}
      />
    </div>
  );
}