import localFont from "next/font/local";

export const w95fa = localFont({
  src: [
    {
      path: "../../public/fonts/W95FA.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-w95fa",
  display: "swap",
  fallback: ["Courier New", "monospace"],
});

export const ppNeueBit = localFont({
  src: [
    {
      path: "../../public/fonts/ppneuebit-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pp-neuebit",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const ppMondwest = localFont({
  src: [
    {
      path: "../../public/fonts/ppmondwest-regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-pp-mondwest",
  display: "swap",
  fallback: ["Georgia", "serif"],
});
