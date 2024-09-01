"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { stickyScrollContent } from "@/config/stickyScroll";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import MaxWidthWrapper from "../shared/MaxWidthWrapper";
import BlurFade from "./BlurFade";

const CardComponent = ({
  index,
  content,
}: {
  content: (typeof stickyScrollContent)[0];
  index: number;
}) => {
  return (
    <BlurFade inView inViewMargin="-200px" key={index}>
      <div className="flex-1 rounded-2xl p-2 shadow-lg">
        <Image
          src={content.image}
          alt={content.title}
          width={565}
          height={280}
          className="w-full rounded-lg"
        />
        <div className="px-6 py-4">
          <h5 className="font-display text-2xl font-semibold">
            {content.title}
          </h5>
          <p>{content.content}</p>
        </div>
      </div>
    </BlurFade>
  );
};

export default function StickyScroll() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MaxWidthWrapper className="grid auto-cols-fr grid-cols-1 items-start gap-x-20 gap-y-16 py-10 lg:grid-cols-2">
      {/* Left side - Sticky Solution Card */}
      <div
        className={cn(
          "static transition-all duration-500 ease-in-out lg:sticky",
          scrollY > 100
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0",
          "top-40",
        )}
      >
        <p className="text-xs font-bold tracking-wider text-muted-foreground">
          Solution
        </p>

        <div className="space-y-4">
          <h3 className="font-display text-5xl font-bold">
            We do things a bit differently
          </h3>
          <p className="font-display text-lg font-semibold tracking-wide">
            Our goal is to be someone we&apos;d want to do business with.
          </p>
          <Button className="mt-4">Discover Our Approach</Button>
        </div>
      </div>
      {/* Right side - Scrolling Content */}
      <div className="flex flex-col gap-10 lg:gap-20">
        {stickyScrollContent.map((content, index) => (
          <CardComponent
            content={content}
            index={index}
            key={"sticky-scroll-" + index}
          />
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
