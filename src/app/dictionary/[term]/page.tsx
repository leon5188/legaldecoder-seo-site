import { getTermData, getAllTerms } from '@/lib/markdown';
import ReactMarkdown from 'react-markdown';
import CTA from '@/components/CTA';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  const terms = getAllTerms();
  return terms.map((t) => ({
    term: t.term,
  }));
}

// 在 Next.js 15 中，params 必须被 await
export default async function TermPage(props: { params: Promise<{ term: string }> }) {
  const params = await props.params;
  const { term } = params;
  const data = getTermData(term);

  if (!data) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Link href="/dictionary" className="text-blue-600 hover:underline mb-8 inline-block">
        ← 返回词典首页
      </Link>
      
      <article className="prose prose-blue lg:prose-xl max-w-none">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase">
          什么是 {data.frontmatter.title || term}?
        </h1>
        
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <ReactMarkdown>{data.content}</ReactMarkdown>
        </div>

        <CTA />

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h4 className="text-lg font-bold mb-4">关于 LegalDecoder</h4>
          <p className="text-gray-600">
            LegalDecoder 是一款 AI 驱动的法律辅助工具，致力于打破法律语言的门槛，
            让每个人都能在签署合同时做到心中有数。
          </p>
        </div>
      </article>
    </main>
  );
}
