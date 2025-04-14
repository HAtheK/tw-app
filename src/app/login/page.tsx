'use client';

import Image from 'next/image';
import { useEffect } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

const LoginPage = () => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: `${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`, // 예: https://your-domain.vercel.app/login/callback
      scope: 'profile_nickname,account_email,phone_number',
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center px-4 py-6 bg-white text-center">
      <main className="flex flex-col gap-6 items-center mt-24">
        <Image src="/logo.png" alt="로고" width={120} height={120} />
        <p className="text-xl leading-relaxed font-medium">
          간편하게 로그인하고<br />
          공유하기 챌린지에 참여해보세요
        </p>
        <button
          onClick={handleKakaoLogin}
          className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-300"
        >
          카카오로 시작하기
        </button>
      </main>
      <footer className="text-sm text-gray-500 mt-12">
        © 2025 PLCC - Share Challenge
      </footer>
    </div>
  );
};

export default LoginPage;
