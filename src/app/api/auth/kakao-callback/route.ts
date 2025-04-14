import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = createClient();
  const { code } = await req.json();

  try {
    const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_REST_API_KEY!, // REST API 키
        redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
        code,
        client_secret: process.env.KAKAO_CLIENT_SECRET!, // 설정했다면
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return NextResponse.json({ error: '토큰 발급 실패' }, { status: 400 });
    }

    const profileRes = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const kakaoProfile = await profileRes.json();

    const user = {
      kakaoId: kakaoProfile.id,
      nickname: kakaoProfile.properties?.nickname || '',
      email: kakaoProfile.kakao_account?.email || '',
      phone: kakaoProfile.kakao_account?.phone_number || '',
    };

    // Supabase에 사용자 등록/조회
    const supabaseRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/kakao-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const result = await supabaseRes.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('콜백 처리 중 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
