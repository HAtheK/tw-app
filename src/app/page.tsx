import { generateMetadata } from './head';

export const metadata = await generateMetadata();

export default function Home() {
  return (
    <div>
      <p>오늘의 자원지 안내</p>
      <img src={metadata.openGraph?.images as string} alt="Open Graph Image" />
    </div>
  );
}
