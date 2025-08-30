import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import humanoidImage from "../../assets/img/humanoid.jpg"; 

const divisionCardData = [
  {
    id: 1,
    title: "Humanoid",
    desc: "Focuses on bipedal locomotion and human-robot interaction.",
    image: humanoidImage,
    link: "/division/humanoid",
    widthClass: "md:w-3/5",
  },
  {
    id: 2,
    title: "Amarine",
    desc: "Dives into the world of underwater and surface robotics.",
    image: "https://via.placeholder.com/400x400/2196F3/FFFFFF?Text=Amarine",
    link: "/division/amarine",
    widthClass: "md:w-2/5",
  },
  {
    id: 3,
    title: "R & D",
    desc: "Explores new technologies and develops foundational systems.",
    image: "https://via.placeholder.com/400x400/4CAF50/FFFFFF?Text=R&D",
    link: "/division/rnd",
    widthClass: "md:w-2/5",
  },
  {
    id: 4,
    title: "Quadcopter",
    desc: "Takes robotics to the skies with Unmanned Aerial Vehicles.",
    image: "https://via.placeholder.com/600x400/FFC107/000000?Text=Quadcopter",
    link: "/division/quadcopter",
    widthClass: "md:w-3/5",
  },
];

const DivisionCard = ({ item }) => {
  return (
    <Link
      to={item.link}
      className={`relative rounded-2xl overflow-hidden shadow-lg h-64 flex items-end group cursor-pointer transform transition-all duration-300 hover:scale-105 ${item.widthClass}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover z-10 brightness-90 transition-all duration-500 group-hover:brightness-75 group-hover:scale-110"
      />
      <div className="absolute top-4 right-4 z-30">
        <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center border border-[var(--white)] transition-all duration-300 group-hover:-rotate-45 group-hover:bg-[var(--white)]">
          <FontAwesomeIcon
            icon={faArrowRight}
            className="w-5 h-5 text-[var(--white)] transition-colors duration-300 group-hover:text-[var(--black)]"
          />
        </div>
      </div>
      <div className="relative z-20 p-4 w-full flex flex-col justify-end h-full">
        <div className="absolute inset-x-2 bottom-2 h-28 bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-xl border border-white/20"></div>
        <div className="flex flex-col z-20 transition-all duration-300 gap-0 group-hover:gap-1">
          <h3 className="text-[var(--white)] text-2xl md:text-3xl font-bold drop-shadow-lg font-display transition-all duration-300 mb-2 group-hover:mb-0">
            {item.title}
          </h3>
          <p className="text-[var(--white)] text-base font-sans opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-full transition-all duration-300 leading-relaxed">
            {item.desc}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default function TechnicalDivision() {
  return (
    <section className="bg-[var(--cream)] py-10 px-12">
      <div className="w-full mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-16 md:mb-20">
          <div className="w-full space-y-4">
            <h3 className="text-sm font-bold font-glancyr uppercase tracking-widest text-[var(--black)]">
              [Technical Division]
            </h3>
            <p className="text-2xl font-bold font-display leading-snug text-[var(--black)]">
              The core pillars of technological development at ROBOTIIK
              technical divisions driving innovation in the world of robotics.
            </p>
          </div>
          <div className="w-full md:w-3/4 lg:w-1/2">
            <p className="text-base md:text-lg text-[var(--black)] max-w-lg font-glancyr leading-relaxed">
              Explore diverse technical divisions that push boundaries, sharpen
              skills, and open new opportunities through collaboration and
              technological development.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row w-full gap-6">
            <DivisionCard item={divisionCardData[0]} />
            <DivisionCard item={divisionCardData[1]} />
          </div>
            <div className="flex flex-col sm:flex-row w-full gap-6">
            <DivisionCard item={divisionCardData[2]} />
            <DivisionCard item={divisionCardData[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}
