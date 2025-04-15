// /pages/api/kakao/token.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('[카카오 Auth] 요청 수신됨');

  if (req.method !== 'POST') {
    console.warn('[카카오 Auth] 지원하지 않는 HTTP 메서드:', req.method);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { code } = req.body;

  if (!code) {
    console.warn('[카카오 Auth] 인가 코드 없음');
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  console.log('[카카오 Auth] 인가 코드 수신:', code);

  try {
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;
    const clientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!;

    console.log('[카카오 Auth] Redirect URI:', redirectUri);
    console.log('[카카오 Auth] Client ID:', clientId);

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

    console.log('[카카오 Auth] 토큰 응답 수신:', tokenData);

    if (tokenData.error) {
      console.error('[카카오 Auth] 토큰 응답 오류:', tokenData.error_description);
      return res.status(400).json({ error: tokenData.error_description });
    }

    res.status(200).json(tokenData);
  } catch (error) {
    console.error('[카카오 Auth] AccessToken 요청 실패:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
