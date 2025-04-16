'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { supabase } from '@/lib/supabase/client';

const SetNicknamePage = () => {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // 로딩 플래그
  const router = useRouter();

  useEffect(() => {
    const verifyUserAndNickname = async () => {
      const kakaoId = Cookies.get('kakao_id');
      const kakaoToken = Cookies.get('kakao_token');

      if (!kakaoId || !kakaoToken) {
        console.warn('❌ 쿠키 없음 → /login');
        router.replace('/login');
        return;
      }

      const { data: user, error: userError } = await supabase
        .from('users')
        .select('nickname')
        .eq('kakao_id', kakaoId)
        .single();

      if (userError || !user) {
        console.warn('❌ 사용자 없음 → /login');
        router.replace('/login');
        return;
      }

      if (user.nickname) {
        console.log('✅ 닉네임 있음 → /sharegame');
        router.replace('/sharegame');
        return;
      }

      // 닉네임 없음 → 입력 폼 렌더링
      setLoading(false);
    };

    verifyUserAndNickname();
  }, []);

  const handleSave = async () => {
    setError('');
    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요');
      return;
    }

    console.log('📤 닉네임 제출:', nickname);

    const res = await fetch('/api/auth/set-nickname', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      credentials: 'include',
      body: JSON.stringify({ nickname }),
    });

    const data = await res.json();

    console.log('📥 응답 상태:', res.status);
    console.log('📥 응답 데이터:', data);

    if (!res.ok) {
      setError(data.error || '닉네임 저장 실패');
    } else {
      console.log('✅ 닉네임 저장 성공 → /sharegame');
      router.replace('/sharegame');
    }
  };

  if (loading) return null; // 로딩 중에는 아무것도 렌더링하지 않음

  return (
    <main className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-white text-center text-black px-4 py-6">
      {/* 헤더 */}
      <header className="text-xl font-bold mb-4">🎮 카카오톡 공유 이벤트</header>

      {/* 콘텐츠 */}
      <section className="flex flex-col items-center justify-center space-y-6">
        <div className="p-4 w-full max-w-md">
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
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            등록하고 시작하기
          </button>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="text-sm text-gray-500 mt-6">
        © 2025 - PLCC Cell. All rights reserved.
      </footer>
    </main>
  );
};

export default SetNicknamePage;
