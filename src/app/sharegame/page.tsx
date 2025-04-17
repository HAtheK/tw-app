import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ShareClient from '@/components/ShareClient';

export default async function ShareGamePage() {
  const supabase = createClient();
  const cookieStore = cookies();
  const kakaoId = cookieStore.get('kakao_id')?.value;
  const kakaoToken = cookieStore.get('kakao_token')?.value;

  // ✅ 1) 로그인 상태 확인
  if (!kakaoId || !kakaoToken) {
    redirect('/login');
  }

  // ✅ 2) kakao_id로 사용자 조회
  const { data: user, error } = await supabase
    .from('users') // 또는 'profiles' 사용 시 수정
    .select('id, nickname, kakao_id')
    .eq('kakao_id', kakaoId)
    .single();

  // ✅ 3) 사용자 정보 없거나 에러 시 로그인으로
  if (error || !user) {
    redirect('/login');
  }

  // ✅ 4) 닉네임 없으면 /set-nickname 이동
  if (!user.nickname) {
    redirect('/set-nickname');
  }

  // ✅ 5) ShareClient에 kakaoId도 전달
  return (
    <ShareClient
      userId={user.id}
      nickname={user.nickname}
      kakaoId={user.kakao_id}
    />
  );
}
