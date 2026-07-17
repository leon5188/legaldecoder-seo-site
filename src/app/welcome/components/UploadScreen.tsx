"use client";

import React, { useState, useEffect, useRef } from 'react';
import BottomNav from './BottomNav';

interface UploadScreenProps {
  activeSegment: string;
  setActiveSegment: (segment: string) => void;
  docName: string;
  setDocName: (name: string) => void;
  hasUploaded: boolean;
  setHasUploaded: (uploaded: boolean) => void;
  activeScreenIndex: number;
  setActiveScreenIndex: (index: number) => void;
  isSubscribed: boolean;
}

export default function UploadScreen({
  activeSegment,
  setActiveSegment,
  docName,
  setDocName,
  hasUploaded,
  setHasUploaded,
  activeScreenIndex,
  setActiveScreenIndex,
  isSubscribed
}: UploadScreenProps) {
  
  // Custom states for loader
  const [isDecoding, setIsDecoding] = useState(false);
  const [countdown, setCountdown] = useState(45);
  const [logs, setLogs] = useState<string[]>([]);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pastedText, setPastedText] = useState("");
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Simulated log entries
  const simLogPool = [
    "Initializing secure sandbox container...",
    "Anonymizing metadata & scrubbing user IDs...",
    "Scanning document layout via OCR scanner...",
    "Extracting semantic nodes & structural clauses...",
    "Running red-flag liability trap detection...",
    "Cross-referencing state tenant/NDA guidelines...",
    "Scoring termination covenants & fee structures...",
    "Securing local encryption keys...",
    "Wiping cloud ingress queues & files...",
    "Finalizing AI Risk Report & Avvo indices..."
  ];

  // Loader Countdown Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isDecoding && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => Math.max(0, prev - 3)); // Fast countdown for better user demo
        const nextLogIndex = Math.floor((45 - countdown) / 4);
        if (simLogPool[nextLogIndex] && !logs.includes(simLogPool[nextLogIndex])) {
          setLogs(prev => [...prev, `[${45 - countdown}s] ${simLogPool[nextLogIndex]}`]);
        }
      }, 300);
    } else if (isDecoding && countdown === 0) {
      setIsDecoding(false);
      setHasUploaded(true);
      setActiveScreenIndex(2); // Jump to Report Screen
      
      if (typeof window !== 'undefined') {
        const isNative = (window as unknown as { Capacitor?: { isNativePlatform: () => boolean } }).Capacitor?.isNativePlatform?.();
        if (!isNative) {
          setTimeout(() => {
            document.getElementById('phone-2-mockup')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 300);
        }
      }
    }
    return () => clearTimeout(timer);
  }, [isDecoding, countdown]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const startAnalysis = (mockName: string) => {
    setDocName(mockName);
    setLogs(["[0s] Ingress buffer loaded successfully."]);
    setCountdown(45);
    setIsDecoding(true);
  };

  const handlePasteSubmit = () => {
    if (pastedText.trim()) {
      setShowPasteModal(false);
      startAnalysis("Pasted_Contract_Text.txt");
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between h-full bg-[#FAF8F5] text-slate-900 select-none relative overflow-hidden">
      
      {/* Header Bar */}
      <div className="px-4 py-3 flex justify-between items-center border-b border-slate-100 bg-[#EAE7DF]">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#DF5B30]" />
          <span className="text-xs font-black tracking-tight text-slate-900 uppercase">LEGALDECODER</span>
        </div>
        <div className="px-1.5 py-0.5 rounded bg-orange-50 border border-orange-200 text-[8px] font-black text-[#DF5B30] uppercase tracking-wider shadow-[0_2px_6px_rgba(223,91,48,0.05)]">
          PH #1
        </div>
      </div>

      {/* Screen Body */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col justify-between">
        
        {/* VIEW 1: HOME SCREEN */}
        {!isDecoding && (
          <div className="flex-1 p-4 flex flex-col justify-between space-y-4">
            
            {/* Top Info Header */}
            <div className="space-y-4">
              <div className="text-center space-y-1.5 mt-1">
                <span className="text-[8px] font-mono font-black text-[#DF5B30] bg-[#FFF2EE] border border-[#FFD9CE] rounded-full px-2.5 py-0.5 uppercase tracking-widest">
                  AI Risk Auditor
                </span>
                <h2 className="text-[16px] font-black text-slate-950 tracking-tight leading-snug uppercase mt-1">
                  Do Not Sign What You Do Not Understand
                </h2>
                <p className="text-[9.5px] text-slate-500 font-bold leading-normal">
                  Audit any legal document for hidden traps, liability triggers, and unconscionable clauses in seconds.
                </p>
              </div>

              {/* Three upload action routes (Styleguide style elevated buttons) */}
              <div className="space-y-3 pt-2">
                
                {/* Route 1: Camera Scan */}
                <button
                  type="button"
                  onClick={() => startAnalysis("Camera_Capture_Scan.pdf")}
                  className="w-full p-3.5 bg-white hover:bg-slate-50 border border-slate-150/80 rounded-2xl flex items-center space-x-3.5 shadow-[0_8px_25px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.6)] active:scale-[0.99] transition-all"
                >
                  <span className="text-lg">📷</span>
                  <div className="text-left">
                    <h4 className="text-[10px] font-black uppercase text-slate-900 tracking-tight">Camera / Scan Document</h4>
                    <p className="text-[8.5px] text-slate-400 font-bold">Snap physical paper contracts instantly</p>
                  </div>
                </button>

                {/* Route 2: Upload File */}
                <button
                  type="button"
                  onClick={() => startAnalysis("Lease_Agreement_Draft.pdf")}
                  className="w-full p-3.5 bg-white hover:bg-slate-50 border border-slate-150/80 rounded-2xl flex items-center space-x-3.5 shadow-[0_8px_25px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.6)] active:scale-[0.99] transition-all"
                >
                  <span className="text-lg">📁</span>
                  <div className="text-left">
                    <h4 className="text-[10px] font-black uppercase text-slate-900 tracking-tight">Upload PDF / Image</h4>
                    <p className="text-[8.5px] text-slate-400 font-bold">Select files from device vault</p>
                  </div>
                </button>

                {/* Route 3: Paste text */}
                <button
                  type="button"
                  onClick={() => setShowPasteModal(true)}
                  className="w-full p-3.5 bg-white hover:bg-slate-50 border border-slate-150/80 rounded-2xl flex items-center space-x-3.5 shadow-[0_8px_25px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.6)] active:scale-[0.99] transition-all"
                >
                  <span className="text-lg">✍️</span>
                  <div className="text-left">
                    <h4 className="text-[10px] font-black uppercase text-slate-900 tracking-tight">Paste Plain Text</h4>
                    <p className="text-[8.5px] text-slate-400 font-bold">Directly paste terms from email/web</p>
                  </div>
                </button>

              </div>
            </div>

            {/* Middle Banners: Security & Privacy */}
            <div className="space-y-2">
              <span className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest block text-center">
                SECURITY SANDBOX STANDARD
              </span>
              <div className="grid grid-cols-3 gap-2 text-[8px] text-slate-700 font-mono text-center font-black">
                <div className="bg-white border border-slate-150/80 rounded-xl py-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center">
                  <span className="text-[#DF5B30]">🔒 END-TO-END</span>
                  <span className="text-[7.5px] text-slate-400 mt-0.5">Encrypted</span>
                </div>
                <div className="bg-white border border-slate-150/80 rounded-xl py-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center">
                  <span className="text-[#DF5B30]">🛡 BANK-GRADE</span>
                  <span className="text-[7.5px] text-slate-400 mt-0.5">TLS 1.3 Audit</span>
                </div>
                <div className="bg-white border border-slate-150/80 rounded-xl py-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center">
                  <span className="text-[#DF5B30]">🔥 ZERO DATA</span>
                  <span className="text-[7.5px] text-slate-400 mt-0.5">Self-Destruct</span>
                </div>
              </div>
            </div>

            {/* Bottom Disclaimer */}
            <div className="text-center border-t border-slate-100 pt-2.5">
              <p className="text-[8px] text-slate-400 font-mono font-bold leading-normal">
                DISCLAIMER: NOT LEGAL ADVICE. FOR INFORMATIONAL PURPOSES ONLY.
              </p>
            </div>

          </div>
        )}

        {/* VIEW 2: ANALYSIS LOADER SCREEN */}
        {isDecoding && (
          <div className="flex-1 p-4 bg-slate-950 text-orange-400 flex flex-col justify-between h-full font-mono text-left animate-in fade-in duration-200">
            
            {/* Animated Decoder Radar Box */}
            <div className="space-y-4">
              <div className="relative w-20 h-20 mx-auto mt-6 border-2 border-orange-500 rounded-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-orange-500/20 origin-bottom animate-[spin_2.5s_linear_infinite]" />
                <span className="text-[10px] text-orange-400 font-black animate-pulse">DECRYPTING</span>
              </div>

              <div className="text-center space-y-1">
                <h4 className="text-[11px] text-white uppercase font-bold">Decoding Legal Clauses</h4>
                <p className="text-[9px] text-orange-300/80">
                  Estimated time remaining: <span className="text-white font-black">{countdown}s</span>
                </p>
              </div>
            </div>

            {/* Rolling diagnostic logs */}
            <div className="space-y-2 mt-4 flex-1 flex flex-col justify-end">
              <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">
                SANDBOX CONSOLE LOGS
              </span>
              <div 
                ref={logContainerRef}
                className="h-28 bg-black border border-orange-900/60 rounded-xl p-2.5 overflow-y-auto no-scrollbar space-y-1.5 text-[8.5px] font-mono leading-relaxed"
              >
                {logs.map((log, idx) => (
                  <div key={idx} className="flex space-x-1">
                    <span className="text-orange-500 font-black">▶</span>
                    <span className="text-orange-300/90">{log}</span>
                  </div>
                ))}
                <div className="flex items-center space-x-1">
                  <span className="text-orange-500 font-black">▶</span>
                  <span className="w-1.5 h-3 bg-orange-400 animate-ping" />
                </div>
              </div>
            </div>

            {/* Wipe Queue Anchor */}
            <div className="border-t border-orange-950/40 pt-3 text-center">
              <p className="text-[8px] text-slate-500 font-bold uppercase">
                🛡 Isolated Sandbox Active • File Wipe Queue Auto-Armed
              </p>
            </div>

          </div>
        )}

      </div>

      {/* Slide-over Text Pasting Modal */}
      {showPasteModal && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px] z-50 flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] border border-slate-150 rounded-3xl p-4 w-full max-w-[280px] space-y-4 shadow-[0_12px_30px_rgba(0,0,0,0.15)] text-left">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-black uppercase text-slate-900">Paste Contract Text</h4>
              <button 
                type="button"
                onClick={() => setShowPasteModal(false)}
                className="w-5 h-5 rounded-full border border-slate-200 bg-white flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
            <textarea
              rows={6}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Paste contract terms or covenants here..."
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#DF5B30] focus:ring-1 focus:ring-[#DF5B30] resize-none font-sans"
            />
            <button
              type="button"
              onClick={handlePasteSubmit}
              className="w-full py-2.5 bg-[#DF5B30] text-white border border-transparent rounded-xl text-[10px] font-black uppercase tracking-wider shadow-[0_4px_12px_rgba(223,91,48,0.2)] active:scale-[0.98] transition"
            >
              Analyze Text
            </button>
          </div>
        </div>
      )}

      {/* Global Navigation */}
      <BottomNav 
        activeScreenIndex={activeScreenIndex}
        setActiveScreenIndex={setActiveScreenIndex}
        hasUploaded={hasUploaded}
        isSubscribed={isSubscribed}
      />

    </div>
  );
}
