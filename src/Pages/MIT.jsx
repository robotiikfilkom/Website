import React from 'react';

export default function MIT() {
  return (
    <div className="min-h-screen bg-[var(--main-blue)] text-white pt-32 pb-16 px-4 sm:px-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--orange)]">
          Media, Information & Technology
        </h1>
        <p className="mt-4 text-lg text-white/80 max-w-2xl">
          The MIT division is the voice and face of ROBOTIIK. We manage our online presence, create engaging content, and handle all public communications to build our brand.
        </p>

        <div className="w-full h-px bg-white/20 my-10"></div>

        <h2 className="text-3xl font-display font-bold mb-4">Our Responsibilities</h2>
        <ul className="list-disc list-inside space-y-2 text-white/90">
          <li>Managing all official social media accounts.</li>
          <li>Producing creative content such as photos, videos, and graphic designs.</li>
          <li>Disseminating information about achievements, events, and open recruitment.</li>
          <li>Maintaining and developing the official ROBOTIIK website.</li>
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