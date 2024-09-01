import { AboutType } from "@/types";

export const aboutSection: AboutType = {
  title: "Our Spice Journey",
  image: "/images/about.png",
  about:
    "Nestled in the heart of Nepal, Himalayan Bodhi is more than just a spice company. We are the custodians of a rich culinary heritage, bringing the authentic flavors of the Himalayas to your kitchen.",
  features: [
    {
      label: "Community Impact",
      caption: "Supporting 500+ local farmers",
      icon: "users",
    },
    {
      label: "Sustainability",
      caption: "100% organic and eco-friendly practices",
      icon: "leaf",
    },
    {
      label: "Quality Assurance",
      caption: "ISO 22000 and HACCP certified",
      icon: "medal",
    },
    {
      label: "Organic",
      caption: "100% organic and chemical free",
      icon: "plant",
    },
  ],
  stats: [
    { value: "50+", label: "Product Varieties" },
    { value: "1000+", label: "Happy Customers" },
    { value: "25+", label: "Countries Served" },
    { value: "10+", label: "Years of Excellence" },
  ],
};
