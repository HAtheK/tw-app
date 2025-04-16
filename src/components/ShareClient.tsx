'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

type KakaoFriend = {
  uuid: string;
  id?: number;
  profile_nickname?: string;
  profile_thumbnail_image?: string;
};

const ShareClient = () => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [ranking, setRanking] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      console.log('🚀 쿠키 확인 및 사용자 검증 시작');

      const kakaoId = Cookies.get('kakao_id');
      const kakaoToken = Cookies.get('kakao_token');

      if (!kakaoId || !kakaoToken) {
        console.warn('❌ kakao_id 또는 kakao_token 없음 → /login 리다이렉션');
        router.replace('/login');
        return;
      }

      console.log('✅ kakao_id 쿠키 확인됨:', kakaoId);

      const { data: userProfile, error } = await supabase
        .from('users')
        .select('id, nickname')
        .eq('kakao_id', kakaoId)
        .single();

      if (error || !userProfile) {
        console.warn('❌ users 테이블에 kakao_id로 등록된 사용자 없음 → /login 리다이렉션');
        router.replace('/login');
        return;
      }

      if (!userProfile.nickname) {
        console.warn('⚠️ 사용자 닉네임 없음 → /set-nickname 리다이렉션');
        router.replace('/set-nickname');
        return;
      }

      console.log(`✅ 닉네임 확인 완료: ${userProfile.nickname}`);
      setUserName(userProfile.nickname);
      setUserId(userProfile.id);

      fetchRanking();
    };

    init();
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

              if (!userId) {
                console.warn('❌ 공유 시 사용자 ID 없음');
                return;
              }

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
      <h1 className="text-2xl font-bold mb-4">{userName}님, 친구에게 공유해보세요!</h1>
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
