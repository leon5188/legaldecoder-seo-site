import Link from 'next/link';

export default function CTA() {
  return (
    <div className="my-12 p-8 bg-blue-600 rounded-2xl text-white shadow-xl transform transition hover:scale-[1.02]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">看不懂自己的合同？</h3>
          <p className="text-blue-100">上传 PDF，让 LegalDecoder AI 免费帮你解析每一个潜在风险。</p>
        </div>
        <Link 
          href="https://legaldecoder.io" 
          className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg whitespace-nowrap"
        >
          立即免费解析
        </Link>
      </div>
    </div>
  );
}
