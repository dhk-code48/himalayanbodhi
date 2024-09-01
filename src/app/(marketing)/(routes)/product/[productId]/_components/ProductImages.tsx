"use client";

import React, { useState } from "react";
import { default as NextImage } from "next/image";
import { Image } from "@prisma/client";
import { CldImage } from "next-cloudinary";

import { cn } from "@/lib/utils";
import { Lens } from "@/components/ui/lens";

const ProductImages = ({ images }: { images: Image[] }) => {
  const [selectedImage, setSelectedImage] = useState<string>(images[0].url);

  return (
    <div className="space-y-4">
      <Lens zoomFactor={1.8} lensSize={200}>
        <div className="aspect-video w-full rounded-xl border md:h-80">
          <NextImage
            src={selectedImage}
            width={190}
            height={232}
            alt="product"
            className="size-full rounded-md object-contain"
          />
        </div>
      </Lens>
      <div className="flex size-fit flex-wrap gap-3 rounded-lg border px-2 py-1">
        {images.map((image, index) => (
          <CldImage
            onClick={() => setSelectedImage(image.url)}
            src={image.url}
            key={"product-image-" + index}
            width={100}
            height={100}
            alt="product"
            className={cn(
              "size-20 cursor-pointer rounded-lg object-cover hover:bg-muted",
              image.url === selectedImage && "border-2 border-primary p-1",
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
