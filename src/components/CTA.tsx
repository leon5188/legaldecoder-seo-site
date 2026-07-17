import Link from 'next/link';

export default function CTA() {
  return (
    <div className="my-12 p-6 md:p-8 border-2 border-slate-900 bg-white rounded-3xl shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] transform transition hover:scale-[1.01] hover:shadow-[7px_7px_0px_0px_rgba(15,23,42,1)]">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFDE4D] border-2 border-slate-900 rounded-full text-[10px] font-black text-slate-900 uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] animate-pulse">
            <span>⚡</span> Recommended
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight leading-none">
            Stop Copy-Pasting Legalese
          </h3>
          <p className="text-slate-700 text-sm md:text-base font-semibold leading-relaxed">
            Install the <strong className="font-black text-slate-900">LegalDecoder AI Browser Extension</strong> to highlight any text or scan any PDF on the web and translate it into plain English instantly.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full lg:w-auto shrink-0">
          <a
            href="https://chrome.google.com/webstore" // Placeholder chrome store link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-[#DF5B30] hover:bg-[#c94d25] text-white font-black text-sm uppercase rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none whitespace-nowrap cursor-pointer"
          >
            {/* Clean SVG Chrome Logo */}
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0a12 12 0 0 0-9.6 4.8L6.87 11.2A5.25 5.25 0 0 1 12 6.75h9.3A12 12 0 0 0 12 0Zm0 24a12 12 0 0 0 9.6-4.8l-4.47-6.4A5.25 5.25 0 0 1 12 17.25H2.7A12 12 0 0 0 12 24Zm-6.75-12a6.75 6.75 0 1 1 13.5 0 6.75 6.75 0 0 1-13.5 0ZM12 7.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5Zm11.83.6H14.86a5.25 5.25 0 0 1-3.66 3.66l6.4 4.47A12 12 0 0 0 23.83 8.1ZM.17 15.9h8.97a5.25 5.25 0 0 1 3.66-3.66l-6.4-4.47A12 12 0 0 0 .17 15.9Z" />
            </svg>
            Add to Chrome (Free)
          </a>
          <Link 
            href="/welcome"
            className="inline-flex items-center justify-center px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 font-black text-sm uppercase rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none whitespace-nowrap cursor-pointer text-center"
          >
            Try Online Simulator
          </Link>
        </div>
      </div>
    </div>
  );
}

