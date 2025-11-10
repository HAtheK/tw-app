"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import "./test-result.css"; // ✅ 전용 스타일

function ResultContent() {
  const router = useRouter();
  const params = useSearchParams();
  const resultType = params.get("type") || "basic";

  const bannerSrc = `/images/result-${resultType}.jpg`;

  const resultText = {
    premium: "롯데멤버스 카드 프리미엄 혜택을 만나보세요!",
    plcc: "롯데멤버스 카드의 혜택을 누려보세요!",
    lpay: "간편결제 L.PAY로 더 스마트한 결제를!",
    point: "충전형 포인트 결제로 추가 할인 혜택!",
    foreign: "외국인 고객 전용 멤버스 카드로 쇼핑을 즐기세요!",
    basic: "롯데멤버스의 다양한 혜택을 확인해보세요!"
  };

  return (
    <div className="test-result-wrapper">
      <div className="test-result-banner">
        <Image
          src={bannerSrc}
          alt="결과 배너"
          fill
          className="object-cover rounded-2xl shadow-md"
        />
      </div>

      <h2 className="test-result-title">당신에게 어울리는 혜택은?</h2>
      <p className="test-result-text">{resultText[resultType as keyof typeof resultText]}</p>

      <button
        onClick={() => router.push("/test-home")}
        className="test-result-button"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}

export default function TestResultPage() {
  return (
    <Suspense fallback={<div className="loading">결과를 불러오는 중...</div>}>
      <ResultContent />
    </Suspense>
  );
}
