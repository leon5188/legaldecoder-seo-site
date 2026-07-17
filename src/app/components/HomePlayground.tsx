"use client";

import React, { useState } from 'react';

interface PlaygroundClause {
  id: string;
  category: string;
  tabLabel: string;
  title: string;
  originalText: string;
  translatedText: string;
  riskRating: 'critical' | 'high' | 'medium';
  riskExplain: string;
  counterProposal: string;
}

const PLAYGROUND_CLAUSES: PlaygroundClause[] = [
  {
    id: "sublet",
    category: "🏠 Lease",
    tabLabel: "Termination",
    title: "Termination Penalties & Deposit Forfeiture",
    originalText: "Tenant shall not sublet the premises or assign this Lease without prior written consent of the Landlord. If Tenant terminates early, Tenant shall forfeit the security deposit and remain liable for all remaining rent.",
    translatedText: "No subletting without landlord consent. If you terminate early, you lose your deposit AND owe rent for the remaining lease term.",
    riskRating: "critical",
    riskExplain: "This constitutes an illegal double-recovery penalty. In most jurisdictions, landlords must make reasonable efforts to mitigate damages by re-renting, rather than collecting double rent.",
    counterProposal: "Request to revise: 'Tenant may terminate early with 60 days written notice and an early buyout fee equal to 2 months' rent, upon which the deposit is returned and the lease ends.'"
  },
  {
    id: "ip-trap",
    category: "💼 Freelance",
    tabLabel: "IP Assignment",
    title: "All-Hour IP Ownership Trap",
    originalText: "Any and all works, ideas, designs, or improvements created by Contractor during the term of this Agreement shall be the sole and exclusive property of Client, regardless of whether they relate to the Services.",
    translatedText: "Any and all code, ideas, designs, or improvements created by you during the contract term belong to the client, even if unrelated to your service.",
    riskRating: "high",
    riskExplain: "Extremely broad scope. If you build personal projects, weekend code, or designs for other clients during this term, the client could legally claim ownership.",
    counterProposal: "Amend to: 'Client only owns Intellectual Property rights in the specific Deliverables created and paid for under a Statement of Work, excluding Contractor's pre-existing IP and general tools.'"
  },
  {
    id: "breach-sla",
    category: "🚀 SaaS",
    tabLabel: "Data & Liability",
    title: "Uncapped Data Breach Liability",
    originalText: "Provider's aggregate liability under this Agreement is capped at 12 months fees, except in the event of a data security breach, for which Provider's damages shall be uncapped.",
    translatedText: "General liability cap is 12 months fees. However, in the event of a data breach, SaaS provider's liability shall be uncapped.",
    riskRating: "high",
    riskExplain: "Uncapped liability for data breaches exposes SaaS providers to bankruptcy. If a breach occurs via third-party libraries, uncapped claims will shut you down.",
    counterProposal: "Do not accept uncapped liability. Propose a 'Super-cap' equal to 3x or 5x the annual contract value, or a fixed cap (e.g., $1M-$2M)."
  }
];

export default function HomePlayground() {
  const [activePlaygroundId, setActivePlaygroundId] = useState<string>("sublet");
  const activePlayground = PLAYGROUND_CLAUSES.find(c => c.id === activePlaygroundId) || PLAYGROUND_CLAUSES[0];

  return (
    <div className="border-2 border-slate-900 bg-white rounded-3xl p-6 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)]">
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">AI Decoded Playground</h2>
        <p className="text-xs text-slate-500 font-bold mt-1">Click any sample below to view AI decoded translations and negotiation strategies.</p>
      </div>

      {/* Playground Selector Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {PLAYGROUND_CLAUSES.map((clause) => (
          <button
            key={clause.id}
            type="button"
            onClick={() => setActivePlaygroundId(clause.id)}
            className={`px-4 py-2 border-2 border-slate-900 rounded-full text-xs font-black transition-all ${
              activePlaygroundId === clause.id
                ? 'bg-slate-900 text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                : 'bg-[#F4F2EB] text-slate-700 hover:bg-slate-50 hover:scale-[1.01] active:translate-y-[1px]'
            }`}
          >
            {clause.category} - {clause.tabLabel}
          </button>
        ))}
      </div>

      {/* Visual Showcase Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Left side: Original Draft Text */}
        <div className="border-2 border-slate-900 bg-[#FAF9F5] rounded-2xl p-4.5 flex flex-col justify-between text-left shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
          <div>
            <span className="text-[8px] font-mono tracking-widest font-black text-slate-400 block uppercase mb-2">Original Contract Clause</span>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight mb-2">{activePlayground.title}</h4>
            <p className="text-[11px] leading-relaxed text-slate-700 font-mono italic">
              &ldquo;{activePlayground.originalText}&rdquo;
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-450 font-bold flex items-center space-x-1.5">
            <span>⚠️ Complex Legalese Draft</span>
          </div>
        </div>

        {/* Right side: AI Decoded */}
        <div className="border-2 border-slate-900 bg-white rounded-2xl p-4.5 flex flex-col justify-between text-left shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[8px] font-mono tracking-widest font-black text-emerald-600 block uppercase">LegalDecoder AI Analysis</span>
              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                activePlayground.riskRating === 'critical' ? 'bg-red-100 text-red-800 border border-red-500' : 'bg-amber-100 text-amber-800 border border-amber-500'
              }`}>
                {activePlayground.riskRating} RISK
              </span>
            </div>

            <div>
              <span className="text-[8.5px] font-bold text-slate-500 uppercase tracking-widest block">In Plain English:</span>
              <p className="text-xs font-extrabold text-slate-900 mt-0.5">{activePlayground.translatedText}</p>
            </div>

            <div>
              <span className="text-[8.5px] font-bold text-slate-500 uppercase tracking-widest block">Potential Risk:</span>
              <p className="text-[11px] text-slate-650 font-medium leading-relaxed mt-0.5">{activePlayground.riskExplain}</p>
            </div>

            <div>
              <span className="text-[8.5px] font-bold text-slate-500 uppercase tracking-widest block">How to Revise (Negotiation Tip):</span>
              <p className="text-[11px] text-emerald-800 font-extrabold leading-relaxed mt-0.5">{activePlayground.counterProposal}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
