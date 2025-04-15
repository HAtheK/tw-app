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
    <main className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-white text-center text-black px-4 py-6">
      {/* 헤더 */}
      <header className="text-xl font-bold mb-4">🎮 카카오톡 공유 이벤트</header>

      {/* 콘텐츠 */}
      <section className="flex flex-col items-center justify-center space-y-6">
    

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

    </section>

    {/* 푸터 */}
    <footer className="text-sm text-gray-500 mt-6">
      © 2025 -PLCC Cell. All rights reserved.
    </footer>
  </main>

  );
};

export default SetNicknamePage;
