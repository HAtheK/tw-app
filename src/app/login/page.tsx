'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 카카오 로그인 초기화
declare global {
  interface Window {
    Kakao: any;
  }
}

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      scope: 'profile_nickname,account_email,phone_number',
      success: async function (authObj: any) {
        const { access_token } = authObj;
        const res = await fetch('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        const kakaoProfile = await res.json();

        // 사용자 정보 정리
        const user = {
          kakaoId: kakaoProfile.id,
          nickname: kakaoProfile.properties.nickname,
          email: kakaoProfile.kakao_account.email,
          phone: kakaoProfile.kakao_account.phone_number,
        };

        // Supabase에 사용자 등록/조회
        const supabaseRes = await fetch('/api/auth/kakao-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        const result = await supabaseRes.json();

        if (result.needNickname) {
          router.push('/set-nickname'); // 닉네임 설정 페이지로 리디렉션
        } else {
          router.push('/sharegame');
        }
      },
      fail: function (err: any) {
        alert('카카오 로그인 실패: ' + JSON.stringify(err));
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center px-4 py-6 bg-white text-center">
      {/* Content */}
      <main className="flex flex-col gap-6 items-center mt-24">
        <Image src="/logo.png" alt="로고" width={120} height={120} />
        <p className="text-xl leading-relaxed font-medium">
          간편하게 로그인하고<br />
          공유하기 챌린지에 참여해보세요
        </p>
        <button
          onClick={handleKakaoLogin}
          className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-300"
        >
          카카오로 시작하기
        </button>
      </main>

      {/* Footer */}
      <footer className="text-sm text-gray-500 mt-12">
        © 2025 PLCC - Share Challenge
      </footer>
    </div>
  );
};

export default LoginPage;
