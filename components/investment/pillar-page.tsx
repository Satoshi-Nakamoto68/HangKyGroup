import Link from "next/link";
import { ArrowRight, ArrowLeft, Download, LucideIcon } from "lucide-react";

interface InvestmentModel {
  title: string;
  description: string;
}

interface ValueCreation {
  title: string;
  description: string;
}

interface Opportunity {
  title: string;
  description: string;
  metrics: string[];
}

interface PillarPageProps {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  whatWeInvest: string[];
  investmentModels: InvestmentModel[];
  valueCreation: ValueCreation[];
  opportunities: Opportunity[];
  backHref?: string;
  /** Optional 2–4 highlight stats chips for hero (e.g. "Global brand building", "Omnichannel growth"). */
  heroStats?: string[];
}

export function PillarPage({
  title,
  subtitle,
  description,
  icon: Icon,
  whatWeInvest,
  investmentModels,
  valueCreation,
  opportunities,
  backHref = "/investment",
  heroStats,
}: PillarPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-[linear-gradient(180deg,var(--secondary)_0%,var(--background)_100%)] py-16 sm:py-20 lg:py-24">
        <div
          className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/15 to-transparent"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded mb-8"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to Investment Focus
          </Link>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="min-w-0 flex-1 max-w-3xl">
              <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-gold">
                {subtitle}
              </span>
              <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-navy sm:text-5xl lg:text-5xl">
                {title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
              {heroStats && heroStats.length > 0 && (
                <div
                  className="mt-8 flex flex-wrap gap-3"
                  role="list"
                  aria-label="Highlights"
                >
                  {heroStats.map((stat) => (
                    <span
                      key={stat}
                      className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-navy shadow-sm"
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex shrink-0 items-center justify-center lg:justify-end">
              <div
                className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-gold/30 bg-gold/10 shadow-inner sm:h-28 sm:w-28 lg:h-32 lg:w-32"
                aria-hidden
              >
                <Icon
                  className="h-12 w-12 text-gold sm:h-14 sm:w-14 lg:h-16 lg:w-16"
                  strokeWidth={1.25}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Invest In */}
      <section
        className="border-b border-border bg-card py-16 sm:py-20 lg:py-24"
        aria-labelledby="what-we-invest-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
                Focus Areas
              </span>
              <h2
                id="what-we-invest-heading"
                className="mt-2 font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl"
              >
                What We Invest In
              </h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2" role="list">
                {whatWeInvest.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold"
                      aria-hidden
                    />
                    <span className="text-sm leading-relaxed text-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border-2 border-border bg-secondary/50 p-6 sm:p-8">
              <h3 className="font-serif text-xl font-semibold text-navy">
                Investment Highlights
              </h3>
              <dl className="mt-6 grid grid-cols-2 gap-6" role="list">
                {[
                  { term: "Typical Size", value: "TBD" },
                  { term: "Holding Period", value: "3–7 years" },
                  { term: "Structure", value: "Flexible" },
                  { term: "Geography", value: "Global" },
                ].map((item) => (
                  <div key={item.term}>
                    <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {item.term}
                    </dt>
                    <dd className="mt-1 font-serif text-lg font-semibold text-navy">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Models */}
      <section
        className="border-b border-border bg-background py-16 sm:py-20 lg:py-24"
        aria-labelledby="investment-models-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              How We Invest
            </span>
            <h2
              id="investment-models-heading"
              className="mt-2 font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl"
            >
              Investment Models
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              We employ flexible investment structures tailored to each
              opportunity and partner.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {investmentModels.map((model, index) => (
              <article
                key={model.title}
                className="group flex flex-col rounded-xl border-2 border-border bg-card p-6 shadow-sm transition-all hover:border-gold/30 hover:shadow-md sm:p-8"
              >
                <span className="font-serif text-2xl font-bold tabular-nums text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-serif text-xl font-semibold text-navy">
                  {model.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {model.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Value Creation Playbook */}
      <section
        className="border-b border-border bg-navy py-16 sm:py-20 lg:py-24"
        aria-labelledby="value-creation-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Our Approach
            </span>
            <h2
              id="value-creation-heading"
              className="mt-2 font-serif text-3xl font-semibold leading-tight text-cream sm:text-4xl"
            >
              Value Creation Playbook
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-cream/80">
              We work closely with portfolio companies to implement strategies
              that drive sustainable growth.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valueCreation.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-cream/10 bg-cream/5 p-6 transition-colors hover:bg-cream/10 sm:p-8"
              >
                <h3 className="font-serif text-lg font-semibold text-cream">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Opportunities */}
      <section
        className="border-b border-border bg-secondary py-16 sm:py-20 lg:py-24"
        aria-labelledby="opportunities-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Opportunities
            </span>
            <h2
              id="opportunities-heading"
              className="mt-2 font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl"
            >
              Sample Opportunities
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Illustrative examples of the types of opportunities we seek in
              this sector.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((opp) => (
              <article
                key={opp.title}
                className="flex flex-col rounded-xl border-2 border-border bg-card p-6 shadow-sm transition-all hover:border-gold/30 hover:shadow-md sm:p-8"
              >
                <h3 className="font-serif text-xl font-semibold text-navy">
                  {opp.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {opp.description}
                </p>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs font-medium uppercase tracking-wider text-gold mb-3">
                    Target Metrics
                  </p>
                  <ul className="flex flex-wrap gap-2" role="list">
                    {opp.metrics.map((metric) => (
                      <li key={metric}>
                        <span className="inline-flex rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-navy">
                          {metric}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center text-sm italic text-muted-foreground">
            Examples are illustrative. Actual opportunities may vary.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section
        className="border-b border-border bg-card py-16 sm:py-20"
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            id="cta-heading"
            className="font-serif text-2xl font-semibold leading-tight text-navy sm:text-3xl"
          >
            Explore partnership opportunities
          </h2>
          <p className="mt-4 text-muted-foreground">
            We are interested in speaking with exceptional teams and reviewing
            compelling investment opportunities.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-navy px-6 py-3 text-sm font-semibold text-cream shadow-sm transition-colors hover:bg-navy-light focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              Contact Investment Team
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-md border-2 border-border bg-card px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-gold/40 hover:bg-gold/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              Download Overview
              <Download className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
