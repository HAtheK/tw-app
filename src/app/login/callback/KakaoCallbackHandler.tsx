'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function KakaoCallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      // 여기에 카카오 토큰 요청 및 처리 로직 작성
      console.log('Kakao login code:', code);

      // 예시: 로그인 완료 후 redirect
      // 실제 구현에서는 Supabase 연동이나 토큰 저장 등의 로직이 들어갈 수 있음
      router.replace('/sharegame');
    } else {
      // code가 없을 경우 에러 처리 or 홈으로
      console.warn('No code found in callback URL');
      router.replace('/');
    }

    setProcessing(false);
  }, [searchParams, router]);

  return (
    <div>
      {processing ? '카카오 로그인 처리 중입니다...' : '처리 완료'}
    </div>
  );
}
