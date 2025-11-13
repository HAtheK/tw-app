"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import "./test-home.css";
import "../globals.css";
import { RiSurveyFill } from "react-icons/ri";

export default function TestHome() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 text-black font-ptd grid grid-rows-[auto_1fr_auto] overflow-hidden">
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
      <section className="flex flex-col items-center space-y-6 w-full px-4 max-w-2xl mx-auto overflow-y-auto">
        {/* 상단 여백 */}
        <div style={{ width: "100%", height: "140px" }}></div>

        <div className="text-table text-center text-white">
          <p style={{ fontSize: "16px", lineHeight: 1 }}>
            나에게 딱 맞는 <strong>「롯데멤버스」서비스</strong>는?!
          </p>
          <p style={{ fontSize: "36px", lineHeight: 1, marginTop: "6px" }}>
            <strong>Just Tap and Match</strong>
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
      </section>

      {/* 푸터 & 캐릭터 이미지 */}
      <footer className="fixed bottom-0 left-0 w-full flex flex-col items-center z-10">
        {/* 캐릭터 이미지 */}
        <div className="relative w-full flex justify-end items-end h-[30vh] sm:h-[35vh] md:h-[40vh] pointer-events-none">
          <div className="relative w-[45vw] max-w-[300px] aspect-[1/1]">
            <Image
              src="/main_lppy.png"
              alt="lppy character"
              fill
              className="object-contain object-bottom-right"
              priority
            />
          </div>
        </div>

        {/* 로고 영역 */}
        <div className="w-full h-[30px] bg-black/70 flex items-center justify-center">
          <div className="relative w-36 h-5 sm:w-40 sm:h-7">
            <Image
              src="/logo-lottemembers-gray.png"
              alt="logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </footer>
    </main>
  );
}
