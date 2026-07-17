import { getAllTerms } from '@/lib/markdown';
import DictionaryClient from './DictionaryClient';
import Header from '../components/Header';

export default function DictionaryIndex() {
  const terms = getAllTerms();

  // 按字母表排序
  const sortedTerms = terms.sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="min-h-screen bg-[#F0EFEB] flex flex-col">
      <Header />
      <DictionaryClient initialTerms={sortedTerms} />
    </div>
  );
}
