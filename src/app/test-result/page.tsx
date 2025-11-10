"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import "./test-result.css";

function ResultContent() {
  const router = useRouter();
  const params = useSearchParams();
  const type = params?.get("type") || "app-install";

  // 정확한 매핑: query type -> public/images 파일
  const bannerMap: Record<string, string> = {
    "app-install": "/images/result-app-install.jpg",
    "tourist": "/images/result-tourist.jpg",
    "premium": "/images/result-premium.jpg",
    "plcc": "/images/result-plcc.jpg",
    "lpay": "/images/result-lpay.jpg",
    "point-charge": "/images/result-point-charge.jpg",
  };

  const bannerSrc = bannerMap[type] ?? bannerMap["app-install"];

  const messageMap: Record<string, string> = {
    "app-install": "롯데멤버스 앱 설치하고 다양한 혜택을 시작하세요!",
    "tourist": "외국인 관광객 전용 롯데멤버스 카드로 혜택을 즐겨보세요.",
    "premium": "롯데멤버스 카드 프리미엄 혜택을 만나보세요!",
    "plcc": "롯데브랜드 이용이 많은 고객님께 PLCC를 추천드립니다!",
    "lpay": "간편한 L.PAY로 결제 혜택을 누려보세요.",
    "point-charge": "포인트 충전형 결제로 추가 할인 혜택을 받아보세요!",
  };

  const message = messageMap[type] ?? messageMap["app-install"];

  return (
    <div className="test-result-wrapper">
      <div className="test-result-banner">
        <Image
          src={bannerSrc}
          alt={`result-${type}`}
          fill
          className="test-result-banner-img"
          priority
        />
      </div>

      <h2 className="test-result-title">당신에게 어울리는 혜택은?</h2>
      <p className="test-result-desc">{message}</p>

      <button onClick={() => router.push("/test-home")} className="test-result-button">
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
