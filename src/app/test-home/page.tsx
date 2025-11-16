"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import "./test-home.css";
import "../globals.css";
import { RiSurveyFill } from "react-icons/ri";

export default function TestHome() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 text-black font-ptd relative overflow-hidden">

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
      <section
        className="
          flex flex-col 
          w-full max-w-2xl mx-auto
          overflow-y-auto 
          z-10
          pt-24
          min-h-[calc(100vh-64px-30px)]
        "
      >
        {/* 텍스트 + 버튼 */}
        <div style={{ width: '100%', minHeight: '1px', height: '50px' }}></div>
        <div className="flex flex-col items-center space-y-6 w-full">
          <div className="text-table">
            <p className="text-center leading-none">
              <span style={{ fontSize: "36px", color: "#fff" }}>
                나에게 딱 맞는 <strong>「롯데멤버스」서비스</strong>는?
              </span>
            </p>
            <p className="text-center leading-none mt-1.5">
              <span style={{ fontSize: "24px", color: "#ffBBBB" }}>
                Find the service that fits you best!
              </span>
            </p>
          </div>
          <div style={{ width: '100%', minHeight: '1px', height: '40px' }}></div>
          <div className="w-full flex justify-center items-center px-4">
            <button
              onClick={() => router.push("/test-start")}
              className="flex items-center justify-center gap-2 bg-transparent border border-white hover:bg-gray-100 text-white px-5 py-3 rounded-full text-2xl font-semibold"
            >
              <RiSurveyFill size={30} /> 테스트 시작하기
            </button>
          </div>

          <div className="text-table text-xl font-normal text-center -mt-3">
            <span className="text-white">
              간단한 질문을 통행 나와 성향이 <br />
              가장 잘 맞는
            </span>
            <span className="text-yellow-300">
              <strong> 서비스를 찾아보세요 </strong>
            </span>
          </div>
        </div>

        {/* 🔥 이미지 영역 — footer 위 딱 붙게 */}
        <div className="w-full flex justify-center items-center px-4 mt-auto">
          <div className="w-full max-w-md">
            <Image
              src="/main_test.png"
              alt=""
              width={360}
              height={310}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="fixed bottom-0 left-0 w-full h-[30px] text-white flex items-center justify-center">
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
