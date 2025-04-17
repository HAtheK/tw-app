import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const body = await req.json();

  // 🔍 sendCustom 콜백 요청인지 확인
  if (body.callback_type === 'SHARE' && body.server_callback_args?.userId) {
    const userId = body.server_callback_args.userId as string;

    console.log('📥 콜백 공유 기록 수신:', body);

    try {
      const { data: userProfile, error } = await supabase
        .from('users')
        .select('id')
        .eq('id', userId)
        .single();

      if (error || !userProfile) {
        console.error('❌ 사용자 조회 실패 (callback)', error?.message);
        return NextResponse.json({ error: '사용자 정보 없음' }, { status: 404 });
      }

      await supabase.from('share_records').insert({
        user_id: userId,
        shared_at: new Date(), // 필요 시 server_callback_args.sharedAt 사용
      });

      return NextResponse.json({ success: true });
    } catch (e: any) {
      console.error('❌ 콜백 공유 기록 실패:', e.message);
      return NextResponse.json({ error: '콜백 공유 기록 실패' }, { status: 500 });
    }
  }

  // ✅ 기존 방식 (uuid 단위 공유 성공/실패 기록)
  const { userId, successfulUuids, failedUuids } = body;

  if (!userId) {
    return NextResponse.json({ error: 'userId 없음' }, { status: 400 });
  }

  try {
    const { data: userProfile, error: userError } = await supabase
      .from('users')
      .select('id, kakao_id')
      .eq('id', userId)
      .single();

    if (userError || !userProfile) {
      console.error('❌ 사용자 정보 조회 실패:', userError?.message);
      return NextResponse.json({ error: '사용자 정보 조회 실패' }, { status: 404 });
    }

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

    return NextResponse.json({ success: true, kakao_id: userProfile.kakao_id });
  } catch (error: any) {
    console.error('❌ 공유 기록 저장 실패:', error.message);
    return NextResponse.json({ error: '공유 기록 저장 실패' }, { status: 500 });
  }
}
