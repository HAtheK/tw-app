// app/api/auth/sharegame/top10/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('top_shared_users')
    .select('nickname, share_count');

  if (error) {
    console.error('❌ Top10 불러오기 실패:', error.message);
    return NextResponse.json({ error: 'Top10 조회 실패' }, { status: 500 });
  }

  return NextResponse.json({ top10: data });
}
