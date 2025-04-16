import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const body = await req.json();
  const { userId, successfulUuids, failedUuids } = body;

  console.log('📥 공유 기록 저장 요청:', body);

  try {
    if (successfulUuids?.length) {
      await Promise.all(
        successfulUuids.map(async (uuid: string) => {
          await supabase
            .from('share_records')
            .upsert(
              {
                user_id: userId,
                receiver_uuid: uuid,
                count: 1,
              },
              { onConflict: 'user_id, receiver_uuid' }
            );
        })
      );
    }

    if (failedUuids?.length) {
      await supabase.from('failed_share_records').insert(
        failedUuids.map((uuid: string) => ({
          user_id: userId,
          receiver_uuid: uuid,
          failed_at: new Date(),
        }))
      );
    }

    console.log('✅ 공유 기록 저장 완료');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('❌ 공유 기록 저장 실패:', error.message);
    return NextResponse.json({ error: '공유 기록 저장 실패' }, { status: 500 });
  }
}
