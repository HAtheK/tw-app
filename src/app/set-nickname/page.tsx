// Add this at the top of your file
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';  // 수정된 부분
import { useRouter } from 'next/navigation';

const SetNicknamePage = () => {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickname) {
      setError('닉네임을 입력해 주세요.');
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace('/login');
      return;
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .upsert(
        {
          id: user.id,
          nickname,
        },
        { onConflict: ['id'] }
      );

    if (updateError) {
      setError('닉네임을 설정하는 중 오류가 발생했습니다.');
      console.error(updateError);
      return;
    }

    // 닉네임 설정 후 sharegame 페이지로 이동
    router.replace('/sharegame');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">닉네임을 설정해 주세요</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nickname" className="block text-lg">
            닉네임
          </label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            placeholder="닉네임을 입력하세요"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          설정
        </button>
      </form>
    </div>
  );
};

export default SetNicknamePage;
