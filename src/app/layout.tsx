import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Open Graph Dynamic Image',
  description: 'This page dynamically changes the Open Graph image based on the date.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
