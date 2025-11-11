"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import "./test-home.css";

export default function TestHome() {
  const router = useRouter();
  return (
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
        시작하기
      </button>
    </div>
  );
}
