"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import "./test-result.css";

export default function TestResultPage() {
  const router = useRouter();
  const params = useSearchParams();
  const type = params.get("type") || "app-install";

  const bannerSrc = `/images/result-${type}.jpg`;

  const messageMap: Record<string, string> = {
    "app-install": "롯데멤버스 앱 설치하고 다양한 혜택을 시작하세요!",
    "tourist": "외국인 관광객 전용 롯데멤버스 카드로 혜택을 즐겨보세요.",
    "premium": "롯데멤버스 카드 프리미엄 혜택을 만나보세요!",
    "plcc": "롯데브랜드 이용이 많은 고객님께 PLCC를 추천드립니다!",
    "lpay": "간편한 L.PAY로 결제 혜택을 누려보세요.",
    "point-charge": "포인트 충전형 결제로 추가 할인 혜택을 받아보세요!",
  };

  return (
    <div className="test-result-wrapper">
      <div className="test-result-banner">
        <Image src={bannerSrc} alt="결과 배너" fill className="test-result-banner-img" />
      </div>
      <h2 className="test-result-title">당신에게 어울리는 혜택은?</h2>
      <p className="test-result-desc">{messageMap[type]}</p>
      <button onClick={() => router.push("/test-home")} className="test-result-button">
        홈으로 돌아가기
      </button>
    </div>
  );
}
