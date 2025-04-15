'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function KakaoCallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const fetchAccessTokenAndUser = async () => {
      const code = searchParams.get('code');
      console.log('🔑 받은 code:', code);

      if (!code) {
        console.warn('❌ code 없음 - 홈으로 리디렉션');
        router.replace('/');
        return;
      }

      try {
        // 1. 카카오 Access Token 요청
        console.log('📡 /api/auth/kakao/token 요청 중...');
        const tokenResponse = await fetch('/api/auth/kakao/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        const tokenData = await tokenResponse.json();
        console.log('✅ 토큰 응답:', tokenData);

        const access_token = tokenData.access_token;
        if (!access_token) {
          console.error('❌ access_token 없음. 전체 응답:', tokenData);
          throw new Error('access_token이 존재하지 않습니다.');
        }

        // 2. 사용자 프로필 요청
        console.log('📡 Kakao 사용자 정보 요청 중...');
        const profileRes = await fetch('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const profile = await profileRes.json();
        console.log('✅ 사용자 프로필:', profile);

        const { id, kakao_account } = profile;
        const kakaoId = id?.toString();
        const kakaoNickname = kakao_account?.profile?.nickname || '사용자';
        const email = kakao_account?.email || null;
        const phone = kakao_account?.phone_number || null;

        if (!kakaoId || !kakaoNickname) {
          throw new Error('사용자 정보 부족');
        }

        // 3. Supabase 저장 및 쿠키 설정 요청
        console.log('📡 /api/auth/kakao 로 사용자 정보 전송 중...');
        const apiResponse = await fetch('/api/auth/kakao', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            kakaoId,
            kakaoNickname,
            email,
            phone,
            accessToken: access_token,
          }),
        });

        const apiResult = await apiResponse.json();
        console.log('✅ 사용자 저장 응답:', apiResult);

        if (!apiResponse.ok) {
          console.error('❌ 사용자 저장 실패 응답:', apiResult);
          throw new Error(apiResult.error || '사용자 정보 저장 실패');
        }

        // 4. 별명 설정 페이지로 이동
        router.replace('/set-nickname');
      } catch (error) {
        console.error('🔥 카카오 로그인 처리 실패:', error);
        router.replace('/');
      } finally {
        setProcessing(false);
      }
    };

    fetchAccessTokenAndUser();
  }, [searchParams, router]);

  return <div>{processing ? '카카오 로그인 처리 중입니다...' : '처리 완료'}</div>;
}
