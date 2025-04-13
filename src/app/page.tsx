'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const images = ['/kakao_preview1.png', '/kakao_preview2.png', '/kakao_preview3.png'];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const INTERVAL = 3000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* 캐러셀 컨테이너 */}
      <div className="overflow-hidden w-[360px] h-[200px] relative">
        <div
          ref={slideRef}
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${images.length * 100}%` }}
        >
          {images.map((src, index) => (
            <div key={index} className="flex-shrink-0 w-[360px] h-[200px] relative">
              <Image src={src} alt={`preview-${index}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* 공유 버튼 */}
      <div className="mt-6">
        <button onClick={handleShare}>
          <Image
            src="share-image.png"
            alt="공유하기"
            width={132}
            height={132}
            priority
          />
        </button>
      </div>
    </main>
  );
}

// 카카오톡 공유
declare global {
  interface Window {
    Kakao: any;
  }
}

const handleShare = () => {
  if (window.Kakao && window.Kakao.isInitialized()) {
    window.Kakao.Share.sendCustom({
      templateId: 119614,
    });
  } else {
    console.error('카카오 SDK가 초기화되지 않았습니다.');
  }
};
