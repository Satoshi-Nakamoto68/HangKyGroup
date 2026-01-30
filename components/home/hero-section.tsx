"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCompanyNameFull, getCompanyNameShort } from "@/lib/company-name";

function getLangFromDocument(): string {
  if (typeof document === "undefined") return "en";
  const lang = document.documentElement.getAttribute("lang") || "";
  return lang.toLowerCase().slice(0, 2);
}

/** Đặt ảnh hero vào thư mục public, rồi đổi đường dẫn bên dưới (vd: /hero.jpg, /hero-banner.png). */
const HERO_IMAGE_SRC = "/hero.jpg";
const HERO_FALLBACK_SRC = "/placeholder.jpg";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [imgSrc, setImgSrc] = useState(HERO_IMAGE_SRC);
  const [lang, setLang] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return getLangFromDocument();
    }
    return "en";
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setLang(getLangFromDocument());
    const observer = new MutationObserver(() => {
      setLang(getLangFromDocument());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
    return () => observer.disconnect();
  }, []);

  const companyNameFull = useMemo(() => getCompanyNameFull(lang), [lang]);
  const companyNameShort = useMemo(() => getCompanyNameShort(lang), [lang]);

  const handleImageError = () => setImgSrc(HERO_FALLBACK_SRC);

  return (
    <section
      className="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden md:min-h-[95vh]"
      aria-label={`Hero - ${companyNameFull}`}
    >
      {/* Ảnh phủ toàn bộ section */}
      <div className="absolute inset-0">
        <Image
          src="/hero-banner.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={90}
          onError={handleImageError}
        />
        {/* Overlay gradient: chữ đọc rõ trên mọi ảnh */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/75 to-navy/60"
          aria-hidden
        />
      </div>

      {/* Nội dung - giữa trang */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl">
          {/* Eyebrow */}
          <div
            className={cn(
              "mb-6 inline-flex items-center gap-2.5 rounded-full border border-cream/20 bg-cream/5 px-4 py-2.5 backdrop-blur-sm transition-all duration-700 ease-out",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0",
            )}
          >
            <span
              className="h-2 w-2 rounded-full bg-gold shrink-0"
              aria-hidden
            />
            <span className="text-sm font-medium tracking-wide text-cream/90">
              Multi-sector Investment Group
            </span>
          </div>

          {/* Headline */}
          <h1
            className={cn(
              "font-serif text-4xl font-semibold leading-[1.1] text-cream sm:text-5xl md:text-6xl lg:text-[3.5rem] transition-all duration-700 delay-75 ease-out",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0",
            )}
          >
            <span className="block text-balance">{companyNameShort}</span>
            <span className="mt-2 block bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
              Investment Group
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className={cn(
              "mt-6 text-lg font-light tracking-wide text-cream/90 sm:text-xl transition-all duration-700 delay-150 ease-out",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0",
            )}
          >
            Founded on Absolute Trust
          </p>

          {/* Legal */}
          <p
            className={cn(
              "mt-3 text-sm text-cream/60 transition-all duration-700 delay-200 ease-out",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0",
            )}
          >
            HKIG Jsc • {companyNameFull}
          </p>

          {/* CTAs */}
          <div
            className={cn(
              "mt-10 flex flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-300 ease-out",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0",
            )}
          >
            <Link
              href="/investment"
              className="group inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3.5 text-sm font-semibold text-navy shadow-lg transition-colors hover:bg-gold-light focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Explore Our Investments
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-md border-2 border-cream/40 bg-cream/5 px-6 py-3.5 text-sm font-medium text-cream backdrop-blur-sm transition-colors hover:border-cream/60 hover:bg-cream/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              About the Group
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 md:bottom-8"
        aria-hidden
      >
        <a
          href="#mission"
          className="flex flex-col items-center gap-1.5 text-cream/50 transition-colors hover:text-cream/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded-full p-2"
          aria-label="Scroll to next section"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
            Scroll
          </span>
          <div className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-cream/40 pt-1.5">
            <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}
