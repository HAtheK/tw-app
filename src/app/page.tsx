'use client';

import { useEffect } from 'react';
import { Metadata } from 'next';

//this line will avoid caching when deployed to vercel
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = "og-image.png";  // 썸네일용 이미지

  return {
    title: '롯데멤버스 카드 출시',
    description: `롯데 안에서 쓰면 쓸수록 혜택이 커지는. 최대 5% 특별적립`,
    openGraph: {
      title: '롯데멤버스 카드 출시',
      description: '롯데 안에서 쓰면 쓸수록 혜택이 커지는. 최대 5% 특별적립',
      images: ogImage
    }
  };
}

export default function Home() {
  useEffect(() => {
    window.location.href = "https://m.event.lottecard-ad.co.kr";
  }, []);

  return (
    <div className='videoBG'>
      <video autoPlay muted loop playsInline data-src="bg.mp4" poster="bg.jpg" src="bg.mp4" />
      <div className='wrapper'>
        <header></header>
        <main>
          <section>
            <h2>Redirecting...</h2>
            <p>페이지가 자동으로 이동하지 않으면 <a href="https://m.event.lottecard-ad.co.kr">여기</a>를 클릭해주세요.</p>
          </section>
        </main>
        <footer>
          <p>&copy; 신³⁴⁰⁷</p>
        </footer>
      </div>
    </div>
  );
}
