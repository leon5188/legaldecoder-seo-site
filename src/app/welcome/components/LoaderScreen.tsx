import React from 'react';

interface LoaderScreenProps {
  loaderProgress: number;
  trustSlide: number;
}

export default function LoaderScreen({
  loaderProgress,
  trustSlide
}: LoaderScreenProps) {
  const circleRadius = 45;
  const circumference = 2 * Math.PI * circleRadius;

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#F4F2EB] select-none h-full text-slate-900">
      
      {/* Header info */}
      <div className="text-center pt-7 pb-2 space-y-1">
        <h3 className="text-xs font-black text-slate-900 tracking-widest uppercase font-mono animate-pulse">Decoding Contract...</h3>
        <p className="text-[9.5px] text-slate-500 font-black uppercase tracking-wider">Estimated analysis: &lt; 60 seconds</p>
      </div>

      {/* Circular Progress Ring */}
      <div className="relative w-28 h-28 flex items-center justify-center mx-auto my-1">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="56"
            cy="56"
            r={circleRadius}
            className="stroke-slate-300"
            strokeWidth="5"
            fill="transparent"
          />
          <circle
            cx="56"
            cy="56"
            r={circleRadius}
            stroke="#0f172a"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (loaderProgress / 100) * circumference}
            className="transition-all duration-300 ease-out"
            strokeLinecap="round"
          />
        </svg>
        {/* Inner progress text */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-xl font-black text-slate-900 font-mono leading-none">{loaderProgress}%</span>
          <span className="text-[7.5px] text-slate-500 font-black uppercase tracking-widest mt-1">ANALYZING</span>
        </div>
      </div>

      {/* Live Action Message */}
      <div className="text-center px-4 min-h-[28px] flex items-center justify-center">
        <p className="text-[10px] font-black text-slate-700 leading-tight">
          {loaderProgress < 25 && "🔒 Encrypting & loading document into memory safely..."}
          {loaderProgress >= 25 && loaderProgress < 70 && "🔍 Benchmarking 24 clauses against local state statutes..."}
          {loaderProgress >= 70 && "📊 Rating hidden traps (High/Med/Low risk flags)..."}
        </p>
      </div>

      {/* Real-Time Terminal Activity Feed */}
      <div className="bg-white border-2 border-slate-900 rounded-2xl p-3 font-mono text-[8px] text-slate-800 space-y-1 mx-4 h-[115px] overflow-y-auto no-scrollbar flex flex-col justify-start select-none shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] text-left">
        {[
          { min: 0, text: "[OK] Document loaded into localized runtime memory." },
          { min: 20, text: "🏃 Running check: Unenforceable automatic renewals..." },
          { min: 40, text: "⏳ Flagged 2 moderate risks in Liability Limitation rules." },
          { min: 60, text: "> Section 4.2: Checking Late Fees against California statutory caps..." },
          { min: 80, text: "> Section 7.1: Identifying hidden jury trial waiver clauses..." },
          { min: 95, text: "> System: Evaluating security deposit holding timelines..." }
        ].map((log, idx) => {
          if (loaderProgress >= log.min) {
            let colorClass = "text-slate-500";
            if (log.text.startsWith("[OK]")) colorClass = "text-emerald-700 font-black";
            else if (log.text.includes("Flagged")) colorClass = "text-amber-700 font-black animate-pulse";
            else if (log.text.startsWith(">")) colorClass = "text-blue-800 font-bold";
            else if (log.text.includes("Running")) colorClass = "text-indigo-800 font-bold";
            
            return (
              <div key={idx} className={`${colorClass} leading-tight`}>
                {log.text}
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Educational Trust Carousel */}
      <div className="px-5 py-3.5 border-t-2 border-slate-900 bg-[#EAE7DF] text-center flex-shrink-0">
        <div className="relative h-10 overflow-hidden flex items-center justify-center">
          {trustSlide === 0 ? (
            <div className="text-[9.5px] text-slate-700 leading-normal transition-all duration-300">
              <span className="font-black text-slate-900 block uppercase tracking-wide">Did you know?</span>
              91% of consumers accept terms without reading them first.
            </div>
          ) : (
            <div className="text-[9.5px] text-slate-700 leading-normal transition-all duration-300">
              <span className="font-black text-slate-900 block uppercase tracking-wide">Privacy Locked</span>
              Your file is processed purely in-memory and auto-deleted in 24h.
            </div>
          )}
        </div>
        {/* Small page dot row */}
        <div className="flex justify-center space-x-1 mt-1.5">
          <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${trustSlide === 0 ? 'bg-slate-900' : 'bg-slate-350'}`} />
          <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${trustSlide === 1 ? 'bg-slate-900' : 'bg-slate-350'}`} />
        </div>
      </div>

    </div>
  );
}
