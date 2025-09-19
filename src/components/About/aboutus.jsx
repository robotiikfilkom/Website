import React from "react";
import { motion } from 'framer-motion';

const AboutUs = () => {

  // Varian animasi untuk judul (muncul dari atas sambil sedikit mengecil)
  const titleVariant = {
    hidden: { opacity: 0, y: -50, scale: 1.1 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Varian animasi untuk paragraf (terungkap dari atas ke bawah)
  const paragraphVariant = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  return (
    // PERBAIKAN: Background dan padding dibuat responsif
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-20 md:py-28">
      
      {/* PERBAIKAN: Layout diubah menjadi flex-col (mobile) dan lg:flex-row (desktop) */}
      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 max-w-7xl mx-auto">
        
        {/* Kolom Judul */}
        <motion.div 
          className="w-full lg:w-1/3"
          variants={titleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* PERBAIKAN: whitespace-nowrap dihapus, font-size responsif */}
          <h2 className="text-2xl sm:text-3xl font-bold font-glancyr uppercase tracking-wider text-left">[About Us]</h2>
        </motion.div>

        {/* Kolom Paragraf */}
        <motion.div 
          className="w-full lg:w-2/3"
          variants={paragraphVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* PERBAIKAN: text-justify hanya untuk desktop, font-weight & size disesuaikan */}
          <div className="space-y-4 text-left font-sfpro lg:text-justify leading-relaxed font-sfpro text-base md:text-lg">
            <p>
              ROBOTIK, an abbreviation of Robotics Faculty of Computer Science, Brawijaya University,
              is a Semi-Autonomous Institution (LSO) that functions as a research center for students in
              the Faculty of Computer Science (FILKOM) Brawijaya University. Officially established in Malang
              on November 14, 2012, ROBOTIK operates directly under the Robotics and Embedded Systems Laboratory (RES).
              This institution is dedicated to being the main forum for students who have a deep interest
              and passion for hardware engineering and intelligent systems.
            </p>
            <p>
              As a student organization, ROBOTIK was founded on the principle of Tridharma Perguruan Tinggi,
              which includes education, research, and community service. All of its activities are guided by
              the Heuristic principle, which prioritizes an exploratory and innovative approach in all
              technological developments. ROBOTIK actively focuses its research on robot development to
              include routine training programs, collaborative research projects, mentoring for new members,
              and community service initiatives that apply robotics and Internet of Things (IoT) technology
              for the benefit of the wider community.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;