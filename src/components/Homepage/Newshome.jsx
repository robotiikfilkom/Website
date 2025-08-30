import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// Placeholder untuk gambar Anda (bisa diganti dengan gambar berita)
import robot1 from "../../assets/img/humanoid.jpg";
import robot2 from "../../assets/img/logo.png";
import robot3 from "../../assets/img/logo.png";
import robot4 from "../../assets/img/logo.png";

const newsData = [
  {
    id: 1,
    src: robot1,
    title: "New Sensor Integration",
    desc: "Exploring the latest in sensor technology for our robots.",
    link: "/news/1",
  },
  {
    id: 2,
    src: robot2,
    title: "Competition Prep",
    desc: "Our teams are gearing up for the national competition.",
    link: "/news/2",
  },
  {
    id: 3,
    src: robot3,
    title: "AI Workshop",
    desc: "Hosting a workshop on machine learning for robotics.",
    link: "/news/3",
  },
  {
    id: 4,
    src: robot4,
    title: "Community Outreach",
    desc: "Showcasing our projects at the local science fair.",
    link: "/news/4",
  },
  {
    id: 5,
    src: robot1,
    title: "New Partnership",
    desc: "Collaborating with industry leaders on new research.",
    link: "/news/5",
  },
];

const NewsCard = ({ item }) => {
  return (
    <Link
      to={item.link}
      className="relative flex-shrink-0 w-96 h-[500px] max-w-xl aspect-video rounded-3xl p-3 group cursor-pointer transform transition-all duration-300 hover:scale-105"
    >
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        <img
          src={item.src}
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
            <h3 className="text-[var(--white)] text-2xl font-bold drop-shadow-lg font-display transition-all duration-300 mb-2 group-hover:mb-0">
              {item.title}
            </h3>
            <p className="text-[var(--white)] text-base font-sans opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-full transition-all duration-300 leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function Newshome() {
  return (
    <section className="bg-[var(--cream)] text-[var(--black)] py-10 px-12">
      {/* Bagian Teks Pengantar */}
      <div className="w-full mx-auto mb-10">
        {/* PERBAIKAN UTAMA DI SINI: Membuat layout 2 kolom */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          
          {/* Kolom Kiri */}
          <div className="w-full space-y-8">
            <h2 className="text-xl font-bold font-display uppercase tracking-wider text-[var(--black)]">
              What's New in Robotics...
            </h2>
            <p className="text-4xl lg:text-5xl font-sans text-[var(--black)] leading-tight">
              Stay ahead with exclusive insights on robotics trends, research,
              and innovation.
            </p>
          </div>

          {/* Kolom Kanan */}
          <div className="w-1/2 pt-16">
            <p className="text-base text-[var(--black)] font-sans leading-relaxed">
              Whether you're seeking hands-on innovation, collaborative
              engineering projects, or an inspiring tech driven
              environment ROBOTIIK has the perfect place for you to grow.
            </p>
          </div>
        </div>
      </div>

      {/* Bagian Slider Berita (tidak diubah) */}
      <div className="w-full overflow-x-auto custom-scrollbar">
        <div className="flex pb-4 snap-x snap-mandatory">
          <div className="flex-shrink-0 w-4 h-20 snap-center"></div>
          {newsData.map((item, index) => (
            <NewsCard key={index} item={item} />
          ))}
          <div className="flex-shrink-0 w-4 snap-center"></div>
        </div>
      </div>
    </section>
  );
}