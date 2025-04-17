// app/login/callback/page.tsx
import { Suspense } from 'react';
import KakaoCallbackHandler from './KakaoCallbackHandler';

export default function CallbackPage() {
  return (
    <Suspense fallback={<p>로그인 처리 중입니다...</p>}>
      <KakaoCallbackHandler />
    </Suspense>
  );
}
