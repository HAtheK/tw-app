'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

type Props = {
  userId: string;
  nickname: string;
};

type KakaoFriend = {
  uuid: string;
  id?: number;
  profile_nickname?: string;
  profile_thumbnail_image?: string;
};

const ShareClient = ({ userId, nickname }: Props) => {
  const [ranking, setRanking] = useState<any[]>([]);

  useEffect(() => {
    fetchRanking();
  }, []);

  const fetchRanking = async () => {
    console.log('📊 TOP10 랭킹 불러오기 시작');

    const { data: topRanks, error } = await supabase
      .from('share_records')
      .select('user_id, count')
      .order('count', { ascending: false })
      .limit(10);

    if (error) {
      console.error('❌ 랭킹 불러오기 실패:', error.message);
      return;
    }

    console.log('✅ 랭킹 불러오기 성공:', topRanks);
    setRanking(topRanks || []);
  };

  const handleShare = async () => {
    if (!window.Kakao || !window.Kakao.Link) {
      alert('카카오 SDK 로딩 실패');
      return;
    }

    console.log('📤 친구 선택 및 공유 시작');

    try {
      window.Kakao.Picker.selectFriends({
        showMyProfile: false,
        maxPickableCount: 10,
        minPickableCount: 1,
        onSelected: async (selectedUsers: KakaoFriend[]) => {
          const uuids = selectedUsers.map((user) => user.uuid);
          console.log('✅ 선택된 친구들:', uuids);

          await window.Kakao.API.request({
            url: '/v1/api/talk/friends/message/send',
            data: {
              receiver_uuids: uuids,
              template_id: 119614,
              template_args: {},
            },
            success: async (res: any) => {
              console.log('📨 메시지 전송 성공:', res);

              const response = await fetch('/api/auth/sharegame', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  userId,
                  successfulUuids: res.successful_receiver_uuids,
                  failedUuids: res.failed_receiver_uuids,
                }),
              });

              const result = await response.json();
              console.log('✅ 서버 기록 결과:', result);

              fetchRanking();
            },
            fail: (err: any) => {
              console.error('❌ 메시지 전송 실패:', err);
              alert('메시지 전송에 실패했습니다.');
            },
          });
        },
        onCancel: () => {
          console.log('🚫 친구 선택 취소됨');
        },
      });
    } catch (err) {
      console.error('❌ 공유 중 에러 발생:', err);
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
