'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [code, setCode] = useState('');

  useEffect(() => {
    // 카카오 SDK 로딩
    if (!window.Kakao) {
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
      script.onload = () => {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
      };
      document.head.appendChild(script);
    } else if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  }, []);

  const handleShare = async () => {
    if (!code) {
      alert('개인 코드를 입력해주세요!');
      return;
    }

    if (!window.Kakao || !window.Kakao.isInitialized()) {
      alert('카카오 SDK 로딩 중입니다.');
      return;
    }

    window.Kakao.Link.sendCustom({
      templateId: 119614, // 실제 템플릿 ID
    });

    setTimeout(async () => {
      const confirmShare = confirm('카카오톡에서 메시지를 공유하셨나요?');
      if (confirmShare) {
        await fetch('/api/share', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });
        alert('공유 완료! 감사합니다.');
      }
    }, 1000);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-yellow-100 p-4">
      <h1 className="text-2xl font-bold mb-4">🎮 공유 미션</h1>

      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="개인 코드 입력"
        className="border p-2 text-lg mb-4 bg-white font-mono"
      />

      <Image
        src="/kakao_preview.png"
        width={300}
        height={180}
        alt="카카오 미리보기"
        className="rounded mb-4"
      />

      <button
        onClick={handleShare}
        className="bg-pink-600 text-white px-6 py-2 rounded font-['Press_Start_2P'] mb-2"
      >
        공유하기
      </button>

      <a
        href="/ranking"
        className="bg-green-600 text-white px-6 py-2 rounded font-['Press_Start_2P']"
      >
        랭킹 보기
      </a>
    </main>
  );
}
