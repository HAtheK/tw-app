'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function KakaoCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) {
      alert('카카오 로그인 실패: 인가 코드 없음');
      router.push('/login');
      return;
    }

    const handleLogin = async () => {
      try {
        const res = await fetch('/api/auth/kakao-callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        const result = await res.json();

        if (result.needNickname) {
          router.push('/set-nickname');
        } else {
          router.push('/sharegame');
        }
      } catch (err) {
        console.error('카카오 콜백 처리 중 오류:', err);
        router.push('/login');
      }
    };

    handleLogin();
  }, [searchParams]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg">로그인 중입니다...</p>
    </div>
  );
}
