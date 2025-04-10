

'use client';

import { useEffect } from 'react';

export default function RedirectPage() {
  useEffect(() => {
    window.location.href = 'https://m.event.lottecard-ad.co.kr/lotte_memberscard_brand.html'; // 변경하세요
  }, []);

  return (
    <main>
      <h1>리디렉션 중입니다...</h1>
    </main>
  );
}
