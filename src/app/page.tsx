'use client';

import { useEffect, useRef, useState } from 'react';

const carouselImages = [
  '/kakao_preview1.png',
  '/kakao_preview2.png',
  '/kakao_preview3.png',
];

const KakaoSharePage = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const node = carouselRef.current;
    if (node) {
      node.style.transition = 'transform 0.8s ease-in-out';
      node.style.transform = `translateX(-${index * 100}%)`;
    }
  }, [index]);

  useEffect(() => {
    if (!window.Kakao?.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  }, []);

  const handleShare = () => {
    if (!window.Kakao) return;

    window.Kakao.Share.sendCustom({
      templateId: 119614,
    });
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-black text-white">
      <div className="relative w-full h-[70%] overflow-hidden">
        <div
          ref={carouselRef}
          className="flex w-full h-full"
          style={{ width: `${carouselImages.length * 100}%` }}
        >
          {carouselImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`carousel-${idx}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>

      <button onClick={handleShare} className="mt-8">
        <img
          src="/share-Image.png"
          alt="공유하기"
          width={132}
          height={132}
        />
      </button>
    </div>
  );
};

export default KakaoSharePage;
