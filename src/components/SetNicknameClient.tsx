'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  userId: string;
};

const SetNicknameClient = ({ userId }: Props) => {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

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
      },
      credentials: 'include',
      body: JSON.stringify({ nickname, userId }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || '닉네임 저장 실패');
    } else {
      console.log('✅ 닉네임 저장 성공 → /sharegame');
      router.replace('/sharegame');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between items-center px-4 py-6 text-center font-dgm text-white
             bg-[url('/login_bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
        <div className="absolute inset-0 bg-black/80 z-0" />  
    
      {/* 헤더 */}
      <header className="fixed top-0 left-0 w-full h-16 bg-black flex items-center justify-between px-5 z-10">
        <div className="relative w-36 h-6 sm:w-40 sm:h-7">
          <Image
            src="/logo-white.png"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
        </header>
      <main className="flex flex-col gap-6 items-center mt-24 relative z-10">
      {/* 콘텐츠 */}
      <Image src="/nick.png" alt="로고" width={100} height={100} />
      <div style={{ width: '100%', minHeight: '1px', height: '60px' }}></div>
      <section className="flex flex-col items-center justify-center space-y-6">
        <div style={{width:'100%', minHeight:'1px',height:'60px'}}></div>
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
        <div style={{width:'100%', minHeight:'1px',height:'20px'}}></div>
        <p className="text-xs text-left px-4">
            ※ 닉네임은 자신을 나타내는 이름과 같습니다.<br/>
            ※ 불벅적이거나 타인에게 오해를 일으키고 불쾌감을 주는 닉네임은 변경/삭제될 수 있습니다.<br/>
            ※ 닉네임음 최초 설정 하신 후, 변경할 수 없습니다.</p>
      </section>

      {/* 푸터 */}
      <footer className="fixed bottom-0 left-0 w-full h-[30px] text-white flex items-center justify-center font-ptd">
        임직원 이용 목적으로 제작한 사이트 입니다. 문의사항은 언제든 PLCC셀로 연락주세요.
      </footer>
    </main>
  </div>
  );
};

export default SetNicknameClient;
