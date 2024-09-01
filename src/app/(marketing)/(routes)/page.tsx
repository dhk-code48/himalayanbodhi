import { Suspense } from "react";

import StickyScroll from "@/components/animation/StickyScroll";
import About from "@/components/sections/About";
import FAQSection from "@/components/sections/FAQSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import PopularCategoryCarousel from "@/components/sections/PopularCategoryCrousel";
import StillHaveQuestion from "@/components/sections/StillHaveQuestion";
import { SkeletonSection } from "@/components/shared/SectionSkeleton";

import NewsSlider from "../_components/client";
import ErrorBoundary from "@/components/layout/ErrorBoundary";

export default function Home() {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<SkeletonSection />}>
          <NewsSlider />
        </Suspense>
      </ErrorBoundary>
      <About />
      <FeaturedProducts />
      <StickyScroll />
      <PopularCategoryCarousel />
      <StillHaveQuestion />
      <FAQSection />
    </>
  );
}
