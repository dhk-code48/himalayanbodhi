import { Inter, Merriweather, Urbanist } from "next/font/google";

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontContent = Merriweather({
  subsets: ["latin"],
  variable: "--font-content",
  weight: ["300", "400", "700", "900"],
});

export const fontDisplay = Urbanist({
  subsets: ["latin"],
  variable: "--font-display",
});
