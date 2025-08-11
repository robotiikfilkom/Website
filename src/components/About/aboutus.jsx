import React from "react";

const AboutUs = () => {
  return (
    <section className="w-full px-6 pt-8 pb-6">
      <div className="flex items-start gap-6">
        {/* About Us Title */}
        <h2 className="text-lg font-bold whitespace-nowrap">[About Us]</h2>

        {/* About Us Text */}
        <div className="space-y-4 text-justify leading-relaxed font-bold">
          <p>
            ROBOTIK, an abbreviation of Robotics Faculty of Computer Science, Brawijaya University,
            is a Semi-Autonomous Institution (LSO) that functions as a research center for students in
            the Faculty of Computer Science (FILKOM) Brawijaya University. Officially established in Malang
            on November 14, 2012, ROBOTIK operates directly under the Robotics and Embedded Systems Laboratory (RES).
            This institution is dedicated to being the main forum for students who have a deep interest
            and passion for hardware engineering and intelligent systems.
          </p>
          <p>
            As a student organization, ROBOTIK was founded on the principle of Tridharma Perguruan Tinggi,
            which includes education, research, and community service. All of its activities are guided by
            the Heuristic principle, which prioritizes an exploratory and innovative approach in all
            technological developments. ROBOTIK actively focuses its research on robot development to
            include routine training programs, collaborative research projects, mentoring for new members,
            and community service initiatives that apply robotics and Internet of Things (IoT) technology
            for the benefit of the wider community.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
