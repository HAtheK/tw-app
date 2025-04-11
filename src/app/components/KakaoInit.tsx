'use client';

import { useEffect } from 'react';

export default function KakaoInit() {
  useEffect(() => {
    // Kakao SDK가 이미 로드되었는지 확인
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY); // 퍼블릭 키
      console.log('✅ Kakao SDK Initialized');
    }
  }, []);

  return null;
}
