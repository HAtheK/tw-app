'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { RiKakaoTalkFill } from 'react-icons/ri';

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
      redirectUri: `${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`,
      scope: 'profile,account_email,phone_number',
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center px-4 py-6 bg-white text-center font-dgm">
      <main className="flex flex-col gap-6 items-center mt-24">
        <Image src="/logo.png" alt="로고" width={120} height={120} />
        <p className="text-xl leading-relaxed font-medium">
          카카오로 로그인하고<br />
          공유하기 챌린지에 참여해보세요
        </p>
         {/* 로그인 버튼 */}
        <button
          onClick={handleKakaoLogin}
          className="flex items-center justify-center gap-2 bg-[#FEE500] hover:bg-[#f7d800] text-black w-[240px] px-4 py-3 rounded-md text-[0.5em] font-semibold shadow transition"
        >
          <RiKakaoTalkFill size={20} />
          카카오로 로그인
        </button>
       
        
      </main>
      <footer className="text-sm text-gray-500 mt-12">
        © 2025 PLCC - Share Challenge
      </footer>
    </div>
  );
};

export default LoginPage;
