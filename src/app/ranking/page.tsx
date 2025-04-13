import { supabase } from '@/lib/supabase';

export default async function RankingPage() {
  const { data } = await supabase.from('view_share_counts').select('*').limit(10);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">TOP 10 랭킹</h1>
      <ul className="space-y-2">
        {data?.map((item, idx) => (
          <li key={idx}>
            #{idx + 1} - 공유 횟수: {item.count}
          </li>
        ))}
      </ul>
    </div>
  );
}
