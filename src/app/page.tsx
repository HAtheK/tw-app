'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import './globals.css';

const carouselImages = [
  '/kakao_preview1.png',
  '/kakao_preview2.png',
  '/kakao_preview3.png',
];

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000); // 3초 간격

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  }, []);

  const handleShare = () => {
    window.Kakao.Share.sendCustom({
      templateId: 119614,
    });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-xs overflow-hidden rounded-lg mb-6">
        <Image
          src={carouselImages[currentIndex]}
          alt={`Preview ${currentIndex + 1}`}
          width={300}
          height={300}
          className="w-full object-cover transition-all duration-500"
        />
      </div>
      <button onClick={handleShare}>
        <Image
          src="/share-Image.png"
          alt="공유하기"
          width={132}
          height={132}
        />
      </button>
    </main>
  );
}
