'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'

declare global {
  interface Window {
    Kakao: any;
  }
}

const KakaoSharePage = () => {
  const router = useRouter(); 
  
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  }, []);

  const shareToKakao = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendCustom({
        templateId: 119614,
      });
    }
  };

  
  return (
    <main className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-white text-center text-black px-4 py-6">
      {/* 헤더 */}
      <header className="text-xl font-bold mb-4">🎮 카카오톡 공유 이벤트</header>

      {/* 콘텐츠 */}
      <section className="flex flex-col items-center justify-center space-y-6">
        <Image
          src="/kakao_preview1.png"
          alt="미리보기"
          width={300}
          height={180}
          className="rounded-md w-full max-w-[400px] h-auto object-contain"
        />
        <button onClick={shareToKakao}>
          <Image
            src="/share-image.png"
            alt="카카오톡 공유하기"
            width={30}
            height={30}
            className="w-[30px] h-[30px]"
          />
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-md text-lg font-semibold shadow"
          onClick={() => router.push('/sharegame')}
        >
          Share Game
        </button>
      </section>

      {/* 푸터 */}
      <footer className="text-sm text-gray-500 mt-6">
        © 2025 -PLCC Cell. All rights reserved.
      </footer>
    </main>
  );
};

export default KakaoSharePage;
