import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const body = await req.json();
  const { userId, successfulUuids, failedUuids } = body;

  console.log('📥 공유 기록 저장 요청:', body);

  try {
    // 🔍 사용자 조회 (kakao_id 포함)
    const { data: userProfile, error: userError } = await supabase
      .from('users')
      .select('id, kakao_id')
      .eq('id', userId)
      .single();

    if (userError || !userProfile) {
      console.error('❌ 사용자 정보 조회 실패:', userError?.message);
      return NextResponse.json({ error: '사용자 정보 조회 실패' }, { status: 404 });
    }

    console.log(`🔎 사용자 kakao_id: ${userProfile.kakao_id}`);

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

    return NextResponse.json({
      success: true,
      kakao_id: userProfile.kakao_id, // ✅ kakao_id 포함 반환
    });
  } catch (error: any) {
    console.error('❌ 공유 기록 저장 실패:', error.message);
    return NextResponse.json({ error: '공유 기록 저장 실패' }, { status: 500 });
  }
}
