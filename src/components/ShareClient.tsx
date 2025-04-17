'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';

declare global {
  interface Window {
    Kakao: any;
  }
}

interface Friend {
  uuid: string;
  profile_nickname: string;
  profile_thumbnail_image: string;
}

export default function ShareClient({ userId, nickname }: { userId: string; nickname: string }) {
  const [ranking, setRanking] = useState<any[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);

  const KAKAO_TEMPLATE_ID = 119614;

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }

    const storedToken = localStorage.getItem('kakao_token');
    if (storedToken) {
      window.Kakao.Auth.setAccessToken(storedToken);
      validateToken(storedToken);
    } else {
      loginWithKakao();
    }

    //fetchRanking();
  }, []);

  const validateToken = (token: string) => {
    window.Kakao.API.request({
      url: '/v1/user/access_token_info',
      success: () => {
        console.log('✅ 유효한 토큰');
        fetchFriends(); // 토큰이 유효하면 친구 목록도 바로 요청
      },
      fail: () => {
        console.warn('⚠️ 토큰 무효. 재로그인');
        window.Kakao.Auth.logout(() => {
          localStorage.removeItem('kakao_token');
          loginWithKakao();
        });
      },
    });
  };

  const loginWithKakao = () => {
    window.Kakao.Auth.login({
      scope: 'profile,account_email,phone_number,friends,talk_message',
      success: (auth: any) => {
        console.log('✅ 로그인 성공', auth);
        window.Kakao.Auth.setAccessToken(auth.access_token);
        localStorage.setItem('kakao_token', auth.access_token);
        fetchFriends();
      },
      fail: (err: any) => {
        console.error('❌ 로그인 실패', err);
        alert('카카오 로그인 실패');
      },
    });
  };

  const fetchFriends = () => {
    window.Kakao.API.request({
      url: '/v1/api/talk/friends',
      success: function (response: any) {
        console.log('👥 친구 목록', response);
        setFriends(response.elements);
      },
      fail: function (error: any) {
        console.error('❌ 친구 목록 요청 실패', error);
        if (error.code === -401) {
          alert('토큰이 만료되었습니다. 다시 로그인 해주세요.');
        } else {
          alert('친구 목록을 가져오는데 실패했습니다.');
        }
      },
    });
  };

  const handleShare = () => {
    if (!window.Kakao.Picker) {
      alert('카카오 친구 피커를 불러오지 못했습니다.');
      return;
    }

    window.Kakao.Picker.selectFriends({
      title: '친구에게 메시지를 보낼까요?',
      maxPickableCount: 10,
      minPickableCount: 1,
      showMyProfile: true,
      enableSearch: true,
      enableBackButton: true,
      multiple: true,
      success: (pickerResponse: any) => {
        const friendUUIDs = pickerResponse.users.map((u: any) => u.uuid);

        window.Kakao.API.request({
          url: '/v1/api/talk/friends/message/send',
          data: {
            receiver_uuids: friendUUIDs,
            template_id: KAKAO_TEMPLATE_ID,
          },
          success: async () => {
            console.log('✅ 메시지 전송 성공');

            await fetch('/api/auth/sharegame', {
              method: 'POST',
              body: JSON.stringify({
                userId,
                kakaoUUIDs: friendUUIDs,
                success: true,
              }),
              headers: { 'Content-Type': 'application/json' },
            });

            fetchRanking();
          },
          fail: async (err: any) => {
            console.warn('❌ 메시지 전송 실패', err);

            await fetch('/api/auth/sharegame', {
              method: 'POST',
              body: JSON.stringify({
                userId,
                kakaoUUIDs: friendUUIDs,
                success: false,
              }),
              headers: { 'Content-Type': 'application/json' },
            });
          },
        });
      },
      fail: (err: any) => {
        console.error('❌ 친구 선택 실패', err);
      },
    });
  };

  const fetchRanking = async () => {
    setLoading(true);
    const res = await fetch('/api/auth/sharegame?type=ranking');
    const data = await res.json();
    setRanking(data);
    setLoading(false);
  };

  return (
    <div className="share-client">
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="beforeInteractive" />

      <div className="text-center mt-6">
        <p className="text-xl font-semibold">👋 {nickname}님, 친구에게 메시지를 공유해보세요!</p>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded mt-4"
          onClick={handleShare}
        >
          친구에게 공유하기
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold mb-2">🏆 TOP 10 공유 랭킹</h2>
        {loading ? (
          <p>불러오는 중...</p>
        ) : (
          <ul className="bg-white rounded p-4 shadow">
            {ranking.map((user, i) => (
              <li key={user.nickname} className="flex justify-between border-b py-1">
                <span>
                  {i + 1}. {user.nickname}
                </span>
                <span>{user.count}회</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold mb-2">👥 친구 목록</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {friends.map((friend) => (
            <div key={friend.uuid} className="flex flex-col items-center text-center">
              <Image
                src={friend.profile_thumbnail_image || '/default-profile.png'}
                alt={friend.profile_nickname}
                width={48}
                height={48}
                className="rounded-full"
              />
              <span className="mt-2 text-sm">{friend.profile_nickname}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
