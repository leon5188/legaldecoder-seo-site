"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface Term {
  term: string;
  title: string;
  category?: string;
  [key: string]: unknown;
}

interface DictionaryClientProps {
  initialTerms: Term[];
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function DictionaryClient({ initialTerms }: DictionaryClientProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  // 1. Filter terms
  const filteredTerms = useMemo(() => {
    return initialTerms.filter((t) => {
      const matchesSearch = 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.term.toLowerCase().includes(searchQuery.toLowerCase());
      
      const firstLetter = t.term.charAt(0).toUpperCase();
      const matchesLetter = selectedLetter ? firstLetter === selectedLetter : true;

      return matchesSearch && matchesLetter;
    });
  }, [initialTerms, searchQuery, selectedLetter]);

  // 2. Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLetter(null);
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 relative z-10 text-left">
      
      {/* Header Info */}
      <header className="mb-10 text-center space-y-4">
        <div className="inline-block px-3 py-1 bg-white border-2 border-slate-900 rounded-full text-xs font-black shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] uppercase tracking-wider">
          📙 A-Z Legal Encyclopedia
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
          LEGAL DICTIONARY
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto font-medium leading-relaxed">
          Explore plain English translations and hidden traps inside legalese to protect your interests.
        </p>
      </header>

      {/* Search Bar & Stats */}
      <div className="mb-8 max-w-2xl mx-auto flex flex-col md:flex-row gap-3 items-center">
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type a term to filter... (e.g. Sublet, IP, NDA)"
            className="w-full bg-white border-2 border-slate-900 rounded-2xl px-5 py-3.5 text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:border-slate-955 font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-450 hover:text-slate-900 text-sm font-bold"
            >
              ✕
            </button>
          )}
        </div>
        {selectedLetter && (
          <button
            onClick={() => setSelectedLetter(null)}
            className="flex-shrink-0 px-4 py-3.5 bg-slate-900 text-white border-2 border-slate-900 text-xs font-black rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px]"
          >
            Letter: {selectedLetter} ✕
          </button>
        )}
      </div>

      {/* Main Grid with Alphabet Navigation */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* A-Z Alphabetical Sidebar Selector */}
        <aside className="w-full lg:w-48 lg:sticky lg:top-8 bg-white border-2 border-slate-900 rounded-3xl p-4.5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex-shrink-0">
          <h4 className="text-[10px] font-black text-slate-450 uppercase tracking-widest mb-3 text-center lg:text-left">Navigate by Letter</h4>
          <div className="flex flex-wrap lg:grid lg:grid-cols-4 gap-1.5 justify-center lg:justify-items-center">
            {ALPHABET.map((letter) => {
              const isActive = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => setSelectedLetter(isActive ? null : letter)}
                  className={`w-7.5 h-7.5 flex items-center justify-center rounded-lg text-xs font-mono font-black border-2 transition-all ${
                    isActive
                      ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                      : 'bg-[#F4F2EB] border-slate-900 text-slate-800 hover:bg-slate-50 hover:scale-105'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
          <button
            onClick={handleResetFilters}
            className="w-full mt-4 py-2 border-2 border-slate-900 bg-white hover:bg-slate-55 hover:scale-[1.01] text-slate-900 rounded-xl text-[10px] font-black tracking-wide uppercase transition active:translate-y-[1px] shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
          >
            Reset All Filters
          </button>
        </aside>

        {/* Content Area */}
        <div className="flex-1 w-full">
          {filteredTerms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTerms.map((t) => (
                <Link 
                  key={t.term} 
                  href={`/dictionary/${t.term}`}
                  className="p-5.5 bg-white rounded-3xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:scale-[1.01] hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all group flex flex-col justify-between h-44 text-left"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-mono font-black text-slate-400 uppercase">
                        {t.term.charAt(0).toUpperCase()} Section
                      </span>
                      {t.category && (
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 text-[8px] font-black text-slate-600 uppercase">
                          {t.category}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 uppercase mt-2 tracking-tight">
                      {t.title}
                    </h3>
                    <p className="text-[11px] text-slate-550 mt-2 line-clamp-3 leading-relaxed font-bold">
                      Learn what {t.title} means, get plain English translations, and defense tips for contracts.
                    </p>
                  </div>
                  
                  <span className="text-[9px] font-black text-slate-400 group-hover:text-slate-900 transition-colors mt-3 block font-mono">
                    Read Definition &rarr;
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-350 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
              <span className="text-3xl">🔍</span>
              <p className="text-slate-500 font-black text-sm mt-3">No matching legal terms found</p>
              <p className="text-slate-400 text-xs mt-1">Try a different keyword or reset the A-Z filters.</p>
              <button
                onClick={handleResetFilters}
                className="mt-5 px-6 py-2.5 bg-slate-900 text-white font-black rounded-xl border-2 border-slate-900 hover:bg-slate-800 transition shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px]"
              >
                Show All Terms
              </button>
            </div>
          )}
        </div>

      </div>

    </main>
  );
}
