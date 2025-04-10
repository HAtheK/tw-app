'use client';

import { useEffect } from 'react';

export default function RedirectClient() {
  useEffect(() => {
    window.location.href = "https://m.event.lottecard-ad.co.kr/lotte_memberscard_brand.html";
  }, []);

  return (
<div className='videoBG'>
  
  <div className='wrapper'>
    <main>
      <section>
        <h2>롯데멤버스 카드 안내 페이지로 이동합니다.</h2>
        <p>자동으로 이동되지 않으면 <a href="https://m.event.lottecard-ad.co.kr/lotte_memberscard_brand.html">여기를 클릭</a>해주세요.</p>
      </section>
    </main>
    <footer>
      
    </footer>
  </div>
</div>

  );
}




