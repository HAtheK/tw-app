import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('user_share_rankings')
    .select('rank, share_count, first_shared_at')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('❌ 내 순위 조회 실패:', error.message);
    return NextResponse.json({ error: '순위 조회 실패' }, { status: 500 });
  }

  return NextResponse.json(data);
}
