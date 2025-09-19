import React from "react";
import { TopImage, BottomImage } from "../components/About/aboutimg";
import VisionMission from "../components/About/aboutvismis";
import AboutUs from "../components/About/aboutus";

export default function About() {
  return (
    <div className="bg-[var(--cream)] leading-relaxed">
      <TopImage />
      <BottomImage />
      <div className="space-y-8 text-[var(--black)]">
        <AboutUs titleClass="text-xl font-bold font-glancyr" />
        <VisionMission titleClass="text-xl font-bold font-glancyr" />
      </div>
    </div>
  );
}
