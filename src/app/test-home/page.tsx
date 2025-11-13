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
      <section className="relative flex flex-col items-center space-y-6 w-full px-4 max-w-2xl mx-auto overflow-y-auto">
        {/* 여백 (헤더 높이만큼) */}
        <div style={{ width: '100%', minHeight: '1px', height: '140px' }}></div>

        {/* 텍스트 영역 */}
        <div className="text-table text-center">
          <p style={{ lineHeight: 1 }}>
            <span style={{ fontSize: '16px', color: '#fff' }}>
              나에게 딱 맞는 <strong>「롯데멤버스」서비스</strong>는?!
            </span>
          </p>
          <p style={{ lineHeight: 1, marginTop: '6px' }}>
            <span style={{ fontSize: '36px', color: '#fff' }}>
              <strong>Just Tap and Match</strong>
            </span>
          </p>
        </div>

        {/* 버튼 */}
        <div className="w-full flex justify-center items-center px-4">
          <button
            onClick={() => router.push("/test-start")}
            className="flex items-center justify-center gap-2 bg-transparent border border-white hover:bg-gray-100 text-white px-5 py-3 rounded-full text-sm"
          >
            <RiSurveyFill size={20} /> 테스트 시작하기
          </button>
        </div>

        {/* 하단 이미지 (섹션 내부 그리드 우측 하단 정렬) */}
        <div className="absolute right-0 bottom-[-20px] w-[180px] h-[160px] sm:w-[240px] sm:h-[210px] pointer-events-none z-0">
          <Image
            src="/main_lppy.png"
            alt="lppy character"
            fill
            className="object-contain object-bottom-right"
          />
        </div>
      </section>

      {/* 푸터 */}
      <footer className="fixed bottom-0 left-0 w-full h-[30px] text-white flex items-center justify-center z-10">
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
