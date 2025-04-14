import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const KakaoCallbackHandler = dynamic(() => import('./KakaoCallbackHandler'), {
  ssr: false, // 클라이언트 전용
});

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <KakaoCallbackHandler />
    </Suspense>
  );
}
