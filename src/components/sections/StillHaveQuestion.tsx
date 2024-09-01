import React from "react";
import Image from "next/image";

import MaxWidthWrapper from "../shared/MaxWidthWrapper";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";

const StillHaveQuestion = () => {
  return (
    <MaxWidthWrapper className="py-20">
      <AspectRatio
        ratio={16 / 3}
        className="relative overflow-hidden rounded-xl"
      >
        <Image
          className="size-full object-cover"
          width={300}
          height={1600}
          alt="contact us"
          src="/images/placeholder.png"
        />
        <div className="absolute left-0 top-0 z-10 flex size-full flex-col items-center justify-center space-y-3 bg-gradient-to-r from-black/50 via-black/70 to-black/50 text-white bg-blend-overlay">
          <h1 className="font-display text-4xl font-bold">
            Still have Question?
          </h1>
          <p>Get in contact with us to get to know us better</p>
          <Button>Contact Us</Button>
        </div>
      </AspectRatio>
    </MaxWidthWrapper>
  );
};

export default StillHaveQuestion;
