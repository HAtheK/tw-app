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
      if (!code) {
        router.replace('/');
        return;
      }

      try {
        const response = await fetch('/api/kakao/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        const { access_token } = await response.json();

        const profileRes = await fetch('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const profile = await profileRes.json();

        const { id, kakao_account, properties } = profile;
        const kakaoId = id.toString();
        const email = kakao_account.email || null;
        const phone = kakao_account.phone_number || null;
        const nickname = properties.nickname || null;

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

        const userId = data?.id;
        if (!userId) throw new Error('Supabase user insert 실패');

        router.replace('/set-nickname');
      } catch (error) {
        console.error('카카오 로그인 처리 실패:', error);
        router.replace('/');
      } finally {
        setProcessing(false);
      }
    };

    fetchAccessTokenAndUser();
  }, [searchParams, router]);

  return <div>{processing ? '카카오 로그인 처리 중입니다...' : '처리 완료'}</div>;
}
