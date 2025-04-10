
import { Metadata } from 'next';

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

//<a href="fb654935278355098://" className='button'>PLAY Topwar</a>
export default function Home() {
  return (
    <div className='videoBG'>
      <video autoPlay muted loop playsInline data-src="bg.mp4" poster="bg.jpg" src="bg.mp4" />
      <div className='wrapper'>
        <header>
          </header>
        <main>
          <section>
            <h2>Resource Gathering</h2>
            <p>Alliance Resources are opened alternately &#128738; and &#127805;.<br></br>OPEN at 22:00(UTC+8) server time.</p>
          </section>
          
        </main>
        <footer>
          <p>&copy; 신³⁴⁰⁷</p>
        </footer>
      </div>
    </div>
  );
}
