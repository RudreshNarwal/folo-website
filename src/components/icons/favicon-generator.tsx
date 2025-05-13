import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Create a favicon-optimized version of the Folo logo
const FaviconSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="100"
    height="100"
  >
    <circle cx="50" cy="50" r="46" fill="#005BC0" stroke="#005BC0" strokeWidth="4" />
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize="40"
      fontWeight="bold"
      fill="white"
      fontFamily="Geist, Arial, sans-serif"
    >
      folo
    </text>
  </svg>
);

// This function can be used to generate the favicon SVG markup
export function generateFaviconSVG() {
  return renderToStaticMarkup(<FaviconSVG />);
}

// Usage:
// 1. Run this in a Node.js script to generate the SVG
// 2. Save the output to a file
// 3. Convert to .ico and various PNG sizes using a tool like https://realfavicongenerator.net/ 