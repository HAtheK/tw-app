"use client";

import { useRouter } from "next/navigation";


export default function PLCCHome() {
  const router = useRouter();
  return (
    <div className="w-full max-w-md aspect-video mx-auto">
        <iframe width="560" height="315" 
        src="https://www.youtube.com/embed/UiIvcjKWy-U?si=VhSMewNP_S31Nnea" 
        title="YouTube video player" 
        frame-border="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrer-policy="strict-origin-when-cross-origin" 
        allow-fullscreen></iframe>

    </div>
  );
}
