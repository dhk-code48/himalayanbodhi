"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Icons } from "../shared/Icons";
import { Button } from "../ui/button";
import AboutStats from "./AboutStats";

const features = [
  {
    icon: <Icons.leaf className="size-6 text-green-600" />,
    title: "Organic Sourcing",
    description:
      "We carefully select the finest organic ingredients from the Himalayan region.",
  },
  {
    icon: <Icons.mountain className="size-6 text-blue-600" />,
    title: "Himalayan Heritage",
    description:
      "Our products embody centuries of traditional Himalayan wisdom and flavors.",
  },
  {
    icon: <Icons.shield className="size-6 text-amber-600" />,
    title: "Quality Assurance",
    description:
      "Rigorous testing ensures the highest quality and purity in every product.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function AboutUs() {
  return (
    <section className="bg-gradient-to-b from-primary-foreground to-primary/5 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-4 text-4xl font-bold">About Himalayan Bodhi</h2>
          <p className="mx-auto max-w-3xl text-xl">
            Bringing the pure essence of the Himalayas to your table through our
            organic spices and wholesome snacks.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 items-center gap-12 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="relative" variants={itemVariants}>
            <Image
              src="/images/placeholder.png"
              alt="Himalayan landscape with spices"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-primary/20 to-transparent" />
          </motion.div>

          <motion.div className="space-y-8" variants={containerVariants}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4"
                variants={itemVariants}
              >
                <div className="shrink-0 rounded-full bg-white p-2 shadow-md">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p>{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <AboutStats />

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="mb-6 text-lg">
            At Himalayan Bodhi, we&apos;re committed to bringing you the
            authentic flavors and health benefits of the Himalayas. Our journey
            began with a passion for organic, sustainably sourced ingredients
            and a desire to share the rich culinary heritage of the region with
            the world.
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button rounded="full">Discover Our Story</Button>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
