// utils/splitArticleWithAds.tsx
import React from "react";
import AdBanner from "../components/AdBanner";

export function splitHtmlWithAds(html: string, every: number = 3) {
  const parts = html.split(/<\/p>/i).filter(Boolean);

  const blocks = parts.flatMap((part, index) => {
    const content = part.endsWith("</p>") ? part : part + "</p>";

    const paragraph = (
      <div key={`p-${index}`} dangerouslySetInnerHTML={{ __html: content }} />
    );

    const shouldInsertAd =
      (index + 1) % every === 0 && index !== parts.length - 1;

    if (shouldInsertAd) {
      return [
        paragraph,
        <div className="my-6" key={`ad-${index}`}>
          <AdBanner />
        </div>,
      ];
    }

    return paragraph;
  });

  return blocks;
}
