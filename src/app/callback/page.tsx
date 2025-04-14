'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code'); // 카카오 인증 코드

    if (code) {
      const fetchKakaoToken = async () => {
        try {
          // 카카오 인증 코드로 access token 받기
          const res = await fetch('https://kauth.kakao.com/oauth/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              client_id: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY!,
              redirect_uri: `${window.location.origin}/callback`,
              code: code!,
            }),
          });

          const data = await res.json();

          if (data.access_token) {
            // 받은 access token을 이용해 사용자 정보 요청
            const userRes = await fetch('https://kapi.kakao.com/v2/user/me', {
              headers: {
                Authorization: `Bearer ${data.access_token}`,
              },
            });
            const userData = await userRes.json();

            // 사용자 정보
            const user = {
              kakaoId: userData.id,
              nickname: userData.properties.nickname,
              email: userData.kakao_account.email,
              phone: userData.kakao_account.phone_number,
            };

            // Supabase에 사용자 등록
            const supabaseRes = await fetch('/api/auth/kakao-login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(user),
            });

            const result = await supabaseRes.json();

            // 닉네임이 없으면 설정 페이지로 리디렉션
            if (result.needNickname) {
              router.push('/set-nickname');
            } else {
              router.push('/sharegame');
            }
          } else {
            alert('카카오 로그인 실패');
          }
        } catch (err) {
          console.error('로그인 처리 중 오류 발생', err);
          alert('로그인 처리 중 오류가 발생했습니다.');
        }
      };

      fetchKakaoToken();
    } else {
      alert('카카오 인증 코드가 없습니다.');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <p>로그인 중...</p>
    </div>
  );
};

export default CallbackPage;
