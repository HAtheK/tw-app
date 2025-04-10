'use client';

import { useEffect } from 'react';

export default function RedirectClient() {
  useEffect(() => {
    window.location.href = "https://m.event.lottecard-ad.co.kr";
  }, []);

  return (
    <div className='videoBG'>
      <video autoPlay muted loop playsInline data-src="bg.mp4" poster="bg.jpg" src="bg.mp4" />
      <div className='wrapper'>
        <main>
          <section>
            <h2>Redirecting...</h2>
            <p>자동으로 이동되지 않으면 <a href="https://m.event.lottecard-ad.co.kr">여기를 클릭</a>해주세요.</p>
          </section>
        </main>
        <footer>
          <p>&copy; 신³⁴⁰⁷</p>
        </footer>
      </div>
    </div>
  );
}
