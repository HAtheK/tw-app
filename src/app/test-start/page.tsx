"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import "./test-start.css";

export default function TestStartPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    isMember: false,
    isForeigner: false,
    spend: 0,
    payType: "",
    brandUse: 0,
  });

  const next = (newData: any) => {
    setAnswers({ ...answers, ...newData });
    setStep(step + 1);
  };

  const finish = () => {
    let resultType = "app-install";

    if (answers.isForeigner) resultType = "tourist";
    else if (!answers.isMember) resultType = "app-install";
    else if (answers.payType === "account") resultType = "point-charge";
    else if (answers.spend >= 100) resultType = "premium";
    else if (answers.spend >= 50) resultType = "plcc";
    else if (answers.spend < 50) resultType = "lpay";

    if (answers.brandUse <= 2 && resultType === "plcc") {
      resultType = "lpay";
    }

    router.push(`/test-result?type=${resultType}`);
  };

  return (
    <div className="test-start-wrapper">
      <div className="test-start-inner">
        {step === 1 && (
          <>
            <h2 className="test-start-title">롯데멤버스 회원이신가요?</h2>
            <button onClick={() => next({ isMember: true })} className="test-btn">
              네, 회원이에요
            </button>
            <button onClick={() => next({ isMember: false })} className="test-btn">
              아니요
            </button>
          </>
        )}

        {step === 2 && answers.isMember && (
          <>
            <h2 className="test-start-title">한국인이신가요?</h2>
            <button onClick={() => next({ isForeigner: false })} className="test-btn">
              네
            </button>
            <button onClick={() => next({ isForeigner: true })} className="test-btn">
              아니요
            </button>
          </>
        )}

        {step === 3 && !answers.isForeigner && (
          <>
            <h2 className="test-start-title">월 평균 카드 이용 금액은?</h2>
            <button onClick={() => next({ spend: 30 })} className="test-btn">50만원 미만</button>
            <button onClick={() => next({ spend: 70 })} className="test-btn">50~100만원</button>
            <button onClick={() => next({ spend: 120 })} className="test-btn">100만원 이상</button>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="test-start-title">결제 방식은?</h2>
            <button onClick={() => next({ payType: "card" })} className="test-btn">신용카드</button>
            <button onClick={() => next({ payType: "account" })} className="test-btn">계좌/충전형</button>
          </>
        )}

        {step === 5 && (
          <>
            <h2 className="test-start-title">최근 한 달 롯데 브랜드 이용 횟수는?</h2>
            <button onClick={() => next({ brandUse: 1 })} className="test-btn">1~2회</button>
            <button onClick={() => next({ brandUse: 3 })} className="test-btn">3회 이상</button>
            <button onClick={finish} className="test-btn mt-6 bg-black text-white">
              결과 보기
            </button>
          </>
        )}
      </div>
    </div>
  );
}
