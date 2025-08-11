import React from "react";
import { TopImage, BottomImage } from "../components/About/aboutimg";
import VisionMission from "../components/About/aboutvismis";
import AboutUs from "../components/About/aboutus";

export default function About() {
  return (
    <div className="bg-[#f0e9cd] text-black text-xl leading-relaxed">
      <TopImage />
      <BottomImage />
      <div className="space-y-8">
        <AboutUs titleClass="text-xl font-bold" />
        <VisionMission titleClass="text-xl font-bold" />
      </div>
    </div>
  );
}
