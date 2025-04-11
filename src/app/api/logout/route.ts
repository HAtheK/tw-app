import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const res = NextResponse.redirect(new URL('/', req.url));
  res.cookies.set('kakao_access_token', '', {
    httpOnly: true,
    secure: true,
    path: '/',
    expires: new Date(0),
  });
  return res;
}
