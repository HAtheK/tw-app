import styles from './globals.css';

import { Metadata } from 'next';

//this line will avoid caching when deployed to vercel
//value options
// false | 0 | number
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const images = [
    "image0.jpg",  // 나머지가 0일 때 사용할 이미지
    "image1.jpg"   // 나머지가 1일 때 사용할 이미지
    ];

    
   // 특정 날짜를 설정 (예: 2024-07-01)
  const startDate = new Date('2024-07-16 01:00:00');
    
  // 오늘 날짜를 가져오기
  const today = new Date();


  // UTC 시간 계산
  const startDateUTC = startDate.getTime() + (startDate.getTimezoneOffset() * 60 * 1000);
  const todayUTC = today.getTime() + (today.getTimezoneOffset() * 60 * 1000);

  // UTC to KST (UTC + 9시간)
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  //const startDateKST = new Date(startDateUTC + (KR_TIME_DIFF));
  const todayKST = new Date(todayUTC + (KR_TIME_DIFF));
  //document.writeln("한국시간s : " + todayKST+"<BR>");
  //document.writeln("한국시간n : " + todayKST+"<BR>");

  // 두 날짜의 밀리초 차이 계산
  const differenceInMilliseconds = +todayKST - +startDateUTC;
  //document.writeln("시간차 : " + differenceInMilliseconds+"<BR>");
  // 하루의 밀리초
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  // 밀리초를 일 단위로 변환
  const differenceInDays = Math.floor(differenceInMilliseconds / oneDayInMilliseconds);
  //document.writeln("일차 : " + differenceInDays+"<BR>");
  const period= differenceInDays % 2;
  const ogImage = images[period];
  //document.writeln("인덱스 : " + period+"<BR>");

  const yearKST = todayKST.getFullYear();
  const monthKST = todayKST.getMonth() + 1;
  const dateKST = todayKST.getDate();

  
  
  const rss = [
    "[" + yearKST + "-" + monthKST + "-" + dateKST + "] 기름(Oil Field)",  // 나머지가 0일 때 사용할 이미지
    "[" + yearKST + "-" + monthKST + "-" + dateKST + "] 옥수수(Farmland)"   // 나머지가 1일 때 사용할 이미지
  ];
  
  const ogRss = rss[period];

  return {
    title: 'Open Graph Dynamic Image',
    description: `This page dynamically changes the Open Graph image based on the date. Days difference: ${differenceInDays}`,
    openGraph: {
      title: 'RSS 안내 - 신³⁴⁰⁷',
      description: ogRss ,
      images: ogImage
    }
  };
}


const metadb = await generateMetadata();


export default function Home() {
  return (
    <div className={styles.banner}>
        <img src={metadb.openGraph?.images as string} alt="자원지"/>             
    <div className={styles.wrapper}>
        <header>
            <h1>.</h1>
            <p>{metadb.openGraph?.description as string}</p>
        </header>
        <main>
            <section>
                <h2>Resource Gathering</h2>
                <p>Alliance resources are open in rotation once a day. OPEN at 22:00 server time.</p>
            </section>
            
            <a href="topwar://" className={styles.button}>PLAY</a>
        </main>
        <footer>
            <p>&copy; 신³⁴⁰⁷</p>
        </footer>
    </div>
  );
}
