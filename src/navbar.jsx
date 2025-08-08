import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import logo from '/src/assets/img/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

// Komponen link ditambahkan prop className untuk kustomisasi ukuran font
function AnimatedNavLink({ to, children, onClick, className = '' }) {
  return (
    <NavLink
      to={to}
      onClick={onClick} 
      className={({ isActive }) => 
        `
          relative py-2 font-sans transition-colors duration-300
          after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 
          after:h-0.5 after:w-[110%] after:bg-[var(--white)] 
          after:scale-x-0 after:origin-center after:transition-transform after:duration-300
          ${isActive 
              ? 'font-bold after:scale-x-100' 
              : 'font-medium hover:after:scale-x-100'
          }
          ${className}
        `
      }
    >
      {children}
    </NavLink>
  );
}

const navLinks = [
  { to: "/", text: "Home" },
  { to: "/about", text: "About" },
  { to: "/division", text: "Division" },
  { to: "/achievement", text: "Achievements" },
  { to: "/partners", text: "Partners" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Mencegah scroll di latar belakang saat menu terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const overlayVariants = {
    hidden: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    visible: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <div className="relative z-50 m-2">
      <nav className="flex justify-between items-center px-6 py-4 text-sm">
        <NavLink to="/">
          <img src={logo} alt="ROBOTIIK Logo" className="h-8 w-24" />
        </NavLink>

        {/* Menu Desktop */}
        <div className="hidden md:flex space-x-6 text-[var(--white)]">
          {navLinks.map((link) => (
            <AnimatedNavLink key={link.to} to={link.to}>
              {link.text}
            </AnimatedNavLink>
          ))}
        </div>

        {/* Tombol Burger Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(true)} className="text-[var(--white)] text-2xl">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </nav>

      {/* Overlay Full-Screen Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden fixed inset-0 bg-[var(--main-blue)]/80 backdrop-blur-lg z-50"
          >
            {/* Tombol Close di dalam overlay */}
            <button onClick={() => setIsOpen(false)} className="absolute top-7 right-6 text-[var(--white)] text-3xl">
              <FontAwesomeIcon icon={faTimes} />
            </button>
            
            {/* Konten menu yang terpusat */}
            <div className="flex flex-col items-center justify-center h-full space-y-8 text-[var(--white)]">
              {navLinks.map((link) => (
                <AnimatedNavLink 
                  key={link.to} 
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl" // Ukuran font lebih besar untuk mobile
                >
                  {link.text}
                </AnimatedNavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}