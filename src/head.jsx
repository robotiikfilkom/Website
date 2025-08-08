import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
export default function Hero() {
  return (
    <section className="flex flex-col justify-center items-center text-center px-6 pt-20 pb-28 z-10 relative">
      <h1 className="text-4xl md:text-5xl font-semibold mb-6 leading-snug">
        Satu Visi, Wujud Aksi,<br />
        Bangga Raih Prestasi
      </h1>
      <p className="text-sm md:text-base max-w-xl mb-12 text-gray-300 mx-auto">
        Discover the captivating world of robotics where innovation, cross-division collaboration,
        and limitless exploration come to life.
      </p>
     
      <div className="absolute left-0 bottom-0 mb-8 ml-8 flex items-center gap-4">
        <a
          href="#"
          className="group bg-white text-black px-6 py-2 rounded-full flex items-center gap-2 font-semibold hover:bg-gray-200 transition-colors"
        >
          Partner With Us
          <span className="rounded-full p-2 transition-colors group-hover:bg-gray-800 group-hover:text-white">
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </span>
        </a>
        <p className="text-xs text-gray-300 max-w-xs text-align-justify">
          Discover the captivating world of robotics where innovation, cross-division collaboration, and limitless exploration come to life.
        </p>
      </div>
      <div className="absolute right-0 bottom-0 mb-8 mr-8">
        <a href="#" className="text-sm text-gray-300 hover:text-white flex items-center gap-1">
          Explore More <FontAwesomeIcon icon={faArrowDown} />
        </a>
      </div>
      
    </section>
  );
}