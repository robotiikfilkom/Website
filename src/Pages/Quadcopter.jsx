import React from 'react';

export default function Quadcopter() {
  return (
    <div className="min-h-screen bg-[var(--main-blue)] text-white pt-32 pb-16 px-4 sm:px-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--orange)]">
          Quadcopter Division
        </h1>
        <p className="mt-4 text-lg text-white/80 max-w-2xl">
          Taking robotics to the skies, the Quadcopter division focuses on the development of Unmanned Aerial Vehicles (UAVs). We work on flight control, autonomous navigation, and aerial task execution.
        </p>

        <div className="w-full h-px bg-white/20 my-10"></div>

        <h2 className="text-3xl font-display font-bold mb-4">Our Projects</h2>
        <ul className="list-disc list-inside space-y-2 text-white/90">
          <li>Building custom quadcopters from scratch.</li>
          <li>Programming autonomous flight paths using GPS and computer vision.</li>
          <li>Developing systems for aerial photography and object detection.</li>
          <li>Competing in national and international drone competitions.</li>
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