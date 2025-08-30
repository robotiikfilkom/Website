import React from 'react';

export default function GeneralAffair() {
  return (
    <div className="min-h-screen bg-[var(--main-blue)] text-white pt-32 pb-16 px-4 sm:px-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--orange)]">
          General Affair
        </h1>
        <p className="mt-4 text-lg text-white/80 max-w-2xl">
          The General Affair division is the backbone of ROBOTIIK's operations. We handle administration, finance, and logistics to ensure every activity runs smoothly and efficiently.
        </p>

        <div className="w-full h-px bg-white/20 my-10"></div>

        <h2 className="text-3xl font-display font-bold mb-4">Our Responsibilities</h2>
        <ul className="list-disc list-inside space-y-2 text-white/90">
          <li>Managing organizational archives, correspondence, and documentation.</li>
          <li>Overseeing budget planning, financial reporting, and cash flow.</li>
          <li>Procuring, managing, and inventorying all necessary equipment and supplies.</li>
          <li>Providing essential facilities and support for all events.</li>
        </ul>

        <div className="w-full h-px bg-white/20 my-10"></div>

        <h2 className="text-3xl font-display font-bold mb-4">Meet the Team</h2>
        <div className="p-6 bg-white/10 rounded-lg text-center">
          <p className="text-white/70">Team member profiles will be displayed here soon.</p>
        </div>
      </main>
    </div>
  );
}