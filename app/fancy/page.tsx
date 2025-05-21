import React from "react";
import Hero from "../components/hero";
import FramedSection from "../components/lines";
import Links from "../components/links";
import VerticalSketchLines from "../components/banners";
import HighlightSection from "../components/highlightsection";
import FeaturedArticles from "../components/articles";
import Gallery from "../components/gallery";
import HighlightMobileSection from "../components/highlightmobile";
const page = () => {
  return (
    <div className="flex flex-col overflow-x-clip  ">
      <FramedSection>
        <Hero />
        <Links />
      </FramedSection>
      <HighlightMobileSection />
      <HighlightSection />
      <VerticalSketchLines />
      <FeaturedArticles />
      <Gallery />
    </div>
  );
};

export default page;
