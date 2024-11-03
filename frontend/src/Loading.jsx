import React from "react";
import Logo from "./assets/Logo3.png";

function Loading() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      {/* Wrapper Div for Logo with Background Circle and Shine Effect */}
      <div className="relative flex items-center justify-center">
        {/* Centered Circle */}
        <div className="circle-bg-shine w-48 aspect-square bg-indigo-500 rounded-full absolute"></div>
        
        {/* Centered Image */}
        <img
          src={Logo}
          alt="Logo"
          className="w-72 aspect-square relative z-10"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800">T&P FTE</h1>

      {/* Subtitle */}
      <h2 className="text-2xl text-gray-600 mt-2">भविष्यनिर्माणे समर्थता</h2>
    </div>
  );
}

export default Loading;
