import React from 'react';

interface ScannerScreenProps {
  setShowScanner: (show: boolean) => void;
  flashActive: boolean;
  scannerState: 'searching' | 'unstable' | 'ready';
  setScannerState: (state: 'searching' | 'unstable' | 'ready') => void;
  flashState: 'Auto' | 'On' | 'Off';
  setFlashState: (state: 'Auto' | 'On' | 'Off' | ((prev: 'Auto' | 'On' | 'Off') => 'Auto' | 'On' | 'Off')) => void;
  marqueeIndex: number;
  handleShutterTrigger: () => void;
}

export default function ScannerScreen({
  setShowScanner,
  flashActive,
  scannerState,
  setScannerState,
  flashState,
  setFlashState,
  marqueeIndex,
  handleShutterTrigger
}: ScannerScreenProps) {
  return (
    <div className="flex-1 flex flex-col justify-between bg-[#030712] select-none h-full relative text-slate-100">
      
      {/* Camera Flash Animation Overlay */}
      {flashActive && (
        <div className="absolute inset-0 bg-white z-50 opacity-100 transition-opacity duration-100 animate-flash" />
      )}

      {/* Top Control Header: Absolute floating row */}
      <div className="absolute top-4 left-0 right-0 z-30 px-4 flex justify-between items-center">
        <button 
          type="button"
          onClick={() => setShowScanner(false)} 
          className="w-9 h-9 rounded-full bg-slate-900/85 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white active:scale-90 transition shadow-lg"
        >
          <svg className="w-4.5 h-4.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          type="button"
          onClick={() => {
            setFlashState(prev => prev === 'Auto' ? 'On' : prev === 'On' ? 'Off' : 'Auto');
          }} 
          className="px-3.5 py-2 rounded-full bg-slate-900/85 border border-slate-800 flex items-center space-x-1.5 text-[9px] font-black text-slate-300 hover:text-white transition shadow-lg"
        >
          <svg className={`w-3.5 h-3.5 ${flashState !== 'Off' ? 'text-amber-400 fill-current animate-pulse' : 'text-slate-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <span className="font-mono uppercase">{flashState}</span>
        </button>

        <button 
          type="button"
          onClick={() => setShowScanner(false)} 
          className="text-[10px] font-black text-cyan-400 bg-slate-900/85 border border-slate-800 px-3.5 py-2 rounded-full hover:text-white transition shadow-lg uppercase"
        >
          Gallery
        </button>
      </div>

      {/* Centered Bounding Box Camera view */}
      <div 
        onClick={() => {
          setScannerState(scannerState === 'ready' ? 'searching' : scannerState === 'searching' ? 'unstable' : 'ready');
        }}
        className="flex-1 flex flex-col items-center justify-center px-4 pt-16 pb-2 cursor-pointer bg-slate-950/60"
      >
        {/* 1:1.414 aspect ratio bounding box */}
        <div className="w-[200px] h-[283px] border border-slate-800/30 rounded-2xl relative overflow-hidden transition-all duration-300 bg-slate-900/20 shadow-2xl flex items-center justify-center">
          
          {/* Corner Brackets */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-[3.5px] border-l-[3.5px] transition-colors duration-300 rounded-tl-sm" 
               style={{ borderColor: scannerState === 'searching' ? '#FFFFFF' : scannerState === 'unstable' ? '#FF3D00' : '#00E676' }} />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-[3.5px] border-r-[3.5px] transition-colors duration-300 rounded-tr-sm" 
               style={{ borderColor: scannerState === 'searching' ? '#FFFFFF' : scannerState === 'unstable' ? '#FF3D00' : '#00E676' }} />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[3.5px] border-l-[3.5px] transition-colors duration-300 rounded-bl-sm" 
               style={{ borderColor: scannerState === 'searching' ? '#FFFFFF' : scannerState === 'unstable' ? '#FF3D00' : '#00E676' }} />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[3.5px] border-r-[3.5px] transition-colors duration-300 rounded-br-sm" 
               style={{ borderColor: scannerState === 'searching' ? '#FFFFFF' : scannerState === 'unstable' ? '#FF3D00' : '#00E676' }} />

          {/* Mockup Document Lines */}
          <div className="w-[150px] h-[230px] rounded border border-white/5 bg-slate-900/20 flex flex-col p-3.5 space-y-2.5 opacity-25 select-none text-left">
            <div className="w-12 h-2.5 bg-slate-700 rounded" />
            <div className="w-full h-1 bg-slate-800 rounded" />
            <div className="w-11/12 h-1 bg-slate-800 rounded" />
            <div className="w-full h-1 bg-slate-800 rounded" />
            <div className="w-14 h-2.5 bg-slate-650 rounded mt-3" />
            <div className="w-full h-1 bg-slate-800 rounded" />
            <div className="w-10/12 h-1 bg-slate-800 rounded" />
          </div>

          {/* Green Laser sweeping line for "ready" state */}
          {scannerState === 'ready' && (
            <div className="absolute left-0 right-0 h-[2.5px] bg-[#00E676] shadow-[0_0_12px_#00E676] laser-sweep" />
          )}
        </div>

        {/* Status overlay message */}
        <div className="mt-4.5 min-h-[22px]">
          <span 
            className="text-[9px] font-mono tracking-widest uppercase font-black px-2.5 py-1 rounded transition-all duration-300 shadow-md"
            style={{ 
              backgroundColor: scannerState === 'searching' ? 'rgba(255,255,255,0.1)' : scannerState === 'unstable' ? 'rgba(255,61,0,0.15)' : 'rgba(0,230,118,0.15)',
              color: scannerState === 'searching' ? '#FFFFFF' : scannerState === 'unstable' ? '#FF3D00' : '#00E676'
            }}
          >
            {scannerState === 'searching' && "Align contract page within frame"}
            {scannerState === 'unstable' && "Hold camera parallel to document"}
            {scannerState === 'ready' && "✓ Scanner ready - tap shutter"}
          </span>
        </div>
      </div>

      {/* Bottom Capture Dashboard */}
      <div className="px-4 pb-4 bg-slate-950 border-t border-slate-900 pt-3 flex flex-col space-y-3">
        
        {/* Live Tip Marquee */}
        <div className="h-5 overflow-hidden flex items-center justify-center text-center">
          <span className="text-[9px] text-slate-400 italic font-medium transition-all duration-350">
            {marqueeIndex === 0 
              ? "💡 Place contract on flat high-contrast dark surface"
              : "💡 Tip: Bright ambient daylight yields the sharpest scan"}
          </span>
        </div>

        {/* Shutter trigger button */}
        <div className="flex justify-center items-center py-1">
          <button 
            type="button"
            onClick={handleShutterTrigger}
            className="w-14 h-14 rounded-full border-[4px] border-white flex items-center justify-center p-[4px] hover:scale-105 active:scale-90 transition-all shadow-xl bg-transparent"
          >
            <div className="w-full h-full rounded-full bg-white transition hover:bg-slate-200" />
          </button>
        </div>

        {/* Mode selector slider */}
        <div className="flex justify-center items-center space-x-2.5 text-[8.5px] font-black text-slate-500 uppercase tracking-wider select-none">
          <span className="opacity-60">Single Page</span>
          <span className="opacity-40">•</span>
          <span className="text-cyan-400 font-extrabold">[ Multi-Page Bundle ]</span>
        </div>

      </div>
    </div>
  );
}
