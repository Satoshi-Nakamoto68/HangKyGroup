"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Target,
  Building,
  Users,
  FileCheck,
  BarChart3,
  Layers,
  Quote,
} from "lucide-react";
import { getCompanyName, getCompanyNameFull } from "@/lib/company-name";

function getLangFromDocument(): string {
  if (typeof document === "undefined") return "en";
  const lang = document.documentElement.getAttribute("lang") || "";
  return lang.toLowerCase().slice(0, 2);
}

const getIdentityItems = (companyName: string, companyNameFull: string) => [
  {
    label: "Legal Name (Vietnamese)",
    value: "CÔNG TY CỔ PHẦN TẬP ĐOÀN ĐẦU TƯ HẰNG KỶ",
  },
  {
    label: "English Name",
    value: companyNameFull,
  },
  { label: "Abbreviation", value: "HKIG Jsc" },
  { label: "Trade Name", value: companyName },
];

const STRENGTH_ITEMS = [
  {
    icon: Building,
    label: "Multi-Sector Portfolio",
    desc: "Diversified across six strategic pillars",
  },
  {
    icon: Users,
    label: "Strategic Partnerships",
    desc: "Long-term alignment with portfolio companies",
  },
  {
    icon: Shield,
    label: "Risk Management",
    desc: "Rigorous due diligence and monitoring",
  },
  {
    icon: FileCheck,
    label: "Compliance Excellence",
    desc: "Governance-first approach",
  },
] as const;

const APPROACH_STEPS = [
  {
    step: "01",
    title: "Identify",
    description:
      "We identify high-potential investment opportunities through rigorous market analysis and our extensive network.",
  },
  {
    step: "02",
    title: "Evaluate",
    description:
      "Comprehensive due diligence ensures each investment meets our standards for governance, growth potential, and ethical operations.",
  },
  {
    step: "03",
    title: "Partner",
    description:
      "We work alongside management teams to implement best practices, strengthen governance, and accelerate sustainable growth.",
  },
] as const;

const RISK_BULLETS = [
  "Comprehensive due diligence process",
  "Regular portfolio monitoring and reporting",
  "Diversification across sectors and geographies",
  "Strong governance frameworks at portfolio companies",
  "Compliance with local and international regulations",
] as const;

const COMMITMENT_ITEMS = [
  {
    label: "Governance Standards",
    value: "100%",
    desc: "Portfolio companies meeting governance requirements",
  },
  {
    label: "Transparency",
    value: "Quarterly",
    desc: "Regular reporting to stakeholders",
  },
  {
    label: "Compliance",
    value: "Full",
    desc: "Adherence to local and international regulations",
  },
] as const;

const QUICK_LINKS = [
  {
    href: "/about/leadership",
    title: "Leadership & Governance",
    desc: "Meet our leadership team and governance structure",
  },
  {
    href: "/about/values",
    title: "Values & Ethics",
    desc: "Our core principles and ethical standards",
  },
] as const;

export default function AboutPage() {
  const [lang, setLang] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return getLangFromDocument();
    }
    return "en";
  });

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

  const companyName = useMemo(() => getCompanyName(lang), [lang]);
  const companyNameFull = useMemo(() => getCompanyNameFull(lang), [lang]);
  const IDENTITY_ITEMS = useMemo(
    () => getIdentityItems(companyName, companyNameFull),
    [companyName, companyNameFull],
  );

  return (
    <>
      {/* Hero – Giới thiệu: cream ấm, gợi tin cậy & chào đón */}
      <section className="relative overflow-hidden border-b border-border bg-[linear-gradient(180deg,var(--secondary)_0%,oklch(0.97_0.006_85)_100%)] py-20 sm:py-24 lg:py-28">
        <div
          className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent"
          aria-hidden
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gold/[0.06] to-transparent"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2">
              <Target className="h-4 w-4 text-gold" aria-hidden />
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
                About Us
              </span>
            </div>
            <h1 className="font-serif text-4xl font-semibold leading-tight text-navy sm:text-5xl md:text-6xl">
              Company Overview
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {companyName} (HKIG Jsc) is a multi-sector investment
              holding company headquartered in Vietnam. We operate with a
              governance-first philosophy, seeking to create lasting value
              across diverse industries while maintaining the highest standards
              of transparency and integrity.
            </p>
          </div>
        </div>
      </section>

      {/* Identity – Thông tin pháp lý: nền trắng, ô có viền vàng nhẹ, tagline nổi bật */}
      <section className="relative border-b border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {IDENTITY_ITEMS.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border border-l-4 border-l-gold/50 bg-secondary/40 px-6 py-5 transition-colors hover:bg-gold/5 hover:border-l-gold/80"
              >
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gold">
                  {item.label}
                </p>
                <p className="font-serif text-base font-semibold leading-snug text-navy">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center border-t border-border pt-12">
            <blockquote className="flex items-center gap-4 rounded-xl border-2 border-gold/30 bg-gold/10 px-8 py-6 text-center">
              <Quote className="h-8 w-8 shrink-0 text-gold" aria-hidden />
              <p className="font-serif text-2xl font-medium italic text-navy sm:text-3xl">
                Founded on Absolute Trust
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Who We Are – Đối tác chiến lược: nền sáng, card trắng nổi bật, accent vàng */}
      <section className="relative overflow-hidden border-b border-border bg-[linear-gradient(180deg,var(--background)_0%,var(--secondary)_100%)] py-20 sm:py-24 lg:py-28">
        <div
          className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2">
                <Layers className="h-4 w-4 text-gold" aria-hidden />
                <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
                  Who We Are
                </span>
              </div>
              <h2 className="font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl">
                A Strategic Investment Partner
              </h2>
              <div className="mt-6 space-y-5 text-muted-foreground">
                <p className="leading-relaxed">
                  {companyName} was founded with a clear mission: to
                  build a diversified investment portfolio that creates
                  sustainable value for our stakeholders while upholding the
                  highest standards of corporate governance.
                </p>
                <p className="leading-relaxed">
                  We invest across six strategic pillars—Fashion, Technology,
                  Import & Export, Governance & Management, Marketing, and Real
                  Estate—selecting opportunities that align with our long-term
                  vision and ethical standards.
                </p>
                <p className="leading-relaxed">
                  Our approach combines rigorous due diligence, active portfolio
                  management, and hands-on operational support to help our
                  investee companies achieve their full potential.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {STRENGTH_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="group rounded-xl border border-border border-t-4 border-t-gold/40 bg-card p-6 shadow-sm transition-all hover:border-t-gold hover:shadow-lg hover:shadow-gold/5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy/5 text-navy transition-colors group-hover:bg-gold/20 group-hover:text-gold">
                      <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                    </div>
                    <h3 className="mt-4 font-semibold text-navy">
                      {item.label}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How We Work – Quy trình: navy uy quyền, bước vàng nổi bật */}
      <section className="relative overflow-hidden border-b border-border bg-[linear-gradient(180deg,var(--navy-light)_0%,var(--navy)_40%,var(--navy)_60%,var(--navy-light)_100%)] py-20 sm:py-24 lg:py-28">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,transparent_0%,var(--navy)_100%)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-gold/60 bg-gold/20 px-4 py-2">
              <BarChart3 className="h-4 w-4 text-gold" aria-hidden />
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
                Our Approach
              </span>
            </div>
            <h2 className="font-serif text-3xl font-semibold leading-tight text-cream sm:text-4xl">
              How We Work
            </h2>
            <p className="mt-5 text-cream/80">
              Our investment process is built on transparency, discipline, and a
              commitment to creating value for all stakeholders.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {APPROACH_STEPS.map((item, index) => (
              <div
                key={item.step}
                className="relative rounded-xl border-2 border-cream/20 bg-cream/10 p-8 transition-all hover:border-gold/30 hover:bg-cream/15"
              >
                {index < APPROACH_STEPS.length - 1 && (
                  <div
                    className="absolute left-[calc(50%+4rem)] top-12 hidden h-0.5 w-[calc(100%-8rem)] bg-gradient-to-r from-gold/30 to-transparent md:block"
                    aria-hidden
                  />
                )}
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-gold bg-gold/20 font-serif text-xl font-bold tabular-nums text-gold shadow-[0_0_20px_rgba(oklch(0.75_0.12_85),_0.2)]">
                  {item.step}
                </div>
                <h3 className="mt-5 font-serif text-xl font-semibold text-cream">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Management – Bảo vệ giá trị: nền trung tính, card navy + vàng tạo tin cậy */}
      <section className="relative border-b border-border bg-muted/50 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2">
                <Shield className="h-4 w-4 text-gold" aria-hidden />
                <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
                  Risk Management
                </span>
              </div>
              <h2 className="font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl">
                Protecting Value Through Discipline
              </h2>
              <p className="mt-6 text-muted-foreground">
                Our risk management framework is integral to every investment
                decision. We employ a multi-layered approach to identify,
                assess, and mitigate risks across our portfolio.
              </p>
              <ul className="mt-8 space-y-4" role="list">
                {RISK_BULLETS.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold"
                      aria-hidden
                    />
                    <span className="text-foreground leading-relaxed">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border-2 border-gold/30 bg-navy p-8 shadow-xl shadow-navy/20">
              <h3 className="font-serif text-xl font-semibold text-cream">
                Our Commitment
              </h3>
              <div className="mt-6 space-y-6">
                {COMMITMENT_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="border-b border-cream/10 pb-6 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium text-cream/80">
                        {item.label}
                      </span>
                      <span className="font-serif text-xl font-semibold text-gold tabular-nums">
                        {item.value}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-cream/50">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links – Khám phá thêm: nền cream nhẹ, card trắng, hover vàng rõ */}
      <section className="relative border-b border-border bg-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">Explore further</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between gap-6 rounded-xl border-2 border-border bg-card p-6 shadow-sm transition-all hover:border-gold hover:bg-gold/5 hover:shadow-lg hover:shadow-gold/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-xl font-semibold text-navy transition-colors group-hover:text-gold">
                    {link.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {link.desc}
                  </p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-gold/40 bg-gold/10 text-gold transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
                  <ArrowRight
                    className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
