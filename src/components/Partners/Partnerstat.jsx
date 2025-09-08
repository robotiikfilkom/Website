import React, { useState, useEffect } from 'react';
import RandomNumber from './RandomNumber';

export default function PartnersStats() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const cardTransitionClasses = "transition-all duration-700 ease-in-out transform";

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
      <div 
        className={`bg-[var(--white)] text-[var(--main-blue)] p-4 rounded-xl ${cardTransitionClasses} ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold">
          <RandomNumber n={95} />%
        </div>
        <div className="text-sm mt-1">Achievement</div>
      </div>

      <div 
        className={`bg-[var(--white)] text-[var(--main-blue)] p-4 rounded-xl ${cardTransitionClasses} ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        style={{ transitionDelay: '150ms' }} // Menggunakan inline style
      >
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold">
          <RandomNumber n={72} />+
        </div>
        <div className="text-sm mt-1">Engagement</div>
      </div>

      <div 
        className={`bg-[var(--white)] text-[var(--main-blue)] p-4 rounded-xl col-span-2 sm:col-span-1 ${cardTransitionClasses} ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        style={{ transitionDelay: '300ms' }} // Menggunakan inline style
      >
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold">
          <RandomNumber n={250} />+
        </div>
        <div className="text-sm mt-1">Member</div>
      </div>
    </div>
  );
}