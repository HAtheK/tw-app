'use client';

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!;
const REDIRECT_URI = 'https://your-app.vercel.app/api/auth/kakao/callback';

export default function LoginPage() {
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <div className="p-8">
      <h1 className="text-xl mb-4">카카오 로그인</h1>
      <a href={kakaoLoginUrl}>
        <button className="bg-yellow-400 text-black px-4 py-2 rounded">
          카카오로 로그인
        </button>
      </a>
    </div>
  );
}
