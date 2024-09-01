import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const RelatedNews = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold">Related News</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group">
            <Link
              href="/news/1"
              className="block overflow-hidden rounded-lg"
              prefetch={false}
            >
              <Image
                src="/images/placeholder.png"
                width={400}
                height={225}
                alt="Recent News"
                className="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                style={{ aspectRatio: "400/225", objectFit: "cover" }}
              />
            </Link>
            <div className="mt-4 space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                Culture
              </div>
              <h3 className="text-xl font-bold">
                Exploring the Rich Cultural Heritage of the Himalayas
              </h3>
              <p className="text-muted-foreground">
                Discover the vibrant traditions and ancient wisdom of the
                Himalayan people.
              </p>
            </div>
          </div>
          <div className="group">
            <Link
              href="/news/1"
              className="block overflow-hidden rounded-lg"
              prefetch={false}
            >
              <Image
                src="/images/placeholder.png"
                width={400}
                height={225}
                alt="Recent News"
                className="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                style={{ aspectRatio: "400/225", objectFit: "cover" }}
              />
            </Link>
            <div className="mt-4 space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Travel
              </div>
              <h3 className="text-xl font-bold">
                Hiking Through the Stunning Himalayan Landscapes
              </h3>
              <p className="text-muted-foreground">
                Embark on an unforgettable adventure through the majestic
                mountains of the Himalayas.
              </p>
            </div>
          </div>
          <div className="group">
            <Link
              href="/news/1"
              className="block overflow-hidden rounded-lg"
              prefetch={false}
            >
              <Image
                src="/images/placeholder.png"
                width={400}
                height={225}
                alt="Recent News"
                className="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                style={{ aspectRatio: "400/225", objectFit: "cover" }}
              />
            </Link>
            <div className="mt-4 space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                Lifestyle
              </div>
              <h3 className="text-xl font-bold">
                Discovering the Peaceful Lifestyle of Himalayan Villages
              </h3>
              <p className="text-muted-foreground">
                Immerse yourself in the tranquil way of life of the Himalayan
                people.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedNews;
