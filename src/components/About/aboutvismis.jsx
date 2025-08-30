import React from "react";

const missionList = [
  "To enhance member capabilities through intensive training and skill development based on the latest technologies.",
  "To establish an ecosystem that supports inter-division collaboration in every project and competition to produce innovative solutions.",
  "To foster an organizational culture focused on sustainability and transparency in the management of resources, including funding and facilities.",
  "To focus on member achievement by providing full support in robotics competitions at local, national, and international levels, while ensuring that every member has the opportunity to develop their potential and earn recognition.",
  "Optimizing the use of social media and publications to introduce the achievements, innovations, and contributions of ROBOTIIK to the wider community.",
  "Establishing cooperation with various external parties, including educational institutions, industries, and communities, to increase influence and social impact."
];

const VisionMission = () => {
  return (
    <>
      <section className="w-full px-6 pt-4 pb-4">
        <h2 className="text-3xl font-bold text-center mb-4">Vision</h2>
        <div className="border-b-4 border-black w-11/12 mx-auto mt-1 mb-6"></div>
        <div className="bg-white rounded-lg shadow-[0_6px_10px_rgba(0,0,0,0.25)] p-6 max-w-3xl mx-auto text-center leading-relaxed font-bold text-lg">
          To establish ROBOTIK as a leading institution in the field of robotics and embedded systems,
          capable of producing high-quality individuals who excel and make meaningful contributions to society.
        </div>
      </section>

      <section className="w-full px-4 md:px-8 pt-4 pb-12"> 
        <h2 className="text-3xl font-bold text-center mb-4">Mission</h2>
        <div className="border-b-4 border-black w-11/12 mx-auto mt-1 mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-lg">
          {missionList.map((text, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-[0_6px_10px_rgba(0,0,0,0.25)] p-6 flex items-center justify-center text-center leading-relaxed min-h-[150px] font-bold"
            >
              {text}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default VisionMission;
