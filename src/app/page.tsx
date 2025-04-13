'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const carouselImages = [
  '/kakao_preview1.png',
  '/kakao_preview2.png',
  '/kakao_preview3.png'
]

const KakaoSharePage = () => {
  const [index, setIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 1s ease-in-out'
      carouselRef.current.style.transform = `translateX(-${index * 100}%)`
    }
  }, [index])

  const handleShare = () => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY)
      }

      window.Kakao.Share.sendCustom({
        templateId: 119614
      })
    }
  }

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col items-center justify-between bg-black">
      <div className="w-full h-[calc(100vh-160px)] overflow-hidden relative">
        <div
          ref={carouselRef}
          className="flex w-[300%] h-full"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {carouselImages.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`carousel-${i}`}
              width={500}
              height={800}
              className="w-screen h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>

      <button onClick={handleShare} className="w-[132px] h-[132px] mb-4">
        <Image
          src="/share-image.png"
          alt="공유하기"
          width={132}
          height={132}
          className="w-full h-full object-contain"
        />
      </button>
    </div>
  )
}

export default KakaoSharePage
