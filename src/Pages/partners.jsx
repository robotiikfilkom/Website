import React from 'react';
import PartnersStats from '../components/Partners/Partnerstat';
import PartnerCard from '../components/Partners/PartnerCard';
import partnersData from '../components/Partners/Partnerdata';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function PartnersPage() {
  const googleFormUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLSeiDqLYkDcDVdCoPHa742eLS9SEbYBx9YLUFB6KyhDCRhyaQw/viewform?usp=sf_link';

  return (
    <div className="min-h-screen flex flex-col bg-[var(--main-blue)] text-[var(--white)] font-sans relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute w-40 h-40 bg-[var(--blue)] opacity-20 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-32 h-32 bg-[var(--blue)] opacity-20 blur-2xl rounded-full top-1/3 right-10"></div>
      <div className="absolute w-24 h-24 bg-[var(--blue)] opacity-10 blur-2xl rounded-full bottom-1/4 left-1/4"></div>
      <div className="absolute w-28 h-28 bg-[var(--blue)] opacity-10 blur-2xl rounded-full bottom-10 right-1/3"></div>

      {/* Header */}
      <header className="px-4 sm:px-6 md:px-8 lg:px-16 pt-24 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--white)] font-display">
          Our Partners
        </h1>
      </header>

      {/* Why Choose */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div className="text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-[var(--white)] font-display">
            Why
            <br />
            choose
            <br />
            ROBOTIIK!
          </h2>
        </div>
        <div className="lg:col-span-2 space-y-8">
          <p className="text-[var(--white)]/80 text-base md:text-lg">
            ROBOTIIK provides real benefits to sponsors by reaching students and the community through educational activities, competitions, and social media. Your support will help develop robotics technology while also being an effective and positive promotional tool.
          </p>
          <PartnersStats />
        </div>
      </section>

      {/* Partners */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 gap-6 max-w-7xl mx-auto">
          {partnersData.map((item, i) => (
            <PartnerCard key={i} {...item} />
          ))}
        </div>
      </section>

      {/* Become a Partner */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-20 flex flex-col lg:flex-row gap-12 items-start">
        <div className="lg:w-1/3 text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-[var(--white)] font-display">
            BECOME
            <br />
            A PARTNER
          </h2>
        </div>

        <a
          href={googleFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="lg:w-2/3 w-full space-y-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg p-8 text-center lg:text-left hover:border-white/60 hover:bg-white/20 transition-all duration-300 group"
        >
          <h3 className="text-2xl font-bold text-white">
            Fill Out Our Partnership Form
          </h3>
          <p className="text-white/70">
            Interested in becoming a partner? Click here to open our official partnership form.
          </p>
          <div className="font-semibold text-[var(--orange)] text-lg group-hover:underline">
            Open Partnership Form
          </div>
          <div className="flex justify-center lg:justify-end pt-4">
            <div className="bg-[var(--white)] text-[var(--main-blue)] font-bold px-8 py-3 rounded-full transition text-lg flex items-center gap-2">
              Open Form
              <FontAwesomeIcon icon={faArrowRight} className="text-base" />
            </div>
          </div>
        </a>
      </section>
    </div>
  );
}
