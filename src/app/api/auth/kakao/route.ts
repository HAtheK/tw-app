// app/api/auth/kakao/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { kakaoId, kakaoNickname, email, phone, accessToken } = await req.json();

    if (!kakaoId || !kakaoNickname) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    // ✅ last_login 제거, 필드명 점검
    const { error } = await supabase
      .from('users')
      .upsert(
        {
          kakao_id: kakaoId,
          kakao_nickname: kakaoNickname,
          email,
          phone,
        },
        {
          onConflict: 'kakao_id',
        }
      );

    if (error) {
      console.error('❌ Supabase upsert error:', error.message);
      return NextResponse.json({ error: 'Supabase error', detail: error.message }, { status: 500 });
    }

    // ✅ accessToken 쿠키 저장
    cookies().set({
      name: 'kakao_token',
      value: accessToken,
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    // ✅ kakao_id도 쿠키에 함께 저장
    cookies().set({
      name: 'kakao_id',
      value: kakaoId,
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });


    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('🔥 API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
