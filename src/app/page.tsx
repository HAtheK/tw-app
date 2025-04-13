'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const carouselImages = [
  '/kakao_preview1.png',
  '/kakao_preview2.png',
  '/kakao_preview3.png',
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 2000);
    return () => clearInterval(intervalRef.current!);
  }, []);

  const handleShare = () => {
    if (typeof window.Kakao === 'undefined') return alert('카카오 SDK 로드 실패');
    if (!window.Kakao.isInitialized()) window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);

    window.Kakao.Link.sendCustom({
      templateId: 119614, // 템플릿 ID로 교체
    });

    fetch('/api/share', { method: 'POST' });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white p-4 space-y-6">
      <div className="w-full overflow-hidden relative h-80 rounded-xl">
        <div className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)`, width: `${carouselImages.length * 100}%` }}
        >
          {carouselImages.map((src, idx) => (
            <Image key={idx} src={src} alt={`preview-${idx}`} width={400} height={400} className="w-full h-full object-contain" />
          ))}
        </div>
      </div>

      <button onClick={handleShare}>
        <Image src="/share-Images.png" alt="공유하기" width={160} height={60} />
      </button>

      <button disabled className="text-gray-400 mt-4">
        랭킹 보기 (준비 중)
      </button>
    </main>
  );
}
