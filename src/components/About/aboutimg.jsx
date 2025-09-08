import React from "react";
import orgStructure from "/src/assets/img/Organizational Structure.png";
import struktur from "/src/assets/img/Struktur-Robotiik.png";

// Komponen untuk gambar atas (header)
export const TopImage = () => {
  return (
    // Menambahkan bg-[var(--cream)] dan padding responsif
    // *** Catatan: Padding pt-4 pb-8 md:pb-12 dipindahkan ke sini ***
    <div className="flex justify-center bg-[var(--cream)] pt-16 sm:pt-20 md:pt-24 pb-4">
      <img
        src={orgStructure}
        alt="Organizational Structure"
        // Menambahkan animasi dan kelas responsif
        // Ukuran lebar disesuaikan untuk setiap breakpoint, tinggi diatur otomatis
        className="
          w-11/12       /* Ukuran default untuk layar sangat kecil (xs) */
          sm:w-11/12      /* [DIKOREKSI] Ukuran untuk layar kecil (sm), agar lebih fit */
          md:w-8/12       /* Ukuran untuk layar medium (md) */
          lg:w-7/12       /* Ukuran untuk layar besar (lg) */
          xl:w-6/12       /* Ukuran untuk layar extra besar (xl) */
          2xl:w-5/12      /* Ukuran untuk layar 2xl */
          h-auto          /* Tinggi otomatis untuk menjaga rasio aspek */
          rounded-lg 
          transition-shadow /* Transisi halus untuk bayangan */
          duration-500 
          ease-in-out
          animate-gentle-float /* Menerapkan animasi mengambang kustom */
        "
      />
    </div>
  );
};

// Komponen untuk gambar bawah (struktur)
export const BottomImage = () => {
  return (
    // Menambahkan bg-[var(--cream)] dan padding responsif
    <div className="flex justify-center bg-[var(--cream)] pt-4 pb-8 md:pb-12">
      <img
        src={struktur}
        alt="Structure Robotik"
        // Menambahkan animasi dan kelas responsif
        // Ukuran lebar disesuaikan untuk setiap breakpoint, tinggi diatur otomatis
        className="
          w-11/12       /* Ukuran default untuk layar sangat kecil (xs) */
          sm:w-10/12      /* Ukuran untuk layar kecil (sm) */
          md:w-9/12       /* Ukuran untuk layar medium (md) */
          lg:w-8/12       /* Ukuran untuk layar besar (lg) */
          xl:w-7/12       /* Ukuran untuk layar extra besar (xl) */
          2xl:w-6/12      /* Ukuran untuk layar 2xl */
          h-auto          /* Tinggi otomatis untuk menjaga rasio aspek */
          rounded-lg 
          transition-transform /* Transisi halus untuk transform (scale) */
          duration-500 
          ease-in-out
          animate-pulse-gentle /* Menerapkan animasi zoom-in/out halus kustom */
        "
      />
    </div>
  );
};