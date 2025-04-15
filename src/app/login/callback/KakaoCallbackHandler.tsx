'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

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
        console.log('📡 /api/kakao/token 요청 중...');
        const response = await fetch('/api/kakao/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        const tokenRes = await response.json();
        console.log('✅ 토큰 응답:', tokenRes);

        const access_token = tokenRes.access_token;
        if (!access_token) {
          throw new Error('❌ access_token 없음');
        }

        console.log('📡 Kakao 사용자 정보 요청 중...');
        const profileRes = await fetch('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const profile = await profileRes.json();
        console.log('✅ 사용자 프로필:', profile);

        const { id, kakao_account, properties } = profile;
        const kakaoId = id?.toString();
        const email = kakao_account?.email || null;
        const phone = kakao_account?.phone_number || null;
        const nickname = properties?.nickname || null;

        console.log('📦 Supabase upsert 요청:', {
          kakao_id: kakaoId,
          email,
          phone,
          kakao_nickname: nickname,
        });

        const { data, error } = await supabase
          .from('users')
          .upsert(
            {
              kakao_id: kakaoId,
              email,
              phone,
              kakao_nickname: nickname,
            },
            { onConflict: 'kakao_id' }
          )
          .select()
          .single();

        if (error) {
          console.error('❌ Supabase 에러:', error);
          throw new Error('Supabase insert 실패');
        }

        const userId = data?.id;
        console.log('✅ Supabase user 등록 완료:', userId);

        if (!userId) throw new Error('Supabase user id 없음');

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
