// /src/app/login/page.tsx
import { redirect } from 'next/navigation';

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!;
const REDIRECT_URI = 'https://lpoint.vercel.app/api/auth/kakao/callback';

export default function LoginPage() {
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
  redirect(kakaoLoginUrl);
}
