import React from "react";
import { motion } from 'framer-motion';

const missionList = [
  "To enhance member capabilities through intensive training and skill development based on the latest technologies.",
  "To establish an ecosystem that supports inter-division collaboration in every project and competition to produce innovative solutions.",
  "To foster an organizational culture focused on sustainability and transparency in the management of resources, including funding and facilities.",
  "To focus on member achievement by providing full support in robotics competitions at local, national, and international levels, while ensuring that every member has the opportunity to develop their potential and earn recognition.",
  "Optimizing the use of social media and publications to introduce the achievements, innovations, and contributions of ROBOTIIK to the wider community.",
  "Establishing cooperation with various external parties, including educational institutions, industries, and communities, to increase influence and social impact."
];

const VisionMission = () => {
  // Varian untuk kontainer grid misi (mengatur stagger)
  const staggerContainerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Jeda antar setiap kartu misi
        delayChildren: 0.3,   // Mulai animasi anak setelah 0.3 detik
      },
    },
  };

  // Varian untuk setiap kartu misi (efek flip 3D & scale)
  const itemVariant = {
    hidden: { opacity: 0, scale: 0.5, rotateY: -90 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateY: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1] // Easing custom untuk efek 'pop'
      }
    },
  };

  // Varian sederhana untuk Visi dan judul Misi
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    // PERBAIKAN: Komponen dibungkus <section> dengan bg dan padding responsif
    <section className="bg-[var(--cream)] w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-12 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto">
        {/* Visi */}
        <motion.div 
          className="text-center"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* PERBAIKAN: Tipografi dan pembatas dibuat responsif */}
          <h2 className="text-3xl sm:text-4xl font-bold font-glancyr mb-4">Vision</h2>
          <div className="border-b-4 border-[var(--black)] w-24 mx-auto mb-6"></div>
          {/* PERBAIKAN: Shadow dan tipografi disesuaikan */}
          <div className="bg-[var(--white)] rounded-lg shadow-xl p-6 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed font-sfpro">
            To establish ROBOTIK as a leading institution in the field of robotics and embedded systems,
            capable of producing high-quality individuals who excel and make meaningful contributions to society.
          </div>
        </motion.div>

        {/* Misi */}
        <div className="mt-20 md:mt-24 text-center"> 
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold font-glancyr mb-4"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, delay: 0.2 }}
          >
            Mission
          </motion.h2>
          <div className="border-b-4 border-[var(--black)] w-24 mx-auto mb-6"></div>
          
          {/* Grid Misi dengan animasi berantai */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 text-sm sm:text-base"
            variants={staggerContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {missionList.map((text, idx) => (
              <motion.div
                key={idx}
                className="bg-[var(--white)] rounded-lg shadow-xl p-6 flex items-center justify-center text-center leading-relaxed min-h-[150px] sm:min-h-[180px] font-sfpro"
                variants={itemVariant}
                style={{ transformStyle: 'preserve-3d' }} // Penting untuk animasi 3D
              >
                {text}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;