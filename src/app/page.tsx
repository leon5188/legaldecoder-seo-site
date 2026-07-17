import React from 'react';
import Link from 'next/link';
import { getAllTerms } from '@/lib/markdown';
import CTA from '@/components/CTA';
import NativeRedirect from '@/components/NativeRedirect';
import HomePlayground from './components/HomePlayground';
import Header from './components/Header';

interface TermItem {
  term: string;
  title: string;
  [key: string]: any;
}

export default function Home() {
  // 热门词条预览
  let terms: TermItem[] = [];
  try {
    terms = getAllTerms();
  } catch {
    // 容错处理，防止没有词条数据时崩溃
    terms = [];
  }
  const featuredTerms = terms.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#F4F2EB] text-slate-900 font-sans antialiased relative overflow-x-hidden">
      <NativeRedirect />
      <Header />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] stroke-slate-900 z-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="home-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#home-grid)" />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-6 z-10 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-black bg-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] mb-6 select-none">
          🔥 AI-Powered Contract Decoder
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1] max-w-4xl mx-auto text-center">
          Don&apos;t Let Complex Legalese<br />
          Become Your <span className="text-blue-600 underline decoration-slate-900 decoration-4 underline-offset-4">Contract Trap</span>
        </h1>
        
        <p className="text-base md:text-lg text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto font-medium text-center">
          LegalDecoder AI breaks down complex legal terminology, extracts hidden clauses, evaluates risks, and provides negotiation strategies.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/dictionary" 
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-black rounded-xl border-2 border-slate-900 hover:bg-slate-800 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-center text-sm uppercase tracking-wide"
          >
            Browse Legal Dictionary
          </Link>
          <Link 
            href="/welcome" 
            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border-2 border-slate-900 font-black rounded-xl hover:bg-slate-50 transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] text-center text-sm"
          >
            Decode Your Contract (Free)
          </Link>
        </div>
      </section>

      {/* Interactive Playground Section */}
      <section className="max-w-4xl mx-auto px-6 pb-20 z-10 relative">
        <HomePlayground />
      </section>

      {/* Featured Terms Section */}
      {featuredTerms.length > 0 && (
        <section className="max-w-6xl mx-auto py-12 px-6 z-10 relative">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-900 text-left">Featured Dictionary Terms</h2>
            <Link href="/dictionary" className="text-xs font-black text-blue-600 uppercase tracking-wider hover:underline mt-2 sm:mt-0">
              View All A-Z Terms &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTerms.map((t) => (
              <Link 
                key={t.term} 
                href={`/dictionary/${t.term}`}
                className="p-5.5 bg-white rounded-3xl shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-900 hover:scale-[1.01] transition-all group text-left flex flex-col justify-between h-40"
              >
                <div>
                  <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 uppercase tracking-tight truncate">
                    {t.title}
                  </h3>
                  <p className="text-[11px] text-slate-550 mt-2 line-clamp-3 leading-relaxed font-bold">
                    Learn what {t.title} means, spot hidden traps, and get defense tips...
                  </p>
                </div>
                <span className="text-[9.5px] font-black text-slate-400 group-hover:text-slate-900 transition-colors mt-2 block font-mono">
                  Read Definition &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto pb-20 px-6 z-10 relative">
        <CTA />
      </section>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-slate-900 py-10 text-center text-slate-500 text-xs z-10 relative">
        <p>© 2026 LegalDecoder AI. All rights reserved. Content is for informational purposes only and does not constitute legal advice.</p>
      </footer>
    </div>
  );
}
