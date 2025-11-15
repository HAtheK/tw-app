"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import "./test-home.css";
import "../globals.css";
import { RiSurveyFill } from "react-icons/ri";

export default function TestHome() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 text-black font-ptd grid grid-rows-[auto_1fr_auto] relative overflow-hidden">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 w-full h-16 bg-black flex items-center justify-between px-5 z-20">
        <div className="relative w-36 h-6 sm:w-40 sm:h-7">
          <Image
            src="/logo-white.png"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
      </header>

      {/* 콘텐츠 */}
      <section className="flex flex-col items-center space-y-6 w-full px-4 max-w-2xl mx-auto overflow-y-auto z-10">
        <div style={{ width: "100%", minHeight: "1px", height: "100px" }}></div>
        <div className="text-table">
          <p style={{ textAlign: "center", lineHeight: 1 }}>
            <span style={{ fontSize: "36px", color: "#fff" }}>
              나에게 딱 맞는 <strong>「롯데멤버스」서비스</strong>는?
            </span>
          </p>
          <p style={{ textAlign: "center", lineHeight: 1, marginTop: "6px" }}>
            <span style={{ fontSize: "16px", color: "#ffBBBB" }}>
              Find the service that fits you best!
            </span>
          </p>
        </div>

        <div className="w-full flex justify-center items-center px-4">
          <button
            onClick={() => router.push("/test-start")}
            className="flex items-center justify-center gap-2 bg-transparent border border-white hover:bg-gray-100 text-white px-5 py-3 rounded-full text-sm"
          >
            <RiSurveyFill size={20} /> 테스트 시작하기
          </button>
        </div>
        
        <div className="text-table text-[0.85em]">
          <div>
            <p style={{ textAlign: 'center', lineHeight: 1, marginTop: '-12px' }}>
              <span className="text-white">
                간단한 질문을 통행 나와 성향이 <br/>
                가장 잘 맞는 
              </span>
              <span className="text-yellow-300">
                <strong> 서비스를 찾아보세요 </strong>
              </span>
            </p>
          </div>
        </div>

        <div className="w-full flex justify-center items-center px-4">
          <div className="w-full max-w-md">
            <Image
              src="/main_test.png"
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
      
      <div style={{ width: '100%', minHeight: '1px', height: '60px' }}></div>

      
      </section>


      {/* 우측 하단 이미지 (화면 고정, 비율 자동 조정) */}
      <div className="fixed bottom-[30px] right-0 w-auto h-auto max-w-[40vw] max-h-[40vh] sm:max-w-[30vw] sm:max-h-[35vh] md:max-w-[25vw] md:max-h-[30vh] pointer-events-none z-0">
        <Image
          src="/main_lppy.png"
          alt="lppy character"
          width={500}
          height={500}
          className="object-contain w-full h-full"
          priority
        />
      </div>

      {/* 푸터 */}
      <footer className="fixed bottom-0 left-0 w-full h-[30px] text-white flex items-center justify-center z-10 bg-black/70 backdrop-blur-sm">
        <div className="relative w-36 h-5 sm:w-40 sm:h-7">
          <Image
            src="/logo-lottemembers-gray.png"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
      </footer>
    </main>
  );
}
