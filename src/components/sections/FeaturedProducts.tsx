"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";

import { Button } from "@/components/ui/button";

import { Icons } from "../shared/Icons";
import MaxWidthWrapper from "../shared/MaxWidthWrapper";

const products = [
  {
    id: 1,
    name: "Himalayan Pink Salt",
    description: "Pure, unrefined pink salt from the Himalayan mountains.",
    image: "/images/placeholder.png",
    color: "bg-pink-100",
    text: "text-black",
  },
  {
    id: 2,
    name: "Organic Turmeric Powder",
    description: "Vibrant, aromatic turmeric sourced from organic farms.",
    image: "/images/placeholder.png",
    color: "bg-yellow-100",
    text: "text-black",
  },
  {
    id: 3,
    name: "Spicy Lentil Crisps",
    description: "Crunchy, protein-packed snacks with a spicy kick.",
    image: "/images/placeholder.png",
    color: "bg-red-100",
    text: "text-black",
  },
  {
    id: 4,
    name: "Cardamom Green Tea",
    description: "Fragrant green tea blended with premium cardamom.",
    image: "/images/placeholder.png",
    color: "bg-green-100",
    text: "text-black",
  },
];

export default function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextProduct = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevProduct = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length,
    );
  };

  const currentProduct = products[currentIndex];
  const nextProductIndex = (currentIndex + 1) % products.length;
  const prevProductIndex =
    (currentIndex - 1 + products.length) % products.length;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  // useInView hook to trigger animations when the section comes into view
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref}>
      <MaxWidthWrapper className="space-y-10 overflow-hidden py-20">
        <motion.h2
          className="text-center text-4xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          Featured Products
        </motion.h2>
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-x-0 top-1/2 z-10 flex items-center justify-between px-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevProduct}
              className="bg-background/80 backdrop-blur-sm"
            >
              <Icons.chevronLeft className="size-6" />
              <span className="sr-only">Previous product</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextProduct}
              className="bg-background/80 backdrop-blur-sm"
            >
              <Icons.chevronRight className="size-6" />
              <span className="sr-only">Next product</span>
            </Button>
          </div>
          <div className="relative aspect-[27/9]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentProduct.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 flex flex-col items-center justify-center md:flex-row"
              >
                <div
                  className={`w-full rounded-3xl p-8 md:w-1/2 ${currentProduct.color}`}
                >
                  <Image
                    width={256}
                    height={256}
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="h-64 w-full rounded-2xl object-cover shadow-lg"
                  />
                </div>
                <div className="w-full p-8 md:w-1/2">
                  <h3 className="mb-4 text-3xl font-bold">
                    {currentProduct.name}
                  </h3>
                  <p className="mb-6 text-xl text-gray-600">
                    {currentProduct.description}
                  </p>
                  <Button size="lg">Learn More</Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex justify-center">
            {products.map((product, index) => (
              <button
                key={product.id}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`mx-2 size-3 rounded-full ${index === currentIndex ? "bg-primary" : "bg-muted-foreground"}`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
        <motion.div
          className="mt-12 grid grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            onClick={() => setCurrentIndex(prevProductIndex)}
            className={`cursor-pointer rounded-xl p-4 ${products[prevProductIndex].color} ${products[prevProductIndex].text}`}
          >
            <Image
              width={128}
              height={128}
              src={products[prevProductIndex].image}
              alt={products[prevProductIndex].name}
              className="h-32 w-full rounded-lg object-cover"
            />
            <p className="mt-2 text-center text-sm font-medium">
              {products[prevProductIndex].name}
            </p>
          </motion.div>
          <motion.div
            className={`cursor-pointer rounded-xl p-4 ${currentProduct.color} ${currentProduct.text}`}
          >
            <Image
              width={128}
              height={128}
              src={currentProduct.image}
              alt={currentProduct.name}
              className="h-32 w-full rounded-lg object-cover"
            />
            <p className="mt-2 text-center text-sm font-medium">
              {currentProduct.name}
            </p>
          </motion.div>
          <motion.div
            onClick={() => setCurrentIndex(nextProductIndex)}
            className={`cursor-pointer rounded-xl p-4 ${products[nextProductIndex].color} ${products[nextProductIndex].text}`}
          >
            <Image
              width={128}
              height={128}
              src={products[nextProductIndex].image}
              alt={products[nextProductIndex].name}
              className="h-32 w-full rounded-lg object-cover"
            />
            <p className="mt-2 text-center text-sm font-medium">
              {products[nextProductIndex].name}
            </p>
          </motion.div>
        </motion.div>
      </MaxWidthWrapper>
    </div>
  );
}
