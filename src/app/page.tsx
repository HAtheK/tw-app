// pages/index.tsx
import { useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  useEffect(() => {
    window.location.href = 'https://m.event.lottecard-ad.co.kr/lotte_memberscard_brand.html'; // 리디렉션 URL
  }, []);

  return (
    <>
      <Head>
        <title>롯데멤버스 카드</title>
        <meta property="og:title" content="롯데멤버스 카드 출시| 롯데 안에서 쓸수록 커지는 혜택" />
        <meta property="og:description" content="L.POINT 최대 5% 적립 + 국내외 가맹점 L.POINT 0.5% 적립 + 최대20만 L.POINT 적립 " />
        <meta property="og:image" content="og-image.png" />
        <meta property="og:url" content="https://m.lpoint.com" />
      </Head>
      <main>
        <h1>페이지 이동중입니다...</h1>
      </main>
    </>
  );
}
