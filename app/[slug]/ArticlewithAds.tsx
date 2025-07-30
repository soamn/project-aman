import React from "react";
import AdBanner from "../components/AdBanner";

// Helper to check if paragraph has real content
function isMeaningful(content: string) {
  const hasImage = /<img[^>]*>/i.test(content);
  const stripped = content
    .replace(/<img[^>]*>/gi, "")
    // .replace(/<br\s*\/?>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, "")
    .trim();

  return stripped.length > 0 || hasImage;
}

export function splitHtmlWithAds(html: string, every: number = 3, maxAds = 2) {
  const parts = html
    .split(/<\/p>/i)
    .map((p) => p.trim())
    .filter((p) => isMeaningful(p));

  let adCount = 0;

  const blocks = parts.flatMap((part, index) => {
    const content = part.endsWith("</p>") ? part : part + "</p>";

    const paragraph = (
      <div key={`p-${index}`} dangerouslySetInnerHTML={{ __html: content }} />
    );

    const shouldInsertAd =
      adCount < maxAds &&
      (index + 1) % every === 0 &&
      index !== parts.length - 1;

    if (shouldInsertAd) {
      adCount++;
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
