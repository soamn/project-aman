// components/AdSense.tsx
import Script from "next/script";

export default function AdSense() {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8561760210688511"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
    </>
  );
}
