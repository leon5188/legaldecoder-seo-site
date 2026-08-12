import React from 'react';

export const Logo = ({ size = 64, className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="120" height="120" rx="24" fill="#0B0F19" />
      <g opacity="0.8">
        <path d="M40 85L30 85C27.2386 85 25 82.7614 25 80L25 35C25 32.2386 27.2386 30 30 30L60 30L80 50L80 80C80 82.7614 77.7614 85 75 85L65 85" stroke="url(#paint0_linear)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M60 30L60 50L80 50" stroke="url(#paint1_linear)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      
      <circle cx="70" cy="70" r="22" fill="#0B0F19" stroke="url(#paint2_linear)" strokeWidth="6" />
      <path d="M85.5 85.5L95 95" stroke="url(#paint3_linear)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      
      <rect x="58" y="65" width="24" height="4" rx="2" fill="url(#paint4_linear)" />
      <rect x="58" y="73" width="16" height="4" rx="2" fill="url(#paint5_linear)" />
      
      <defs>
        <linearGradient id="paint0_linear" x1="25" y1="30" x2="80" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="paint1_linear" x1="60" y1="30" x2="80" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="paint2_linear" x1="48" y1="48" x2="92" y2="92" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06B6D4" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="paint3_linear" x1="85.5" y1="85.5" x2="95" y2="95" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06B6D4" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="paint4_linear" x1="58" y1="65" x2="82" y2="69" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="paint5_linear" x1="58" y1="73" x2="74" y2="77" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>
    </svg>
  );
};