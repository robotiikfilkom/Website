import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from "react-router-dom";
import logo from '/src/assets/img/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

function AnimatedNavLink({ to, children, onClick, className = '' }) {
  return (
    <NavLink
      to={to}
      onClick={onClick} 
      className={({ isActive }) => 
        `
          relative py-2 font-sans transition-colors duration-300
          ${isActive 
              ? 'font-bold after:scale-x-100' 
              : 'font-medium hover:after:scale-x-100'
          }
          after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 
          after:h-0.5 after:w-[110%] after:bg-[var(--white)] 
          after:scale-x-0 after:origin-center after:transition-transform after:duration-300
          ${className}
        `
      }
    >
      {children}
    </NavLink>
  );
}

const navItems = [
  { type: 'link', to: "/", text: "Home" },
  { type: 'link', to: "/about", text: "About" },
  { type: 'dropdown', text: 'Division' }, 
  { type: 'link', to: "/achievement", text: "Achievements" },
  { type: 'link', to: "/partners", text: "Partners" },
];

const divisionLinks = [
  { to: '/division/executive', text: 'Executive' },
  { to: '/division/hrd', text: 'HRD' },
  { to: '/division/general-affair', text: 'General Affair' },
  { to: '/division/mit', text: 'MIT' },
  { to: '/division/rnd', text: 'R&D' },
  { to: '/division/humanoid', text: 'Humanoid' },
  { to: '/division/amarine', text: 'Amarine' },
  { to: '/division/quadcopter', text: 'Quadcopter' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDivisionOpen, setIsDivisionOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const divisionRef = useRef(null);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (divisionRef.current && !divisionRef.current.contains(event.target)) {
        setIsDivisionOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [divisionRef]);

  const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.1 } },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <nav className={`flex justify-between items-center px-6 md:px-12 lg:px-20 py-4 text-sm transition-all duration-300 ease-in-out shadow-lg ${scrolled ? 'bg-[var(--main-blue)]/80 backdrop-blur-lg' : 'bg-[var(--main-blue)]'}`}>
        <NavLink to="/"><img src={logo} alt="ROBOTIIK Logo" className="h-8 w-24" /></NavLink>

        <div className="hidden md:flex items-center space-x-6 text-[var(--white)]">
          {navItems.map((item) => {
            if (item.type === 'link') {
              return <AnimatedNavLink key={item.to} to={item.to}>{item.text}</AnimatedNavLink>;
            }
            if (item.type === 'dropdown') {
              return (
                <div key={item.text} className="relative" ref={divisionRef}>
                  <button onClick={() => setIsDivisionOpen(!isDivisionOpen)} className="flex items-center gap-1.5 font-medium hover:text-white/80 transition-colors">
                    {item.text}
                    <FontAwesomeIcon icon={faChevronDown} className={`w-3 h-3 transition-transform duration-200 ${isDivisionOpen ? 'rotate-180' : 'rotate-0'}`} />
                  </button>
                  <AnimatePresence>
                    {isDivisionOpen && (
                      <motion.div
                        variants={dropdownVariants} initial="hidden" animate="visible" exit="hidden"
                        className="absolute top-full mt-4 -right-4 w-96 bg-[var(--main-blue)]/90 backdrop-blur-xl rounded-lg shadow-2xl p-4 border border-white/10"
                      >
                        <div className="grid grid-cols-2 gap-2">
                          {divisionLinks.map((link) => (
                            <Link key={link.to} to={link.to} onClick={() => setIsDivisionOpen(false)} className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors text-sm">
                              {link.text}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return null;
          })}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(true)} className="text-[var(--white)] text-2xl"><FontAwesomeIcon icon={faBars} /></button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants} initial="hidden" animate="visible" exit="hidden"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 bg-[var(--main-blue)]/80 backdrop-blur-lg z-50"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-7 right-6 text-[var(--white)] text-3xl"><FontAwesomeIcon icon={faTimes} /></button>
            <div className="flex flex-col items-center justify-center h-full text-[var(--white)]">
              <AnimatedNavLink to="/" onClick={() => setIsOpen(false)} className="text-3xl my-4">Home</AnimatedNavLink>
              <AnimatedNavLink to="/about" onClick={() => setIsOpen(false)} className="text-3xl my-4">About</AnimatedNavLink>
              <div className="w-48 h-px bg-white/20 my-4"></div>
              <h4 className="text-xl font-bold text-white/50 mb-2">Divisions</h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-center">
                 {divisionLinks.map((link) => (
                   <Link key={link.to} to={link.to} onClick={() => setIsOpen(false)} className="text-lg py-2 text-white/80 hover:text-white">
                     {link.text}
                   </Link>
                 ))}
              </div>
              <div className="w-48 h-px bg-white/20 my-4"></div>
              <AnimatedNavLink to="/achievement" onClick={() => setIsOpen(false)} className="text-3xl my-4">Achievements</AnimatedNavLink>
              <AnimatedNavLink to="/partners" onClick={() => setIsOpen(false)} className="text-3xl my-4">Partners</AnimatedNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}