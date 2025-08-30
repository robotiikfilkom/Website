import React from 'react';

export default function Amarine() {
  return (
    <div className="min-h-screen bg-[var(--main-blue)] text-white pt-32 pb-16 px-4 sm:px-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--orange)]">
          Amarine Division
        </h1>
        <p className="mt-4 text-lg text-white/80 max-w-2xl">
          The Amarine (Aquatic Marine) division dives into the world of underwater and surface robotics. We build autonomous vessels designed to navigate and perform tasks in aquatic environments.
        </p>

        <div className="w-full h-px bg-white/20 my-10"></div>

        <h2 className="text-3xl font-display font-bold mb-4">Our Projects</h2>
        <ul className="list-disc list-inside space-y-2 text-white/90">
          <li>Designing Autonomous Underwater Vehicles (AUVs).</li>
          <li>Building remote-controlled surface vessels for specific tasks.</li>
          <li>Developing waterproofing techniques for electronics.</li>
          <li>Implementing sonar and sensor systems for underwater navigation.</li>
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