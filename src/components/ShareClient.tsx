'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { HiOutlineRefresh } from 'react-icons/hi'; // 새로고침 아이콘

interface ShareClientProps {
  userId: string;
  nickname: string;
  kakaoId: string;
}

interface RankEntry {
  nickname: string;
  share_count: number;
}

export default function ShareClient({ userId, nickname, kakaoId }: ShareClientProps) {
  const [top10, setTop10] = useState<RankEntry[]>([]);

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
    fetchTop10();
  }, []);

  const fetchTop10 = async () => {
    const res = await fetch('/api/auth/sharegame/top10');
    const { top10 } = await res.json();
    setTop10(top10);
  };

  const handleShare = () => {
    if (!window.Kakao?.Share) {
      alert('카카오 공유 기능을 사용할 수 없습니다.');
      return;
    }

    window.Kakao.Share.sendCustom({
      templateId: 119614,
      serverCallbackArgs: JSON.stringify({
        userId,
        kakaoId,
        sharedAt: new Date().toISOString(),
      }),
    });
  };

  return (
    <main className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-white text-black px-4 py-6">
      {/* 헤더 */}
      <header className="text-2xl md:text-3xl font-bold mb-4 text-center">
        📢롯데멤버스 카드 공유 챌린지🎮
      </header>

      {/* 콘텐츠 */}
      <section className="flex flex-col items-center space-y-6 w-full max-w-2xl mx-auto">

        <div className="share-client text-center mt-6">
          <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="beforeInteractive" />
          <p className="text-xl font-semibold">👋 {nickname}님, 친구에게 메시지를 공유해보세요!</p>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded mt-4"
            onClick={handleShare}
          >
            친구에게 공유하기
          </button>
        </div>

        {/* 📊 TOP10 순위 */}
        <div className="w-full mt-8">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">🏆 TOP10 공유 순위</h3>
            <button onClick={fetchTop10} title="새로고침">
              <HiOutlineRefresh className="text-gray-600 hover:text-black w-5 h-5" />
            </button>
          </div>
          <div className="border border-gray-300 rounded overflow-hidden">
            {[...Array(10)].map((_, i) => {
              const user = top10[i];
              const medal = ['🥇', '🥈', '🥉'][i] || '';
              return (
                <div
                  key={i}
                  className="grid grid-cols-3 text-center border-t first:border-t-0 py-2 px-2 text-sm"
                >
                  <div>{medal} {i + 1}</div>
                  <div className="truncate">{user?.nickname || '-'}</div>
                  <div>{user?.share_count ?? 0}회</div>
                </div>
              );
            })}
          </div>
        </div>

      </section>

      {/* 푸터 */}
      <footer className="text-sm text-gray-500 mt-6 text-center">
        © 2025 LOTTE MEMBERS PLCC Cell
      </footer>
    </main>
  );
}
