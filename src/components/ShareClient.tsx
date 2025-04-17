'use client';

import Script from 'next/script';
import { useEffect } from 'react';

interface ShareClientProps {
  userId: string;
  nickname: string;
  kakaoId: string; // ✅ 새로 추가
}

export default function ShareClient({ userId, nickname, kakaoId }: ShareClientProps) {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  }, []);

  const handleShare = () => {
    if (!window.Kakao?.Share) {
      alert('카카오 공유 기능을 사용할 수 없습니다.');
      return;
    }

    window.Kakao.Share.sendCustom({
      templateId: 119614,
      serverCallbackArgs: JSON.stringify({
        userId,
        kakaoId, // ✅ 콜백에 kakaoId 포함
        sharedAt: new Date().toISOString(),
      }),
    });
  };

  return (
    <main className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-white text-black px-4 py-6">
    {/* 헤더 */}
    <header className="text-2xl md:text-3xl font-bold mb-4 text-center">
      📢롯데멤버스 카드 공유 챌린지🎮
    </header>

    {/* 콘텐츠 */}
    <section className="flex flex-col items-center space-y-6 w-full max-w-2xl mx-auto">

    <div className="share-client text-center mt-6">
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="beforeInteractive" />
      <p className="text-xl font-semibold">👋 {nickname}님, 친구에게 메시지를 공유해보세요!</p>
      <button
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded mt-4"
        onClick={handleShare}
      >
        친구에게 공유하기
      </button>
    </div>
    </section>

      {/* 푸터 */}
      <footer className="text-sm text-gray-500 mt-6 text-center">
        © 2025 LOTTE MEMBERS PLCC Cell
      </footer>
    </main>

  );
}
