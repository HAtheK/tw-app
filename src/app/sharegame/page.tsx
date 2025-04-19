import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ShareClient from '@/components/ShareClient';

export default async function ShareGamePage() {
  const supabase = createClient();
  const cookieStore = cookies();
  const kakaoId = cookieStore.get('kakao_id')?.value;
  const kakaoToken = cookieStore.get('kakao_token')?.value;

  // ✅ 1) 토큰이 없으면 로그인 페이지로
  if (!kakaoId || !kakaoToken) {
    redirect('/login');
  }

  // ✅ 2) 카카오 토큰 유효성 확인
  const tokenCheckRes = await fetch('https://kapi.kakao.com/v1/user/access_token_info', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
  });

  if (!tokenCheckRes.ok) {
    // 토큰이 만료되었거나 잘못되었을 경우
    redirect('/login');
  }

  // ✅ 3) kakao_id로 사용자 조회
  const { data: user, error } = await supabase
    .from('users')
    .select('id, nickname, kakao_id')
    .eq('kakao_id', kakaoId)
    .single();

  if (error || !user) {
    redirect('/login');
  }

  // ✅ 4) 닉네임 없으면 닉네임 설정 페이지로 이동
  if (!user.nickname) {
    redirect('/set-nickname');
  }

  // ✅ 5) 정상 사용자 → 클라이언트 컴포넌트로 전달
  return (
    <ShareClient
      userId={user.id}
      nickname={user.nickname}
      kakaoId={user.kakao_id}
    />
  );
}
