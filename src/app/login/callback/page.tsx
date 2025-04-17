'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) return;

    const fetchToken = async () => {
      const res = await fetch('/api/auth/kakao/token', {
        method: 'POST',
        body: JSON.stringify({ code }),
      });

      const { access_token } = await res.json();

      if (access_token) {
        // ✅ Kakao SDK에 직접 토큰 주입
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
        }
        window.Kakao.Auth.setAccessToken(access_token);

        // ✅ 필요시 localStorage에도 저장
        localStorage.setItem('kakao_token', access_token);

        router.push('/set-nickname'); // 이후 페이지로 이동
      }
    };

    fetchToken();
  }, [searchParams, router]);

  return <p>로그인 중입니다...</p>;
}
