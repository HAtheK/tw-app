'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSession } from '@/lib/session'; // 세션 가져오는 함수
import { supabase } from '@/lib/supabase';

export default function SetNicknamePage() {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace('/login');
      }
    });
  }, []);

  const handleSubmit = async () => {
    if (!/^[가-힣]{1,8}$/.test(nickname)) {
      setError('닉네임은 한글 8자 이내로 입력해주세요.');
      return;
    }

    const session = await getSession();
    if (!session?.user) return;

    const { data, error } = await supabase
      .from('users')
      .update({ nickname })
      .eq('kakao_id', session.user.kakao_id)
      .select();

    if (error) {
      if (error.message.includes('duplicate key')) {
        setError('이미 사용 중인 닉네임입니다.');
      } else {
        setError('닉네임 설정 중 오류가 발생했습니다.');
      }
      return;
    }

    router.push('/sharegame');
  };

  return (
    <main className="min-h-screen p-8 flex flex-col justify-center items-center text-center">
      <h1 className="text-xl font-bold mb-4">닉네임 설정</h1>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="한글 8자 이내 닉네임"
        className="border px-4 py-2 rounded mb-2"
      />
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button
        onClick={handleSubmit}
        className="bg-yellow-400 px-6 py-2 rounded text-black font-bold"
      >
        확인
      </button>
    </main>
  );
}
