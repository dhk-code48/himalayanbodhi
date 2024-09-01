import React from "react";
import Image from "next/image";

import { AboutTimeLine } from "@/components/sections/AboutTimeline";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";

const AboutUsPage = () => {
  return (
    <>
      <MaxWidthWrapper>
        <div className="relative my-10">
          <Image
            width={1152}
            height={640}
            alt="about us"
            src="/images/placeholder.png"
            className="size-full h-72 rounded-xl object-cover"
          />
          <div className="absolute left-0 top-0 flex size-full flex-col items-center justify-center rounded-xl bg-black/30">
            <h1 className="font-display text-2xl font-bold text-white md:text-4xl">
              Our Company
            </h1>
          </div>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="my-20 space-y-5 font-display text-lg font-semibold tracking-wide md:text-xl">
        <h5>
          On May 8, 1886, Dr. John Pemberton brought his perfected syrup to
          Jacobs&apos; Pharmacy in downtown Atlanta where the first glass of
          Coca‑Cola was poured. From that one iconic drink, we&apos;ve evolved
          into a total beverage company. More than 2.2 billion servings of our
          drinks are enjoyed in more than 200 countries and territories each
          day.
        </h5>
        <h5>
          We are constantly transforming our portfolio, from reducing added
          sugar in our drinks to bringing innovative new products to market. We
          seek to positively impact people&apos;s lives, communities and the
          planet through water replenishment, packaging recycling, sustainable
          sourcing practices and carbon emissions reductions across our value
          chain. Together with our bottling partners, we employ more than
          700,000 people, helping bring economic opportunity to local
          communities worldwide.
        </h5>
      </MaxWidthWrapper>
      <AboutTimeLine />
    </>
  );
};

export default AboutUsPage;
