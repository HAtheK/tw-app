"use client";

import { useEffect } from "react";
import "./plcc.css";

export default function PLCCHome() {
  useEffect(() => {
    // iOS Safari 등에서 100vh 보정 (주소창 제외)
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="video-container">
      <iframe
        src="https://www.youtube.com/embed/UiIvcjKWy-U?autoplay=1&mute=1&playsinline=1"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
