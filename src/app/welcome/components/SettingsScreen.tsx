"use client";

import React, { useState } from 'react';
import BottomNav from './BottomNav';

interface SettingsScreenProps {
  isSubscribed: boolean;
  setIsSubscribed: (subscribed: boolean) => void;
  setHasUploaded: (uploaded: boolean) => void;
  setDocName: (name: string) => void;
  activeScreenIndex: number;
  setActiveScreenIndex: (index: number) => void;
  hasUploaded: boolean;
  docName: string;
}

const isIOSPlatform = () => {
  if (typeof window === 'undefined') return false;
  const cap = (window as unknown as { Capacitor?: { getPlatform?: () => string; isNativePlatform?: () => boolean } }).Capacitor;
  return cap?.getPlatform?.() === 'ios' || (cap?.isNativePlatform?.() && /iPad|iPhone|iPod/.test(navigator.userAgent));
};

export default function SettingsScreen({
  isSubscribed,
  setIsSubscribed,
  setHasUploaded,
  setDocName,
  activeScreenIndex,
  setActiveScreenIndex,
  hasUploaded,
  docName
}: SettingsScreenProps) {
  
  const [showBillingPopup, setShowBillingPopup] = useState(false);
  const [showWipeModal, setShowWipeModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Mocked localized Security Logs
  const securityLogs = [
    { time: "07:16:21", event: "SYSTEM", msg: "Encrypted memory buffer initialized." },
    { time: "07:16:32", event: "KEY_ROT", msg: "256-bit TLS local session key rotated." },
    { time: "07:16:45", event: "SHRED", msg: "Local document queue wiped successfully." }
  ];

  const handleWipeAllCache = () => {
    // Reset all global states to original
    setHasUploaded(false);
    setIsSubscribed(false);
    setDocName("");
    setShowWipeModal(true);
    setTimeout(() => {
      setShowWipeModal(false);
      // Optional: redirect to home screen
      setActiveScreenIndex(1);
    }, 2500);
  };

  const handleConfirmDeleteAccount = () => {
    setIsDeleting(true);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
      }
      setHasUploaded(false);
      setIsSubscribed(false);
      setDocName("");
      setIsDeleting(false);
      setShowDeleteAccountModal(false);
      // Refresh window to return to Login Screen
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-[#FAF8F5] text-slate-900 h-full select-none justify-between">
      
      {/* Header Bar */}
      <div className="px-4 py-3 flex justify-between items-center bg-[#EAE7DF] border-b border-slate-100">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#DF5B30]" />
          <span className="text-[10px] font-mono font-black text-slate-700 tracking-wider uppercase">System Settings</span>
        </div>
        <span className="text-[9px] font-black text-slate-500 uppercase">Profile & Compliance</span>
      </div>

      {/* Screen Body */}
      <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-4 bg-[#FAF8F5] flex flex-col justify-start">
        
        {/* Section 1: User Profile Header */}
        <div className="flex items-center space-x-3 p-3.5 bg-white border border-slate-150/80 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.04)] text-left">
          <div className="w-10 h-10 rounded-full bg-[#EAE7DF] border border-slate-200 flex items-center justify-center text-slate-900 font-black text-xs tracking-wider shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
            SJ
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h4 className="text-xs font-black text-slate-900 truncate uppercase">Sarah Jenkins</h4>
              <span className={`text-[8px] font-mono font-black px-1.5 py-0.5 rounded border ${
                isSubscribed ? 'bg-orange-50 border-[#FFD9CE] text-[#DF5B30]' : 'bg-[#EAE7DF] border-slate-300 text-slate-600'
              }`}>
                {isSubscribed ? 'PRO MEMBER' : 'FREE ACCOUNT'}
              </span>
            </div>
            <p className="text-[9px] text-slate-400 mt-0.5 truncate font-bold font-mono">sarah@designstudio.io</p>
          </div>
        </div>

        {/* Section 2: Core Usage Allocation Meter */}
        <div className="p-3.5 bg-white border border-slate-150/80 rounded-2xl flex flex-col space-y-2 shadow-[0_8px_25px_rgba(0,0,0,0.04)] text-left">
          <div className="flex justify-between items-center text-[10px]">
            <span className="font-black text-slate-800 uppercase">Document Analyses Used</span>
            <span className="font-mono text-[#DF5B30] font-black">
              {isSubscribed ? '1 / 25' : hasUploaded ? '1 / 2' : '0 / 2'}
            </span>
          </div>
          <div className="w-full bg-[#EAE7DF] h-2.5 rounded-full overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]">
            <div 
              className="bg-[#DF5B30] h-full rounded-full transition-all duration-300 shadow-[0_1px_6px_rgba(223,91,48,0.3)]" 
              style={{ width: isSubscribed ? '4%' : hasUploaded ? '50%' : '0%' }} 
            />
          </div>
          <span className="text-[8px] text-slate-400 font-mono font-bold uppercase">
            12 months validity from purchase date.
          </span>
        </div>

        {/* Section 3: High Fidelity Security Logs */}
        <div className="space-y-2 text-left">
          <span className="text-[8.5px] font-mono font-black text-slate-400 uppercase tracking-widest block">
            LOCAL SYSTEM SECURITY LOGS
          </span>
          <div className="bg-black border border-slate-800 rounded-2xl p-3.5 space-y-2 font-mono text-[8px] text-orange-400 shadow-[0_8px_25px_rgba(0,0,0,0.04)]">
            {securityLogs.map((log, idx) => (
              <div key={idx} className="flex space-x-1.5 items-start">
                <span className="text-slate-500 font-bold">{log.time}</span>
                <span className="px-1 bg-orange-950/60 text-orange-300 rounded text-[7.5px] font-black">{log.event}</span>
                <span className="text-slate-350">{log.msg}</span>
              </div>
            ))}
            <div className="flex space-x-1.5 items-start text-orange-500">
              <span className="text-slate-500 font-bold">CURRENT</span>
              <span className="px-1 bg-orange-950/60 rounded text-[7.5px] font-black">IDLE</span>
              <span className="text-slate-455">Listening for core engine operations...</span>
            </div>
          </div>
        </div>

        {/* Section 4: Actions (Wipe Cache, Delete Account & Billing) */}
        <div className="space-y-2 text-left">
          <span className="text-[8.5px] font-mono font-black text-slate-400 uppercase tracking-widest block">
            DATA CONTROL ACTIONS
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleWipeAllCache}
              className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-black rounded-xl text-[9px] uppercase tracking-wider active:scale-[0.98] transition"
            >
              🗑 Wipe Cache
            </button>

            <button
              type="button"
              onClick={() => setShowDeleteAccountModal(true)}
              className="py-3 bg-[#FFF2EE] hover:bg-[#ffe3db] text-[#DF5B30] border border-[#FFD9CE] font-black rounded-xl text-[9px] uppercase tracking-wider shadow-[0_4px_10px_rgba(223,91,48,0.1)] active:scale-[0.98] transition"
            >
              ⚠️ Delete Account
            </button>

            {!isIOSPlatform() && (
              <button
                type="button"
                onClick={() => setShowBillingPopup(true)}
                className="col-span-2 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 font-black rounded-xl text-[9px] uppercase tracking-wider shadow-[0_4px_10px_rgba(0,0,0,0.02)] active:scale-[0.98] transition"
              >
                💳 Stripe Portal
              </button>
            )}
          </div>
        </div>

        {/* Section 5: Long Form Disclaimer Notice */}
        <div className="bg-[#EAE7DF]/75 border border-slate-250 rounded-2xl p-3.5 space-y-2 text-left">
          <span className="text-[8px] font-mono font-black text-slate-500 uppercase tracking-widest block">
            REGULATORY DISCLAIMER
          </span>
          <p className="text-[8.5px] text-slate-500 leading-relaxed font-bold">
            Legaldecoder is an automated artificial intelligence evaluation assistant. It is NOT a law firm and does NOT provide professional legal advice. Users must consult with local licensed legal counsel prior to making final decisions regarding contracts or liabilities.
          </p>
        </div>

      </div>

      {/* Stripe Billing Portal simulation modal */}
      {showBillingPopup && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px] z-50 flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] border border-slate-150 rounded-3xl p-5 text-center space-y-4 max-w-[250px] shadow-[0_12px_30px_rgba(0,0,0,0.15)] text-left animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-mono font-black text-slate-400 uppercase">Stripe Customer Portal</span>
              <span className="text-xs">💳</span>
            </div>
            
            <div className="space-y-1 mt-2">
              <h4 className="text-xs font-black uppercase text-slate-950">Billing History</h4>
              <p className="text-[9.5px] text-slate-500 leading-normal font-bold">
                Below are the one-time purchases linked to your email address:
              </p>
            </div>

            <div className="space-y-3 font-mono text-[9px] text-slate-700 font-bold text-left border-y border-slate-100 py-3">
              <div className="flex justify-between">
                <span>July 1, 2026</span>
                <span className="text-[#DF5B30] font-black">$59.00 (Paid)</span>
              </div>
              <div className="flex justify-between">
                <span>March 1, 2026</span>
                <span className="text-[#DF5B30] font-black">$29.00 (Paid)</span>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => setShowBillingPopup(false)}
              className="w-full py-2.5 bg-[#DF5B30] text-white rounded-xl text-[10px] font-black uppercase tracking-wide transition shadow-[0_4px_12px_rgba(223,91,48,0.2)]"
            >
              Close Portal
            </button>
          </div>
        </div>
      )}

      {/* Wipe All Cache Confirmation popup */}
      {showWipeModal && (
        <div className="absolute inset-0 bg-[#FAF8F5]/95 backdrop-blur-[1px] z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-150 rounded-3xl p-5 text-center space-y-4 max-w-[240px] shadow-[0_12px_30px_rgba(0,0,0,0.1)] animate-in fade-in zoom-in duration-200">
            <div className="w-10 h-10 rounded-full bg-[#FFF2EE] border border-[#FFD9CE] flex items-center justify-center text-[#DF5B30] mx-auto shadow-[0_4px_10px_rgba(223,91,48,0.1)]">
              <span className="text-lg">🗑</span>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-black text-slate-900 uppercase">All Cache Cleared!</h4>
              <p className="text-[9.5px] text-slate-500 leading-relaxed font-bold">
                All local cookies, database indices, active subscriptions, and document records have been permanently wiped from the client cache.
              </p>
            </div>
            <div className="w-full py-1 bg-[#FFF2EE] border border-[#FFD9CE] text-[8.5px] font-black uppercase tracking-widest text-[#DF5B30] rounded-lg">
              SYSTEM REBOOTED
            </div>
          </div>
        </div>
      )}

      {/* Account Deletion Confirmation Modal (Guideline 5.1.1(v)) */}
      {showDeleteAccountModal && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px] z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 text-center space-y-4 max-w-[260px] shadow-[0_12px_30px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in duration-200 text-left">
            <div className="w-10 h-10 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600 mx-auto">
              <span className="text-lg">⚠️</span>
            </div>
            <div className="space-y-1.5 text-center">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">Delete Account?</h4>
              <p className="text-[9.5px] text-slate-600 leading-relaxed font-bold">
                Deleting your account will permanently erase your profile, saved document risk reports, and active access. This action cannot be undone.
              </p>
            </div>
            
            <div className="space-y-2 pt-1">
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDeleteAccount}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-[0_4px_12px_rgba(220,38,38,0.25)] active:scale-[0.98] transition flex items-center justify-center space-x-1"
              >
                <span>{isDeleting ? "Deleting Account..." : "Confirm Delete Account"}</span>
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setShowDeleteAccountModal(false)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-wider transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Navigation Bar */}
      <BottomNav 
        activeScreenIndex={activeScreenIndex}
        setActiveScreenIndex={setActiveScreenIndex}
        hasUploaded={hasUploaded}
        isSubscribed={isSubscribed}
      />

    </div>
  );
}
