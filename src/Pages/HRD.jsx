import React from 'react';

export default function HRD() {
  return (
    <div className="min-h-screen bg-[var(--main-blue)] text-white pt-32 pb-16 px-4 sm:px-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--orange)]">
          Human Resource Development
        </h1>
        <p className="mt-4 text-lg text-white/80 max-w-2xl">
          The HRD division is dedicated to the growth and well-being of every ROBOTIIK member. We manage recruitment, training, and ensure a supportive and productive environment.
        </p>

        <div className="w-full h-px bg-white/20 my-10"></div>

        <h2 className="text-3xl font-display font-bold mb-4">Our Responsibilities</h2>
        <ul className="list-disc list-inside space-y-2 text-white/90">
          <li>Organizing the recruitment process for new members.</li>
          <li>Developing and implementing training programs for soft skills and hard skills.</li>
          <li>Monitoring member performance and engagement.</li>
          <li>Fostering a positive and collaborative organizational culture.</li>
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