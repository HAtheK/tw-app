"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import "./test-home.css";

export default function TestHomePage() {
  const router = useRouter();

  return (
    <div className="test-home-wrapper">
      <div className="test-home-bg"/>      

      <div className="test-home-content">
        <h1 className="test-home-title">내게 맞는 혜택 테스트</h1>
        <button
          onClick={() => router.push("/test-start")}
          className="test-home-button"
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
