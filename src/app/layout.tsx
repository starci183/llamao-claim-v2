import { ppMondwest, ppNeueBit, w95fa } from "@/lib/fonts";
import { GoogleAnalytics } from "@next/third-parties/google";
import RootProviders from "@/providers/providers";
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Llamao Awakening",
  description: "Llamao Awakening",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icons/favicon.ico" />
      </head>
      <body
        className={`${w95fa.variable} ${ppNeueBit.variable} ${ppMondwest.variable} ${w95fa.className} antialiased`}
      >
        <RootProviders>{children}</RootProviders>
        {/* <div className="h-12"></div> */}
      </body>
      <GoogleAnalytics gaId="G-SDCMNW41TB" />
    </html>
  );
}
