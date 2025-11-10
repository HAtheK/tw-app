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
      {step === 1 && (
        <>
          <h2>Q1. 국적을 선택해주세요.</h2>
          <div className="options">
            <button onClick={() => handleSelect("nationality", "korean")}>한국인</button>
            <button onClick={() => handleSelect("nationality", "foreign")}>외국인</button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Q2. 월 평균 카드 사용 금액은 얼마인가요?</h2>
          <div className="options">
            <button onClick={() => handleSelect("spend", "over100")}>100만원 이상</button>
            <button onClick={() => handleSelect("spend", "over50")}>50~100만원</button>
            <button onClick={() => handleSelect("spend", "under50")}>50만원 미만</button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h2>Q3. 주로 사용하는 결제 방식은?</h2>
          <div className="options">
            <button onClick={() => handleSelect("payMethod", "account")}>계좌 기반 / 충전형</button>
            <button onClick={() => handleSelect("payMethod", "simple")}>간편결제(L.PAY 등)</button>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <h2>Q4. 롯데 브랜드 이용 횟수는 얼마나 되나요?</h2>
          <div className="options">
            <button onClick={() => handleSelect("brandUse", "high")}>자주 이용(3회 이상)</button>
            <button onClick={() => handleSelect("brandUse", "low")}>가끔 이용(1~2회)</button>
          </div>
        </>
      )}
    </div>
  );
}
