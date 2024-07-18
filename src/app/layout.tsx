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
        <style>
          body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-color: #f4f4f4;
          }
          .banner {
              position: relative;
              width: 800px;
              height: 400px;
          }
          .banner img {
              width: 100%;
              height: 100%;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }      
        </style>
      </head>
      <body>{children}</body>
    </html>
  );
}
