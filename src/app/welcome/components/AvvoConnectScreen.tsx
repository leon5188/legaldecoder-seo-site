"use client";

import React, { useState } from 'react';
import BottomNav from './BottomNav';

interface AvvoConnectScreenProps {
  activeScreenIndex: number;
  setActiveScreenIndex: (index: number) => void;
  hasUploaded: boolean;
  isSubscribed: boolean;
}

export default function AvvoConnectScreen({
  activeScreenIndex,
  setActiveScreenIndex,
  hasUploaded,
  isSubscribed
}: AvvoConnectScreenProps) {
  
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState<string | null>(null);
  const [inquiryText, setInquiryText] = useState("");
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Mocked certified Avvo lawyers profiles
  const lawyers = [
    {
      name: "Marcus Vance, Esq.",
      rating: "9.9 Superb",
      reviews: "142 Reviews",
      specialty: "Tenancy & Eviction Defense",
      cost: "$275 / hr",
      location: "San Francisco, CA",
      avatar: "👔"
    },
    {
      name: "Elaine Rostova",
      rating: "9.8 Outstanding",
      reviews: "96 Reviews",
      specialty: "IP Covenants & NDAs",
      cost: "$310 / hr",
      location: "San Jose, CA",
      avatar: "👩‍💼"
    },
    {
      name: "David K. Sterling",
      rating: "10.0 Superb",
      reviews: "210 Reviews",
      specialty: "Freelance & Vendor Disputes",
      cost: "$290 / hr",
      location: "Oakland, CA",
      avatar: "👨‍⚖️"
    }
  ];

  const handleInquiryTrigger = (name: string) => {
    setSelectedLawyer(name);
    setInquirySuccess(false);
    setInquiryText("");
    setShowInquiryModal(true);
  };

  const handleInquirySubmit = () => {
    if (inquiryText.trim()) {
      setInquirySuccess(true);
      setTimeout(() => {
        setShowInquiryModal(false);
      }, 1800);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between h-full bg-[#FAF8F5] text-slate-900 select-none relative overflow-hidden">
      
      {/* Header Bar */}
      <div className="px-4 py-3 flex justify-between items-center bg-[#EAE7DF] border-b border-slate-100">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#DF5B30]" />
          <span className="text-[10px] font-mono font-black text-slate-700 tracking-wider uppercase">Avvo Directory</span>
        </div>
        <span className="text-[9px] font-black text-slate-500 uppercase">3 Experts Online</span>
      </div>

      {/* Screen Body */}
      <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-4 bg-[#FAF8F5] flex flex-col justify-start">
        
        {/* Top title */}
        <div className="text-left space-y-1 mt-1">
          <h3 className="text-base font-black text-slate-950 uppercase tracking-tight">Avvo Connect</h3>
          <p className="text-[9.5px] text-slate-550 leading-normal font-bold">
            Avvo matches you with certified local attorneys specialized in negotiating tenancy liabilities, NDAs, and corporate covenants.
          </p>
        </div>

        {/* Lawyers Listings */}
        <div className="space-y-4">
          {lawyers.map((lawyer, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-150/80 rounded-2xl p-3.5 space-y-3 shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:scale-[1.01] transition-all text-left"
            >
              {/* Lawyer Header info */}
              <div className="flex justify-between items-start">
                <div className="flex space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-xl shadow-[0_4px_10px_rgba(223,91,48,0.05)]">
                    {lawyer.avatar}
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black uppercase text-slate-950 tracking-tight">{lawyer.name}</h4>
                    <p className="text-[9px] text-[#DF5B30] font-black tracking-wide">{lawyer.specialty}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9.5px] font-black text-slate-950 block">{lawyer.cost}</span>
                  <span className="text-[7.5px] font-mono text-slate-400 block uppercase font-bold">{lawyer.location}</span>
                </div>
              </div>

              {/* Rating and stars block */}
              <div className="flex items-center space-x-2 bg-[#FAF8F5] border border-slate-100 rounded-xl px-2.5 py-1.5 text-[9px] font-black text-slate-700">
                <span className="text-amber-500">★★★★★</span>
                <span className="text-slate-800">{lawyer.rating}</span>
                <span className="text-slate-350">|</span>
                <span className="text-slate-450 font-bold">{lawyer.reviews}</span>
              </div>

              {/* Contact actions */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <a
                  href="tel:18005550199"
                  className="py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-[9px] font-black tracking-wider uppercase text-center transition active:scale-[0.98] shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
                >
                  📞 Direct Call
                </a>
                <button
                  type="button"
                  onClick={() => handleInquiryTrigger(lawyer.name)}
                  className="py-2 bg-[#DF5B30] hover:bg-[#c94b22] text-white rounded-xl text-[9px] font-black tracking-wider uppercase transition shadow-[0_4px_10px_rgba(223,91,48,0.15)] active:scale-[0.98]"
                >
                  ✉️ Send Message
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Small badge footer */}
        <div className="pt-2 text-center">
          <span className="text-[8.5px] text-slate-400 font-mono uppercase font-bold tracking-wide">
            ⚖️ Avvo Certified • Confidential Legal Inquiries
          </span>
        </div>

      </div>

      {/* Lawyer Inquiry message overlay */}
      {showInquiryModal && selectedLawyer && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px] z-50 flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] border border-slate-150 rounded-3xl p-4 w-full max-w-[280px] space-y-4 shadow-[0_12px_30px_rgba(0,0,0,0.15)] text-left">
            <div className="flex justify-between items-center">
              <div className="space-y-0.5">
                <span className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest block">INQUIRY FOR</span>
                <h4 className="text-[10px] font-black uppercase text-slate-950">{selectedLawyer}</h4>
              </div>
              <button 
                type="button"
                onClick={() => setShowInquiryModal(false)}
                className="w-5 h-5 rounded-full border border-slate-200 bg-white flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            {inquirySuccess ? (
              <div className="py-6 text-center space-y-2 animate-in fade-in zoom-in duration-200">
                <span className="text-2xl block">✉️</span>
                <h4 className="text-xs font-black uppercase text-slate-900">Message Delivered!</h4>
                <p className="text-[9.5px] text-slate-500 font-bold leading-normal">
                  Inquiry sent securely to {selectedLawyer}. You will receive a notification in your settings.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <textarea
                  rows={4}
                  value={inquiryText}
                  onChange={(e) => setInquiryText(e.target.value)}
                  placeholder="Explain your liability concerns or paste the red flags here..."
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#DF5B30] focus:ring-1 focus:ring-[#DF5B30] resize-none font-sans"
                />
                <button
                  type="button"
                  onClick={handleInquirySubmit}
                  className="w-full py-2.5 bg-[#DF5B30] text-white border border-transparent rounded-xl text-[10px] font-black uppercase tracking-wider shadow-[0_4px_12px_rgba(223,91,48,0.2)] active:scale-[0.98] transition"
                >
                  Send Encrypted Msg
                </button>
              </div>
            )}

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
