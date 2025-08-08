import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faYoutube,
  faTiktok,
  faXTwitter,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const socialLinks = [
  { href: 'mailto:robotiik.filkom@ub.ac.id', icon: faEnvelope, hoverClass: 'hover:text-[var(--orange)]' },
  { href: 'https://www.instagram.com/robo_tiik/', icon: faInstagram, hoverClass: 'hover:text-pink-400' },
  { href: '#', icon: faTiktok, hoverClass: 'hover:text-white/70' },
  { href: '#', icon: faYoutube, hoverClass: 'hover:text-red-500' },
  { href: '#', icon: faXTwitter, hoverClass: 'hover:text-blue-500' },
  { href: '#', icon: faLinkedin, hoverClass: 'hover:text-blue-400' },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--main-blue)] text-center py-12 md:py-16 relative z-10 text-[var(--white)] px-4 sm:px-6">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display mb-6 max-w-4xl mx-auto leading-tight">
        Connect with innovation. Explore our journey and be part of the future of robotics.
      </h2>

      <p className="text-base lg:text-lg text-[var(--white)]/80 max-w-3xl mx-auto mb-10 font-sans">
        Whether you're passionate about cutting-edge innovation, real-world engineering challenges,
        or collaborative tech experiences ROBOTIIK offers the perfect space to explore and grow.
      </p>

      <div className="flex justify-center flex-wrap gap-6 md:gap-8 text-2xl sm:text-3xl mb-12">
        {socialLinks.map((link, index) => (
          <a 
            key={index} 
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors duration-300 ${link.hoverClass}`}
            aria-label={`Follow us on ${link.icon.iconName}`}
          >
            <FontAwesomeIcon icon={link.icon} />
          </a>
        ))}
      </div>

      <div className="w-full h-px bg-[var(--gray)] mx-auto mb-8"></div>

      <p className="text-[var(--gray)] text-sm font-sans">&copy; {new Date().getFullYear()} ROBOTIIK</p>
    </footer>
  );
}