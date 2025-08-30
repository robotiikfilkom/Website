import React from 'react';

export default function Executive() {
  return (
    <div className="min-h-screen bg-[var(--main-blue)] text-white pt-32 pb-16 px-4 sm:px-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--orange)]">
          Executive Board
        </h1>
        <p className="mt-4 text-lg text-white/80 max-w-2xl">
          The Executive Board is the core of ROBOTIIK, responsible for setting the vision, making strategic decisions, and ensuring all divisions work in synergy towards a common goal.
        </p>

        <div className="w-full h-px bg-white/20 my-10"></div>

        <h2 className="text-3xl font-display font-bold mb-4">Our Responsibilities</h2>
        <ul className="list-disc list-inside space-y-2 text-white/90">
          <li>Defining the organization's long-term vision and mission.</li>
          <li>Overseeing and coordinating all divisional activities.</li>
          <li>Managing external relations with the faculty, university, and sponsors.</li>
          <li>Ensuring organizational health and sustainability.</li>
        </ul>

        <div className="w-full h-px bg-white/20 my-10"></div>

        <h2 className="text-3xl font-display font-bold mb-4">Meet the Team</h2>
        <div className="p-6 bg-white/10 rounded-lg text-center">
          <p className="text-white/70">Team member profiles will be displayed here soon.</p>
          {/* Anda bisa me-render kartu profil anggota di sini */}
        </div>
      </main>
    </div>
  );
}