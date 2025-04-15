// app/api/auth/kakao/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // 보안상 서버에서만 사용
);

export async function POST(req: Request) {
  try {
    const { kakaoId, nickname, email, accessToken } = await req.json();

    if (!kakaoId || !nickname) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    // 1. Supabase에 유저 저장 or upsert
    const { error } = await supabase
      .from('users') // 테이블 이름이 다르면 수정
      .upsert({
        kakao_id: kakaoId,
        nickname,
        email,
        last_login: new Date().toISOString(),
      }, { onConflict: 'kakao_id' });

    if (error) {
      console.error('Supabase upsert error:', error.message);
      return NextResponse.json({ error: 'Supabase error' }, { status: 500 });
    }

    // 2. HttpOnly 쿠키로 accessToken 저장 (7일)
    cookies().set({
      name: 'kakao_token',
      value: accessToken,
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
