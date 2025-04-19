// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import Script from 'next/script'
import KakaoInit from '@/components/KakaoInit'

export const metadata = {
  title: '롯데멤버스 카드',
  description: '공유하기 챌린지',
  themeColor: '#3182f6',
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* Kakao SDK 로딩 */}
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        {/* 초기화 수행 */}
        <KakaoInit />
        {children}
      </body>
    </html>
  );
}
