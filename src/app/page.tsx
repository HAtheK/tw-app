'use client';

import './globals.css';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RiKakaoTalkFill, RiGamepadFill } from 'react-icons/ri';

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
    <main className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-ptd grid grid-rows-[auto_1fr_auto]">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 w-full h-16 bg-black flex items-center justify-between px-5 z-10">
        <div className="relative w-36 h-6 sm:w-40 sm:h-7">
          <Image
            src="/logo-white.png"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
        <button
          onClick={() => router.push('/sharegame')}
          className="flex items-center justify-center gap-2 bg-[#3182f6] hover:bg-[#0089dd] text-white px-4 py-2 rounded-full text-sm"
        >
          <RiGamepadFill size={20} /> 공유하기 챌린지
        </button>
      </header>

      {/* 콘텐츠 */}
      <section className="pb-14 flex flex-col items-center space-y-6 w-full px-4 max-w-2xl mx-auto overflow-y-auto">
        {/* 콘텐츠 상위 영역 */}
        <div style={{ width: '100%', minHeight: '1px', height: '60px' }}></div>
        <div className="text-table">
          <div>
            <p style={{ textAlign: 'center', lineHeight: 1, height: '25px' }}>
              <span style={{ fontSize: '16px' }}>
                <span style={{ color: 'rgb(255, 255, 255)' }}>
                  <strong>좋은 정보, 쉽게 전달하세요</strong>
                </span>
              </span>
            </p>
            <p style={{ textAlign: 'center', lineHeight: 1, marginTop: '10px' }}>
              <span style={{ fontSize: '36px' }}>
                <span style={{ color: 'rgb(255, 255, 255)' }}>
                  <strong>Sharing made Simple</strong>
                </span>
              </span>
            </p>
            <p style={{ textAlign: 'center', lineHeight: 1 }}>
              <span style={{ fontSize: '36px' }}>
                <span style={{ color: 'rgb(255, 255, 255)' }}>
                  <strong>Just Tap and Send</strong>
                </span>
              </span>
            </p>
          </div>
        </div>
        <div style={{ width: '100%', minHeight: '1px', height: '303px' }}>
          <Image 
            src="/main.png"
            height={431}
            alt={''} 
            />
        </div>

        {/* 설명 텍스트 */}
        <div className="w-full space-y-3 text-[0.85em] leading-snug">
          <p>
            <span className="font-semibold text-white">롯데멤버스 카드</span>를 카카오톡 친구에게 공유해주세요.
          </p>
          <p className="font-semibold text-white">
            ※ 이용 방법<br />
            1️⃣ 하단의 카카오톡 아이콘을 눌러주세요.<br />
            2️⃣ 카카오톡이 실행되면 공유할 대상을 선택해주세요.<br />
            3️⃣ 선택한 대상에게 아래 메시지가 전송됩니다.<br /><br />
            <span className="font-semibold text-yellow-300">※주의 사항</span><br />
            <b>챌린지 참여는</b> <u>[공유하기 챌린지]로 이동하여 메시지를 공유</u>해주세요.<br />
            현재 페이지의 공유하기는 집계 없이, 공유 기능만 제공합니다.
          </p>
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
                    style={{backgroundImage: 'url("/kakao_preview.png")',
                    }}
                  ></div>
                </div>
              </div>
            </li>
          </ul>
          <div className="cont_template">
            <div className="item_profile">
              <span className="name_profile header">
                <span className="link_txt">롯데멤버스 카드 💳 이벤트 </span>
              </span>
            </div>
            <div className="desc_template">
              <pre className="title">롯데 안에서 쓰면 쓸수록 커지는 혜택<br />L.POINT 최대 13만P 지급 이벤트</pre>
              <pre className="link_txt">
                ✔️ 롯데 브랜드 최대 5% 특별 적립<br />
                ✔️ 국내외 가맹점 0.5%~0.7% 기본적립
              </pre>
            </div>
          </div>
            <div className="flex flex-col mt-3 gap-2">
              <button className="bg-blue-100 px-4 py-2 rounded text-sm">이벤트 자세히 보기</button>
              <button className="bg-blue-100 px-4 py-2 rounded text-sm">브랜드별 프로모션</button>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Image
                src="/icon.jpg"
                width={40}
                height={40}
                alt="LPOINT"
                className="rounded-full"
              />
              <span className="text-sm font-semibold">LPOINT</span>
            </div>
          </div>
       

        {/* 공유 버튼 */}
        <button
          onClick={shareToKakao}
          className="flex items-center justify-center gap-2 bg-[#FEE500] hover:bg-[#f7d800] text-black w-[240px] px-4 py-3 rounded-md text-sm font-semibold shadow transition"
        >
          <RiKakaoTalkFill size={20} /> 친구에게 공유하기
        </button>

        {/* 게임 이동 버튼 */}
        <button
          onClick={() => router.push('/sharegame')}
          className="flex items-center justify-center gap-2 bg-[#009BFA] hover:bg-[#0089dd] text-white w-[240px] px-4 py-3 rounded-md text-sm font-semibold shadow transition"
        >
          <RiGamepadFill size={20} /> 공유하기 챌린지
        </button>
      </section>

      {/* 푸터 */}
      <footer className="fixed bottom-0 left-0 w-full h-[30px] text-white flex items-center justify-center">
        PLCC셀에서 제작한 사이트 입니다. 문의사항은 언제든 연락주세요.
      </footer>
    </main>
  );
};

export default KakaoSharePage;
