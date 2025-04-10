// app/redirect/metadata.ts
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '롯데멤버스 카드 출시',
  description: '롯데 안에서 쓰멸 쓸수록 이득! 최대 5% 특별적립',
  openGraph: {
    title: '롯데멤버스 카드 출시',
    description: '롯데 안에서 쓰멸 쓸수록 이득! 최대 5% 특별적립',
    images: [
      {
        url: 'og-imge.png',
        width: 1200,
        height: 630,
        alt: '썸네일 대체 텍스트',
      },
    ],
    url: 'https://m.lpoint.com', // 현재 페이지 URL
    type: 'website',
  },

};
