import React from 'react';
import Logo from './assets/Logo.png';

function Loading() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      {/* Logo */}
      <img 
        src={Logo} 
        alt="Logo" 
        className="aspect-square w-72 mb-4" 
      />
      {/* <div className="w-20 h-20 bg-center bg-cover" style={{ backgroundImage: `url('./Logo.png')` }}></div> */}

      
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800">T&P FTE</h1>
      
      {/* Subtitle */}
      <h2 className="text-2xl text-gray-600 mt-2">भविष्यनिर्माणे समर्थता</h2>
    </div>
  );
}

export default Loading;
