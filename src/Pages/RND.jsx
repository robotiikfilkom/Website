import React from 'react';

export default function RND() {
  return (
    <div className="min-h-screen bg-[var(--main-blue)] text-white pt-32 pb-16 px-4 sm:px-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--orange)]">
          Research & Development
        </h1>
        <p className="mt-4 text-lg text-white/80 max-w-2xl">
          R&D is the heart of innovation at ROBOTIIK. We explore new technologies, conduct research, and develop the foundational hardware and software that power our robots.
        </p>

        <div className="w-full h-px bg-white/20 my-10"></div>

        <h2 className="text-3xl font-display font-bold mb-4">Our Focus Areas</h2>
        <ul className="list-disc list-inside space-y-2 text-white/90">
          <li>Algorithm development for navigation and control systems.</li>
          <li>Research on new sensors, actuators, and embedded systems.</li>
          <li>Prototyping and testing new mechanical and electronic designs.</li>
          <li>Keeping the team updated with the latest technological advancements.</li>
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