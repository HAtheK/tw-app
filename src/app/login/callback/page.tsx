'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      // 예: Supabase나 Kakao 인증 처리
      router.replace('/set-nickname');
    } else {
      router.replace('/login');
    }
  }, [searchParams, router]);

  return <p>로그인 처리 중입니다...</p>;
}
