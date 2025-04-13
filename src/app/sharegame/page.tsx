'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client'; // 클라이언트에서 Supabase 사용
const supabase = createClient();

export default function ShareGamePage() {
  const handleShare = async () => {
    if (!window.Kakao || !window.Kakao.Link) return alert('카카오 SDK 로딩 실패');

    try {
      window.Kakao.Picker.selectFriends({
        showMyProfile: false,
        maxPickableCount: 10,
        minPickableCount: 1,
        onSelected: async (selectedUsers) => {
          const uuids = selectedUsers.map((user: any) => user.uuid);

          await window.Kakao.API.request({
            url: '/v1/api/talk/friends/message/send',
            data: {
              receiver_uuids: uuids,
              template_id: 119614,
              template_args: {},
            },
            success: async (res) => {
              const successfulReceivers = res.successful_receiver_uuids;
              const failedReceivers = res.failed_receiver_uuids;

              const user = await supabase.auth.getUser();
              const userId = user.data.user?.id;

              await Promise.all(
                successfulReceivers.map(async (uuid: string) => {
                  await supabase.from('share_records').upsert(
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
                await supabase.from('failed_share_records').insert(
                  failedReceivers.map((uuid: string) => ({
                    user_id: userId,
                    receiver_uuid: uuid,
                    failed_at: new Date(),
                  }))
                );
              }

              // 랭킹 업데이트 로직 호출
              fetchRanking(userId);
            },
            fail: (err) => {
              console.error('메시지 전송 실패:', err);
              alert('메시지 전송에 실패했습니다.');
            }
          });
        },
        onCancel: () => {
          console.log('친구 선택 취소됨');
        }
      });
    } catch (err) {
      console.error('공유 중 에러 발생:', err);
    }
  };

  return (
    <div>
      <h1>Share Game</h1>
      <button onClick={handleShare}>친구에게 공유하기</button>
    </div>
  );
}
