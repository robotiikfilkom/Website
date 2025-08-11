import React from 'react';
import RandomNumber from './Randomnumber';

export default function PartnersStats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
      <div className="bg-[var(--white)] text-[var(--main-blue)] p-4 rounded-xl">
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold">
          <RandomNumber n={95} />%
        </div>
        <div className="text-sm mt-1">Achievement</div>
      </div>

      <div className="bg-[var(--white)] text-[var(--main-blue)] p-4 rounded-xl">
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold">
          <RandomNumber n={72} />+
        </div>
        <div className="text-sm mt-1">Engagement</div>
      </div>

      <div className="bg-[var(--white)] text-[var(--main-blue)] p-4 rounded-xl col-span-2 sm:col-span-1">
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold">
          <RandomNumber n={250} />+
        </div>
        <div className="text-sm mt-1">Member</div>
      </div>
    </div>
  );
}
