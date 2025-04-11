import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const redirectUri = 'https://lpoint.vercel.app/api/auth/kakao/callback';

  const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.KAKAO_CLIENT_ID!,
      client_secret: process.env.KAKAO_CLIENT_SECRET!,
      redirect_uri: redirectUri,
      code: code ?? '',
    }),
  });

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  const response = NextResponse.redirect('https://lpoint.vercel.app');

  // ✅ 쿠키 먼저 세팅하고 반환
  response.cookies.set('kakao_access_token', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60, // 1시간
  });

  return response;
}
