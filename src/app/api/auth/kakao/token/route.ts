// app/api/auth/kakao/token/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Authorization code is required' }, { status: 400 });
    }

    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;
    const clientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!;

    const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        redirect_uri: redirectUri,
        code,
      }).toString(),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      console.error('[카카오 Auth] 토큰 응답 오류:', tokenData.error_description);
      return NextResponse.json({ error: tokenData.error_description }, { status: 400 });
    }

    return NextResponse.json(tokenData);
  } catch (error) {
    console.error('[카카오 Auth] AccessToken 요청 실패:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
