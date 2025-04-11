export interface KakaoUser {
    id: number;
    kakao_account: {
      email?: string;
      profile: {
        nickname: string;
        profile_image_url?: string;
      };
    };
  }
  