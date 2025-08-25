'use client';

import Image from 'next/image';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { HiOutlineRefresh } from 'react-icons/hi';
import { RiKakaoTalkFill } from 'react-icons/ri';

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
       //templateId: 119614, PLCC
        templateId: 119837,
      serverCallbackArgs: JSON.stringify({
        userId,
        kakaoId,
        sharedAt: new Date().toISOString(),
      }),
    });
  };

  return (
  
    <main className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 text-black grid grid-rows-[auto_1fr_auto] font-dgm">
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
      {/* 콘텐츠 */}
      <section className="flex flex-col items-center space-y-6 w-full max-w-2xl mx-auto px-4">
        <div style={{width:'100%', minHeight:'1px',height:'60px'}}></div>
        {/* 공유 영역 */}
        <div className="share-client text-center mt-6">
          <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="beforeInteractive" />
          <p className="text-xl text-white">👋<b> {nickname}</b>님,<br/>친구에게 메시지를 공유해보세요!</p>
        </div>
        <div>
        <button
            className="flex items-center justify-center gap-2 bg-[#FEE500] hover:bg-[#f7d800] text-black w-[300px] px-4 py-3 rounded-full text-base font-semibold shadow transition"
            onClick={handleShare}
          >
            <RiKakaoTalkFill size={25} />
            친구에게 공유하기
          </button>
        </div>

        <div style={{width:'100%', minHeight:'1px',height:'20px'}}></div>
        <div>
          <Image
            src="/persons.png"
            alt=""
            width={470} // 고정 px이 아닌, 최대 사이즈 제어
            className="object-contain relative top-[31px]"
          />
        </div>
        </section>

        {/* 📊 TOP10 순위 */}
        {/* 하단 컨텐츠 영역 */}
        <section 
            className="top-0 left-0 w-full bg-black flex items-center justify-between px-5" 
            style={{backgroundColor: 'white', borderRadius: '30px 30px 0px 0px'}}
            >
      
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
            <div className="mt-4 p-3 rounded-lg bg-gray-100 text-xs text-center shadow-inner">
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
      <footer className="fixed bottom-0 left-0 w-full h-[30px] text-white flex items-center justify-center font-ptd">
        임직원 이용 목적으로 제작한 사이트 입니다.
      </footer>
    </main>
  );
}
