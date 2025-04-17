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
          window.Kakao.setAccessToken(token);
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
      // 1. 카카오 로그인 상태 확인
      const accessToken = window.Kakao.Auth.getAccessToken();
      if (!accessToken) {
        console.error('❌ 카카오 로그인되지 않았습니다.');
        alert('카카오 로그인이 필요합니다.');
        return;
      }
  
      console.log('📤 로그인 확인 완료');
  
      // 2. 카카오 친구 정보 가져오기
      const response = await window.Kakao.API.request({
        url: '/v1/api/talk/friends',
      });
  
      const friends = response.elements || [];
      console.log('친구 목록:', friends);
  
      // 3. 친구 피커 띄우기
      window.Kakao.Picker.selectFriends({
        title: '친구 선택',
        maxPickableCount: 10,
        minPickableCount: 1,
        success: async (pickerResponse: KakaoFriendResponse) => {
          const uuids = pickerResponse.selectedFriends.map((f) => f.uuid);
          console.log('✅ 선택된 친구 UUID:', uuids);
  
          // 4. 템플릿 ID 119614 메시지 발송
          try {
            const messageResponse = await window.Kakao.Share.sendCustom({
              templateId: 119614, // 템플릿 ID 119614 사용
              templateArgs: {
                // 템플릿 인자 (필요시 추가)
              },
            });
  
            console.log('📨 메시지 전송 성공:', messageResponse);
  
            // 5. 발송 결과 콘솔에 기록
            const successfulUuids = messageResponse.successful_receiver_uuids || [];
            const failedUuids = messageResponse.failed_receiver_uuids || [];
  
            console.log('성공한 친구 UUID:', successfulUuids);
            console.log('실패한 친구 UUID:', failedUuids);
  
          } catch (error) {
            console.error('❌ 메시지 전송 실패:', error);
            alert('메시지 전송 실패');
          }
        },
        fail: (error: any) => {
          console.error('❌ 친구 선택 실패:', error);
          alert('친구 선택 실패');
        },
      });
    } catch (error) {
      console.error('❌ 에러 발생:', error);
      alert('오류가 발생했습니다.');
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
