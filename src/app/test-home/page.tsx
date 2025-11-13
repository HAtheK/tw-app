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
            <span style={{ fontSize: "16px", color: "#fff" }}>
              나에게 딱 맞는 <strong>「롯데멤버스」서비스</strong>는?!
            </span>
          </p>
          <p style={{ textAlign: "center", lineHeight: 1, marginTop: "6px" }}>
            <span style={{ fontSize: "36px", color: "#fff" }}>
              <strong>Just Tap and Match</strong>
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
      </section>

      {/* 우측 하단 이미지 (화면 고정, 비율 자동 조정) */}
      <div className="fixed bottom-20 right-0 w-auto h-auto max-w-[40vw] max-h-[40vh] sm:max-w-[30vw] sm:max-h-[35vh] md:max-w-[25vw] md:max-h-[30vh] pointer-events-none z-0">
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
