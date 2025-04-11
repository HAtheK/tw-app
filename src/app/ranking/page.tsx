import { supabase } from '@/lib/supabase';

export default async function RankingPage() {
  const { data, error } = await supabase
    .from('top_shared_codes') // ← View 이름
    .select('*');

  if (error || !data) {
    console.error(error);
    return <p>랭킹을 불러오는 데 실패했습니다.</p>;
  }

  return (
    <main className="min-h-screen bg-white p-4">
      <h1 className="text-2xl font-bold text-center mb-6">🏆 TOP 10 공유왕</h1>
      <ul className="max-w-md mx-auto">
        {data.slice(0, 10).map((item, idx) => (
          <li key={item.code} className="mb-2 text-lg font-mono">
            {idx + 1}. {item.code} - {item.count}회
          </li>
        ))}
      </ul>
    </main>
  );
}
