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
        //templateId: 119614, PLCC
        templateId: 119837,
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 text-black font-ptd grid grid-rows-[auto_1fr_auto]">
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
          className="flex items-center justify-center gap-2 bg-[#fb1822] hover:bg-[#d9141d] text-white px-4 py-2 rounded-full text-sm"
        >
          <RiGamepadFill size={20} /> 공유하기 챌린지
        </button>
      </header>

      {/* 콘텐츠 */}
      <section className="flex flex-col items-center space-y-6 w-full px-4 max-w-2xl mx-auto overflow-y-auto">
        {/* 콘텐츠 상위 영역 */}
        <div style={{ width: '100%', minHeight: '1px', height: '60px' }}></div>
        <div className="text-table">
          <div>
            <p style={{ textAlign: 'center', lineHeight: 1}}>
              <span style={{ fontSize: '16px' }}>
                <span style={{ color: 'rgb(255, 255, 255)' }}>
                  롯데멤버스의 <strong>「고향사랑기부제」</strong>를 주변에 알려주세요!
                </span>
              </span>
            </p>
            <p style={{ textAlign: 'center', lineHeight: 1, marginTop: '6px' }}>
              <span style={{ fontSize: '36px' }}>
                <span style={{ color: 'rgb(255, 255, 255)' }}>
                  <strong>Just Tap and Send</strong>
                </span>
              </span>
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center items-center px-4">
          <button
           onClick={shareToKakao}
           className="flex items-center justify-center gap-2 bg-transparent border boder-white hover:bg-gray-100 text-white px-4 py-2 rounded-full text-sm"
           >
           <RiKakaoTalkFill size={20} /> 친구에게 공유하기
          </button>
        </div>
        
        <div className="text-table text-[0.85em]">
          <div>
            <p style={{ textAlign: 'center', lineHeight: 1, marginTop: '-12px' }}>
              <span className="text-yellow-300">
                <strong>※ 주의 사항: </strong>
              </span>
              <span className="text-white">
                현재 화면의 <u>공유하기는 횟수에 집계되지 않습니다.</u><br/>
                챌린지 참여는 [공유하기 챌린지]에서 메시지를 공유해주세요.
              </span>
            </p>
          </div>
        </div>

        <div className="w-full flex justify-center items-center px-4">
          <div className="w-full max-w-md">
            <Image
              src="/main.png"
              alt=''
              width={360} // 고정 px이 아닌, 최대 사이즈 제어
              height={310}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </section>
      {/* 하단 컨텐츠 영역 */}
      <section 
        className="top-0 left-0 w-full bg-black flex items-center justify-between py-6 px-5" 
        style={{backgroundColor: 'black', borderRadius: '30px 30px 0px 0px'}}
        >
      <div className="text-table py-6">
        <p style={{textAlign: 'center'}}>
          <span style={{color: 'rgb(255, 95, 56)', fontSize: '13px'}}>
            <strong>사이트 소개</strong>
          </span>
        </p>
        <p style={{textAlign: 'center',marginTop:'16px'}}>
          <span style={{color: 'rgb(255, 255, 255)', fontSize: '25px'}}>
            <strong>롯데멤버스의 소식을<br/>조금 더 편하게, 많이 알리기 위해<br/>제작하였습니다.</strong>
          </span>
        </p>
        <p style={{textAlign: 'center', lineHeight: '1.15', marginTop:'6px'}}>
          <span style={{color: 'rgb(141, 141, 147)', fontSize: '13px'}}>
            불편하고 번거롭지 않게 "롯데멤버스의 소식"을 알릴 수 있습니다.<br/><b>공유하기 챌린지 참여</b>하여 TOP10이 되어 보세요!
          </span>
        </p>
      </div>
      <button
          onClick={() => router.push('/sharegame')}
          className="flex items-center justify-center gap-2  bg-[#fb1822] hover:bg-[#d9141d] text-white px-4 py-2 rounded-full text-sm"
        >
          <RiGamepadFill size={20} /> 공유하기 챌린지
      </button>
      <div style={{ width: '100%', minHeight: '1px', height: '60px' }}></div>

      <div className="text-table py-6">
        <p style={{textAlign: 'center'}}>
          <span style={{color: 'rgb(255, 95, 56)', fontSize: '13px'}}>
            <strong>홍보 영상 소개</strong>
          </span>
        </p> 
        <p style={{textAlign: 'center', lineHeight: '1.15', marginTop:'6px'}}>
          <span style={{color: 'rgb(141, 141, 147)', fontSize: '13px'}}>
            (연합뉴스TV) 롯데멤버스 "고향사랑기부 참여 시 각종 혜택"
          </span>
        </p>
      </div>
     
      <div className="w-full max-w-md aspect-video mx-auto">
      <iframe
        className="w-full h-full rounded-xl shadow-md"
        src="https://files.mtn.co.kr/2025/07/01/20250701_hot5_12_yyj_720p.mp4"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
      <div style={{ width: '100%', minHeight: '1px', height: '30px' }}></div>

    <div className="text-table py-6">
      <p style={{textAlign: 'center'}}>
        <span style={{color: 'rgb(255, 95, 56)', fontSize: '13px'}}>
          <strong>홍보 기사 소개</strong>
        </span>
      </p> 
      <p style={{textAlign: 'center', lineHeight: '1.15', marginTop:'6px'}}>
        <span style={{color: 'rgb(141, 141, 147)', fontSize: '13px'}}>
          (연합뉴스) "고향사랑기부시 포인트·버거"…롯데멤버스, 연말까지 행사<br/> <a href='https://www.yna.co.kr/view/AKR20250922028800030'>자세히 보기</a>
        </span>
      </p>
    </div>
        <div style={{ width: '100%', minHeight: '1px', height: '30px' }}></div>

    <div className="text-table py-6">
        <p style={{textAlign: 'center'}}>
          <span style={{color: 'rgb(255, 95, 56)', fontSize: '13px'}}>
            <strong>고향사랑기부제 참여방법</strong>
          </span>
        </p> 
        <p style={{textAlign: 'left', lineHeight: '1.15', marginTop:'6px'}}>
          <span style={{color: 'rgb(141, 141, 147)', fontSize: '13px'}}>
            1.<b>엘포인트 앱 접속</b><br/>
            &nbsp;: 엘포인트 앱을 실행하고,<br/>최상단 롤링 배너 중 <b><i>"고향사랑기부 X 리아 세트 증정"</i></b> 배너를 선택합니다.<br/>
            2.<b>위기브 페이지에서 '위기브 알림 신청' 댓글 작성</b><br/>
            &nbsp;: 위기브 페이지에서 회원가입 후, '위기브 알림 신청' 댓글을 작성합니다.<br/>
            3.<b>고향사랑기부 오픈 알림 문자 수신 후, 고향사랑기부 참여</b><br/>
            &nbsp;: 국가정보자원관리원 화재 복구 이후 고향사랑기부가 오픈되었다는 문자를 수신한 후 3일 이내에 10만원 고향사랑 기부를 참여합니다.<br/>
            4.<b>리아 새우 버거 세트 1+1 지급</b><br/>
            &nbsp;: 리아 새우 버거 세트 2개를 지급 받습니다. 
          </span>
        </p>
      </div>
      <div style={{ width: '100%', minHeight: '1px', height: '30px' }}></div>


        
      </section>

      {/* 푸터 */}
      <footer className="fixed bottom-0 left-0 w-full h-[30px] text-white flex items-center justify-center">
        임직원 이용 목적으로 제작한 사이트 입니다.
      </footer>
    </main>
  );
};

export default KakaoSharePage;
