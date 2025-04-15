// app/api/auth/kakao/token/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // 환경변수 확인: 카카오 REST API Key
    const clientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

    // client_id가 없을 경우 오류 출력
    if (!clientId) {
      console.error("❌ 카카오 클라이언트 ID가 없습니다.");
      return NextResponse.json({ error: 'Missing client_id' }, { status: 400 });
    }

    console.log('📡 카카오 Client ID:', clientId);  // client_id가 잘 전달되는지 확인하는 로그

    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Authorization code is required' }, { status: 400 });
    }

    // 이후 토큰 요청 및 처리 로직
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;

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
    console.error('[카카오 Auth] 오류:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
