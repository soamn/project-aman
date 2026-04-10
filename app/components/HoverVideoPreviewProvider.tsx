"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type HoverVideoPreviewProviderProps = {
  children: ReactNode;
  videoUrl?: string | null;
  className?: string;
};

export default function HoverVideoPreviewProvider({
  children,
  videoUrl,
  className = "",
}: HoverVideoPreviewProviderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openPreview = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setIsOpen(true);
  };

  const closePreview = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      closeTimeoutRef.current = null;
    }, 120);
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !videoUrl) {
      return;
    }

    if (isOpen) {
      void video.play().catch(() => {});
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [isOpen, videoUrl]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  if (!videoUrl) {
    return <>{children}</>;
  }

  return (
    <div className={`relative inline-flex w-fit ${className}`}>
      <div
        onMouseEnter={openPreview}
        onMouseLeave={closePreview}
        onFocus={openPreview}
        onBlur={closePreview}
      >
        {children}
      </div>

      <div
        className={`absolute left-0 top-full z-30 mt-3 w-72 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl transition-all duration-200 ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
        onMouseEnter={openPreview}
        onMouseLeave={closePreview}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          playsInline
          preload="metadata"
          className="aspect-video w-full bg-zinc-950 object-cover"
        />
      </div>
    </div>
  );
}
