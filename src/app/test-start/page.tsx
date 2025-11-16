"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./test-start.css";

export default function TestStartPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleSelect = (qId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  useEffect(() => {
    // 분기 로직: 단계별로 결과페이지로 자동 이동 또는 다음 질문으로 이동
    const moveNext = () => {
      const { nationality, appUse, payMethod, brandUse, spend } = answers;

      // 1️⃣ 외국인일 경우 즉시 종료
      if (nationality === "foreign") {
        router.push("/test-result?type=tourist");
        return;
      }

      // 2️⃣ L.POINT 앱 미이용자
      if (nationality === "korean" && appUse === "no") {
        router.push("/test-result?type=app-install");
        return;
      }

      // 3️⃣ 계좌 기반 결제 선호자
      if (payMethod === "account") {
        router.push("/test-result?type=point-charge");
        return;
      }

      // 4️⃣ 카드 이용자 중 롯데 이용 2회 이하
      if (brandUse === "low") {
        router.push("/test-result?type=lpay");
        return;
      }

      // 5️⃣ 카드 이용자 중 롯데 이용 3회 이상
      if (brandUse === "high" && spend) {
        if (spend === "over100") router.push("/test-result?type=premium");
        else if (spend === "over50") router.push("/test-result?type=plcc");
        else if (spend === "under50") router.push("/test-result?type=lpay");
        return;
      }

      // 질문 순서 이동
      const stepOrder = [
        "nationality",
        "appUse",
        "payMethod",
        "brandUse",
        "spend",
      ];
      const currentIndex = stepOrder.findIndex((key) => !(key in answers));
      setStep(currentIndex + 1);
    };

    moveNext();
  }, [answers, router]);

  return (
    <div className="test-start-wrapper">
      <div className="test-start-inner">
        {step === 1 && (
          <>
            <h2 className="test-start-title">Q1.참여자님은 한국에...<br/>(Are you currently in Korea for...)</h2>
            <button
              className="test-btn"
              onClick={() => handleSelect("nationality", "korean")}
            >
              🏠 거주 중이에요 (I live in Korea)
            </button>
            <button
              className="test-btn"
              onClick={() => handleSelect("nationality", "foreign")}
            >
              🛫 여행 중이에요 (I am traveling in Korea)
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="test-start-title">
              Q2. L.POINT APP 이용하고 계신가요?
            </h2>
            <button
              className="test-btn"
              onClick={() => handleSelect("appUse", "yes")}
            >
              📱 네, 사용 중이에요
            </button>
            <button
              className="test-btn"
              onClick={() => handleSelect("appUse", "no")}
            >
              ❌ 아니오, 아직 설치하지 않았어요
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="test-start-title">
              Q3. 결제할 때 어떤 방식이 더 편하세요?
            </h2>
            <button
              className="test-btn"
              onClick={() => handleSelect("payMethod", "account")}
            >
              💸 현금 / 계좌이체
            </button>
            <button
              className="test-btn"
              onClick={() => handleSelect("payMethod", "card")}
            >
              💳 카드 결제
            </button>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="test-start-title">
              Q4. 롯데 브랜드 이용 횟수는 얼마나 되나요?
            </h2>
            <button
              className="test-btn"
              onClick={() => handleSelect("brandUse", "low")}
            >
              ⏳ 2회 이하 (가끔 이용)
            </button>
            <button
              className="test-btn"
              onClick={() => handleSelect("brandUse", "high")}
            >
              ⌛ 3회 이상 (자주 이용)
            </button>
          </>
        )}

        {step === 5 && (
          <>
            <h2 className="test-start-title">
              Q5. 월 소비 금액대를 선택해주세요.
            </h2>
            <button
              className="test-btn"
              onClick={() => handleSelect("spend", "over100")}
            >
              1️⃣ 100만원 이상
            </button>
            <button
              className="test-btn"
              onClick={() => handleSelect("spend", "over50")}
            >
              2️⃣ 50~100만원 미만
            </button>
            <button
              className="test-btn"
              onClick={() => handleSelect("spend", "under50")}
            >
              3️⃣ 50만원 미만
            </button>
          </>
        )}
      </div>
    </div>
  );
}
