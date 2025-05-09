import Hero from "./components/hero";
import FramedSection from "./components/lines";
import Links from "./components/links";
import VerticalSketchLines from "./components/banners";
import HighlightSection from "./components/highlightsection";
import FeaturedArticles from "./components/articles";
import Message from "./components/message";
import Gallery from "./components/gallery";
import HighlightMobileSection from "./components/highlightmobile";

export default function Page() {
  return (
  <div className="flex flex-col overflow-x-clip  ">
      <Message />
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
}
