import React from 'react';
import { motion } from 'framer-motion';
import CtaButton from './CtaButton';
import ScrollIndicator from './ScrollIndicator';
import LiquidEther from './LiquidEther';

export default function HeroSection() {
  const line1 = "Satu Visi, Wujud Aksi,";
  const line2 = "Bangga Raih Prestasi";

  const sentenceVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.04,
      },
    },
  };

  const letterVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const footerVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 2.5,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      
      <div
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      >
        <LiquidEther
          colors={['#0073BA', '#F8FAFB', '#F8FAFB']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center text-[var(--white)] px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <motion.h1
            className="font-glancyrmedium font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-wide [text-shadow:2px_2px_5px_var(--black)]"
            variants={sentenceVariant}
            initial="hidden"
            animate="visible"
          >
            <span className="inline-block">
              {line1.split("").map((char, index) => (
                <motion.span key={char + "-" + index} variants={letterVariant}>
                  {char}
                </motion.span>
              ))}
            </span>
            <br />
            <span className="inline-block">
              {line2.split("").map((char, index) => (
                <motion.span key={char + "-" + index} variants={letterVariant}>
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>
        </div>

        <motion.div
          className="flex flex-col md:flex-row justify-between items-center pb-8 sm:pb-10 w-full mx-auto gap-8 md:gap-10"
          variants={footerVariant}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <CtaButton />
            <p className="font-glancyr max-w-sm sm:max-w-md text-sm sm:text-base text-white/80">
              Discover the captivating world of robotics where innovation,
              cross-division collaboration, and limitless exploration come to life.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <ScrollIndicator />
          </div>
        </motion.div>
      </div>

    </section>
  );
}
