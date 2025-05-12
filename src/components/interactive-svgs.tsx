// src/components/interactive-svgs.tsx
'use client';
import React, { SVGProps } from 'react';

export const InteractiveAppShowcaseSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 300 450" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="app-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--secondary))', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    {/* Phone Body */}
    <rect x="10" y="10" width="280" height="430" rx="30" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
    <rect x="25" y="25" width="250" height="380" rx="15" fill="url(#app-gradient)" />

    {/* Screen Content Mockup */}
    <rect x="40" y="40" width="220" height="50" rx="8" fill="hsl(var(--card-foreground))" opacity="0.1" />
    <circle cx="60" cy="65" r="12" fill="hsl(var(--accent))" />
    <rect x="85" y="55" width="100" height="8" rx="4" fill="hsl(var(--primary-foreground))" opacity="0.6" />
    <rect x="85" y="70" width="70" height="6" rx="3" fill="hsl(var(--primary-foreground))" opacity="0.4" />

    {/* Balance Card */}
    <rect x="40" y="100" width="220" height="80" rx="10" fill="hsl(var(--background))" opacity="0.8" className="transition-transform duration-300 hover:scale-105" style={{filter: "url(#glow)"}}>
      <animateTransform attributeName="transform" type="translate" values="0 0; 0 -5; 0 0" dur="3s" repeatCount="indefinite"/>
    </rect>
    <text x="55" y="130" fontFamily="Geist, sans-serif" fontSize="16" fill="hsl(var(--foreground))" fontWeight="bold">$1,234.56</text>
    <text x="55" y="155" fontFamily="Geist, sans-serif" fontSize="10" fill="hsl(var(--muted-foreground))">Available Balance</text>
    <circle cx="230" cy="120" r="10" fill="hsl(var(--accent))" />
    <line x1="227" y1="117" x2="233" y2="123" stroke="hsl(var(--accent-foreground))" strokeWidth="2" />
    <line x1="227" y1="123" x2="233" y2="117" stroke="hsl(var(--accent-foreground))" strokeWidth="2" />


    {/* Transaction List Mockup */}
    {[0, 1, 2, 3].map(i => (
      <g key={i} className="opacity-75 hover:opacity-100 transition-opacity duration-200">
        <rect x="40" y={190 + i * 55} width="220" height="45" rx="8" fill="hsl(var(--background))" opacity="0.5" />
        <circle cx="60" cy={190 + i * 55 + 22.5} r="10" fill={i % 2 === 0 ? "hsl(var(--primary))" : "hsl(var(--secondary))"} />
        <rect x="80" y={190 + i * 55 + 12} width="100" height="6" rx="3" fill="hsl(var(--foreground))" opacity="0.7" />
        <rect x="80" y={190 + i * 55 + 25} width="60" height="4" rx="2" fill="hsl(var(--muted-foreground))" opacity="0.5" />
        <rect x="190" y={190 + i * 55 + 15} width="50" height="15" rx="4" fill="hsl(var(--foreground))" opacity="0.7" />
         <animate attributeName="opacity" values="0.5;1;0.5" dur={`${2 + i*0.5}s`} repeatCount="indefinite" />
      </g>
    ))}

    {/* Bottom Nav Bar */}
    <rect x="25" y="365" width="250" height="40" fill="hsl(var(--card))" />
    {[0,1,2,3].map(i => (
       <circle key={i} cx={60 + i * (250-60-30)/3} cy="385" r="8" fill="hsl(var(--muted-foreground))" opacity="0.3" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer">
         <animateMotion path={`M0,0 C5,${i%2===0?5:-5} 10,${i%2===0?-5:5} 15,0 Z`} begin={`${i*0.2}s`} dur="2s" repeatCount="indefinite" />
       </circle>
    ))}

    {/* Notch */}
    <rect x="120" y="10" width="60" height="20" rx="10" fill="hsl(var(--card))" />
    <circle cx="130" cy="20" r="3" fill="hsl(var(--border))" />
  </svg>
);

export const InteractiveCreditScoreSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="credit-bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--secondary))', stopOpacity: 0.1 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.2 }} />
      </linearGradient>
       <filter id="subtle-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <rect width="300" height="300" rx="20" fill="url(#credit-bg-gradient)" />

    {/* Score Circle */}
    <circle cx="150" cy="130" r="80" fill="hsl(var(--card))" stroke="hsl(var(--secondary))" strokeWidth="5" style={{filter: "url(#subtle-glow)"}}/>
    <circle cx="150" cy="130" r="70" fill="none" stroke="hsl(var(--border))" strokeWidth="8" strokeDasharray="440" strokeDashoffset="0" />
    <circle cx="150" cy="130" r="70" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" strokeDasharray="440" strokeDashoffset="110" strokeLinecap="round">
      <animate attributeName="stroke-dashoffset" from="440" to="110" dur="2s" fill="freeze" />
    </circle>
    <text x="150" y="130" textAnchor="middle" dy=".3em" fontFamily="Geist, sans-serif" fontSize="40" fontWeight="bold" fill="hsl(var(--secondary))">750</text>
    <text x="150" y="160" textAnchor="middle" fontFamily="Geist, sans-serif" fontSize="12" fill="hsl(var(--muted-foreground))">Good</text>

    {/* Factors */}
    {[
      { label: "Payment History", value: "Excellent", y: 230, color: "hsl(var(--primary))" },
      { label: "Credit Utilization", value: "Good", y: 255, color: "hsl(var(--accent))"  },
      { label: "New Credit", value: "Fair", y: 280, color: "hsl(var(--muted-foreground))"  },
    ].map((factor, i) => (
      <g key={factor.label} className="opacity-0" style={{animation: `fadeInUp 0.5s ease-out ${0.5 + i * 0.2}s forwards`}}>
        <rect x="30" y={factor.y -12} width="240" height="20" rx="5" fill="hsl(var(--card))" opacity="0.7" />
        <text x="40" y={factor.y} fontFamily="Geist, sans-serif" fontSize="10" fill="hsl(var(--foreground))">{factor.label}</text>
        <text x="260" y={factor.y} textAnchor="end" fontFamily="Geist, sans-serif" fontSize="10" fill={factor.color} fontWeight="medium">{factor.value}</text>
        <rect x="150" y={factor.y-5} width={ (factor.value === "Excellent" ? 100 : factor.value === "Good" ? 70 : 40) } height="4" rx="2" fill={factor.color} />
      </g>
    ))}
    <style>{`
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  </svg>
);

export const InteractiveGlobalTransferSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="transfer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.2 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.3 }} />
      </linearGradient>
    </defs>
    <rect width="300" height="300" rx="20" fill="url(#transfer-gradient)" />

    {/* Globe */}
    <circle cx="150" cy="150" r="100" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
    <path d="M150,50 A100,100 0 0,1 150,250" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d="M50,150 A100,100 0 0,1 250,150" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d="M80,80 A110,110 0 0,1 220,220" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" opacity="0.3" />
    <path d="M80,220 A110,110 0 0,0 220,80" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" opacity="0.3" />
    <circle cx="150" cy="150" r="90" fill="hsl(var(--accent))" opacity="0.1" className="animate-pulse-slow"/>

    {/* Transfer Path */}
    <path id="transferPath" d="M90,120 Q150,70 210,120" stroke="hsl(var(--accent))" strokeWidth="3" fill="none" strokeDasharray="5 5" strokeLinecap="round">
        <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
    </path>
    <circle fill="hsl(var(--accent))" r="5">
      <animateMotion dur="3s" repeatCount="indefinite" path="M90,120 Q150,70 210,120" />
    </circle>

     <path id="transferPath2" d="M95,180 Q150,230 205,180" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" strokeDasharray="5 5" strokeLinecap="round">
        <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1.2s" repeatCount="indefinite" />
    </path>
    <circle fill="hsl(var(--primary))" r="5">
      <animateMotion dur="3.5s" repeatCount="indefinite" path="M95,180 Q150,230 205,180" begin="0.5s" />
    </circle>

    {/* Country Pins */}
    {[
      { cx: 90, cy: 120, label: "🇺🇸" },
      { cx: 210, cy: 120, label: "🇪🇺" },
      { cx: 95, cy: 180, label: "🇰🇪" },
      { cx: 205, cy: 180, label: "🇨🇦" },
      { cx: 150, cy: 90, label: "🇬🇧" },
    ].map((pin, i) => (
      <g key={i} className="opacity-0" style={{animation: `fadeInPin 0.5s ease-out ${0.2 + i * 0.15}s forwards`}}>
        <circle cx={pin.cx} cy={pin.cy} r="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <text x={pin.cx} y={pin.cy} dy=".35em" textAnchor="middle" fontSize="10">{pin.label}</text>
      </g>
    ))}
     <style>{`
      @keyframes fadeInPin {
        from { opacity: 0; transform: scale(0.5); }
        to { opacity: 1; transform: scale(1); }
      }
      .animate-pulse-slow {
         animation: pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
       @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.03); }
        }
    `}</style>
  </svg>
);