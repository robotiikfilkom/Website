import React from "react";
import orgStructure from "/src/assets/img/Organizational Structure.png";
import struktur from "/src/assets/img/Struktur-Robotiik.png";

export const TopImage = () => {
  return (
    <div className="flex justify-center pt-24 pb-4">
      <img
        src={orgStructure}
        alt="Organizational Structure"
        className="w-120 h-20 rounded-lg "
      />
    </div>
  );
};

export const BottomImage = () => {
  return (
    <div className="flex justify-center pt-4 pb-8">
      <img
        src={struktur}
        alt="Structure Robotik"
        className="w-300 h-500 rounded-lg "
      />
    </div>
  );
};