import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function AchievementCard({ item, layoutClass }) {
  if (!item || !item.id) return null;

  const isExternalLink = item.link && (item.link.startsWith('http://') || item.link.startsWith('https://'));

  const CardComponent = isExternalLink ? 'a' : Link;
  const linkProps = isExternalLink 
    ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' } 
    : { to: item.link || '#' };

  return (
    <CardComponent
      {...linkProps}
      className={`relative rounded-2xl overflow-hidden shadow-lg min-h-[220px] flex items-end group cursor-pointer transform transition-all duration-300 hover:scale-105 ${layoutClass}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover z-10 brightness-90 transition-all duration-500 group-hover:brightness-75 group-hover:scale-110"
      />
      
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent z-20"></div>

      <div className="absolute top-4 right-4 z-40">
        <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center border border-[var(--white)] transition-all duration-300 group-hover:-rotate-45 group-hover:bg-[var(--white)]">
          <FontAwesomeIcon
            icon={faArrowRight}
            className="w-5 h-5 text-[var(--white)] transition-colors duration-300 group-hover:text-[var(--black)]"
          />
        </div>
      </div>

      <div className="relative z-30 p-4 w-full">
        <div className="transition-opacity duration-300 group-hover:opacity-0">
          <h3 className="text-[var(--white)] text-2xl md:text-3xl font-bold font-display drop-shadow-lg break-words">
            {item.title}
          </h3>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="relative bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl border border-white/20 p-4">
            <div className="flex flex-col gap-0 group-hover:gap-1">
              <h3 className="text-[var(--white)] text-xl md:text-2xl font-bold drop-shadow-lg font-display transition-all duration-300">
                {item.title}
              </h3>
              <p className="text-[var(--white)] text-sm md:text-base font-sans opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-full transition-all duration-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </CardComponent>
  );
}