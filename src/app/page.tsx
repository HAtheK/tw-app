
import { Metadata } from 'next';
import { useEffect } from 'react';

//this line will avoid caching when deployed to vercel
//value options
// false | 0 | number
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = "og-image.png";  // 썸네일용 이미지

  // 오늘 날짜를 가져오기
  const today = new Date();

  return {
    title: '롯데멤버스 카드 출시',
    description: `롯데 안에서 쓰면 쓸수록 혜택이 커지는. 최대 5% 특별적립`,
    openGraph: {
      title: '롯데멤버스 카드 출시',
      description: '롯데 안에서 쓰면 쓸수록 혜택이 커지는. 최대 5% 특별적립' ,
      images: ogImage
    }
  };
}


const metadb = await generateMetadata();

export default function RedirectPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = 'https://b-site.com';
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.redirectBox}>
        <img
          src="https://via.placeholder.com/120x120?text=A+Site"
          alt="A 사이트"
          style={styles.image}
        />
        <div className="arrow">➡️</div>
        <img
          src="https://via.placeholder.com/120x120?text=B+Site"
          alt="B 사이트"
          style={styles.image}
        />
      </div>
      <div style={styles.message}>
        5초 후 <strong>B 사이트</strong>로 이동합니다.
        <br />
        자동으로 이동하지 않으면{' '}
        <a href="https://b-site.com" style={styles.link}>
          여기를 클릭
        </a>{' '}
        해주세요.
      </div>

      <style jsx>{`
        .arrow {
          font-size: 60px;
          animation: moveArrow 1s infinite alternate ease-in-out;
        }

        @keyframes moveArrow {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(15px);
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#000',
    color: '#fff',
    fontFamily: 'sans-serif',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    margin: 0,
  },
  redirectBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
  },
  image: {
    width: '120px',
    height: '120px',
    objectFit: 'contain' as const,
    borderRadius: '16px',
    backgroundColor: '#111',
    padding: '10px',
  },
  message: {
    marginTop: '40px',
    fontSize: '18px',
    textAlign: 'center' as const,
  },
  link: {
    color: '#0af',
    textDecoration: 'none',
  },
};