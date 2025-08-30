import React from 'react';

export default function Humanoid() {
  return (
    <div className="min-h-screen bg-[var(--main-blue)] text-white pt-32 pb-16 px-4 sm:px-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--orange)]">
          Humanoid Division
        </h1>
        <p className="mt-4 text-lg text-white/80 max-w-2xl">
          This division specializes in the design, construction, and programming of humanoid robots. We focus on challenges like bipedal locomotion, object manipulation, and human-robot interaction.
        </p>

        <div className="w-full h-px bg-white/20 my-10"></div>

        <h2 className="text-3xl font-display font-bold mb-4">Our Projects</h2>
        <ul className="list-disc list-inside space-y-2 text-white/90">
          <li>Developing soccer-playing robots for RoboCup competitions.</li>
          <li>Implementing computer vision for object recognition.</li>
          <li>Designing stable walking and balancing algorithms.</li>
          <li>Building custom mechanical parts and electronic circuits.</li>
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