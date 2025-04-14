import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// KakaoCallbackHandler를 동적으로 불러오며 클라이언트 컴포넌트로 분리
const KakaoCallbackHandler = dynamic(() => import('./KakaoCallbackHandler'), {
  ssr: false,
});

export default function KakaoCallbackPage() {
  return (
    <Suspense fallback={<div>카카오 로그인 처리 중입니다...</div>}>
      <KakaoCallbackHandler />
    </Suspense>
  );
}
