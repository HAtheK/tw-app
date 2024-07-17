import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const images = [
        "image0.jpg",  // 나머지가 0일 때 사용할 이미지
        "image1.jpg"   // 나머지가 1일 때 사용할 이미지
        ];
      const rss = [
        "오늘의 자원지는 기름(Oil Field)",  // 나머지가 0일 때 사용할 이미지
        "오늘의 자원지는 옥수수(Farmland)"   // 나머지가 1일 때 사용할 이미지
      ];
        
      // 특정 날짜를 설정 (예: 2024-07-01)
      const startDate = new Date('2024-07-01');
        
      // 오늘 날짜를 가져오기
      const today = new Date();
      // 두 날짜의 밀리초 차이 계산
      const differenceInMilliseconds = today - startDate;
      // 하루의 밀리초
      const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
      // 밀리초를 일 단위로 변환
      const differenceInDays = Math.floor(differenceInMilliseconds / oneDayInMilliseconds);
      const period= differenceInDays % 2;
      
      const ogImage = images[period];
      const ogRss = rss[period];

  return {
    title: 'Open Graph Dynamic Image',
    description: `This page dynamically changes the Open Graph image based on the date. Days difference`,
    openGraph: {
      title: 'Dynamic Open Graph Image',
      description: ogRss,
      images: ogImage,
    },
  };
}