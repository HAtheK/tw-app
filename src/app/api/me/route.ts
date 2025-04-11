import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const accessToken = cookies().get('kakao_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const userRes = await fetch('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!userRes.ok) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const userData = await userRes.json();
  return NextResponse.json({ user: userData });
}
