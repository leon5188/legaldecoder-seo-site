"use client";

import React from 'react';

interface BottomNavProps {
  activeScreenIndex: number;
  setActiveScreenIndex: (index: number) => void;
  hasUploaded: boolean;
  isSubscribed: boolean;
}

export default function BottomNav({
  activeScreenIndex,
  setActiveScreenIndex,
  hasUploaded,
  isSubscribed
}: BottomNavProps) {
  
  const handleNavClick = (tabName: 'home' | 'report' | 'attorneys' | 'pricing' | 'settings') => {
    let targetIndex = 1;
    if (tabName === 'home') {
      targetIndex = 1;
    } else if (tabName === 'report') {
      targetIndex = 2;
    } else if (tabName === 'attorneys') {
      targetIndex = 3;
    } else if (tabName === 'pricing') {
      targetIndex = 4;
    } else if (tabName === 'settings') {
      targetIndex = 5;
    }

    setActiveScreenIndex(targetIndex);
    if (typeof window !== 'undefined') {
      const isNative = (window as unknown as { Capacitor?: { isNativePlatform: () => boolean } }).Capacitor?.isNativePlatform?.();
      if (!isNative) {
        const targetId = `phone-${targetIndex}-mockup`;
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  };

  // Determine active item based on activeScreenIndex
  const isHomeActive = activeScreenIndex === 1;
  const isReportActive = activeScreenIndex === 2;
  const isAttorneysActive = activeScreenIndex === 3;
  const isPricingActive = activeScreenIndex === 4;
  const isSettingsActive = activeScreenIndex === 5;

  return (
    <div className="h-14 bg-white border-t border-slate-100 flex items-center justify-around px-2 relative z-30 select-none shadow-[0_-8px_30px_rgba(0,0,0,0.03)]">
      
      {/* Tab: Home */}
      <button
        type="button"
        onClick={() => handleNavClick('home')}
        className={`flex-1 py-1 flex flex-col items-center justify-center transition-all ${
          isHomeActive 
            ? 'text-[#DF5B30] scale-105' 
            : 'text-slate-400 hover:text-slate-700'
        }`}
      >
        <span className="text-base leading-none mb-0.5">🏠</span>
        <span className={`text-[8px] font-black uppercase tracking-wider ${isHomeActive ? 'font-black' : 'font-bold'}`}>
          Home
        </span>
      </button>

      {/* Tab: Report */}
      <button
        type="button"
        onClick={() => handleNavClick('report')}
        className={`flex-1 py-1 flex flex-col items-center justify-center transition-all ${
          isReportActive 
            ? 'text-[#DF5B30] scale-105' 
            : 'text-slate-400 hover:text-slate-700'
        }`}
      >
        <span className="text-base leading-none mb-0.5">📄</span>
        <span className={`text-[8px] font-black uppercase tracking-wider ${isReportActive ? 'font-black' : 'font-bold'}`}>
          Report
        </span>
      </button>

      {/* Tab: Attorneys */}
      <button
        type="button"
        onClick={() => handleNavClick('attorneys')}
        className={`flex-1 py-1 flex flex-col items-center justify-center transition-all ${
          isAttorneysActive 
            ? 'text-[#DF5B30] scale-105' 
            : 'text-slate-400 hover:text-slate-700'
        }`}
      >
        <span className="text-base leading-none mb-0.5">⚖️</span>
        <span className={`text-[8px] font-black uppercase tracking-wider ${isAttorneysActive ? 'font-black' : 'font-bold'}`}>
          Avvo
        </span>
      </button>

      {/* Tab: Pricing */}
      <button
        type="button"
        onClick={() => handleNavClick('pricing')}
        className={`flex-1 py-1 flex flex-col items-center justify-center transition-all ${
          isPricingActive 
            ? 'text-[#DF5B30] scale-105' 
            : 'text-slate-400 hover:text-slate-700'
        }`}
      >
        <div className="relative">
          <span className="text-base leading-none mb-0.5">💎</span>
          {isSubscribed && (
            <span className="absolute -top-1 -right-2 bg-[#DF5B30] border border-white w-1.5 h-1.5 rounded-full" />
          )}
        </div>
        <span className={`text-[8px] font-black uppercase tracking-wider ${isPricingActive ? 'font-black' : 'font-bold'}`}>
          Pricing
        </span>
      </button>

      {/* Tab: Settings */}
      <button
        type="button"
        onClick={() => handleNavClick('settings')}
        className={`flex-1 py-1 flex flex-col items-center justify-center transition-all ${
          isSettingsActive 
            ? 'text-[#DF5B30] scale-105' 
            : 'text-slate-400 hover:text-slate-700'
        }`}
      >
        <span className="text-base leading-none mb-0.5">⚙️</span>
        <span className={`text-[8px] font-black uppercase tracking-wider ${isSettingsActive ? 'font-black' : 'font-bold'}`}>
          Settings
        </span>
      </button>

    </div>
  );
}
