import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ShareClient from '@/components/ShareClient';

export default async function ShareGamePage() {
  const supabase = createClient();
  const cookieStore = cookies();
  const kakaoId = cookieStore.get('kakao_id')?.value;
  const kakaoToken = cookieStore.get('kakao_token')?.value;

  if (!kakaoId || !kakaoToken) {
    redirect('/login');
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('id, nickname')
    .eq('kakao_id', kakaoId)
    .single();

  if (error || !user) {
    redirect('/login');
  }

  if (!user.nickname) {
    redirect('/set-nickname');
  }

  return <ShareClient userId={user.id} nickname={user.nickname} />;
}
