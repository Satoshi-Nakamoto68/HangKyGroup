"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Target, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Đặt ảnh cho VALUES vào public: value-trust.jpg, value-transparency.jpg, value-long-term.jpg. Có thể dùng placeholder.jpg tạm thời. */
const VALUES = [
  {
    title: "Trust",
    description:
      "Founded on absolute trust. Every partnership and decision is built on integrity.",
    image: "/value-trust.jpg",
    fallbackImage: "/placeholder.jpg",
    ariaLabel: "Our value: Trust",
  },
  {
    title: "Transparency",
    description:
      "Clear governance, open communication, and accountability at every level.",
    image: "/value-transparency.jpg",
    fallbackImage: "/placeholder.jpg",
    ariaLabel: "Our value: Transparency",
  },
  {
    title: "Long\u2011term Value",
    description:
      "We invest for sustainable growth and lasting impact, not short-term gains.",
    image: "/value-long-term.jpg",
    fallbackImage: "/placeholder.jpg",
    ariaLabel: "Our value: Long-term value",
  },
] as const;

const STATS = [
  { value: "6", label: "Investment Pillars", suffix: "" },
  { value: "100", label: "Governance Focus", suffix: "%" },
  { value: "Global", label: "Partnership Ready", suffix: "" },
  { value: "Long\u2011term", label: "Value Creation", suffix: "" },
] as const;

export function MissionSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleValueImageError = (key: string) => {
    setImageErrors((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <section
      ref={sectionRef}
      id="mission"
      className="relative overflow-hidden border-y border-border bg-secondary py-20 sm:py-24 lg:py-28"
      aria-labelledby="mission-heading"
    >
      {/* Subtle background accent */}
      <div
        className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header block */}
        <div className="mx-auto max-w-3xl text-center">
          <div
            className={cn(
              "mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-2 transition-all duration-700",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0",
            )}
          >
            <Target className="h-4 w-4 text-gold" aria-hidden />
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
              Our Mission
            </span>
          </div>

          <h2
            id="mission-heading"
            className={cn(
              "font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl md:text-5xl transition-all duration-700 delay-75",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0",
            )}
          >
            Building Lasting Value Through{" "}
            <span className="text-gold">Principled Investment</span>
          </h2>

          <p
            className={cn(
              "mt-6 text-lg leading-relaxed text-muted-foreground transition-all duration-700 delay-150",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0",
            )}
          >
            Hang Ky Investment Group operates at the intersection of strategic
            vision and operational excellence. We identify and nurture
            high-potential ventures across Fashion, Technology, Import & Export,
            Governance, Marketing, and Real Estate—always with a commitment to
            transparency, long-term value creation, and rigorous corporate
            governance.
          </p>
        </div>

        {/* Value pillars with images */}
        <ul
          className={cn(
            "mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-3 transition-all duration-700 delay-200",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
          role="list"
        >
          {VALUES.map((item, index) => {
            const imgSrc = imageErrors[item.title]
              ? item.fallbackImage
              : item.image;
            return (
              <li key={item.title}>
                <article
                  className={cn(
                    "flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md",
                    "focus-within:ring-2 focus-within:ring-gold focus-within:ring-offset-2",
                  )}
                  style={{
                    transitionDelay: isVisible
                      ? `${250 + index * 50}ms`
                      : "0ms",
                  }}
                  aria-label={item.ariaLabel}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] w-full shrink-0 bg-muted">
                    <Image
                      src={imgSrc}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onError={() => handleValueImageError(item.title)}
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-6 py-5">
                    <h3 className="font-semibold text-navy">{item.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        {/* Stats - Long-term giữ trên một dòng bằng non-breaking hyphen */}
        <div
          className={cn(
            "mx-auto mt-16 max-w-4xl transition-all duration-700 delay-300",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border/80 bg-card/50 px-5 py-6 text-center backdrop-blur-sm"
                style={{
                  transitionDelay: isVisible ? `${400 + index * 60}ms` : "0ms",
                }}
              >
                <p className="font-serif text-3xl font-semibold text-navy sm:text-4xl">
                  <span className="whitespace-nowrap">
                    {stat.value}
                    {stat.suffix}
                  </span>
                </p>
                <p className="mt-1.5 text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className={cn(
            "mt-14 flex justify-center transition-all duration-700 delay-500",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          <Link
            href="/about/values"
            className="group inline-flex items-center gap-2 rounded-md border border-navy/20 bg-navy/5 px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-navy/10 hover:border-navy/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            Our Values & Ethics
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
