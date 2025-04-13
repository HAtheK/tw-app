'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

type KakaoFriend = {
  uuid: string;
  id?: number;
  profile_nickname?: string;
  profile_thumbnail_image?: string;
};

const ShareGamePage = () => {
  const [userName, setUserName] = useState('');
  const [ranking, setRanking] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace('/login');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('nickname')
        .eq('id', user.id)
        .single();

      if (error || !data?.nickname) {
        router.replace('/set-nickname');
        return;
      }

      setUserName(data.nickname);
      fetchRanking(user.id);
    };

    fetchUser();
  }, []);

  const fetchRanking = async (userId?: string) => {
    const { data: topRanks } = await supabase
      .from('share_records')
      .select('user_id, count')
      .order('count', { ascending: false })
      .limit(10);

    setRanking(topRanks || []);
  };

  const handleShare = async () => {
    if (!window.Kakao || !window.Kakao.Link) return alert('카카오 SDK 로딩 실패');

    try {
      window.Kakao.Picker.selectFriends({
        showMyProfile: false,
        maxPickableCount: 10,
        minPickableCount: 1,
        onSelected: async (selectedUsers: KakaoFriend[]) => {
          const uuids = selectedUsers.map((user) => user.uuid);

          // 메시지 템플릿 전송
          await window.Kakao.API.request({
            url: '/v1/api/talk/friends/message/send',
            data: {
              receiver_uuids: uuids,
              template_id: 119614,
              template_args: {},
            },
            success: async (res: any) => {
              console.log('메시지 전송 성공:', res);

              const successfulReceivers: string[] = res.successful_receiver_uuids;
              const failedReceivers: string[] = res.failed_receiver_uuids;

              const {
                data: { user },
              } = await supabase.auth.getUser();
              const userId = user?.id;

              if (!userId) return;

              await Promise.all(
                successfulReceivers.map(async (uuid) => {
                  await supabase
                    .from('share_records')
                    .upsert(
                      {
                        user_id: userId,
                        receiver_uuid: uuid,
                        count: 1,
                      },
                      { onConflict: ['user_id', 'receiver_uuid'] }
                    );
                })
              );

              if (failedReceivers.length > 0) {
                console.error('전송 실패 사용자들:', failedReceivers);
                await supabase.from('failed_share_records').insert(
                  failedReceivers.map((uuid) => ({
                    user_id: userId,
                    receiver_uuid: uuid,
                    failed_at: new Date(),
                  }))
                );
              }

              fetchRanking(userId);
            },
            fail: (err: any) => {
              console.error('메시지 전송 실패:', err);
              alert('메시지 전송에 실패했습니다.');
            },
          });
        },
        onCancel: () => {
          console.log('친구 선택 취소됨');
        },
      });
    } catch (err) {
      console.error('공유 중 에러 발생:', err);
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

export default ShareGamePage;
