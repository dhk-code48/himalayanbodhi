"use client";

import React from "react";
import Image from "next/image";

import { Card, Carousel } from "@/components/ui/cards-crousel";

import MaxWidthWrapper from "../shared/MaxWidthWrapper";

export default function PopularCategoryCarousel() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <MaxWidthWrapper className="h-full py-20" large>
      <h2 className="mx-auto max-w-7xl pl-4 font-sans text-xl font-bold text-neutral-800 dark:text-neutral-200 md:text-5xl">
        Get to know your iSad.
      </h2>
      <Carousel items={cards} />
    </MaxWidthWrapper>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="mb-4 rounded-3xl bg-[#F5F5F7] p-8 dark:bg-neutral-800 md:p-14"
          >
            <p className="mx-auto max-w-3xl font-sans text-base text-neutral-600 dark:text-neutral-400 md:text-2xl">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="/images/placeholder.png"
              alt="Macbook mockup from Aceternity UI"
              height={500}
              width={500}
              className="md:size1/2 mx-auto size-full object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Artificial Intelligence",
    title: "You can do more with AI.",
    src: "/images/placeholder.png",
    content: <DummyContent />,
  },
  {
    category: "Productivity",
    title: "Enhance your productivity.",
    src: "/images/placeholder.png",
    content: <DummyContent />,
  },
  {
    category: "Product",
    title: "Launching the new Apple Vision Pro.",
    src: "/images/placeholder.png",
    content: <DummyContent />,
  },

  {
    category: "Product",
    title: "Maps for your iPhone 15 Pro Max.",
    src: "/images/placeholder.png",
    content: <DummyContent />,
  },
  {
    category: "iOS",
    title: "Photography just got better.",
    src: "/images/placeholder.png",
    content: <DummyContent />,
  },
  {
    category: "Hiring",
    title: "Hiring for a Staff Software Engineer",
    src: "/images/placeholder.png",
    content: <DummyContent />,
  },
];
