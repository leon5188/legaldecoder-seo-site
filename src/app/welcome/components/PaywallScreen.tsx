"use client";

import React, { useState } from 'react';
import BottomNav from './BottomNav';

interface PaywallScreenProps {
  showMatrix: boolean;
  setShowMatrix: (show: boolean) => void;
  showPaywallPopup: boolean;
  setShowPaywallPopup: (show: boolean) => void;
  setIsSubscribed: (subscribed: boolean) => void;
  activeScreenIndex: number;
  setActiveScreenIndex: (index: number) => void;
  hasUploaded: boolean;
  isSubscribed: boolean;
}

interface SelectedPurchase {
  name: string;
  price: string;
}

const isIOSPlatform = () => {
  if (typeof window === 'undefined') return false;
  const cap = (window as unknown as { Capacitor?: { getPlatform?: () => string; isNativePlatform?: () => boolean } }).Capacitor;
  return cap?.getPlatform?.() === 'ios' || (cap?.isNativePlatform?.() && /iPad|iPhone|iPod/.test(navigator.userAgent));
};

export default function PaywallScreen({
  showMatrix,
  setShowMatrix,
  showPaywallPopup,
  setShowPaywallPopup,
  setIsSubscribed,
  activeScreenIndex,
  setActiveScreenIndex,
  hasUploaded,
  isSubscribed
}: PaywallScreenProps) {
  
  // Custom Apple Pay / Google Pay states
  const [showApplePaySheet, setShowApplePaySheet] = useState(false);
  const [showGooglePaySheet, setShowGooglePaySheet] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<SelectedPurchase | null>(null);
  const [payProcessing, setPayProcessing] = useState(false);

  const triggerPaymentSheet = (planName: string, price: string, type: 'apple' | 'google') => {
    setSelectedPurchase({ name: planName, price });
    if (type === 'apple') {
      setShowApplePaySheet(true);
    } else {
      setShowGooglePaySheet(true);
    }
  };

  const handlePaymentConfirm = () => {
    setPayProcessing(true);
    setTimeout(() => {
      setPayProcessing(false);
      setShowApplePaySheet(false);
      setShowGooglePaySheet(false);
      setIsSubscribed(true);
      setShowPaywallPopup(true);
    }, 1800);
  };

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-[#FAF8F5] text-slate-900 h-full select-none justify-between">
      
      {/* Header Navigation */}
      <div className="px-4 py-3 flex justify-between items-center bg-[#EAE7DF] border-b border-slate-100">
        {showMatrix ? (
          <button 
            type="button"
            onClick={() => setShowMatrix(false)}
            className="flex items-center space-x-1 text-xs font-black text-slate-700 hover:text-slate-950 transition duration-200"
          >
            <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Plans</span>
          </button>
        ) : (
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DF5B30] animate-pulse" />
            <span className="text-[10px] font-mono font-black text-slate-700 tracking-wider uppercase">Pro Access</span>
          </div>
        )}
        <button type="button" className="text-[10px] font-black text-slate-500 hover:text-slate-950 transition duration-200">
          Restore
        </button>
      </div>

      {/* Screen Body */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative bg-[#FAF8F5] flex flex-col justify-start">
        
        {/* View 1: Pricing Plans */}
        <div className={`transition-all duration-300 px-4 py-4 space-y-4 ${
          showMatrix ? 'absolute -translate-x-full opacity-0 pointer-events-none' : 'relative translate-x-0 opacity-100'
        }`}>
          
          {/* Value Proposition */}
          <div className="text-center space-y-1">
            <h3 className="text-[15px] font-black text-slate-900 tracking-tight leading-snug uppercase">
              Unlock Unlimited Legal Clarity
            </h3>
            <p className="text-[10px] text-slate-500 leading-normal font-bold">
              Select a one-time pack to decrypt clauses and reveal hidden legal risks instantly.
            </p>
          </div>

          {/* Tiered Options */}
          <div className="space-y-4">
            
            {/* Card 1: Free Trial */}
            <div className="rounded-2xl border border-slate-150/80 bg-white/70 p-4 space-y-2 flex flex-col justify-between shadow-[0_8px_25px_rgba(0,0,0,0.04)] opacity-90">
              <div className="flex justify-between items-start">
                <div className="text-left">
                  <h4 className="text-xs font-black text-slate-900 uppercase">Free Trial</h4>
                  <span className="text-[9px] text-slate-450 font-bold">Try before you buy</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-slate-900">$0</span>
                </div>
              </div>
              <ul className="space-y-0.5 text-[9px] text-slate-500 font-bold text-left">
                <li>✓ 2 document analyses</li>
                <li>✓ All premium features</li>
                <li>✓ 5 AI questions per document</li>
                <li>✓ 12 months validity</li>
              </ul>
              <div className="w-full text-center py-2 bg-slate-50 border border-slate-200 rounded-xl text-[8.5px] font-black uppercase tracking-wider text-slate-450 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                Active Tier
              </div>
            </div>

            {/* Card 2: Starter Pack */}
            <div className="rounded-2xl border border-slate-150/80 bg-white p-4 space-y-3.5 shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:scale-[1.01] transition-all">
              <div className="flex justify-between items-start">
                <div className="text-left">
                  <h4 className="text-xs font-black text-slate-900 uppercase">Starter</h4>
                  <span className="text-[9px] text-slate-450 font-bold">For occasional use</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-slate-900">$29</span>
                  <span className="text-[8px] text-slate-400 block font-bold">one-time</span>
                </div>
              </div>
              <ul className="space-y-0.5 text-[9px] text-slate-500 font-bold text-left">
                <li>✓ 10 document analyses</li>
                <li>✓ 5 AI questions per document</li>
                <li>✓ All premium features</li>
                <li>✓ 12 months validity</li>
              </ul>
              
              {/* Apple Pay / Google Pay Express row */}
              {isIOSPlatform() ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsSubscribed(true);
                    setShowPaywallPopup(true);
                  }}
                  className="w-full py-2 bg-[#DF5B30] hover:bg-[#c94b22] text-white rounded-xl transition flex items-center justify-center space-x-1 shadow-[0_4px_10px_rgba(223,91,48,0.15)] text-[9px] font-black uppercase tracking-wider"
                >
                  <span>Activate Starter (iOS Free Preview)</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => triggerPaymentSheet('Starter Pack', '$29.00', 'apple')}
                    className="py-2 bg-black text-white rounded-xl border border-black hover:bg-slate-900 transition flex items-center justify-center space-x-1 shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
                  >
                    <span className="text-xs"></span>
                    <span className="text-[9px] font-black uppercase tracking-wider">Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerPaymentSheet('Starter Pack', '$29.00', 'google')}
                    className="py-2 bg-white text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition flex items-center justify-center space-x-1 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
                  >
                    <span className="text-xs">G</span>
                    <span className="text-[9px] font-black uppercase tracking-wider">Pay</span>
                  </button>
                </div>
              )}
            </div>

            {/* Card 3: Professional Pack */}
            <div className="rounded-2xl border border-slate-150/80 bg-white p-4 space-y-3.5 relative shadow-[0_8px_30px_rgba(223,91,48,0.08)] pt-6 hover:scale-[1.01] transition-all">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#DF5B30] text-white text-[8px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest whitespace-nowrap shadow-[0_4px_10px_rgba(223,91,48,0.15)]">
                MOST POPULAR
              </div>
              <div className="flex justify-between items-start mt-1">
                <div className="text-left">
                  <h4 className="text-xs font-black text-slate-900 uppercase">Professional</h4>
                  <span className="text-[9px] text-slate-450 font-bold">For regular users</span>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <span className="text-[9.5px] line-through text-slate-400 font-bold">$72.50</span>
                    <span className="text-sm font-black text-slate-900">$59</span>
                  </div>
                  <span className="text-[8px] text-[#DF5B30] block font-black">one-time · Save 19%</span>
                </div>
              </div>
              <ul className="space-y-0.5 text-[9px] text-slate-500 font-bold text-left">
                <li>✓ 25 document analyses</li>
                <li>✓ 5 AI questions per document</li>
                <li>✓ All premium features</li>
                <li>✓ Priority email support</li>
                <li>✓ 12 months validity</li>
              </ul>
              
              {/* Apple Pay / Google Pay Express row */}
              {isIOSPlatform() ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsSubscribed(true);
                    setShowPaywallPopup(true);
                  }}
                  className="w-full py-2 bg-[#DF5B30] hover:bg-[#c94b22] text-white rounded-xl transition flex items-center justify-center space-x-1 shadow-[0_4px_10px_rgba(223,91,48,0.15)] text-[9px] font-black uppercase tracking-wider"
                >
                  <span>Activate Pro (iOS Free Preview)</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => triggerPaymentSheet('Professional Pack', '$59.00', 'apple')}
                    className="py-2 bg-black text-white rounded-xl border border-black hover:bg-slate-900 transition flex items-center justify-center space-x-1 shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
                  >
                    <span className="text-xs"></span>
                    <span className="text-[9px] font-black uppercase tracking-wider">Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerPaymentSheet('Professional Pack', '$59.00', 'google')}
                    className="py-2 bg-white text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition flex items-center justify-center space-x-1 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
                  >
                    <span className="text-xs">G</span>
                    <span className="text-[9px] font-black uppercase tracking-wider">Pay</span>
                  </button>
                </div>
              )}
            </div>

            {/* Card 4: Enterprise Pack */}
            <div className="rounded-2xl border border-slate-150/80 bg-white p-4 space-y-3.5 shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:scale-[1.01] transition-all">
              <div className="flex justify-between items-start">
                <div className="text-left">
                  <h4 className="text-xs font-black text-slate-900 uppercase">Enterprise</h4>
                  <span className="text-[9px] text-slate-450 font-bold">For teams & high volume</span>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <span className="text-[9.5px] line-through text-slate-400 font-bold">$290</span>
                    <span className="text-sm font-black text-slate-900">$199</span>
                  </div>
                  <span className="text-[8px] text-[#DF5B30] block font-black">one-time · Save 31%</span>
                </div>
              </div>
              <ul className="space-y-0.5 text-[9px] text-slate-500 font-bold text-left">
                <li>✓ 100 document analyses</li>
                <li>✓ 5 AI questions per document</li>
                <li>✓ All premium features</li>
                <li>✓ Priority support</li>
                <li>✓ 12 months validity</li>
              </ul>
              
              {isIOSPlatform() ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsSubscribed(true);
                    setShowPaywallPopup(true);
                  }}
                  className="w-full py-2 bg-[#DF5B30] hover:bg-[#c94b22] text-white rounded-xl transition flex items-center justify-center space-x-1 shadow-[0_4px_10px_rgba(223,91,48,0.15)] text-[9px] font-black uppercase tracking-wider"
                >
                  <span>Activate Enterprise (iOS Free Preview)</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => triggerPaymentSheet('Enterprise Pack', '$199.00', 'apple')}
                    className="py-2 bg-black text-white rounded-xl border border-black hover:bg-slate-900 transition flex items-center justify-center space-x-1 shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
                  >
                    <span className="text-xs"></span>
                    <span className="text-[9px] font-black uppercase tracking-wider">Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerPaymentSheet('Enterprise Pack', '$199.00', 'google')}
                    className="py-2 bg-white text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition flex items-center justify-center space-x-1 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
                  >
                    <span className="text-xs">G</span>
                    <span className="text-[9px] font-black uppercase tracking-wider">Pay</span>
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Toggle view pricing matrix */}
          <button
            type="button"
            onClick={() => setShowMatrix(true)}
            className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 font-black rounded-xl text-[10px] uppercase tracking-wide transition-all flex items-center justify-center space-x-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
          >
            <span>View Full Details Matrix</span>
            <svg className="w-3.5 h-3.5 text-[#DF5B30]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Compliance Logos */}
          <div className="pt-3 border-t border-slate-100 text-center space-y-1.5">
            <div className="text-[8.5px] text-slate-450 font-mono flex items-center justify-center space-x-1 font-bold">
              <span>🔒 SOC2 Compliant • Bank-Grade Security</span>
            </div>
            {isIOSPlatform() ? (
              <div className="text-[9px] text-emerald-600 font-black uppercase tracking-wider">
                ✓ Free Developer Preview Activated
              </div>
            ) : (
              <div className="text-[9px] text-[#DF5B30] font-black uppercase tracking-wider">
                Secure Checkout · 256-bit Encryption
              </div>
            )}
          </div>

        </div>

        {/* View 2: Comparison Matrix */}
        <div className={`transition-all duration-300 px-4 py-4 flex flex-col space-y-4 ${
          showMatrix ? 'relative translate-x-0 opacity-100' : 'absolute translate-x-full opacity-0 pointer-events-none'
        }`}>
          
          <div className="space-y-1 text-left">
            <h3 className="text-base font-black text-slate-950 tracking-tight uppercase">Compare Plans</h3>
            <p className="text-[10px] text-slate-500 leading-normal font-bold">
              Choose the perfect tier for your document auditing volume.
            </p>
          </div>

          {/* Comparison Matrix Table */}
          <div className="bg-white border border-slate-150/80 rounded-2xl overflow-hidden p-3.5 space-y-3.5 shadow-[0_8px_25px_rgba(0,0,0,0.04)]">
            
            {/* Table Head */}
            <div className="grid grid-cols-[100px_70px_80px] gap-1 pb-2.5 border-b border-slate-200 items-center">
              <div className="text-[9px] font-black text-slate-400 tracking-wider uppercase text-left">CAPABILITY</div>
              <div className="text-[9px] font-black text-slate-400 text-center">FREE</div>
              <div className="text-[9px] font-black text-[#DF5B30] text-center">PROFESSIONAL</div>
            </div>

            {/* Feature lists */}
            <div className="space-y-2">
              <div className="grid grid-cols-[100px_70px_80px] gap-1 py-1 items-center">
                <div className="text-[9.5px] text-slate-800 font-black text-left">Analyses</div>
                <div className="text-[9.5px] text-slate-500 text-center font-medium">2 Docs</div>
                <div className="text-[9.5px] text-slate-900 font-black text-center">25 Docs</div>
              </div>

              <div className="grid grid-cols-[100px_70px_80px] gap-1 py-1 items-center">
                <div className="text-[9.5px] text-slate-800 font-black text-left">Validity</div>
                <div className="text-[9.5px] text-slate-500 text-center font-medium">12 mos</div>
                <div className="text-[9.5px] text-slate-900 font-black text-center">12 mos</div>
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-100 pt-2.5">
              <div className="grid grid-cols-[100px_70px_80px] gap-1 py-1 items-center">
                <div className="text-[9.5px] text-slate-800 font-black text-left">AI Q&A Questions</div>
                <div className="text-[9.5px] text-slate-500 text-center font-medium">5 / doc</div>
                <div className="text-[9.5px] text-slate-900 font-black text-center">5 / doc</div>
              </div>

              <div className="grid grid-cols-[100px_70px_80px] gap-1 py-1 items-center">
                <div className="text-[9.5px] text-slate-800 font-black text-left">Support</div>
                <div className="text-[9.5px] text-slate-500 text-center font-medium">Standard</div>
                <div className="text-[9.5px] text-[#DF5B30] font-black text-center">Priority Email</div>
              </div>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowMatrix(false)}
            className="w-full py-2.5 bg-[#DF5B30] text-white border border-transparent rounded-xl text-[10px] font-black transition shadow-[0_4px_12px_rgba(223,91,48,0.2)] active:scale-[0.98] mt-2"
          >
            Back to Plans
          </button>

        </div>

      </div>

      {/*  Pay Mockup Overlay (Stripe Mobile SDK high fidelity mockup) */}
      {showApplePaySheet && selectedPurchase && (
        <div className="absolute inset-0 bg-slate-950/60 z-50 flex flex-col justify-end">
          <div className="bg-[#121212] text-white border-t-4 border-slate-855 rounded-t-3xl p-5 space-y-4 animate-in slide-in-from-bottom duration-250">
            
            {/* Modal Head */}
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-sm font-black text-white"> Pay</span>
              <button 
                type="button" 
                onClick={() => setShowApplePaySheet(false)}
                className="text-xs text-slate-400 font-bold hover:text-white"
              >
                Cancel
              </button>
            </div>

            {/* Merchant Details */}
            <div className="space-y-3.5 text-left text-xs font-bold">
              <div className="flex justify-between text-slate-450">
                <span>MERCHANT</span>
                <span className="text-white">LEGALDECODER INC.</span>
              </div>
              <div className="flex justify-between text-slate-455">
                <span>PLAN</span>
                <span className="text-white uppercase">{selectedPurchase.name}</span>
              </div>
              <div className="flex justify-between text-slate-455">
                <span>CARD</span>
                <span className="text-white flex items-center space-x-1">
                  <span>💳</span>
                  <span>Apple Card (•••• 1234)</span>
                </span>
              </div>
              <div className="flex justify-between text-slate-455 border-t border-slate-850 pt-3">
                <span>TOTAL</span>
                <span className="text-white text-base font-black font-mono">{selectedPurchase.price}</span>
              </div>
            </div>

            {/* Apple Touch ID / Face ID Simulator */}
            <div className="py-4 flex flex-col items-center justify-center space-y-2 border-t border-slate-850">
              {payProcessing ? (
                <div className="flex flex-col items-center space-y-2">
                  <svg className="animate-spin h-7 w-7 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase animate-pulse">
                    Processing Payment...
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handlePaymentConfirm}
                  className="flex flex-col items-center space-y-1.5 group active:scale-95 transition"
                >
                  <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center bg-slate-900 text-2xl animate-pulse">
                    👤
                  </div>
                  <span className="text-[9.5px] text-slate-300 font-black uppercase tracking-wider">
                    Double Click to Pay
                  </span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Google Pay Mockup Overlay */}
      {showGooglePaySheet && selectedPurchase && (
        <div className="absolute inset-0 bg-slate-950/60 z-50 flex flex-col justify-end">
          <div className="bg-white text-slate-900 rounded-t-3xl p-5 space-y-4 animate-in slide-in-from-bottom duration-250 border-t-4 border-slate-200">
            
            {/* Modal Head */}
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-sm font-black text-slate-900">G Pay</span>
              <button 
                type="button" 
                onClick={() => setShowGooglePaySheet(false)}
                className="text-xs text-slate-400 font-bold hover:text-slate-700"
              >
                Cancel
              </button>
            </div>

            {/* Merchant Details */}
            <div className="space-y-3 text-left text-xs font-bold">
              <div className="flex justify-between text-slate-500">
                <span>MERCHANT</span>
                <span className="text-slate-900">LEGALDECODER INC.</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>PLAN</span>
                <span className="text-slate-900 uppercase">{selectedPurchase.name}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>ACCOUNT</span>
                <span className="text-slate-900 flex items-center space-x-1">
                  <span>💳</span>
                  <span>Google Wallet (•••• 5678)</span>
                </span>
              </div>
              <div className="flex justify-between text-slate-505 border-t border-slate-100 pt-3">
                <span>TOTAL</span>
                <span className="text-slate-900 text-base font-black font-mono">{selectedPurchase.price}</span>
              </div>
            </div>

            {/* Confirm button */}
            <div className="pt-2 border-t border-slate-100">
              {payProcessing ? (
                <div className="flex flex-col items-center space-y-2 py-2">
                  <svg className="animate-spin h-7 w-7 text-[#DF5B30]" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase animate-pulse">
                    Authorizing Google Pay...
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handlePaymentConfirm}
                  className="w-full py-2.5 bg-[#DF5B30] text-white border border-transparent rounded-xl text-[10px] font-black uppercase tracking-wider shadow-[0_4px_12px_rgba(223,91,48,0.2)]"
                >
                  Pay with Google Wallet
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Paywall Confirmation Popup Overlay */}
      {showPaywallPopup && (
        <div className="absolute inset-0 bg-[#FAF8F5]/95 backdrop-blur-[1px] z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-150 rounded-3xl p-5 text-center space-y-4 max-w-[260px] shadow-[0_12px_30px_rgba(0,0,0,0.1)] animate-in fade-in zoom-in duration-200">
            <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mx-auto shadow-[0_4px_10px_rgba(16,185,129,0.1)]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">🎉 Activated!</h4>
              <p className="text-[9.5px] text-slate-500 leading-relaxed font-bold">
                One-time package successfully unlocked. Enjoy your contract protections.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowPaywallPopup(false)}
              className="w-full py-2.5 bg-[#DF5B30] text-white border border-transparent rounded-xl text-[10px] font-black transition shadow-[0_4px_12px_rgba(223,91,48,0.2)]"
            >
              Dismiss
            </button>
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
