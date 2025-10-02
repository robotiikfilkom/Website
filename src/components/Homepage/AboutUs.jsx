import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from 'framer-motion'; 

export default function AboutUs() {

  const titleVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const contentVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } 
    }
  };

  return (
    <section className="text-black py-20 md:py-28 px-4 sm:px-6 md:px-8">
      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-1 text-center lg:text-left">
          
          <motion.h2
            className="text-4xl sm:text-5xl font-bold font-glancyr leading-tight"
            variants={titleVariant}
            initial="hidden"
            whileInView="visible" 
            viewport={{ once: true }} 
          >
            About Us
          </motion.h2>

        </div>

        <motion.div
          className="lg:col-span-2 space-y-6"
          variants={contentVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-base md:text-lg font-sfpro leading-relaxed">
            The development of robotics in Indonesia signals a promising future,
            driven by the capabilities of researchers and academics. As a form
            of support, the Faculty of Computer Science at Universitas Brawijaya
            (FILKOM UB) provides a platform for its students through a robotics
            community known as ROBOTIIK. ROBOTIIK, or PTIIK Robotics, is a
            robotics community under the supervision of the Computer Systems and
            Robotics Laboratory at FILKOM UB. It is dedicated to fostering

            creativity in robotics, conducting research, competing in robotics
            competitions, and promoting robotics to the wider community by
            advancing science and technology.
          </p>
          <div className="pt-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-3 text-main-blue font-semibold group"
            >
              <span className="text-lg font-glancyr group-hover:underline">Learn More</span>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}