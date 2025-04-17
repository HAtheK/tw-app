import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('user_share_rankings')
    .select('rank, nickname, share_count, first_shared_at')
    .order('rank')
    .limit(10);

  if (error) {
    console.error('❌ Top10 불러오기 실패:', error.message);
    return NextResponse.json({ error: 'Top10 조회 실패' }, { status: 500 });
  }

  return NextResponse.json({ top10: data });
}
