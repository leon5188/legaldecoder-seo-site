import Link from 'next/link';
import { getAllTerms } from '@/lib/markdown';
import CTA from '@/components/CTA';

export default function Home() {
  const terms = getAllTerms();
  const featuredTerms = terms.slice(0, 6); // 取前6个展示在首页

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-tight">
            别让复杂的法律术语<br />
            成为你的<span className="text-blue-600">合同陷阱</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            LegalDecoder AI 将数万个枯燥条文转化为“人话”。
            已有 10,000+ 用户通过我们避免了不公平条款。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dictionary" 
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg"
            >
              浏览法律百科全书
            </Link>
            <Link 
              href="https://legaldecoder.io" 
              className="px-8 py-4 bg-white text-gray-900 border border-gray-300 font-bold rounded-xl hover:bg-gray-50 transition-all"
            >
              立即上传合同解析
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Terms Section */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900">热门词条预览</h2>
          <Link href="/dictionary" className="text-blue-600 font-semibold hover:underline">
            查看全部 A-Z 词条 &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTerms.map((t) => (
            <Link 
              key={t.term} 
              href={`/dictionary/${t.term}`}
              className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 uppercase mb-2">
                {t.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2">
                了解什么是 {t.title} 及其在合同中的潜在风险...
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto pb-20 px-6">
        <CTA />
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 text-center text-gray-500 text-sm">
        <p>© 2024 LegalDecoder AI. 所有权利保留。本站内容仅供参考，不构成法律建议。</p>
      </footer>
    </div>
  );
}
