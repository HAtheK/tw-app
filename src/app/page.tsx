'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const carouselImages = [
  '/kakao_preview.png',
  '/kakao_preview2.png',
  '/kakao_preview3.png',
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const delay = 3000; // 이미지 전환 간격: 3초
  const transitionDuration = 800; // 트랜지션 속도: 0.8초

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, delay);
    return () => resetTimeout();
  }, [current]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      {/* 🔄 캐러셀 */}
      <div className="overflow-hidden relative w-full max-w-sm h-[420px] rounded-md border border-gray-200">
        <div
          className="flex transition-transform ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
            transitionDuration: `${transitionDuration}ms`,
          }}
        >
          {carouselImages.map((src, idx) => (
            <div key={idx} className="min-w-full flex justify-center items-center bg-white">
              <Image
                src={src}
                alt={`carousel-${idx}`}
                width={320}
                height={500}
                className="object-contain"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 🟨 공유하기 버튼 */}
      <div className="mt-6">
        <button
          onClick={() => {
            if (window.Kakao?.Share) {
              window.Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                  title: '내 캐릭터를 친구에게 공유해보세요!',
                  description: '랭킹을 올릴 기회!',
                  imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/kakao_preview.png`,
                  link: {
                    mobileWebUrl: process.env.NEXT_PUBLIC_BASE_URL || '',
                    webUrl: process.env.NEXT_PUBLIC_BASE_URL || '',
                  },
                },
                buttons: [
                  {
                    title: '공유하러 가기',
                    link: {
                      mobileWebUrl: process.env.NEXT_PUBLIC_BASE_URL || '',
                      webUrl: process.env.NEXT_PUBLIC_BASE_URL || '',
                    },
                  },
                ],
              });
            }
          }}
        >
          <Image
            src="/share-Images.png"
            alt="공유하기"
            width={200}
            height={80}
            className="hover:opacity-90 transition"
          />
        </button>
      </div>
    </main>
  );
}
