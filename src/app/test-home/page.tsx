"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import "./test-home.css";
import "../globals.css";

export default function TestHome() {
  const router = useRouter();
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
                      롯데멤버스 <strong>「꿀팁 찾기」</strong>!
                    </span>
                  </span>
                </p>
                <p style={{ textAlign: 'center', lineHeight: 1, marginTop: '6px' }}>
                  <span style={{ fontSize: '36px' }}>
                    <span style={{ color: 'rgb(255, 255, 255)' }}>
                      <strong>나에게 딱 맞는<br/>L.POINT 서비스는?</strong>
                    </span>
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full flex justify-center items-center px-4">
                <button
                    className="test-home-start"
                    onClick={() => router.push("/test-start")}>시작 하기
                </button>  
            </div>
            
            
          </section>
    
          {/* 푸터 */}
          <footer className="fixed bottom-0 left-0 w-full h-[30px] text-white flex items-center justify-center">
            <div className="relative w-36 h-6 sm:w-40 sm:h-7">
              <Image
                src="/logo-lottemembers-gray.png"
                alt="logo"
                fill
                className="object-contain"
              />
            </div>
            임직원 이용 목적으로 제작한 사이트 입니다.
          </footer>
        </main>



    /* 
    <div className="test-home-wrapper">
      <Image
        src="/images/test-home-bg.jpg"
        alt="테스트 홈 배경"
        fill
        className="test-home-bg"
      />
      <button
        className="test-home-start"
        onClick={() => router.push("/test-start")}
      >
        시작 하기
      </button>
    </div> */
  );
}
