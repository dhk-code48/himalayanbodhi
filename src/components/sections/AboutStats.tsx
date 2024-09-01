"use client";

import React from "react";
import { aboutSection } from "@/config/about";

import Counter, { Formatter } from "../animation/Counter";
import MaxWidthWrapper from "../shared/MaxWidthWrapper";

const AboutStats = () => {
  function addPlusSign(value: number) {
    const formattedValue = Formatter.number(value);
    return value > 0 ? `${formattedValue}+` : formattedValue;
  }
  return (
    <div className="flex flex-wrap justify-between pt-20 text-center">
      {aboutSection.stats.map((stat, index) => (
        <div key={"about-section-" + index} className="flex-1 border p-10">
          <Counter
            format={addPlusSign}
            targetValue={parseInt(stat.value)}
            className="mb-2 font-display text-4xl font-bold"
          />
          <p className="text-xl">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default AboutStats;
