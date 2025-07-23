// components/AdBanner.tsx
"use client";

import { useEffect } from "react";

export default function AdBanner() {
  useEffect(() => {
    try {
      // @ts-expect-error: adsbygoogle is a global script variable
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center" }}
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-8561760210688511"
      data-ad-slot="9342383332"
    ></ins>
  );
}
