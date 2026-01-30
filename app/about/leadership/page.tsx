"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Users, Building2, Shield, Scale, Target, Award } from "lucide-react";
import { getCompanyName } from "@/lib/company-name";

function getLangFromDocument(): string {
  if (typeof document === "undefined") return "en";
  const lang = document.documentElement.getAttribute("lang") || "";
  return lang.toLowerCase().slice(0, 2);
}

// Metadata moved to layout or handled dynamically

/** Deterministic seed for stable portrait URL per person (no random change on render). */
function getPortraitSeed(name: string, role: string): string {
  const raw = `${name}-${role}`.toLowerCase();
  return raw.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "portrait";
}

function getPortraitUrl(seed: string): string {
  const encoded = encodeURIComponent(seed);
  return `https://api.dicebear.com/7.x/notionists-neutral/png?seed=${encoded}&size=400`;
}

const getExecutiveTeam = (companyName: string) => [
  {
    name: "Robert Chen",
    role: "Chairman of the Board",
    description:
      `Robert sets the strategic direction of ${companyName} and ensures board activities remain aligned with shareholder interests and long-term value creation. With over twenty-five years in global investment and governance, he champions independence, transparency, and risk-adjusted returns across the portfolio.`,
    order: 1,
  },
  {
    name: "Sarah Mitchell",
    role: "Chief Executive Officer",
    description:
      "Sarah leads HKIG's overall operations and execution of the board's strategic vision. She drives sustainable growth, organisational excellence, and stakeholder alignment across all six investment pillars. Her focus is on embedding governance and performance culture so the group delivers lasting impact.",
    order: 2,
  },
  {
    name: "David Park",
    role: "Chief Financial Officer",
    description:
      "David oversees financial planning, capital allocation, risk management, and investor relations. He ensures robust reporting, disciplined budgeting, and compliance with local and international standards so that financial decisions support both near-term performance and long-term resilience.",
    order: 3,
  },
  {
    name: "Emily Tran",
    role: "Chief Operating Officer",
    description:
      "Emily manages day-to-day operations and operational excellence across all business units and portfolio companies. She designs scalable processes, strengthens execution, and enables teams to deliver on strategic objectives while maintaining high standards of governance and efficiency.",
    order: 4,
  },
  {
    name: "James Liu",
    role: "Chief Investment Officer",
    description:
      "James leads investment strategy, deal sourcing, and portfolio management across Fashion, Technology, Import & Export, Governance, Marketing, and Real Estate. He combines rigorous due diligence with a long-term horizon to build a diversified, governance-led portfolio that creates sustainable value.",
    order: 5,
  },
  {
    name: "Anna Kowalski",
    role: "Chief Compliance Officer",
    description:
      "Anna ensures regulatory compliance, ethical conduct, and corporate governance standards across HKIG and its portfolio. She designs and monitors policies, training, and controls so that the group operates with integrity and meets the expectations of regulators, partners, and stakeholders.",
    order: 6,
  },
] as const;

const BOARD_MEMBERS = [
  { name: "Michael Reeves", role: "Independent Director" },
  { name: "Lisa Wong", role: "Independent Director" },
  { name: "Thomas Berg", role: "Non-Executive Director" },
] as const;

const GOVERNANCE_ITEMS = [
  {
    icon: Building2,
    title: "Board of Directors",
    description:
      "The board holds fiduciary responsibility for strategy, capital allocation, and oversight of management. It meets regularly to review performance, risk, and governance and to ensure decisions serve long-term stakeholder value.",
  },
  {
    icon: Shield,
    title: "Audit Committee",
    description:
      "The Audit Committee oversees financial reporting, internal controls, and the external audit process. It ensures accuracy, transparency, and compliance with accounting standards and regulatory requirements.",
  },
  {
    icon: Scale,
    title: "Risk Committee",
    description:
      "The Risk Committee identifies, assesses, and monitors financial, operational, and reputational risks. It advises the board on risk appetite, mitigation strategies, and resilience across the portfolio.",
  },
  {
    icon: Users,
    title: "Nomination Committee",
    description:
      "The Nomination Committee leads board composition, succession planning, and executive appointments. It ensures the board and senior leadership have the right skills, independence, and diversity to govern effectively.",
  },
] as const;

const getMilestones = (companyName: string) => [
  {
    year: "2026",
    title: "Company Founding",
    description:
      `${companyName} (HKIG Jsc) was founded in 2026 with a clear mission: to build a diversified, governance-led investment holding company that creates lasting value. From day one, our charter has been principled capital allocation, transparency, and a long-term horizon.`,
  },
  {
    year: "2027",
    title: "Governance Framework & First Deployments",
    description:
      "We established our governance framework, risk policies, and investment criteria and completed our inaugural deployments across selected pillars. This phase embedded our culture of due diligence, board oversight, and stakeholder alignment.",
  },
  {
    year: "2028",
    title: "Portfolio Build & Operational Scale",
    description:
      "The portfolio grew across Fashion, Technology, Import & Export, Governance, Marketing, and Real Estate. We strengthened operational support, reporting, and governance at portfolio companies and refined our approach to value creation.",
  },
  {
    year: "2029",
    title: "Growth, Innovation & Long-Term Impact",
    description:
      "We continue to scale our portfolio, deepen sector expertise, and extend our governance and reporting practices. Our focus remains on innovation, integrity, and long-term impact for the economies and communities we serve.",
  },
] as const;

function ExecutiveCard({
  name,
  role,
  description,
  imageUrl,
  imageAlt,
}: {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border-2 border-border bg-card shadow-sm transition-all duration-300 hover:border-gold/50 hover:shadow-xl hover:shadow-gold/10">
      <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-gradient-to-br from-navy/5 via-muted to-cream/20">
        {/* Image with professional styling */}
        <div className="relative h-full w-full">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover object-top transition-all duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Subtle vignette for depth */}
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_40%,rgba(0,0,0,0.15)_100%)] opacity-60"
            aria-hidden
          />
          {/* Warm gradient overlay - always visible but subtle */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 via-transparent to-transparent"
            aria-hidden
          />
          {/* Gold accent glow on hover */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-gold/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />
          {/* Professional frame effect */}
          <div
            className="absolute inset-0 border-2 border-transparent transition-colors duration-300 group-hover:border-gold/30"
            style={{
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)",
            }}
            aria-hidden
          />
        </div>

        {/* Name and role overlay - enhanced */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/95 via-navy/80 to-transparent p-6 pt-12">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="h-1 w-8 bg-gold rounded-full opacity-80"
              aria-hidden
            />
            <p className="font-serif text-xl font-semibold text-cream drop-shadow-lg">
              {name}
            </p>
          </div>
          <p className="text-sm font-medium text-gold/90 drop-shadow-md">
            {role}
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </article>
  );
}

export default function LeadershipPage() {
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
  const EXECUTIVE_TEAM = useMemo(() => getExecutiveTeam(companyName), [companyName]);
  const MILESTONES = useMemo(() => getMilestones(companyName), [companyName]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-[linear-gradient(180deg,var(--secondary)_0%,oklch(0.97_0.006_85)_100%)] py-20 sm:py-24 lg:py-28">
        <div
          className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2">
              <Users className="h-4 w-4 text-gold" aria-hidden />
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
                Our People
              </span>
            </div>
            <h1 className="font-serif text-4xl font-semibold leading-tight text-navy sm:text-5xl md:text-6xl">
              Leadership & Governance
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Our leadership team brings together experienced professionals with
              deep expertise in investment management, corporate governance, and
              operational excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Executive Team */}
      <section className="relative border-b border-border bg-card py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2">
              <Award className="h-4 w-4 text-gold" aria-hidden />
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
                Executive Team
              </span>
            </div>
            <h2 className="font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl">
              Senior Leadership
            </h2>
            <p className="mt-5 text-muted-foreground">
              Our executive team is responsible for implementing the strategic
              vision of the board and managing day-to-day operations.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {EXECUTIVE_TEAM.map((member) => (
              <ExecutiveCard
                key={member.role}
                name={member.name}
                role={member.role}
                description={member.description}
                imageUrl={getPortraitUrl(
                  getPortraitSeed(member.name, member.role),
                )}
                imageAlt={`Portrait of ${member.name}, ${member.role}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Board of Directors + Governance Structure */}
      <section className="relative border-b border-border bg-background py-20 sm:py-24 lg:py-28">
        <div
          className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/15 to-transparent"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            {/* Board of Directors */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2">
                <Building2 className="h-4 w-4 text-gold" aria-hidden />
                <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
                  Board of Directors
                </span>
              </div>
              <h2 className="font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl">
                Strategic Oversight
              </h2>
              <p className="mt-6 text-muted-foreground">
                Our Board of Directors provides independent, objective oversight
                and holds fiduciary responsibility for the company. The board
                ensures that strategy, capital allocation, and risk management
                are aligned with long-term, risk-adjusted value creation for all
                stakeholders. Independence and rigorous governance are at the
                core of how we govern.
              </p>
              <ul className="mt-8 space-y-4" role="list">
                {BOARD_MEMBERS.map((member) => (
                  <li key={member.name + member.role}>
                    <div className="group flex items-center gap-4 rounded-xl border-2 border-border bg-card p-5 shadow-sm transition-all duration-300 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5">
                      {/* Enhanced avatar with professional styling */}
                      <div className="relative shrink-0">
                        <div
                          className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/30 via-transparent to-gold/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          aria-hidden
                        />
                        <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-gold/20 bg-gradient-to-br from-cream/50 to-muted shadow-md transition-all duration-300 group-hover:border-gold/50 group-hover:shadow-lg group-hover:shadow-gold/20">
                          <Image
                            src={getPortraitUrl(
                              getPortraitSeed(member.name, member.role),
                            )}
                            alt={`Portrait of ${member.name}, ${member.role}`}
                            fill
                            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                            sizes="64px"
                          />
                          {/* Subtle inner glow */}
                          <div
                            className="absolute inset-0 rounded-full border border-white/20"
                            aria-hidden
                          />
                        </div>
                        {/* Trust indicator badge */}
                        <div
                          className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-card bg-gold/90 shadow-sm"
                          aria-label="Verified"
                        >
                          <Shield
                            className="h-2.5 w-2.5 text-navy"
                            aria-hidden
                          />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-navy transition-colors duration-300 group-hover:text-gold">
                          {member.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Governance Structure */}
            <div className="rounded-xl border-2 border-gold/30 bg-navy p-8 shadow-xl shadow-navy/20">
              <h3 className="font-serif text-2xl font-semibold text-cream">
                Governance Structure
              </h3>
              <div className="mt-6 space-y-6">
                {GOVERNANCE_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex items-start gap-4 border-b border-cream/10 pb-6 last:border-0 last:pb-0"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/20">
                        <Icon className="h-5 w-5 text-gold" aria-hidden />
                      </div>
                      <div>
                        <h4 className="font-semibold text-cream">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-sm text-cream/70">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governance Milestones */}
      <section className="relative overflow-hidden border-b border-border bg-secondary py-20 sm:py-24 lg:py-28">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,var(--gold)_0.03_,transparent_50%)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2">
              <Target className="h-4 w-4 text-gold" aria-hidden />
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
                Our Journey
              </span>
            </div>
            <h2 className="font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl">
              Governance Milestones
            </h2>
          </div>

          <div className="relative mx-auto mt-14 max-w-3xl">
            {/* Timeline line – gold gradient, centered with medallions */}
            <div
              className="absolute left-[3rem] top-0 bottom-0 w-px md:left-12"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(209,168,75,0.25) 10%, rgba(209,168,75,0.4) 50%, rgba(209,168,75,0.25) 90%, transparent 100%)",
              }}
              aria-hidden
            />
            {MILESTONES.map((milestone, index) => (
              <div
                key={milestone.title}
                className="group relative flex flex-col gap-6 pb-16 last:pb-0 md:flex-row md:items-start md:gap-8 md:pl-[7.5rem]"
              >
                {/* Number + Year medallion – premium, prominent */}
                <div
                  className="relative flex shrink-0 flex-col items-center justify-center md:absolute md:left-0 md:top-0 md:flex-row md:gap-0"
                  aria-hidden
                >
                  <div
                    className="flex flex-col items-center justify-center rounded-2xl border-2 border-gold/60 bg-gradient-to-br from-gold/15 via-cream/90 to-gold/10 px-6 py-4 shadow-lg shadow-gold/10 transition-all duration-300 group-hover:border-gold group-hover:shadow-xl group-hover:shadow-gold/15 md:h-24 md:w-24 md:rounded-2xl md:px-0 md:py-0"
                    style={{
                      boxShadow:
                        "0 4px 14px rgba(209,168,75,0.12), inset 0 1px 0 rgba(255,255,255,0.6)",
                    }}
                  >
                    <span className="font-serif text-3xl font-bold tabular-nums text-gold md:text-4xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-navy/80 md:mt-1 md:text-[10px]">
                      {milestone.year}
                    </span>
                  </div>
                </div>

                <div className="min-w-0 flex-1 rounded-xl border border-border bg-card/80 p-6 shadow-sm transition-all group-hover:border-gold/30 group-hover:shadow-md md:p-6">
                  <span className="text-xs font-medium uppercase tracking-wider text-gold">
                    {milestone.year}
                  </span>
                  <h3 className="mt-1 font-serif text-xl font-semibold text-navy sm:text-2xl">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
