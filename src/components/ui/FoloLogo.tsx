'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type FoloLogoProps = {
  size?: 'small' | 'default' | 'large';
};

const FoloLogo: React.FC<FoloLogoProps> = ({ size = 'default' }) => {
  const sizeClasses = {
    small: 'w-10 h-10',
    default: 'w-16 h-16',
    large: 'w-32 h-32'
  };
  
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
      className={sizeClasses[size]}
    >
      {/* Background Circle */}
      <circle cx="100" cy="100" r="95" fill="white"/>
      {/* Outer Ring */}
      <circle cx="100" cy="100" r="90" fill="none" stroke="#007AFF" strokeWidth="10"/>

      {/* Text "folo" */}
      <text
         x="50%"
         y="46%" 
         fontFamily="'Open Sans', Arial, sans-serif"
         fontSize="72" 
         fontWeight="700"
         fill="#007AFF"
         textAnchor="middle"
         dominantBaseline="central"> 
         folo
      </text>

      {/* Text "MONEY" */}
      <text
         x="50%"
         y="68%" 
         fontFamily="'Open Sans', Arial, sans-serif"
         fontSize="22" 
         fontWeight="400" 
         fill="#007AFF"
         textAnchor="middle"
         letterSpacing="1.5" 
         dominantBaseline="central">
         MONEY
      </text>
    </svg>
  );
};

export default FoloLogo; 