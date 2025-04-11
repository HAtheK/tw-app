import { NextResponse } from 'next/server';

export async function GET() {
  const res = NextResponse.redirect('/');
  res.cookies.set('kakao_access_token', '', {
    httpOnly: true,
    secure: true,
    path: '/',
    expires: new Date(0),
  });
  return res;
}
