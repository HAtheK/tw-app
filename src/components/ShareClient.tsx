'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function ShareClient({ userId, nickname }: { userId: string; nickname: string }) {
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
        sharedAt: new Date().toISOString(),
      }),
    });
  };

  return (
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
  );
}
