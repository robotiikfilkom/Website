import React from 'react';
import { motion } from 'framer-motion';
import humanoidImage from '../../assets/img/humanoid.jpg'; 

const brandLogos = [
  { name: 'Brand A', src: humanoidImage },
  { name: 'Brand B', src: humanoidImage },
  { name: 'Brand C', src: humanoidImage },
  { name: 'Brand D', src: humanoidImage },
  { name: 'Brand E', src: humanoidImage },
  { name: 'Brand F', src: humanoidImage },
  { name: 'Brand G', src: humanoidImage },
];

// Komponen untuk me-render satu set logo
const LogoSet = () => (
    // Jarak antar logo dipersempit
    <div className="flex items-center flex-shrink-0 gap-4">
        {brandLogos.map((logo, index) => (
            <img 
                key={index} 
                src={logo.src} 
                alt={logo.name} 
                // PERUBAHAN UTAMA: Ukuran dan radius diubah
                className="h-60 w-auto max-w-60 rounded-2xl object-cover bg-[var(--cream)] p-2" 
            />
        ))}
    </div>
);

export default function Brandhome() {
  const marqueeVariants = {
    animate: {
      x: [0, "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  return (
    <section className="bg-[var(--cream)] py-16 md:py-20">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h3 className="text-4xl font-bold font-sans uppercase tracking-widest text-[var(--black)] mb-10">
          Partners & Sponsors
        </h3>

        <div className="relative w-full overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-24 bg-gradient-to-r from-[var(--cream)] to-transparent z-10"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-24 bg-gradient-to-l from-[var(--cream)] to-transparent z-10"></div>
          
          <motion.div
            className="flex gap-4 " // Jarak disesuaikan dengan LogoSet
            variants={marqueeVariants}
            animate="animate"
          >
            <LogoSet />
            <LogoSet />
            <LogoSet />
          </motion.div>
        </div>
      </div>
    </section>
  );
}