import React, { use } from "react";
import getAllNews from "@/actions/news/getAllNews";

import HeroSlider from "@/components/sections/HeroLanding";

const NewsSlider = () => {
  const news = use(getAllNews({ take: 5 }));
  return (
    <>
      <HeroSlider news={news} />
    </>
  );
};

export default NewsSlider;
