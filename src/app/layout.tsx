import { ppMondwest, ppNeueBit, w95fa } from "@/lib/fonts";
import RootProviders from "@/providers/providers";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Llmao app",
  description: "Llmao app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${w95fa.variable} ${ppNeueBit.variable} ${ppMondwest.variable} ${w95fa.className} antialiased`}
      >
        <RootProviders>{children}</RootProviders>
        <div className="h-12"></div>
      </body>
    </html>
  );
}
