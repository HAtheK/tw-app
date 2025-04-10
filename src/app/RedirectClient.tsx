'use client';

import { useEffect } from 'react';

export default function RedirectClient() {
  useEffect(() => {
    window.location.href = "https://m.event.lottecard-ad.co.kr/lotte_memberscard_brand.html";
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f8f8',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '1.8rem', color: '#333' }}>롯데멤버스 카드 안내 페이지로 이동중입니다.</h1>
      <p style={{ marginTop: '1rem', color: '#666' }}>
        페이지가 자동으로 이동되지 않으면 <br />
        <a href="https://m.event.lottecard-ad.co.kr/lotte_memberscard_brand.html" style={{ color: '#0070f3', textDecoration: 'underline' }}>
          여기를 클릭해주세요
        </a>
      </p>
    </div>
  );
}
