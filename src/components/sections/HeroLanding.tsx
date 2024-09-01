"use client";

import React, { use, useCallback, useEffect, useState } from "react";
import getAllNews from "@/actions/news/getAllNews";
import { News } from "@prisma/client";
import useEmblaCarousel from "embla-carousel-react";
import { CldImage } from "next-cloudinary";

import { Button } from "@/components/ui/button";

import { Icons } from "../shared/Icons";
import MaxWidthWrapper from "../shared/MaxWidthWrapper";

export default function HeroSlider({ news }: { news: News[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (emblaApi) {
      const autoplay = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000);

      return () => clearInterval(autoplay);
    }
  }, [emblaApi]);

  return (
    <MaxWidthWrapper large className="py-120 relative bg-background">
      <div className="absolute inset-y-0 left-4 z-10 flex items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          className="rounded-full bg-white/80 text-gray-800 hover:bg-white"
        >
          <Icons.chevronLeft className="size-4" />
          <span className="sr-only">Previous slide</span>
        </Button>
      </div>
      <div className="absolute inset-y-0 right-4 z-10 flex items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          className="rounded-full bg-white/80 text-gray-800 hover:bg-white"
        >
          <Icons.chevronRight className="size-4" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>
      <div className="overflow-hidden px-4" ref={emblaRef}>
        <div className="-mx-4 flex">
          {news.map((slide, index) => (
            <div
              className="relative flex-[0_0_100%] px-4 pb-24 shadow-xl md:flex-[0_0_80%] md:pb-32"
              key={index}
            >
              <div className="relative aspect-[21/9] overflow-hidden rounded-lg">
                <CldImage
                  width={1500}
                  height={640}
                  src={slide.banner}
                  alt={slide.title}
                  className="size-full object-cover"
                />
              </div>
              <div className="absolute inset-x-4 bottom-4 h-fit rounded-lg bg-primary p-4 text-primary-foreground shadow-lg md:bottom-10 md:left-10 md:right-auto md:max-w-xl md:p-6">
                <h2 className="mb-2 text-2xl font-bold md:text-3xl">
                  {slide.title}
                </h2>
                <p className="mb-4 text-sm md:text-base">{slide.description}</p>
                <Button
                  variant="secondary"
                  className="w-full transition-colors md:w-auto"
                >
                  Read More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {news.map((_, index) => (
          <button
            key={index}
            className={`size-2 rounded-full transition-colors ${index === selectedIndex ? "bg-black" : "bg-gray-300"}`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
