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
    if (Object.keys(answers).length > 0) {
      const resultType = getResultType(answers);
      if (resultType) {
        router.push(`/test-result?type=${resultType}`);
      } else {
        setStep((prev) => prev + 1);
      }
    }
  }, [answers]);

  const getResultType = (ans: Record<string, string>) => {
    if (ans.nationality === "foreign") return "tourist";
    if (ans.spend === "over100") return "premium";
    if (ans.spend === "over50" && ans.brandUse === "high") return "plcc";
    if (ans.spend === "under50" && ans.payMethod === "simple") return "lpay";
    if (ans.spend === "under50" && ans.payMethod === "account") return "point-charge";
    return null;
  };

  return (
    <div className="test-start-wrapper">
      <div className="test-start-inner">
        {step === 1 && (
          <>
            <h2 className="test-start-title">Q1.참여자님은 한국에...</h2>
            <button className="test-btn" onClick={() => handleSelect("nationality", "korean")}>
              🏠거주 중이에요 
            </button>
            <button className="test-btn" onClick={() => handleSelect("nationality", "foreign")}>
              🛫여행 중이에요 (외국인 관광객)
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="test-start-title">Q2.월 소비 금액대를 선택해주세요.
             </h2>
            <button className="test-btn" onClick={() => handleSelect("spend", "over100")}>
              1️⃣ 100만원 이상
            </button>
            <button className="test-btn" onClick={() => handleSelect("spend", "over50")}>
              2️⃣ 50~100만원
            </button>
            <button className="test-btn" onClick={() => handleSelect("spend", "under50")}>
              3️⃣ 50만원 미만
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="test-start-title">Q3.결제할 때 어떤 방식이 더 편하세요?</h2>
            <button className="test-btn" onClick={() => handleSelect("payMethod", "account")}>
              💸현금/🏧계좌이체
            </button>
            <button className="test-btn" onClick={() => handleSelect("payMethod", "simple")}>
              💳️카드 결제
            </button>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="test-start-title">Q4.롯데 브랜드 이용 횟수는 얼마나 되나요?</h2>
            <button className="test-btn" onClick={() => handleSelect("brandUse", "high")}>
              ⌛ 자주 이용(3회 이상)
            </button>
            <button className="test-btn" onClick={() => handleSelect("brandUse", "low")}>
              ⏳ 가끔 이용(1~2회)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
