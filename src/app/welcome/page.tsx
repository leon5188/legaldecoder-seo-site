"use client";

import React, { useState, useEffect } from 'react';
import PhoneFrame from './components/PhoneFrame';
import UploadScreen from './components/UploadScreen';
import ReportCardScreen from './components/ReportCardScreen';
import AvvoConnectScreen from './components/AvvoConnectScreen';
import PaywallScreen from './components/PaywallScreen';
import SettingsScreen from './components/SettingsScreen';
import LoginScreen from './components/LoginScreen';

export default function WelcomePage() {
  // --- STATE SYSTEM ---
  const [activeSegment, setActiveSegment] = useState<string>('renter');
  const [docName, setDocName] = useState<string>("Lease_Agreement_Draft.pdf");
  const [hasUploaded, setHasUploaded] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  // --- MOCKUP CONFIGS ---
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isNativeApp, setIsNativeApp] = useState<boolean>(false);
  const [activeScreenIndex, setActiveScreenIndex] = useState<number>(1);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // --- MODAL VIEWS ---
  const [showMatrix, setShowMatrix] = useState<boolean>(false);
  const [showPaywallPopup, setShowPaywallPopup] = useState<boolean>(false);
  const [flashPaywall, setFlashPaywall] = useState<boolean>(false);

  // --- TOAST UTILITY ---
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const logged = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(logged);
    }
  }, []);

  const handleLoginSuccess = (user: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", user);
      setIsLoggedIn(true);
      showToast("✓ Auth Session Established! Secured sandbox ready");
    }
  };

  // Capacitor platform detection
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as unknown as { Capacitor?: { isNativePlatform: () => boolean } }).Capacitor?.isNativePlatform()) {
      setIsNativeApp(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F2EB] flex flex-col justify-between font-sans">
      
      {/* Web Preview Navigation Header (Styleguide compliant) */}
      {!isNativeApp && (
        <header className="bg-white border border-slate-150 px-6 py-4 flex justify-between items-center z-40 select-none shadow-[0_8px_30px_rgba(0,0,0,0.03)] m-4 rounded-2xl">
          <div className="flex items-center space-x-2.5">
            <span className="text-xl">🛡️</span>
            <div className="text-left">
              <h1 className="text-sm font-black tracking-tight text-slate-900 uppercase">LEGALDECODER</h1>
              <p className="text-[9px] text-[#DF5B30] font-mono font-black leading-none tracking-widest uppercase">Premium Mobile Preview Console</p>
            </div>
          </div>
          <div className="flex items-center space-x-3.5">
            <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider bg-[#FAF8F5] px-3 py-1.5 rounded-full border border-slate-200 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
              Environment: iOS / Web simulator
            </span>
          </div>
        </header>
      )}

      {/* Main Workspace Frame */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        
        {/* FIVE PHONE FRAMES SIDE BY SIDE */}
        <div className={isNativeApp ? "flex-1 flex flex-col w-full h-full relative" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full justify-items-center"}>

          {/* ==================== SCREEN 1: UPLOAD & DECODER ==================== */}
          <PhoneFrame 
            id="phone-1-mockup" 
            isNativeApp={isNativeApp} 
            isActive={activeScreenIndex === 1}
          >
            {!isLoggedIn ? (
              <LoginScreen onLoginSuccess={handleLoginSuccess} />
            ) : (
              <UploadScreen 
                activeSegment={activeSegment}
                setActiveSegment={setActiveSegment}
                docName={docName}
                setDocName={setDocName}
                hasUploaded={hasUploaded}
                setHasUploaded={setHasUploaded}
                activeScreenIndex={activeScreenIndex}
                setActiveScreenIndex={setActiveScreenIndex}
                isSubscribed={isSubscribed}
              />
            )}

            {/* Simulated Sandbox Toast Alerts */}
            <div className={`absolute bottom-4 left-4 right-4 bg-slate-950 border border-slate-800 rounded-xl p-3 shadow-[0_8px_20px_rgba(0,0,0,0.25)] z-50 transition-all duration-300 flex items-start space-x-2.5 ${
              toast ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
            }`}>
              <div className="w-5 h-5 rounded-full bg-orange-950 border border-orange-500 flex items-center justify-center text-orange-400 flex-shrink-0 mt-0.5 animate-pulse">
                <span>i</span>
              </div>
              <div className="flex-1 text-left">
                <span className="text-[10px] font-black text-white block uppercase tracking-wider font-mono">SANDBOX ALERT</span>
                <span className="text-[9px] text-orange-300 block leading-tight mt-0.5 font-bold font-mono">{toast}</span>
              </div>
            </div>
          </PhoneFrame>

          {/* ==================== SCREEN 2: CONTRACT REPORT CARD ==================== */}
          <PhoneFrame 
            id="phone-2-mockup" 
            isNativeApp={isNativeApp} 
            isActive={activeScreenIndex === 2}
          >
            {!isLoggedIn ? (
              <LoginScreen onLoginSuccess={handleLoginSuccess} />
            ) : (
              <ReportCardScreen 
                isSubscribed={isSubscribed}
                activeScreenIndex={activeScreenIndex}
                setActiveScreenIndex={setActiveScreenIndex}
                hasUploaded={hasUploaded}
                docName={docName}
              />
            )}
          </PhoneFrame>

          {/* ==================== SCREEN 3: AVVO CONNECTIONS ==================== */}
          <PhoneFrame 
            id="phone-3-mockup" 
            isNativeApp={isNativeApp} 
            isActive={activeScreenIndex === 3}
          >
            {!isLoggedIn ? (
              <LoginScreen onLoginSuccess={handleLoginSuccess} />
            ) : (
              <AvvoConnectScreen 
                activeScreenIndex={activeScreenIndex}
                setActiveScreenIndex={setActiveScreenIndex}
                hasUploaded={hasUploaded}
                isSubscribed={isSubscribed}
              />
            )}
          </PhoneFrame>

          {/* ==================== SCREEN 4: SUBSCRIPTION PAYWALL ==================== */}
          <PhoneFrame 
            id="phone-4-mockup" 
            isNativeApp={isNativeApp} 
            isActive={activeScreenIndex === 4}
            flashBorder={flashPaywall}
          >
            {!isLoggedIn ? (
              <LoginScreen onLoginSuccess={handleLoginSuccess} />
            ) : (
              <PaywallScreen 
                showMatrix={showMatrix}
                setShowMatrix={setShowMatrix}
                showPaywallPopup={showPaywallPopup}
                setShowPaywallPopup={setShowPaywallPopup}
                setIsSubscribed={setIsSubscribed}
                activeScreenIndex={activeScreenIndex}
                setActiveScreenIndex={setActiveScreenIndex}
                hasUploaded={hasUploaded}
                isSubscribed={isSubscribed}
              />
            )}
          </PhoneFrame>

          {/* ==================== SCREEN 5: ACCOUNT SETTINGS ==================== */}
          <PhoneFrame 
            id="phone-5-mockup" 
            isNativeApp={isNativeApp} 
            isActive={activeScreenIndex === 5}
          >
            {!isLoggedIn ? (
              <LoginScreen onLoginSuccess={handleLoginSuccess} />
            ) : (
              <SettingsScreen 
                isSubscribed={isSubscribed}
                setIsSubscribed={setIsSubscribed}
                setHasUploaded={setHasUploaded}
                setDocName={setDocName}
                activeScreenIndex={activeScreenIndex}
                setActiveScreenIndex={setActiveScreenIndex}
                hasUploaded={hasUploaded}
                docName={docName}
              />
            )}
          </PhoneFrame>

        </div>

        {/* BOTTOM METADATA / INFO STATS */}
        {!isNativeApp && (
          <section className="mt-12 w-full max-w-4xl border border-slate-200 bg-white rounded-2xl p-6 shadow-[0_12px_30px_rgba(0,0,0,0.03)] text-left">
            <h4 className="text-sm font-black text-slate-950 uppercase tracking-widest mb-3">Simulation Console & State Controller</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Global Subscriptions override</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    className={`px-4 py-2 border border-transparent font-black text-xs rounded-xl shadow-[0_4px_12px_rgba(223,91,48,0.15)] transition active:scale-[0.98] ${
                      isSubscribed ? 'bg-[#DF5B30] text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isSubscribed ? 'PRO SUBSCRIBED' : 'FREE MODE'}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Vault Security</span>
                <p className="text-[10.5px] text-slate-550 font-bold leading-normal">
                  All local mockups use local client states. Memory cleanup, log monitors, and Stripe payment simulation can be tested inside the Settings and Pricing tabs.
                </p>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className={`bg-white border-t border-slate-100 py-6 text-center text-slate-400 text-xs ${isNativeApp ? 'hidden' : ''}`}>
        <p>© 2026 LegalDecoder AI. All rights reserved. For mockup demonstration purposes only.</p>
      </footer>
    </div>
  );
}
