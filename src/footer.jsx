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
import './index.css';

export default function Footer() {
  return (
    <footer className="bg-[#001F3F] text-center py-10 border-t border-[#8E8E8E] relative z-10 text-[#F8FAFF]">
  <h2 className="text-3xl md:text-4xl font-sfpro mb-8 max-w-4xl mx-auto leading-relaxed">
  Connect with innovation. Explore our journey and be part of the future of robotics.
</h2>

<p className="text-base md:text-lg text-[#F8FAFF] max-w-2xl mx-auto mb-10 font-sfpro-light">
  Whether you're passionate about cutting-edge innovation, real-world engineering challenges,
  or collaborative tech experiences ROBOTIIK offers the perfect space to explore and grow.
</p>

<div className="flex justify-center gap-8 text-2xl mb-8">
</div>

<div className="flex justify-center gap-8 text-3xl mb-8">
        <a href="#" className="hover:text-orange-400 transition-colors">
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
        <a href="#" className="hover:text-pink-400 transition-colors">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="#" className="hover:text-black hover:opacity-40 transition-all">
          <FontAwesomeIcon icon={faTiktok} />
        </a>
        <a href="#" className="hover:text-red-500 transition-colors">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
        <a href="#" className="hover:text-blue-500 transition-colors">
          <FontAwesomeIcon icon={faXTwitter} />
        </a>
        <a href="#" className="hover:text-blue-400 transition-colors">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>

      {/* Bottom gray line */}
      <div className="w-full h-px bg-[#8E8E8E] mx-auto mb-6"></div>

      <p className="text-[#8E8E8E] text-sm font-sfpro-light">&copy; 2025 ROBOTIIK</p>
    </footer>
  );
}
