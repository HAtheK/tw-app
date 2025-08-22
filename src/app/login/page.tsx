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
      {/* 헤더 */}
      <header className="fixed top-0 left-0 w-full h-16 bg-black flex items-center justify-between px-5 z-10">
        <div className="relative w-36 h-6 sm:w-40 sm:h-7">
          <Image
            src="/logo-white.png"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
      </header>
      <main className="flex flex-col gap-6 items-center mt-24">
        <Image src="/logo.png" alt="로고" width={360} height={360} />
        <p className="text-xl leading-relaxed font-medium">
          간편하게 로그인하고<br />
          공유하기 챌린지에 참여해보세요
        </p>
         {/* 로그인 버튼 */}
        <button
          onClick={handleKakaoLogin}
          className="flex items-center justify-center gap-2 bg-[#FEE500] hover:bg-[#f7d800] text-black w-[300px] px-4 py-3 rounded-md text-[1em] font-semibold shadow transition"
        >
          <RiKakaoTalkFill size={30} />
          카카오로 로그인
        </button>
       
        
      </main>
      {/* 푸터 */}
      <footer className="fixed bottom-0 left-0 w-full h-[30px] text-white flex items-center justify-center font-ptd">
        임직원 이용 목적으로 제작한 사이트 입니다.
      </footer>
    </div>
  );
};

export default LoginPage;
