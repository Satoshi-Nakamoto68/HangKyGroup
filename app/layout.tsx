import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TrustStrip } from "@/components/layout/trust-strip";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Hang Ky Investment Group | HKIG Jsc",
  description:
    "Eternal Order Investment Group (HKIG Jsc) - Founded on Absolute Trust. A multi-sector investment holding company focused on Fashion, Technology, Import/Export, Governance, Marketing, and Real Estate.",
  keywords: [
    "investment group",
    "HKIG",
    "Eternal Order",
    "Hang Ky Investment",
    "multi-sector investments",
  ],
  authors: [{ name: "Eternal Order Investment Group" }],
  openGraph: {
    title: "Eternal Order Investment Group | Founded on Absolute Trust",
    description:
      "Multi-sector investment holding company with strong governance and high credibility.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eternal Order Investment Group",
    description: "Founded on Absolute Trust - Multi-sector Investments",
  },
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtranslateSettings = {
    default_language: "en",
    detect_browser_language: false,
    languages: ["en", "vi", "ja"],
    wrapper_selector: ".gtranslate_wrapper",
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <div className="gtranslate_wrapper" aria-label="Language switcher" />
        <TrustStrip />
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <Script
          id="gtranslate-settings"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.gtranslateSettings = ${JSON.stringify(
              gtranslateSettings,
            )};`,
          }}
        />
        <Script
          src="https://cdn.gtranslate.net/widgets/latest/float.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
