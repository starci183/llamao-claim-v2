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
