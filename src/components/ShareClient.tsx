'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { HiOutlineRefresh } from 'react-icons/hi';

interface ShareClientProps {
  userId: string;
  nickname: string;
  kakaoId: string;
}

interface RankEntry {
  nickname: string;
  share_count: number;
  rank: number;
  last_shared_at: string;
}

interface MyRank {
  rank: number;
  share_count: number;
  last_shared_at: string;
}

export default function ShareClient({ userId, nickname, kakaoId }: ShareClientProps) {
  const [top10, setTop10] = useState<RankEntry[]>([]);
  const [myRank, setMyRank] = useState<MyRank | null>(null);

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
    fetchTop10();
    fetchMyRank();
  }, []);

  const fetchTop10 = async () => {
    const res = await fetch('/api/auth/sharegame/top10');
    const { top10 } = await res.json();

    // 순위가 10명 미만일 경우 부족한 순위를 채워준다
    while (top10.length < 10) {
      top10.push({
        rank: top10.length + 1,
        nickname: `-`,
        share_count: 0,
        first_shared_at: '없음',
      });
    }
    setTop10(top10);
  };

  const fetchMyRank = async () => {
    const res = await fetch(`/api/auth/sharegame/myrank?userId=${userId}`);
    const { rank, share_count, last_shared_at } = await res.json();
    setMyRank({ rank, share_count, last_shared_at });
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
    <main className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-white text-black px-4 py-6 font-dgm">
      {/* 헤더 */}
      <header className="text-2xl md:text-3xl font-bold mb-4 text-center">
        📢롯데멤버스 카드 공유 챌린지🎮
      </header>

      {/* 콘텐츠 */}
      <section className="flex flex-col items-center space-y-6 w-full max-w-2xl mx-auto">
        {/* 공유 영역 */}
        <div className="share-client text-center mt-6">
          <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="beforeInteractive" />
          <p className="text-xl font-semibold">👋 {nickname}님,<br/>친구에게 메시지를 공유해보세요!</p>
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

          <div className="rounded-lg shadow-md overflow-hidden bg-white divide-y divide-gray-200">
            {top10.map((user, i) => {
              const isCurrentUser = user.nickname === nickname;
              const emoji = ['🥇', '🥈', '🥉'][i] || `${user.rank}`;
              return (
                <div
                  key={user.rank}
                  className={`grid grid-cols-3 text-center py-3 px-4 text-sm ${isCurrentUser ? 'bg-yellow-100 font-semibold' : i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <div className="text-yellow-600">{emoji}</div>
                  <div className="truncate">{user.nickname || '없음'}</div>
                  <div>{user.share_count}회</div>
                </div>
              );
            })}
          </div>

          {/* 내 순위 하단 고정 표시 */}
          {myRank && (
            <div className="mt-4 p-3 rounded-lg bg-gray-100 text-sm text-center shadow-inner">
              🙋‍♀️ <span className="font-medium">{nickname}</span>님의 현재 순위는{' '}
              <strong>{myRank.rank}위</strong> 입니다.
              <br />
              총 공유:<strong>{myRank.share_count}</strong>회
              <br />
              마지막 공유: <strong>{new Date(myRank.last_shared_at).toLocaleString()}</strong>
            </div>
          )}
        </div>
      </section>

      {/* 푸터 */}
      <footer className="text-sm text-gray-500 mt-6 text-center">
        © 2025 LOTTE MEMBERS PLCC Cell
      </footer>
    </main>
  );
}
