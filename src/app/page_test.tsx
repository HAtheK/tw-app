import { Metadata } from 'next';
import RedirectClient from './RedirectClient'; // 수정 완료

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = "og-image.png";
  return {
    title: '롯데멤버스 카드 출시',
    description: `롯데 안에서 쓰면 쓸수록 혜택이 커지는. 최대 5% 특별적립`,
    openGraph: {
      title: '롯데멤버스 카드 출시',
      description: '롯데 안에서 쓰면 쓸수록 혜택이 커지는. 최대 5% 특별적립',
      images: ogImage
    }
  };
}

export default function Home() {
  return <RedirectClient />;
}
