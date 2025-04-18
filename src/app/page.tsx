'use client';

import './globals.css';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    Kakao: any;
  }
}

const KakaoSharePage = () => {
  const router = useRouter();

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  }, []);

  const shareToKakao = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendCustom({
        templateId: 119614,
      });
    }
  };

  return (
    <main className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-white text-black px-4">
      {/* 헤더 */}
      <header className="h-[40px] flex items-center justify-between bg-white text-black px-4 border-b">
        <h1 className="text-base font-bold">롯데멤버스카드 공유</h1>
        <div className="w-[50px]" />
      </header>

      {/* 콘텐츠 */}
      <section className="flex flex-col items-center space-y-6 w-full px-4 max-w-2xl mx-auto pt-0">
        {/* 설명문구 */}
        <div className="w-full space-y-3 text-[0.85em] leading-snug text-gray-800 mt-0">
          <p>
            <span className="font-semibold text-blue-600">롯데멤버스 카드</span>를 주변 지인에게 편하게 알릴 수 있어요.
          </p>
          <p className="font-semibold">이용 방법</p>
          <ul className="list-disc pl-5">
            <li>하단의 카카오톡 아이콘을 눌러주세요.</li>
            <li>카카오톡이 실행되면 공유할 대상을 선택해주세요.</li>
            <li>선택한 대상에게 아래 메시지가 전송됩니다.</li>
          </ul>
          <p>많은 공유 부탁드립니다 🙏</p>
        </div>

        {/* 미리보기 영역 */}
        <div className="Feed_root__718OK msg_template w-full">
          <ul
            className="ThumbnailList_list_thumb__8381Z ThumbnailList_single_tmp__lcaO9 ThumbnailList_horizontal_layout_wrap__DHBW1"
            style={{ height: '140.789px' }}
          >
            <li>
              <div className="ThumbnailList_thumb_wrap__l6csx">
                <div className="ThumbnailList_thumb_wrap__l6csx">
                  <div
                    className="ThumbnailList_center_crop__KcT2G"
                    style={{
                      backgroundImage: `url("http://k.kakaocdn.net/dn/IsGzw/btsNitNcGyU/KeX9n1YVFXclyaJilzyQY0/kakaolink40_original.png")`,
                    }}
                  ></div>
                </div>
              </div>
            </li>
          </ul>
          <div className="cont_template">
            <div className="item_profile">
              <span className="name_profile header">
                <span className="link_txt">💳 롯데멤버스 카드 💳 </span>
              </span>
            </div>
            <div className="desc_template">
              <pre className="title">롯데 안에서 쓰면 쓸수록 커지는 혜택</pre>
              <pre className="link_txt">
                ✔️ 롯데 브랜드 최대 5% 특별 적립<br />
                ✔️ 국내외 가맹점 0.5%~0.7% 기본적립
              </pre>
            </div>
          </div>
          <div className="item_button vertical">
            <button className="btn_msg">자세히 보기 </button>
            <button className="btn_msg">브랜드별 프로모션</button>
          </div>
          <div className="item_moreview">
            <div className="link_moreview">
              <Image
                src="icon.jpg"
                className="link_profile"
                width={100}
                height={100}
                alt=""
              />
              <span className="txt_moreview">LPOINT</span>
              <span className="ico_developers"></span>
            </div>
          </div>
        </div>

        {/* 공유 버튼 */}
        <button onClick={shareToKakao} className="hover:opacity-80 transition">
          <Image
            src="/share-image.png"
            alt="카카오톡 공유하기"
            width={60}
            height={60}
            className="w-[60px] h-[60px]"
          />
        </button>

        {/* 게임 이동 버튼 */}
        <button
          className="bg-[#009BFA] hover:bg-[#0089dd] text-white w-[240px] px-4 py-2 rounded-md text-lg font-semibold shadow transition"
          onClick={() => router.push('/sharegame')}
        >
          Share Game
        </button>
      </section>

      {/* 푸터 */}
      <footer className="text-sm text-gray-500 text-center">
        © 2025 LOTTE MEMBERS PLCC Cell
      </footer>
    </main>
  );
};

export default KakaoSharePage;
