// src/components/icons/folo-logo.tsx
import React, { SVGProps } from 'react';

export const FoloLogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="1em" // Default size, can be overridden by className or style
    height="1em"
    {...props}
  >
    <circle cx="50" cy="50" r="46" fill="hsl(var(--primary-foreground))" stroke="hsl(var(--primary))" strokeWidth="4" />
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize="40"
      fontWeight="bold"
      fill="hsl(var(--primary))"
      fontFamily="Geist, sans-serif" // Match the primary font if desired
    >
      folo
    </text>
  </svg>
);
