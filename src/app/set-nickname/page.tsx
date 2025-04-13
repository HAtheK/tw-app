'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const SetNicknamePage = () => {
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // 로그인 여부 확인 및 닉네임 있는 경우 리다이렉트
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      const user = data?.user;
      if (!user) {
        router.push('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('nickname')
        .eq('id', user.id)
        .single();

      if (profile?.nickname) {
        router.push('/sharegame');
      }
    };

    checkUser();
  }, [router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) return alert('닉네임을 입력해 주세요.');

    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert('로그인이 필요합니다.');
      router.push('/login');
      return;
    }

    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      nickname: nickname.trim(),
    });

    setLoading(false);

    if (error) {
      alert('닉네임 저장에 실패했습니다.');
      console.error(error);
    } else {
      router.push('/sharegame');
    }
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>닉네임 설정</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          disabled={loading}
          style={{ padding: 8, fontSize: 16, width: '100%', marginBottom: 12 }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: 16,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? '저장 중...' : '저장하고 시작하기'}
        </button>
      </form>
    </main>
  );
};

export default SetNicknamePage;
