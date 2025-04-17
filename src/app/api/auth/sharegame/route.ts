import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// ✅ POST 방식 처리 (콜백 + 기존 UUID 공유 처리)
export async function POST(req: NextRequest) {
  const supabase = createClient();
  const body = await req.json();

  // 1️⃣ Kakao sendCustom 공유 콜백 처리
  if (body.callback_type === 'SHARE' && body.server_callback_args?.userId) {
    const userId = body.server_callback_args.userId as string;

    console.log('📥 sendCustom 콜백 수신:', body);

    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('id')
        .eq('id', userId)
        .single();

      if (error || !user) {
        console.error('❌ 사용자 조회 실패 (콜백)', error?.message);
        return NextResponse.json({ error: '사용자 정보 없음' }, { status: 404 });
      }

      await supabase.from('share_records').insert({
        user_id: userId,
        shared_at: new Date(), // 필요 시 body.server_callback_args.sharedAt 사용 가능
      });

      return NextResponse.json({ success: true });
    } catch (e: any) {
      console.error('❌ 콜백 공유 기록 실패:', e.message);
      return NextResponse.json({ error: '콜백 공유 기록 실패' }, { status: 500 });
    }
  }

  // 2️⃣ 기존 UUID 공유 성공/실패 처리
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

// ✅ GET 방식 처리 (카카오 공유 웹훅)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get('userId');
  const sharedAt = searchParams.get('sharedAt');
  const templateId = searchParams.get('TEMPLATE_ID');
  const chatId = searchParams.get('HASH_CHAT_ID');
  const chatType = searchParams.get('CHAT_TYPE');

  console.log('📩 카카오 공유 GET 콜백 수신:', {
    userId,
    sharedAt,
    templateId,
    chatId,
    chatType,
  });

  // 현재는 로깅만 수행. 향후 저장이 필요하면 Supabase에 기록 가능
  return NextResponse.json({ success: true });
}
