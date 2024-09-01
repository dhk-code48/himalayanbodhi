import React from "react";
import Image from "next/image";

import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";

import RelatedNews from "./_components/RelatedNews";

const SingleNewsSection = () => {
  return (
    <>
      <MaxWidthWrapper className="max-w-screen-lg space-y-10 py-20">
        <Image
          src="/images/placeholder.png"
          width={1080}
          height={640}
          alt="news banner"
          className="aspect-[27/6] rounded-xl object-cover"
        />
        <div>
          <h1 className="font-content text-2xl font-bold">
            The news title goes here
          </h1>
          <p className="font-content">The news description</p>
          <div className="mt-10 space-y-5 text-justify font-content text-lg tracking-wide">
            <p>
              Aloo Achar, a popular Nepali dish, is a delightful spicy potato
              pickle that bursts with flavors and aromas. This versatile side
              dish complements various meals, especially during festivities and
              family gatherings. The harmonious blend of spices, herbs, and
              tangy flavors makes Aloo Achar a must-try for anyone interested in
              exploring Nepali cuisine. Aloo Achar, or Nepali potato pickle, is
              a traditional dish many in Nepal and neighboring regions enjoy. It
              is often served as an accompaniment to main dishes like Dal Bhat
              (lentils and rice) and Sel Roti (a traditional rice-based bread)
              or even as a snack. The dish is known for its tangy, spicy, and
              savory profile, which combines boiled potatoes with spices, lemon
              juice, and fresh herbs.
            </p>
            <p>
              The harmonious blend of spices, herbs, and tangy flavors makes
              Aloo Achar a must-try for anyone interested in exploring Nepali
              cuisine. Aloo Achar, or Nepali potato pickle, is a traditional
              dish many in Nepal and neighboring regions enjoy. It is often
              served as an accompaniment to main dishes like Dal Bhat (lentils
              and rice) and Sel Roti (a traditional rice-based bread) or even as
              a snack. The dish is known for its tangy, spicy, and savory
              profile, which combines boiled potatoes with spices, lemon juice,
              and fresh herbs.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper large>
        <RelatedNews />
      </MaxWidthWrapper>
    </>
  );
};

export default SingleNewsSection;
