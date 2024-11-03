import React from "react";
import { VscArrowDown } from "react-icons/vsc";

function ScrollButton({ isDarkBackground, handleButtonClick, rotationDegree }) {
  return (
    <div
      className={`w-14 aspect-square fixed bottom-10 right-10 rounded-full z-50 flex items-center justify-center cursor-pointer border-2  ${
        !isDarkBackground
          ? "border-black text-black"
          : "border-white text-white"
      }`}
      style={{ transform: `rotate(${rotationDegree}deg)` }}
      onClick={handleButtonClick}
    >
      <VscArrowDown size={24} />
    </div>
  );
}

export default ScrollButton;
