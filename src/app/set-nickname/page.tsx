'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const SetNicknamePage = () => {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSave = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace('/login');
      return;
    }

    const { error } = await supabase
      .from('users')
      .update({ nickname })
      .eq('id', user.id);

    if (error) {
      setError('닉네임 저장 실패');
    } else {
      router.replace('/sharegame');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">닉네임을 입력해주세요</h1>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="border px-2 py-1 w-full"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        등록하고 시작하기
      </button>
    </div>
  );
};

export default SetNicknamePage;
