'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function KakaoSharePage() {
  const carouselImages = [
    '/kakao_preview1.png',
    '/kakao_preview2.png',
    '/kakao_preview3.png',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 2000); // 2초마다 이미지 전환

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="container">
      <div className="carousel-container">
        <Image
          src={carouselImages[currentImageIndex]}
          alt="Carousel Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="share-button-container">
        <button
          onClick={() => {
            // 여기에 카카오톡 공유 기능 구현
            alert('공유하기 버튼 클릭됨');
          }}
        >
          <Image
            src="/share-image.png"
            alt="공유하기 버튼"
            width={40}
            height={40}
          />
        </button>
      </div>
    </div>
  );
}
