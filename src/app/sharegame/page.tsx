const handleShare = async () => {
    if (!window.Kakao || !window.Kakao.Link) return alert('카카오 SDK 로딩 실패');
  
    try {
      window.Kakao.Picker.selectFriends({
        showMyProfile: false,
        maxPickableCount: 10,
        minPickableCount: 1,
        onSelected: async (selectedUsers) => {
          const uuids = selectedUsers.map((user: any) => user.uuid);
  
          // 카카오 메시지 전송 API 호출
          await window.Kakao.API.request({
            url: '/v1/api/talk/friends/message/send',
            data: {
              receiver_uuids: uuids,
              template_id: 119614,
              template_args: {},
            },
            success: async (res) => {
              console.log('메시지 전송 성공:', res);
  
              // 전송 성공한 사용자 UUID를 추출
              const successfulReceivers = res.successful_receiver_uuids;
              const failedReceivers = res.failed_receiver_uuids;
  
              const user = await supabase.auth.getUser();
              const userId = user.data.user?.id;
  
              // Supabase에 저장
              await Promise.all(
                successfulReceivers.map(async (uuid: string) => {
                  // 성공적으로 메시지가 전송된 사용자 정보 저장
                  await supabase.from('share_records').upsert({
                    user_id: userId,
                    receiver_uuid: uuid,
                    count: 1, // 성공한 사용자에게 메시지가 전송된 횟수 증가
                  }, { onConflict: ['user_id', 'receiver_uuid'] });
                })
              );
  
              // 실패한 사용자 처리
              if (failedReceivers.length > 0) {
                console.error('전송 실패 사용자들:', failedReceivers);
                // 실패한 사용자에 대한 처리 로직 (예: 별도의 로깅 테이블)
                await supabase.from('failed_share_records').insert(
                  failedReceivers.map((uuid: string) => ({
                    user_id: userId,
                    receiver_uuid: uuid,
                    failed_at: new Date(),
                  }))
                );
              }
  
              // 순위 업데이트
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
  