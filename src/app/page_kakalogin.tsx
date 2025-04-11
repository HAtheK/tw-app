'use client';

import { useEffect, useState } from 'react';

type KakaoUser = {
  id: number;
  kakao_account: {
    profile: {
      nickname: string;
    };
    email?: string;
  };
};

export default function HomePage() {
  const [user, setUser] = useState<KakaoUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/me', {
      credentials: 'include', // ✅ 쿠키 포함 설정 추가
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8">로딩 중...</div>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">카카오싱크 로그인 예제</h1>

      {!user ? (
        <a href="/login">
          <button className="bg-yellow-400 px-4 py-2 rounded">카카오로 로그인</button>
        </a>
      ) : (
        <div>
          <p>안녕하세요, <strong>{user.kakao_account.profile.nickname}</strong>님 👋</p>
          <p className="text-gray-600 text-sm">이메일: {user.kakao_account.email ?? '미제공'}</p>

          <button
            className="mt-4 bg-gray-300 px-3 py-1 rounded"
            onClick={() => (window.location.href = '/api/logout')}
          >
            로그아웃
          </button>
        </div>
      )}
    </main>
  );
}
