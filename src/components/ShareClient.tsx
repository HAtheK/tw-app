'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

type Props = {
  userId: string;
  nickname: string;
};

type KakaoFriendResponse = {
  selectedFriends: { uuid: string }[];
};

const ShareClient = ({ userId, nickname }: Props) => {
  const [ranking, setRanking] = useState<any[]>([]);

  useEffect(() => {
    fetchRanking();
  }, []);

  const fetchRanking = async () => {
    const { data: topRanks, error } = await supabase
      .from('share_records')
      .select('user_id, count')
      .order('count', { ascending: false })
      .limit(10);

    if (error) {
      console.error('❌ 랭킹 불러오기 실패:', error.message);
      return;
    }

    setRanking(topRanks || []);
  };

  const handleShare = () => {
    if (!window.Kakao || !window.Kakao.Picker || !window.Kakao.Auth) {
      alert('카카오 SDK 로딩 실패');
      return;
    }

    // 액세스 토큰 확인
    const token = window.Kakao.Auth.getAccessToken();
    if (!token) {
      console.log('🔑 액세스토큰 없음 → 로그인 시도');

      window.Kakao.Auth.login({
        scope: 'friends,talk_message',
        success: function () {
          console.log('✅ 로그인 성공 → 공유 진행');
          proceedShare();
        },
        fail: function (err: any) {
          console.error('❌ 로그인 실패:', err);
          alert('카카오 로그인에 실패했습니다.');
        },
      });
    } else {
      console.log('🔐 액세스토큰 있음 → 공유 진행');
      proceedShare();
    }
  };

  const proceedShare = async () => {
    try {
      // 카카오 SDK가 로드되어 있는지 확인
      if (!window.Kakao) {
        console.error('❌ 카카오 SDK가 로드되지 않았습니다.');
        alert('카카오 SDK가 로드되지 않았습니다.');
        return;
      }
  
      console.log('📤 메시지 전송 시작');
  
      // 카카오 메시지 전송
      const response = await window.Kakao.Share.sendCustom({
        templateId: 119614, // 사용하려는 템플릿 ID
      });
  
      console.log('📨 메시지 전송 성공:', response);
  
      // 성공적으로 메시지가 전송되었을 때 서버에 기록
      const serverResponse = await fetch('/api/auth/sharegame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          successfulUuids: ["success"],  // 성공적으로 메시지를 전송한 친구들 (피커를 사용하지 않으므로 빈 배열)
          failedUuids: [],      // 실패한 친구들 (없으면 빈 배열)
        }),
      });
  
      const result = await serverResponse.json();
      console.log('✅ 서버 기록 결과:', result);
  
      // 랭킹 재불러오기
      fetchRanking();
    } catch (error) {
      console.error('❌ 메시지 전송 중 에러 발생:', error);
      alert('메시지 전송에 실패했습니다.');
    }
  };
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{nickname}님, 친구에게 공유해보세요!</h1>
      <button
        onClick={handleShare}
        className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded"
      >
        친구에게 공유하기
      </button>

      <h2 className="text-xl font-semibold mt-8 mb-2">공유 TOP 10</h2>
      <ul className="list-decimal list-inside">
        {ranking.map((rank, idx) => (
          <li key={idx}>
            사용자 ID: {rank.user_id} - 공유 수: {rank.count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShareClient;
