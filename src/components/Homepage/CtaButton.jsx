import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionLink = motion(Link);

export default function CtaButton() {
  const [isHovered, setIsHovered] = useState(false);

  const iconSpringTransition = {
    type: "spring",
    stiffness: 400,
    damping: 30,
  };

  return (
    <MotionLink
      to="/partners"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center justify-center rounded-full h-[57px] w-[255px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 overflow-hidden"
      animate={{
        backgroundColor: isHovered ? 'var(--black)' : 'var(--white)',
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <motion.span
        className="text-lg font-medium text-[var(--black)] font-display"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.15, delay: isHovered ? 0 : 0.2 }} 
      >
        Partner With Us
      </motion.span>
      
      <motion.span
        className="absolute text-lg font-medium text-[var(--white)] font-display"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2, delay: isHovered ? 0.2 : 0 }} 
      >
        Click Here Now !!   
      </motion.span>

      <motion.div
        className="absolute top-0 bottom-0 my-auto flex items-center justify-center w-11 h-11 rounded-full"
        animate={{
          left: isHovered ? '6px' : 'calc(100% - 44px - 6px)', 
          backgroundColor: isHovered ? 'var(--white)' : 'var(--black)',
          color: isHovered ? 'var(--black)' : 'var(--white)',
        }}
        transition={iconSpringTransition}
      >
        <motion.div
          animate={{ rotate: isHovered ? -135 : -45 }}
          transition={iconSpringTransition}
        >
          <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </MotionLink>
  );
}