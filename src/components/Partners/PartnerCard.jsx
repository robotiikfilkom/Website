import React from 'react';

export default function PartnerCard({ title, image, description, className }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-lg bg-white/10 min-h-[220px] flex items-end group cursor-pointer sm:col-span-1 ${className}`}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-contain p-8 z-10 brightness-95 opacity-50"
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 px-4 py-4 transform translate-y-full group-hover:translate-y-0 rounded-b-2xl">
        <h3 className="text-white text-2xl font-semibold drop-shadow font-display">
          {title}
        </h3>
        <p className="text-white/80 text-sm leading-relaxed mt-1">{description}</p>
      </div>
      <div className="absolute bottom-4 left-4 z-10 group-hover:opacity-0 transition-opacity duration-300">
        <span className="text-white text-2xl font-semibold drop-shadow font-display">
          {title}
        </span>
      </div>
    </div>
  );
}
