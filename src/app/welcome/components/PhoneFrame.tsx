import React from 'react';

interface PhoneFrameProps {
  id: string;
  isNativeApp: boolean;
  isActive: boolean;
  flashBorder?: boolean;
  children: React.ReactNode;
}

export default function PhoneFrame({
  id,
  isNativeApp,
  isActive,
  flashBorder = false,
  children
}: PhoneFrameProps) {
  if (isNativeApp) {
    return (
      <div 
        id={id} 
        className={`w-full h-full flex flex-col flex-1 bg-[#0F0E0D] ${isActive ? '' : 'hidden'}`}
      >
        <div className="flex-1 flex flex-col relative overflow-hidden bg-[#FAF8F5] text-slate-900">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div 
      id={id}
      className={`relative w-full max-w-[340px] h-[680px] rounded-[52px] border-[10px] bg-[#0F0E0D] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden group transition-all duration-500 ${
        flashBorder 
          ? 'border-[#DF5B30] ring-4 ring-[#DF5B30]/50 shadow-[0_0_30px_rgba(223,91,48,0.5)] scale-[1.02] flash-active-ring' 
          : 'border-slate-800'
      }`}
    >
      {/* Dynamic Island / Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#0F0E0D] rounded-full z-40 flex items-center justify-center">
        <div className="w-2.5 h-2.5 bg-black rounded-full absolute right-3" />
      </div>

      {/* Custom Status Bar */}
      <div className="h-9 px-6 pt-1 flex justify-between items-center text-[11px] font-semibold text-slate-400 select-none z-30 bg-[#0F0E0D]">
        <span>09:41</span>
        <div className="flex items-center space-x-1.5">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M2 22h20V2z" />
          </svg>
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 21l-12-12c6-6 18-6 24 0z" />
          </svg>
          <div className="w-5 h-2.5 border border-slate-400 rounded-sm p-[1px] flex items-center">
            <div className="h-full w-4 bg-slate-400 rounded-[1px]" />
          </div>
        </div>
      </div>

      {/* Screen Inner Container */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#FAF8F5] text-slate-900">
        {children}
      </div>
    </div>
  );
}
