// /api/auth/sharegame/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';


// 🛠️ 공통: 요청 정보 로그 함수
function logRequestInfo(req: NextRequest, method: 'GET' | 'POST') {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'IP_NOT_FOUND';
  const url = req.nextUrl.href;
  const userAgent = req.headers.get('user-agent') || 'USER_AGENT_NOT_FOUND';
  const referer = req.headers.get('referer') || 'REFERER_NOT_FOUND';

  console.log(`📡 [${method}] 요청 정보`, {
    ip,
    url,
    userAgent,
    referer,
  });
}


// ✅ POST 방식 처리 (콜백 + 기존 UUID 공유 처리)
export async function POST(req: NextRequest) {
  const supabase = createClient();
  const body = await req.json();

  // 1️⃣ Kakao sendCustom 공유 콜백 처리
  if (body.callback_type === 'SHARE' && body.server_callback_args?.userId) {
    const userId = body.server_callback_args.userId as string;
    const kakaoId = body.server_callback_args.kakaoId as string | undefined;
    const sharedAt = body.server_callback_args.sharedAt || new Date().toISOString();

    console.log('📥 sendCustom 콜백 수신:', { userId, kakaoId, sharedAt });

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
        kakao_id: kakaoId,
        shared_at: new Date(sharedAt),
      });

      console.log('✅ 콜백 공유 기록 저장 완료');
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
      console.log('✅ UUID 공유 기록 저장 완료');
    }

    if (failedUuids?.length) {
      await supabase.from('failed_share_records').insert(
        failedUuids.map((uuid: string) => ({
          user_id: userId,
          receiver_uuid: uuid,
          failed_at: new Date(),
        }))
      );
      console.log('⚠️ 공유 실패 기록 저장 완료');
    }

    return NextResponse.json({ success: true, kakao_id: userProfile.kakao_id });
  } catch (error: any) {
    console.error('❌ 공유 기록 저장 실패:', error.message);
    return NextResponse.json({ error: '공유 기록 저장 실패' }, { status: 500 });
  }
}

// ✅ GET 방식 처리 (카카오 공유 웹훅)
export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get('userId');
  const kakaoId = searchParams.get('kakaoId');
  const sharedAt = searchParams.get('sharedAt');
  const templateId = searchParams.get('TEMPLATE_ID');
  const chatId = searchParams.get('HASH_CHAT_ID');
  const chatType = searchParams.get('CHAT_TYPE');

  console.log('📩 카카오 공유 GET 콜백 수신:', {
    userId,
    kakaoId,
    sharedAt,
    templateId,
    chatId,
    chatType,
  });

  // Supabase에 저장
  if (userId) {
    try {
      const { data, error } = await supabase
        .from('share_records')
        .insert({
          user_id: userId,
          kakao_id: kakaoId,
          shared_at: sharedAt ? new Date(sharedAt) : new Date(),
          template_id: templateId,
          chat_id: chatId,
          chat_type: chatType,
        });

      if (error) {
        console.error('❌ GET 공유 기록 저장 실패:', error.message);
        return NextResponse.json({ error: '공유 기록 저장 실패' }, { status: 500 });
      }

      console.log('✅ GET 공유 기록 저장 완료');
      return NextResponse.json({ success: true });
    } catch (e: any) {
      console.error('❌ 예외 발생:', e.message);
      return NextResponse.json({ error: '예외 발생' }, { status: 500 });
    }
  }

  console.warn('⚠️ userId 없음, 저장하지 않음');
  return NextResponse.json({ success: true });
}
