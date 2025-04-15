import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const clientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const clientSecret = process.env.KAKAO_CLIENT_SECRET; // ← client_secret 사용
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      console.error("❌ 환경변수 누락", { clientId, redirectUri });
      return NextResponse.json({ error: 'Missing required env variables' }, { status: 400 });
    }

    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Authorization code is required' }, { status: 400 });
    }

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: redirectUri,
      code,
      client_secret: clientSecret ?? '', // ← client_secret 포함
    });

    const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: body.toString(),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      console.error('[카카오 Auth] 토큰 응답 오류:', tokenData.error_description || tokenData.error);
      return NextResponse.json({ error: tokenData.error_description }, { status: 400 });
    }

    return NextResponse.json(tokenData);
  } catch (error) {
    console.error('[카카오 Auth] 오류:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
