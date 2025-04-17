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
    const { data, error } = await supabase
      .from('share_records')
      .select('user_id, count')
      .order('count', { ascending: false })
      .limit(10);

    if (error) {
      console.error('❌ 랭킹 불러오기 실패:', error.message);
    } else {
      setRanking(data || []);
    }
  };

  const handleShare = () => {
    if (!window.Kakao?.Auth || !window.Kakao?.API || !window.Kakao?.Picker) {
      alert('카카오 SDK 로딩 실패');
      return;
    }

    const token = window.Kakao.Auth.getAccessToken();
    console.log('현재 AccessToken', token);
    if (!token) {
      window.Kakao.Auth.login({
        scope: 'friends,talk_message',
        success: (authObj: any) => {
          console.log('✅ 로그인 성공:', authObj);
          window.Kakao.Auth.setAccessToken(authObj.access_token);
          handleShareFlow();
        },
        fail: (err: any) => {
          console.error('❌ 로그인 실패:', err);
          alert('카카오 로그인에 실패했습니다.');
        },
      });
    } else {
      window.Kakao.Auth.setAccessToken(token); // 안정성을 위해 명시적 재설정
      handleShareFlow();
    }
  };

  const handleShareFlow = async () => {
    try {
      const accessToken = window.Kakao.Auth.getAccessToken();
      if (!accessToken) {
        alert('카카오 로그인이 필요합니다.');
        return;
      }

      const response = await window.Kakao.API.request({
        url: '/v1/api/talk/friends',
      });

      const friends = response?.elements || [];
      console.log('📋 친구 목록:', friends);

      window.Kakao.Picker.selectFriends({
        title: '친구 선택',
        maxPickableCount: 10,
        minPickableCount: 1,
        success: async (pickerRes: KakaoFriendResponse) => {
          const uuids = pickerRes.selectedFriends.map(f => f.uuid);
          console.log('✅ 선택된 UUID:', uuids);

          try {
            const sendResult = await window.Kakao.Share.sendCustom({
              templateId: 119614,
              receiverUuids: uuids,
              templateArgs: {},
            });

            console.log('📨 메시지 전송 성공:', sendResult);
            await recordShareResults(sendResult.successful_receiver_uuids, sendResult.failed_receiver_uuids);
            await fetchRanking();
          } catch (error) {
            console.error('❌ 메시지 전송 실패:', error);
            alert('메시지 전송 실패');
          }
        },
        fail: (err: any) => {
          console.error('❌ 친구 선택 실패:', err);
          alert('친구 선택 실패');
        },
      });
    } catch (error) {
      console.error('❌ 에러 발생:', error);
      alert('공유 과정 중 오류가 발생했습니다.');
    }
  };

  const recordShareResults = async (successUuids: string[], failUuids: string[]) => {
    const updates = [];

    if (successUuids.length > 0) {
      updates.push(
        supabase.from('share_records').insert(
          successUuids.map(uuid => ({
            user_id: userId,
            kakao_uuid: uuid,
            success: true,
          }))
        )
      );
    }

    if (failUuids.length > 0) {
      updates.push(
        supabase.from('failed_share_records').insert(
          failUuids.map(uuid => ({
            user_id: userId,
            kakao_uuid: uuid,
            success: false,
          }))
        )
      );
    }

    const results = await Promise.all(updates);
    results.forEach((res, i) => {
      if (res.error) {
        console.error(`❌ 기록 실패 [${i === 0 ? '성공 기록' : '실패 기록'}]:`, res.error.message);
      }
    });
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
