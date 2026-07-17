"use client";

import React, { useState } from 'react';
import BottomNav from './BottomNav';

interface ReportCardScreenProps {
  isSubscribed: boolean;
  activeScreenIndex: number;
  setActiveScreenIndex: (index: number) => void;
  hasUploaded: boolean;
  docName: string;
}

interface ContractCategoryData {
  verdict: string;
  verdictRisk: 'HIGH' | 'CAUTION' | 'SAFE';
  verdictDesc: string;
  keyTerms: string[];
  redFlags: { title: string; desc: string; risk: 'High' | 'Medium' }[];
}

export default function ReportCardScreen({
  isSubscribed,
  activeScreenIndex,
  setActiveScreenIndex,
  hasUploaded,
  docName
}: ReportCardScreenProps) {
  const [activeCategory, setActiveCategory] = useState<'rental' | 'freelance' | 'nda'>('rental');
  const [showWipeSuccess, setShowWipeSuccess] = useState(false);

  // Hardcoded scenario-based data mapping
  const categoryData: Record<'rental' | 'freelance' | 'nda', ContractCategoryData> = {
    rental: {
      verdict: "DO NOT SIGN UNTIL AMENDED",
      verdictRisk: "HIGH",
      verdictDesc: "This lease agreement contains severe liability imbalances, including automatic deposit forfeiture and unilateral landlord eviction covenants.",
      keyTerms: [
        "Lease Duration: August 1, 2026 – July 31, 2027 (12 Months)",
        "Security Deposit: $2,500 due immediately on signing",
        "Monthly Rental: $1,250 due on the 1st of each month",
        "Landlord Right-of-Entry: 24-hour advance written notice required"
      ],
      redFlags: [
        {
          title: "Automatic Deposit Forfeiture",
          desc: "Clause 14.2 allows the landlord to keep the entire $2,500 deposit if the lease is terminated early for *any* reason, regardless of mitigation.",
          risk: "High"
        },
        {
          title: "Waiver of Eviction Hearing",
          desc: "Clause 18.4 permits the landlord to perform self-help lockouts and evict tenant within 3 days of rent default, bypassing standard judicial hearings.",
          risk: "High"
        }
      ]
    },
    freelance: {
      verdict: "CAUTION: RENEGOTIATION ADVISED",
      verdictRisk: "CAUTION",
      verdictDesc: "The payment terms are highly unfavorable, and IP rights transfer before final payment is settled in full.",
      keyTerms: [
        "Payment Schedule: Net 90 days after delivery invoice approval",
        "Free Revision Cycles: Cap at 3 rounds; additional rounds at hourly rate",
        "Warranty Duration: 30-day bug-fixing support after handoff"
      ],
      redFlags: [
        {
          title: "Net 90 Payment Cycle",
          desc: "Waiting 90 days for payments puts extreme cash flow strain on freelancers. Recommend amending to Net 30 or Net 15.",
          risk: "Medium"
        },
        {
          title: "Pre-Payment IP Transfer",
          desc: "Clause 5.1 transfers all intellectual property rights to the client *upon creation* rather than *upon receipt of final payment*.",
          risk: "High"
        }
      ]
    },
    nda: {
      verdict: "SAFE TO SIGN",
      verdictRisk: "SAFE",
      verdictDesc: "Covenants are reciprocal and contain standard carve-outs for public disclosure and legal compliance requests.",
      keyTerms: [
        "Confidentiality Duration: 3 Years from initial disclosure date",
        "Exemptions: Publicly known info or independently developed IP",
        "Notice of Order: Must inform disclosing party immediately if ordered by court"
      ],
      redFlags: [
        {
          title: "Unilateral Covenant (Minor)",
          desc: "Although balanced, ensure any mutual project scope definitions are explicitly attached in the appendix before signing.",
          risk: "Medium"
        }
      ]
    }
  };

  const currentData = categoryData[activeCategory];

  const handleWipeTrigger = () => {
    setShowWipeSuccess(true);
    setTimeout(() => {
      setShowWipeSuccess(false);
    }, 2800);
  };

  return (
    <div className="flex-1 flex flex-col justify-between h-full bg-[#FAF8F5] text-slate-900 select-none relative overflow-hidden">
      
      {/* Header Navigation */}
      <div className="px-4 py-3 flex justify-between items-center bg-[#EAE7DF] border-b border-slate-100">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#DF5B30] animate-pulse" />
          <span className="text-[10px] font-mono font-black text-slate-700 tracking-wider uppercase">AI Analysis</span>
        </div>
        <span className="text-[9px] font-mono font-black text-slate-500 uppercase truncate max-w-[150px]">
          {hasUploaded ? docName : 'No Document'}
        </span>
      </div>

      {/* Screen Body */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col justify-start">
        
        {/* If no document has been uploaded yet */}
        {!hasUploaded ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4 my-auto">
            <span className="text-4xl">📄</span>
            <div className="space-y-1.5">
              <h4 className="text-xs font-black uppercase text-slate-900">No Document Decoded</h4>
              <p className="text-[10px] text-slate-500 leading-normal font-bold">
                Please upload a contract on the Home Screen first to generate your automated risk report.
                You can also view sample report templates by clicking below.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveScreenIndex(1)}
              className="px-4 py-2 bg-[#DF5B30] text-white border border-transparent rounded-xl text-[10px] font-black uppercase tracking-wider shadow-[0_4px_12px_rgba(223,91,48,0.2)] active:scale-[0.98] transition"
            >
              Go to Home Screen
            </button>
          </div>
        ) : (
          <div className="p-4 space-y-4 flex flex-col">
            
            {/* Category Selector Tab Bar (Scenic Adaptability) */}
            <div className="space-y-1">
              <span className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest text-left block">
                SCENE PRESET TEMPLATE
              </span>
              <div className="flex bg-[#FAF8F5] border border-slate-200 rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                {(['rental', 'freelance', 'nda'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`flex-1 py-2 text-[9.5px] font-black uppercase tracking-wider transition-all border-r last:border-r-0 border-slate-200 ${
                      activeCategory === cat 
                        ? 'bg-[#DF5B30] text-white' 
                        : 'text-slate-500 hover:bg-slate-100/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* VERDICT SECTION */}
            <div className="bg-white border border-slate-150/80 rounded-2xl p-3.5 space-y-2 text-left shadow-[0_8px_25px_rgba(0,0,0,0.04)]">
              <div className="flex items-center space-x-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${
                  currentData.verdictRisk === 'HIGH' ? 'bg-[#DF5B30] animate-ping' : currentData.verdictRisk === 'CAUTION' ? 'bg-amber-500' : 'bg-emerald-500'
                }`} />
                <span className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest">
                  VERDICT SUMMARY
                </span>
              </div>
              <h3 className={`text-xs font-black uppercase ${
                currentData.verdictRisk === 'HIGH' ? 'text-[#DF5B30]' : currentData.verdictRisk === 'CAUTION' ? 'text-amber-600' : 'text-emerald-700'
              }`}>
                {currentData.verdict}
              </h3>
              <p className="text-[10px] text-slate-600 leading-relaxed font-bold">
                {currentData.verdictDesc}
              </p>
            </div>

            {/* ATTORNEY REFERRAL CALLOUT (Styleguide style alerts) */}
            {currentData.verdictRisk !== 'SAFE' && (
              <div className="bg-[#FFF2EE] border border-[#FFD9CE] rounded-2xl p-3.5 flex flex-col space-y-2 text-left shadow-[0_8px_25px_rgba(223,91,48,0.04)] animate-in fade-in slide-in-from-top-1 duration-300">
                <div className="flex justify-between items-start">
                  <div className="space-y-0.5">
                    <span className="text-[8px] font-mono font-black text-[#DF5B30] uppercase tracking-widest">
                      AVVO LEGAL ASSIST
                    </span>
                    <h4 className="text-[10px] font-black text-slate-900 uppercase">
                      High Risk Detected. Need Counsel?
                    </h4>
                  </div>
                  <span className="text-sm">⚖️</span>
                </div>
                <p className="text-[9.5px] text-slate-500 leading-normal font-bold">
                  Matched 3 certified local legal experts ready to negotiate these clauses.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveScreenIndex(3)}
                  className="w-full py-2 bg-[#DF5B30] hover:bg-[#c94b22] text-white rounded-xl text-[9px] font-black tracking-wide uppercase transition shadow-[0_4px_10px_rgba(223,91,48,0.15)] active:scale-[0.98]"
                >
                  View Attorney Match List
                </button>
              </div>
            )}

            {/* KEY TERMS SECTION */}
            <div className="bg-white border border-slate-150/80 rounded-2xl p-3.5 space-y-2 text-left shadow-[0_8px_25px_rgba(0,0,0,0.04)]">
              <span className="text-[8.5px] font-mono font-black text-slate-400 uppercase tracking-widest block">
                KEY CONTRACT TERMS
              </span>
              <ul className="space-y-1.5">
                {currentData.keyTerms.map((term, idx) => (
                  <li key={idx} className="text-[10px] text-slate-700 font-bold flex items-start space-x-1.5">
                    <span className="text-[#DF5B30] font-black">•</span>
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RED FLAGS / WARNINGS */}
            <div className="space-y-2">
              <span className="text-[8.5px] font-mono font-black text-slate-400 uppercase tracking-widest text-left block">
                RED FLAGS & LIABILITY RISKS
              </span>
              <div className="space-y-3">
                {currentData.redFlags.map((flag, idx) => (
                  <div 
                    key={idx}
                    className="bg-white border border-slate-150/80 rounded-2xl p-3.5 text-left space-y-1.5 shadow-[0_8px_25px_rgba(0,0,0,0.04)]"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-[10px] font-black uppercase text-[#DF5B30] truncate max-w-[180px]">
                        🚩 {flag.title}
                      </h4>
                      <span className="px-1.5 py-0.5 rounded bg-[#FFF2EE] border border-[#FFD9CE] text-[7px] font-mono font-black text-[#DF5B30] uppercase">
                        {flag.risk}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-bold">
                      {flag.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* DOWNLOAD & SHRED CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleWipeTrigger}
                className="w-full py-3 bg-[#DF5B30] hover:bg-[#c94b22] text-white border border-transparent rounded-xl text-[10px] font-black tracking-wider uppercase transition shadow-[0_4px_12px_rgba(223,91,48,0.2)] active:scale-[0.98]"
              >
                📥 Download PDF & Destroy Cloud Data
              </button>
              <span className="text-[8px] text-slate-400 font-mono tracking-wide text-center block mt-1.5 uppercase font-bold">
                🔒 Bank-grade local export • Temporary server files shredded
              </span>
            </div>

          </div>
        )}

      </div>

      {/* Cloud Data Wipe Confirmation Modal */}
      {showWipeSuccess && (
        <div className="absolute inset-0 bg-[#FAF8F5]/95 backdrop-blur-[1px] z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-150 rounded-3xl p-5 text-center space-y-4 max-w-[250px] shadow-[0_12px_30px_rgba(0,0,0,0.1)] animate-in fade-in zoom-in duration-200">
            <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-[0_4px_10px_rgba(16,185,129,0.1)]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-black text-slate-900 uppercase">Shredded Successfully!</h4>
              <p className="text-[9.5px] text-slate-500 leading-relaxed font-bold">
                PDF successfully saved locally. Cloud container cache has been securely wiped from all servers.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowWipeSuccess(false)}
              className="w-full py-2.5 bg-[#DF5B30] text-white border border-transparent rounded-xl text-[10px] font-black transition shadow-[0_4px_12px_rgba(223,91,48,0.2)] active:scale-[0.98]"
            >
              Close Securely
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
