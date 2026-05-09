import { getAllTerms } from '@/lib/markdown';
import Link from 'next/link';

export default function DictionaryIndex() {
  const terms = getAllTerms();

  // 按字母表排序
  const sortedTerms = terms.sort((a, b) => a.term.localeCompare(b.term));

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-black text-gray-900 mb-4">法律词典百科</h1>
        <p className="text-xl text-gray-600">
          探索数千个法律术语的大白话解释，保护你的合法权益。
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTerms.map((t) => (
          <Link 
            key={t.term} 
            href={`/dictionary/${t.term}`}
            className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-500 hover:shadow-md transition-all group"
          >
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 uppercase">
              {t.title}
            </h3>
            <p className="text-sm text-gray-500 mt-2">查看大白话翻译与风险分析 &rarr;</p>
          </Link>
        ))}
      </div>
      
      {sortedTerms.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500">词典正在生成中，请稍后再来...</p>
        </div>
      )}
    </main>
  );
}
