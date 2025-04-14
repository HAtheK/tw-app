'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const KakaoCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchKakaoUser = async () => {
      const code = searchParams.get('code');

      if (!code) {
        alert('카카오 로그인 실패: 인가 코드 없음');
        router.push('/login');
        return;
      }

      try {
        // 백엔드 API에서 인가코드를 이용해 access_token 교환 후 로그인 처리
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
        alert('카카오 로그인 처리 중 오류 발생');
        router.push('/login');
      }
    };

    fetchKakaoUser();
  }, [searchParams]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p>로그인 중입니다...</p>
    </div>
  );
};

export default KakaoCallbackPage;
