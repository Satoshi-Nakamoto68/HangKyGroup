"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Shirt,
  Cpu,
  Ship,
  Building2,
  TrendingUp,
  Home,
  ArrowUpRight,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PILLARS = [
  {
    title: "Fashion",
    description:
      "Strategic investments in apparel, luxury goods, and lifestyle brands with global growth potential.",
    icon: Shirt,
    href: "/investment/fashion",
    number: "01",
    ariaLabel: "Explore Fashion Investments",
  },
  {
    title: "Technology",
    description:
      "Backing innovative tech companies driving digital transformation across industries.",
    icon: Cpu,
    href: "/investment/technology",
    number: "02",
    ariaLabel: "Explore Technology Investments",
  },
  {
    title: "Import & Export",
    description:
      "Facilitating international trade with a focus on quality goods and reliable logistics.",
    icon: Ship,
    href: "/investment/import-export",
    number: "03",
    ariaLabel: "Explore Import & Export",
  },
  {
    title: "Governance",
    description:
      "Advisory and investment in management consulting, corporate governance, and organizational development.",
    icon: Building2,
    href: "/investment/governance",
    number: "04",
    ariaLabel: "Explore Governance & Management",
  },
  {
    title: "Marketing",
    description:
      "Investing in agencies and platforms that drive brand growth and market expansion.",
    icon: TrendingUp,
    href: "/investment/marketing",
    number: "05",
    ariaLabel: "Explore Marketing & Growth",
  },
  {
    title: "Real Estate",
    description:
      "Strategic property investments in commercial, residential, and mixed-use developments.",
    icon: Home,
    href: "/investment/real-estate",
    number: "06",
    ariaLabel: "Explore Real Estate",
  },
] as const;

export function PillarsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-border py-20 sm:py-24 lg:py-28"
      aria-labelledby="pillars-heading"
    >
      {/* 1. Base: cream nền rõ, tương phản tốt với card trắng */}
      <div className="absolute inset-0 bg-secondary" aria-hidden />

      {/* 2. Lưới nhẹ: gợi cấu trúc, không làm rối chữ */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--navy) 1px, transparent 1px),
            linear-gradient(to bottom, var(--navy) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
        aria-hidden
      />

      {/* 3. Vùng sáng giữa: nội dung và cards nổi bật */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,var(--card)_0%,transparent_65%)] opacity-60"
        aria-hidden
      />

      {/* 4. Viền dọc vàng – điểm nhấn thương hiệu */}
      <div
        className="absolute right-0 top-0 z-[1] h-full w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div
            className={cn(
              "mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-2 transition-all duration-700",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0",
            )}
          >
            <Layers className="h-4 w-4 text-gold" aria-hidden />
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
              Investment Focus
            </span>
          </div>

          <h2
            id="pillars-heading"
            className={cn(
              "font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl md:text-5xl transition-all duration-700 delay-75",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0",
            )}
          >
            Six Pillars of Strategic Investment
          </h2>

          <p
            className={cn(
              "mt-6 text-lg leading-relaxed text-muted-foreground transition-all duration-700 delay-150",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0",
            )}
          >
            Our diversified investment approach spans six key sectors, each
            selected for its growth potential and alignment with our values of
            governance and transparency.
          </p>
        </div>

        {/* Pillars grid */}
        <ul
          className={cn(
            "mx-auto mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 transition-all duration-700 delay-200",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
          role="list"
        >
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <li key={pillar.title}>
                <Link
                  href={pillar.href}
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300",
                    "hover:border-gold/40 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
                  )}
                  style={{
                    transitionDelay: isVisible
                      ? `${250 + index * 60}ms`
                      : "0ms",
                  }}
                  aria-label={pillar.ariaLabel}
                >
                  {/* Number badge – rõ ràng, sáng tạo */}
                  <div
                    className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-lg border-2 border-gold/50 bg-gold/10 font-serif text-xl font-bold tabular-nums text-gold transition-all duration-300 group-hover:border-gold group-hover:bg-gold/20 group-hover:text-gold"
                    aria-hidden
                  >
                    {pillar.number}
                  </div>

                  {/* Icon */}
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-navy transition-colors duration-300 group-hover:bg-gold/15 group-hover:text-gold"
                    aria-hidden
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <div className="mt-5 flex-1 pr-8">
                    <h3 className="font-serif text-xl font-semibold text-navy transition-colors group-hover:text-gold">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Link indicator */}
                  <div className="mt-5 flex items-center gap-2 text-sm font-medium text-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <span>Learn more</span>
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div
          className={cn(
            "mt-14 flex justify-center transition-all duration-700 delay-500",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          <Link
            href="/investment"
            className="group inline-flex items-center gap-2 rounded-md border border-navy/20 bg-navy/5 px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-navy/10 hover:border-navy/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            View all sectors
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
