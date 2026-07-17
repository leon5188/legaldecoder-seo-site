import { getTermData, getAllTerms } from '@/lib/markdown';
import ReactMarkdown from 'react-markdown';
import CTA from '@/components/CTA';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';

export async function generateStaticParams() {
  const terms = getAllTerms();
  return terms.map((t) => ({
    term: t.term,
  }));
}

export default async function TermPage(props: { params: Promise<{ term: string }> }) {
  const params = await props.params;
  const { term } = params;
  const data = getTermData(term);

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F0EFEB] flex flex-col font-sans">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 text-left relative z-10 w-full">
      
      {/* Return Button */}
      <Link 
        href="/dictionary" 
        className="inline-flex items-center space-x-2 px-4 py-2 bg-white border-2 border-slate-900 rounded-xl text-xs font-black text-slate-800 shadow-[2.5px_2.5px_0px_0px_rgba(15,23,42,1)] hover:scale-[1.02] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] transition mb-8"
      >
        <span>←</span>
        <span>Back to Dictionary</span>
      </Link>
      
      {/* Article Card */}
      <article className="border-2 border-slate-900 bg-white rounded-3xl p-6 md:p-8 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] mb-10">
        <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest block mb-2">Legalese Decoded</span>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 uppercase tracking-tight leading-none">
          What is {data.frontmatter.title || term}?
        </h1>
        
        {/* Markdown Content */}
        <div className="prose prose-slate max-w-none text-slate-800 font-medium leading-relaxed text-sm md:text-base border-t-2 border-slate-900 pt-6 prose-headings:font-black prose-headings:text-slate-900 prose-strong:font-black prose-strong:text-slate-900">
          <ReactMarkdown>{data.content}</ReactMarkdown>
        </div>
      </article>

      <CTA />

      {/* About Box */}
      <div className="mt-10 p-6 border-2 border-slate-900 bg-[#EAE7DF] rounded-2xl shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">About LegalDecoder</h4>
        <p className="text-xs text-slate-655 font-bold leading-relaxed">
          LegalDecoder is an AI-powered contract analysis tool dedicated to breaking down complex legal terminology, helping you spot hidden traps and sign with confidence.
        </p>
      </div>

    </main>
  </div>
  );
}
