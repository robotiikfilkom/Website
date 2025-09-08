import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function PartnerCard({ title, image, description, className, delay = 0 }) { // Tambahkan prop 'delay'
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 200 + delay); // Tambahkan delay dari prop ke penundaan awal

    return () => clearTimeout(timer);
  }, [delay]); // Pastikan useEffect dijalankan ulang jika delay berubah

  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-lg min-h-[220px] flex items-end group cursor-pointer 
        transform transition-all duration-700 ease-out 
        ${className}
        ${isMounted 
          ? "opacity-100 translate-y-0 rotate-0 skew-y-0 scale-100" // Kondisi akhir (setelah animasi)
          : "opacity-0 translate-y-16 -rotate-6 skew-y-3 scale-90"  // Kondisi awal (sebelum animasi)
        }
        hover:scale-105 hover:skew-y-0 // Pastikan hover tetap mulus
      `}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-contain p-8 z-10 transition-transform duration-500 ease-in-out group-hover:scale-110"
      />

      <div className="relative z-20 p-4 w-full flex flex-col justify-end h-full">
        <div className="absolute inset-x-2 bottom-2 h-20 bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-xl border border-white/20"></div>

        <div className="flex flex-col z-20 transition-all duration-300">
          <h3 className="text-[var(--white)] text-1xl md:text-xl font-bold drop-shadow-lg font-display">
            {title}
          </h3>
          <p className="text-[var(--white)]/90 text-[12px] font-sans leading-relaxed transition-all duration-300 ease-in-out opacity-0 max-h-0 transform translate-y-2 group-hover:opacity-100 group-hover:max-h-40 group-hover:translate-y-0">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}