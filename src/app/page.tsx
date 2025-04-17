'use client';

import 'globals.css';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'

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
    <main className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-white text-center text-black px-4 py-6">
      {/* 헤더 */}
      <header className="text-xl font-bold mb-4">🎮 카카오톡 공유 이벤트</header>

      {/* 콘텐츠 */}
      <section className="flex flex-col items-center justify-center space-y-6">
      <div className="Feed_root__718OK msg_template">
        <ul className="ThumbnailList_list_thumb__8381Z ThumbnailList_single_tmp__lcaO9 ThumbnailList_horizontal_layout_wrap__DHBW1" style ={{height: '140.789px'}}>
          <li>
            <div className="ThumbnailList_thumb_wrap__l6csx">
              <div className="ThumbnailList_thumb_wrap__l6csx">
                <div className="ThumbnailList_center_crop__KcT2G"
                style={{
                  backgroundImage: `url("http://k.kakaocdn.net/dn/IsGzw/btsNitNcGyU/KeX9n1YVFXclyaJilzyQY0/kakaolink40_original.png")`,
                }}
                >
                </div>
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
      <div className="desc_template"><pre className="title">롯데 안에서 쓰면 쓸수록 커지는 혜택</pre>
      <pre className="link_txt">✔️ 롯데 브랜드 최대 5% 특별 적립<br />
                            ✔️ 국내외 가맹점 0.5%~0.7% 기본적립
      </pre></div></div>
      <div className="item_button vertical">
        <button className="btn_msg">자세히 보기 </button>
        <button className="btn_msg">브랜드별 프로모션</button></div>
        <div className="item_moreview">
          <div className="link_moreview">
            <Image 
                src="https://k.kakaocdn.net/14/dn/btq1lbnDb92/UOxmPui0QrTyoeCQikIcj1/o.jpg"
                className="link_profile"
                width={100}
                height={100} alt={''}/>
                <span className="txt_moreview">LPOINT</span><span className="ico_developers"></span></div></div></div>

        <button onClick={shareToKakao}>
          <Image
            src="/share-image.png"
            alt="카카오톡 공유하기"
            width={30}
            height={30}
            className="w-[30px] h-[30px]"
          />
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-md text-lg font-semibold shadow"
          onClick={() => router.push('/sharegame')}
        >
          Share Game
        </button>
      </section>

      {/* 푸터 */}
      <footer className="text-sm text-gray-500 mt-6">
        © 2025 -PLCC Cell. All rights reserved.
      </footer>
    </main>
  );
};

export default KakaoSharePage;
