import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function PartnerCard({
  title,
  image,
  description,
  className,
  delay = 0,
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 200 + delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-lg min-h-[220px] flex items-end group cursor-pointer 
        transform transition-all duration-700 ease-out 
        ${className}
        ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
        hover:scale-105
      `}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 ease-in-out group-hover:scale-110"
      />

      {/* Gradasi ditambahkan agar teks lebih mudah dibaca */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>

      {/* Konten teks sekarang berada di atas gradasi */}
      <div className="relative z-20 p-4 w-full flex flex-col justify-end h-full">
        <div className="relative bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl border border-white/20 p-4">
          {/* Konten teks berada di dalam panel */}
          <div className="flex flex-col z-20">
            <h3 className="text-[var(--white)] text-xl md:text-2xl font-bold drop-shadow-lg font-display">
              {title}
            </h3>
            <p className="text-[var(--white)]/90 text-sm font-sans leading-relaxed transition-all duration-300 ease-in-out opacity-0 max-h-0 transform translate-y-2 group-hover:opacity-100 group-hover:max-h-40 group-hover:translate-y-0">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
