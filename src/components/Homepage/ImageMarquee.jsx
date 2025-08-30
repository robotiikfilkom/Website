import React from 'react';
import { motion } from 'framer-motion';

const images = [
  { src: 'https://via.placeholder.com/220x150/FFC107/808080?Text=Image1', title: 'Image 1' },
  { src: 'https://via.placeholder.com/150x150/4CAF50/FFFFFF?Text=Image2', title: 'Image 2' },
  { src: 'https://via.placeholder.com/220x150/F44336/FFFFFF?Text=Image3', title: 'Image 3' },
  { src: 'https://via.placeholder.com/150x150/2196F3/FFFFFF?Text=Image4', title: 'Image 4' },
  { src: 'https://via.placeholder.com/220x150/9C27B0/FFFFFF?Text=Image5', title: 'Image 5' },
  { src: 'https://via.placeholder.com/150x150/FF9800/FFFFFF?Text=Image6', title: 'Image 6' },
];

const MarqueeImages = () => (
  <div className="flex flex-shrink-0 gap-4">
    {images.map((image, index) => {
      const sizeClass = index % 2 === 0 
        ? "w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]" 
        : "w-[180px] h-[120px] sm:w-[220px] sm:h-[150px]";
      
      return (
        <img
          key={index}
          className={`${sizeClass} rounded-t-2xl object-cover p-2 bg-white/10`}
          src={image.src}
          alt={image.title}
        />
      );
    })}
  </div>
);

export default function ImageMarquee() {
  const marqueeVariants = {
    animate: {
      x: [0, "-100%"], 
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 40,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="w-full overflow-x-hidden whitespace-nowrap py-8 bg-[var(--cream)]">
      <motion.div
        className="flex gap-4"
        variants={marqueeVariants}
        animate="animate"
      >
        <MarqueeImages />
        <MarqueeImages />
        <MarqueeImages />
        <MarqueeImages />
      </motion.div>
    </div>
  );
}