// app/set-nickname/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import SetNicknameClient from '../../components/SetNicknameClient';

export default async function SetNicknamePage() {
  const cookieStore = cookies();
  const kakaoId = cookieStore.get('kakao_id')?.value;
  const kakaoToken = cookieStore.get('kakao_token')?.value;
  console.log('✅ set/nickname/page진입:',kakaoId,kakaoToken);
  if (!kakaoId || !kakaoToken) {
    console.warn('❌ 쿠키 없음 → /login');
    redirect('/login');
  }

  const supabase = createClient();
  const { data: user, error } = await supabase
    .from('users')
    .select('id, nickname')
    .eq('kakao_id', kakaoId)
    .single();

   console.log('✅ supabse',user,error);

  if (error || !user) {
    console.warn('❌ 사용자 DB 없음 → /login');
    redirect('/login');
  }

  if (user.nickname) {
    console.log('✅ 이미 닉네임 있음 → /sharegame');
    redirect('/sharegame');
  }

  return <SetNicknameClient userId={user.id} />;
}
