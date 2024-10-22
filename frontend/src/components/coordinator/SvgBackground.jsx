import React from 'react';
import '../SVGBackground.css'; // Create this CSS file

const SVGBackground = () => {
  return (
    <svg className="svg-background" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#6366f1" d="M37.2,-59.2C50.7,-49.1,65.9,-43.1,76.1,-31.6C86.3,-20.1,91.4,-3.1,86.7,10.7C82,24.6,67.6,35.3,55.8,47.5C44,59.7,34.8,73.5,22.3,78C9.9,82.6,-5.8,78,-20.7,72.6C-35.5,67.3,-49.5,61.1,-59.9,50.9C-70.4,40.7,-77.3,26.4,-79.1,11.6C-80.9,-3.2,-77.5,-18.6,-70.3,-31.2C-63.1,-43.8,-52,-53.7,-39.6,-64.3C-27.2,-74.9,-13.6,-86.2,-0.9,-84.8C11.8,-83.4,23.6,-69.3,37.2,-59.2Z" transform="translate(100 100)" />
    </svg>
  );
};

export default SVGBackground;
