import React from 'react';
import CtaButton from './CtaButton';
import ScrollIndicator from './ScrollIndicator';

export default function HeroSection() {
  return (
    <section className="relative bg-[var(--main-blue)] min-h-screen flex flex-col justify-center text-[var(--white)] overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <h1 className="font-glancyrmedium font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-wide">
          Satu Visi, Wujud Aksi,
          <br />
          Bangga Raih Prestasi
        </h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center px-6 sm:px-12 pb-10 w-full mx-auto gap-10">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <CtaButton />
          <p className="font-sans max-w-lg text-sm sm:text-base text-white/80">
            Discover the captivating world of robotics where innovation,
            cross-division collaboration, and limitless exploration come to life.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
            <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}