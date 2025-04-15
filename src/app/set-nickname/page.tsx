'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SetNicknamePage = () => {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSave = async () => {
    setError('');

    const res = await fetch('/api/auth/set-nickname', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // ✅ 쿠키 포함
      body: JSON.stringify({ nickname }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || '닉네임 저장 실패');
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
        placeholder="한글 1~8자"
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
