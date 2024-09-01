import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <main>
      <section className="bg-muted py-12 md:py-16 lg:py-20">
        <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <Link
              href="/news/1"
              className="block overflow-hidden rounded-lg"
              prefetch={false}
            >
              <Image
                src="/images/placeholder.png"
                width={800}
                height={450}
                alt="Featured News"
                className="size-full object-cover"
                style={{ aspectRatio: "800/450", objectFit: "cover" }}
              />
            </Link>
            <div className="mt-4 space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Featured
              </div>
              <h2 className="text-2xl font-bold">
                Discover the Hidden Gems of the Himalayas
              </h2>
              <p className="text-muted-foreground">
                Explore the breathtaking landscapes and rich cultural heritage
                of the Himalayan region.
              </p>
            </div>
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
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
                className="size-full object-cover"
                style={{ aspectRatio: "400/225", objectFit: "cover" }}
              />
            </Link>
            <div className="mt-4 space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                Travel
              </div>
              <h3 className="text-xl font-bold">
                Trekking Through the Majestic Himalayas
              </h3>
              <p className="text-muted-foreground">
                Embark on an unforgettable journey through the breathtaking
                landscapes of the Himalayas.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent News</h2>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm">
                All
              </Button>
              <Button variant="ghost" size="sm">
                Travel
              </Button>
              <Button variant="ghost" size="sm">
                Culture
              </Button>
              <Button variant="ghost" size="sm">
                Lifestyle
              </Button>
            </div>
          </div>
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
    </main>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
