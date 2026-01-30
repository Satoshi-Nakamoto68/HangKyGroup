import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Target,
  TrendingUp,
  Lock,
  FileText,
} from "lucide-react";
import { AnimatedResultsSection } from "@/components/portfolio/animated-results-section";

export const metadata: Metadata = {
  title: "Portfolio Company | Hang Ky Investment Group",
  description: "View details about our portfolio company investment.",
};

type PortfolioLeader = {
  name: string;
  role: string;
  responsibility: string;
};

type PortfolioResult = {
  label: string;
  value: string;
  period: string;
  note: string;
  numericValue?: number;
  valueFormat?: "percent" | "rank";
};

type PortfolioEntry = {
  name: string;
  sector: string;
  status: string;
  confidential: boolean;
  overview: string;
  investmentThesis: string;
  strategy: string[];
  atGlance: { businessModel: string; stage: string; regionFocus: string };
  results: PortfolioResult[];
  leadership: PortfolioLeader[];
  highlightChips: [string, string, string];
};

const getPortraitSeed = (name: string, role: string): string => {
  return `${name}-${role}`.replace(/\s+/g, "-").toLowerCase();
};

const getPortraitUrl = (seed: string): string => {
  return `https://api.dicebear.com/7.x/initials/png?seed=${encodeURIComponent(
    seed,
  )}&size=112`;
};

const FALLBACK: PortfolioEntry = {
  name: "Portfolio Company",
  sector: "Various",
  status: "Active Investment",
  confidential: false,
  overview:
    "This portfolio company is part of our diversified investment approach. Detailed information is available to qualified counterparties under standard diligence and confidentiality protocols.",
  investmentThesis:
    "We allocate capital where we see durable competitive advantages, disciplined governance, and alignment with long-term risk-adjusted return objectives. Investments are evaluated against our framework for value creation and downside protection.",
  strategy: [
    "Strengthen governance and reporting discipline",
    "Support strategic initiatives that enhance operational leverage",
    "Maintain focus on capital efficiency and sustainable growth",
  ],
  atGlance: {
    businessModel: "Sector-specific; see diligence materials",
    stage: "Growth / Active",
    regionFocus: "Primary focus regions per strategy",
  },
  results: [
    {
      label: "Revenue Growth",
      value: "18%",
      period: "Year-over-Year",
      note: "Illustrative; operational leverage",
      numericValue: 18,
      valueFormat: "percent",
    },
    {
      label: "Customer Retention",
      value: "90%",
      period: "Net Retention",
      note: "Retention strength",
      numericValue: 90,
      valueFormat: "percent",
    },
    {
      label: "Market Position",
      value: "#3",
      period: "Regional Ranking",
      note: "Competitive positioning",
      numericValue: 3,
      valueFormat: "rank",
    },
  ],
  leadership: [
    {
      name: "Leadership",
      role: "Executive Team",
      responsibility: "Oversight of strategy and execution.",
    },
  ],
  highlightChips: ["Governance-led", "Value creation", "Long-term focus"],
};

const MOCK_PORTFOLIO: Record<string, PortfolioEntry> = {
  "1": {
    name: "Portfolio Company A",
    sector: "Technology",
    status: "Active",
    confidential: false,
    overview:
      "Enterprise software company providing cloud-based solutions for financial services. The business has established a strong product-market fit and is scaling across the region with a governance-led approach to growth.",
    investmentThesis:
      "We invested based on the company's defensible market position, recurring revenue profile, and management's commitment to governance and capital discipline. The opportunity aligns with our focus on technology-driven value creation and risk-adjusted returns.",
    strategy: [
      "Expand product offerings into adjacent segments with clear unit economics",
      "Accelerate geographic expansion across Southeast Asia with disciplined go-to-market",
      "Strengthen enterprise sales and partner ecosystem",
      "Invest in R&D to maintain technology leadership while preserving margins",
    ],
    atGlance: {
      businessModel: "SaaS / B2B enterprise software",
      stage: "Growth",
      regionFocus: "Southeast Asia",
    },
    results: [
      {
        label: "Revenue Growth",
        value: "28%",
        period: "Year-over-Year",
        note: "Operational leverage",
        numericValue: 28,
        valueFormat: "percent",
      },
      {
        label: "Customer Retention",
        value: "94%",
        period: "Net Retention",
        note: "Retention strength",
        numericValue: 94,
        valueFormat: "percent",
      },
      {
        label: "Market Position",
        value: "#2",
        period: "Regional Ranking",
        note: "Competitive positioning",
        numericValue: 2,
        valueFormat: "rank",
      },
    ],
    leadership: [
      {
        name: "James Chen",
        role: "Chief Executive Officer",
        responsibility:
          "Leads strategy, commercial execution, and stakeholder alignment.",
      },
      {
        name: "Sarah Park",
        role: "Chief Financial Officer",
        responsibility: "Oversees finance, reporting, and capital allocation.",
      },
      {
        name: "David Kim",
        role: "Chief Technology Officer",
        responsibility: "Leads product and engineering execution.",
      },
    ],
    highlightChips: ["Governance-led", "Value creation", "Long-term focus"],
  },
  "2": {
    name: "Portfolio Company B",
    sector: "Fashion",
    status: "Active",
    confidential: false,
    overview:
      "Premium lifestyle brand with growing e-commerce and international distribution. The company combines brand strength with operational discipline and a clear path to sustainable scale.",
    investmentThesis:
      "We were attracted by the brand's resonance, unit economics, and management's focus on long-term value over short-term volume. The investment fits our criteria for consumer businesses with governance and capital discipline.",
    strategy: [
      "Scale e-commerce and direct-to-consumer channels with measured investment",
      "Expand international distribution through selective partnerships",
      "Strengthen supply chain and sustainability practices",
      "Maintain premium positioning while improving operational efficiency",
    ],
    atGlance: {
      businessModel: "Premium brand / D2C and wholesale",
      stage: "Growth",
      regionFocus: "Asia-Pacific and selected international",
    },
    results: [
      {
        label: "Revenue Growth",
        value: "22%",
        period: "Year-over-Year",
        note: "Channel mix and margin",
        numericValue: 22,
        valueFormat: "percent",
      },
      {
        label: "Customer Retention",
        value: "88%",
        period: "Repeat rate",
        note: "Brand loyalty",
        numericValue: 88,
        valueFormat: "percent",
      },
      {
        label: "Market Position",
        value: "#3",
        period: "Category ranking",
        note: "Premium segment",
        numericValue: 3,
        valueFormat: "rank",
      },
    ],
    leadership: [
      {
        name: "Emily Wong",
        role: "Chief Executive Officer",
        responsibility: "Leads brand strategy and commercial execution.",
      },
      {
        name: "Michael Tan",
        role: "Chief Financial Officer",
        responsibility: "Oversees finance and operational metrics.",
      },
      {
        name: "Anna Lee",
        role: "Chief Operating Officer",
        responsibility: "Leads supply chain and operations.",
      },
    ],
    highlightChips: ["Governance-led", "Value creation", "Long-term focus"],
  },
  "3": {
    name: "Portfolio Company C",
    sector: "Real Estate",
    status: "Development",
    confidential: true,
    overview:
      "Mixed-use development project in a prime urban location with retail and residential components. Details are shared under NDA with qualified counterparties.",
    investmentThesis:
      "We allocate to projects that meet our return and risk criteria, with strong governance and execution oversight. This project aligns with our disciplined approach to real estate and development.",
    strategy: [
      "Execute development phases on schedule and within capital plan",
      "Secure pre-leasing and sales in line with underwriting",
      "Maintain governance and reporting discipline throughout build-out",
      "Optimize capital structure and exit path in line with fund terms",
    ],
    atGlance: {
      businessModel: "Mixed-use development / lease and sell",
      stage: "Development",
      regionFocus: "Prime urban, region TBD under NDA",
    },
    results: [
      {
        label: "Progress",
        value: "67%",
        period: "Construction / lease-up",
        note: "Execution vs. plan",
        numericValue: 67,
        valueFormat: "percent",
      },
      {
        label: "Pre-commitment",
        value: "42%",
        period: "Leased / pre-sold",
        note: "Demand validation",
        numericValue: 42,
        valueFormat: "percent",
      },
      {
        label: "Capital",
        value: "78%",
        period: "Deployed vs. budget",
        note: "Capital discipline",
        numericValue: 78,
        valueFormat: "percent",
      },
    ],
    leadership: [
      {
        name: "Robert Liu",
        role: "Managing Director",
        responsibility: "Leads project execution and stakeholder reporting.",
      },
      {
        name: "Jennifer Ho",
        role: "Finance Director",
        responsibility: "Oversees project finance and controls.",
      },
    ],
    highlightChips: ["Governance-led", "Value creation", "Long-term focus"],
  },
  "4": {
    name: "Portfolio Company D",
    sector: "Import & Export",
    status: "Active",
    confidential: false,
    overview:
      "Trade facilitation company specializing in quality consumer goods across Asian markets. The business benefits from established relationships and a focus on governance and operational excellence.",
    investmentThesis:
      "We invested in the company's strong positioning in trade flows, management's operational discipline, and the opportunity to support value creation through better systems and capital allocation.",
    strategy: [
      "Expand product and geography coverage with disciplined capital",
      "Strengthen logistics and quality controls",
      "Improve working capital and treasury management",
      "Build governance and reporting to institutional standards",
    ],
    atGlance: {
      businessModel: "B2B trade / consumer goods",
      stage: "Growth",
      regionFocus: "Asia-focused trade corridors",
    },
    results: [
      {
        label: "Revenue Growth",
        value: "19%",
        period: "Year-over-Year",
        note: "Volume and mix",
        numericValue: 19,
        valueFormat: "percent",
      },
      {
        label: "Retention",
        value: "91%",
        period: "Key accounts",
        note: "Relationship strength",
        numericValue: 91,
        valueFormat: "percent",
      },
      {
        label: "Position",
        value: "#4",
        period: "Segment ranking",
        note: "Competitive position",
        numericValue: 4,
        valueFormat: "rank",
      },
    ],
    leadership: [
      {
        name: "Thomas Nguyen",
        role: "Chief Executive Officer",
        responsibility: "Leads commercial strategy and partnerships.",
      },
      {
        name: "Lisa Tran",
        role: "Chief Financial Officer",
        responsibility: "Oversees finance and compliance.",
      },
    ],
    highlightChips: ["Governance-led", "Value creation", "Long-term focus"],
  },
  "5": {
    name: "Portfolio Company E",
    sector: "Marketing",
    status: "Active",
    confidential: true,
    overview:
      "Digital marketing agency with expertise in performance marketing and brand development. Further information is available to qualified parties under NDA.",
    investmentThesis:
      "We back businesses that combine sector expertise with governance and scalability. This investment supports our focus on services businesses with clear value creation levers and disciplined management.",
    strategy: [
      "Scale performance and brand offerings with clear economics",
      "Invest in technology and data capabilities",
      "Retain and develop talent; strengthen governance",
      "Pursue selective M&A where it enhances capability and returns",
    ],
    atGlance: {
      businessModel: "Agency / performance and brand",
      stage: "Growth",
      regionFocus: "Regional and key markets",
    },
    results: [
      {
        label: "Revenue Growth",
        value: "34%",
        period: "Year-over-Year",
        note: "Client and service mix",
        numericValue: 34,
        valueFormat: "percent",
      },
      {
        label: "Retention",
        value: "89%",
        period: "Client retention",
        note: "Relationship depth",
        numericValue: 89,
        valueFormat: "percent",
      },
      {
        label: "Position",
        value: "#5",
        period: "Segment",
        note: "Market position",
        numericValue: 5,
        valueFormat: "rank",
      },
    ],
    leadership: [
      {
        name: "Alex Morgan",
        role: "Chief Executive Officer",
        responsibility: "Leads strategy and client delivery.",
      },
      {
        name: "Chris Evans",
        role: "Chief Financial Officer",
        responsibility: "Oversees finance and operations.",
      },
    ],
    highlightChips: ["Governance-led", "Value creation", "Long-term focus"],
  },
  "6": {
    name: "Portfolio Company F",
    sector: "Governance",
    status: "Active",
    confidential: false,
    overview:
      "Management consulting firm specializing in corporate governance and organizational development. The firm serves institutional clients with a focus on long-term value and risk management.",
    investmentThesis:
      "We invested in the firm's expertise, client relationships, and alignment with our own emphasis on governance. The opportunity supports our thesis on the value of governance and advisory services in institutional markets.",
    strategy: [
      "Expand service offerings in governance and risk advisory",
      "Deepen client relationships and cross-sell where appropriate",
      "Invest in talent and methodologies",
      "Maintain high standards of independence and disclosure",
    ],
    atGlance: {
      businessModel: "Consulting / governance and advisory",
      stage: "Growth",
      regionFocus: "Regional institutional clients",
    },
    results: [
      {
        label: "Revenue Growth",
        value: "18%",
        period: "Year-over-Year",
        note: "Client and mandate mix",
        numericValue: 18,
        valueFormat: "percent",
      },
      {
        label: "Retention",
        value: "96%",
        period: "Client retention",
        note: "Relationship strength",
        numericValue: 96,
        valueFormat: "percent",
      },
      {
        label: "Position",
        value: "#1",
        period: "Advisory ranking",
        note: "Governance segment",
        numericValue: 1,
        valueFormat: "rank",
      },
    ],
    leadership: [
      {
        name: "Helen Zhang",
        role: "Managing Partner",
        responsibility: "Leads firm strategy and client engagement.",
      },
      {
        name: "Daniel Wu",
        role: "Chief Operating Officer",
        responsibility: "Oversees delivery and operations.",
      },
    ],
    highlightChips: ["Governance-led", "Value creation", "Long-term focus"],
  },
  default: FALLBACK,
};

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const portfolioData = MOCK_PORTFOLIO[id] ?? FALLBACK;
  const isUnknownId = !MOCK_PORTFOLIO[id];

  return (
    <>
      {/* Hero */}
      <section
        className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
        aria-labelledby="portfolio-hero-heading"
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(165deg,var(--cream)_0%,color-mix(in_oklab,var(--gold)_8%,var(--cream))_50%,var(--cream)_100%)]"
          aria-hidden
        />
        <div
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold/40 via-gold/20 to-transparent"
          aria-hidden
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-navy/80 hover:text-navy font-medium text-sm mb-8 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded py-1 pr-1 border-b border-transparent hover:border-navy/40"
            aria-label="Back to Portfolio list"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden />
            Back to Portfolio
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-12">
            <div className="min-w-0 flex-1 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-4">
                Portfolio Company
              </p>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1.5 bg-navy/10 text-navy text-sm font-medium rounded-lg border border-navy/10">
                  {portfolioData.sector}
                </span>
                <span className="px-3 py-1.5 bg-gold/10 text-gold text-sm font-medium rounded-lg border border-gold/20">
                  {portfolioData.status}
                </span>
                {portfolioData.confidential ? (
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted text-muted-foreground text-sm font-medium rounded-lg border border-border"
                    aria-label="Confidential; NDA required"
                  >
                    <Lock className="w-3.5 h-3.5 shrink-0" aria-hidden />
                    NDA Required
                  </span>
                ) : null}
              </div>
              <h1
                id="portfolio-hero-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy mb-6 leading-tight"
              >
                {portfolioData.name}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {portfolioData.overview}
              </p>
              {isUnknownId && (
                <p className="mt-4 text-sm text-muted-foreground">
                  This page shows placeholder content. Use the link above to
                  return to the full portfolio list.
                </p>
              )}
            </div>

            <aside
              className="lg:w-80 shrink-0 lg:mt-0 rounded-xl border-2 border-border bg-card/80 p-6 shadow-sm"
              aria-label="Summary"
            >
              <h2 className="sr-only">At a glance</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Sector
                  </dt>
                  <dd className="mt-1 text-navy font-medium">
                    {portfolioData.sector}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </dt>
                  <dd className="mt-1 text-navy font-medium">
                    {portfolioData.status}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Confidentiality
                  </dt>
                  <dd className="mt-1">
                    {portfolioData.confidential ? (
                      <span className="inline-flex items-center gap-1.5 text-muted-foreground font-medium">
                        <Lock className="w-3.5 h-3.5" aria-hidden />
                        NDA Required
                      </span>
                    ) : (
                      <span className="text-navy font-medium">
                        Summary-level disclosure
                      </span>
                    )}
                  </dd>
                </div>
              </dl>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Highlights
                </p>
                <ul className="flex flex-wrap gap-2" role="list">
                  {portfolioData.highlightChips.map((chip) => (
                    <li key={chip}>
                      <span className="inline-block px-3 py-1.5 rounded-lg bg-gold/10 text-gold text-sm font-medium border border-gold/20">
                        {chip}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Investment Thesis & Strategy */}
      <section
        className="py-16 sm:py-20 bg-card border-y border-border"
        aria-labelledby="thesis-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="p-2 bg-navy/5 rounded-lg border border-navy/10"
                  aria-hidden
                >
                  <Target className="w-5 h-5 text-navy" />
                </div>
                <span className="text-gold font-medium text-sm uppercase tracking-wider">
                  Investment Thesis
                </span>
              </div>
              <h2
                id="thesis-heading"
                className="font-serif text-2xl text-navy mb-4"
              >
                Why We Invested
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {portfolioData.investmentThesis}
              </p>
              <div className="rounded-xl border-2 border-border bg-background/60 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  At a glance
                </p>
                <ul className="space-y-2 text-sm text-navy" role="list">
                  <li className="flex gap-2">
                    <span className="text-gold font-medium shrink-0">
                      Business model:
                    </span>
                    <span className="text-muted-foreground">
                      {portfolioData.atGlance.businessModel}
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gold font-medium shrink-0">
                      Stage:
                    </span>
                    <span className="text-muted-foreground">
                      {portfolioData.atGlance.stage}
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gold font-medium shrink-0">
                      Region focus:
                    </span>
                    <span className="text-muted-foreground">
                      {portfolioData.atGlance.regionFocus}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="p-2 bg-navy/5 rounded-lg border border-navy/10"
                  aria-hidden
                >
                  <TrendingUp className="w-5 h-5 text-navy" />
                </div>
                <span className="text-gold font-medium text-sm uppercase tracking-wider">
                  Value Creation
                </span>
              </div>
              <h2
                id="strategy-heading"
                className="font-serif text-2xl text-navy mb-4"
              >
                Our Strategy
              </h2>
              <div className="space-y-4" role="list">
                {portfolioData.strategy.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-4 rounded-xl border-2 border-border bg-background/60 p-4 transition-colors hover:border-gold/30 focus-within:border-gold/40 focus-within:ring-2 focus-within:ring-gold/20"
                    role="listitem"
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold font-serif text-sm font-bold border border-gold/30"
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    <span className="text-foreground pt-0.5">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatedResultsSection results={portfolioData.results} />

      {/* Leadership */}
      <section
        className="py-20 sm:py-24 bg-card"
        aria-labelledby="leadership-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div
              className="p-2 bg-navy/5 rounded-lg border border-navy/10"
              aria-hidden
            >
              <Users className="w-5 h-5 text-navy" />
            </div>
            <span className="text-gold font-medium text-sm uppercase tracking-wider">
              Company Leadership
            </span>
          </div>
          <h2
            id="leadership-heading"
            className="font-serif text-2xl text-navy mb-8"
          >
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData.leadership.map((leader) => {
              const seed = getPortraitSeed(leader.name, leader.role);
              const avatarUrl = getPortraitUrl(seed);
              return (
                <article
                  key={`${leader.name}-${leader.role}`}
                  className="rounded-xl border-2 border-border bg-background p-6 transition-all hover:border-gold/30 hover:shadow-md focus-within:border-gold/40 focus-within:ring-2 focus-within:ring-gold/20 focus-within:ring-offset-2"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-gold/30 bg-navy/5">
                      <Image
                        src={avatarUrl}
                        alt=""
                        width={56}
                        height={56}
                        className="object-cover h-full w-full"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-navy">{leader.name}</h3>
                      <p className="text-sm text-gold font-medium mt-0.5">
                        {leader.role}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {leader.responsibility}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 sm:py-20 bg-cream border-t border-border"
        aria-labelledby="cta-heading"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            id="cta-heading"
            className="font-serif text-2xl sm:text-3xl text-navy mb-4"
          >
            Interested in Learning More?
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            For verified information and diligence materials, contact us via
            official channels. We respond to qualified inquiries with
            appropriate confidentiality and governance discipline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-cream font-semibold rounded-xl hover:bg-navy/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              aria-label="Contact Investment Team"
            >
              Contact Investment Team
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden />
            </Link>
            <Link
              href="/contact?subject=NDA"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-navy/20 text-navy font-semibold rounded-xl hover:bg-navy/5 hover:border-navy/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              aria-label="Request NDA Overview"
            >
              <FileText className="w-4 h-4 shrink-0" aria-hidden />
              Request NDA Overview
            </Link>
          </div>
          <p className="text-muted-foreground text-xs mt-6">
            Responses typically within 1–2 business days.
          </p>
        </div>
      </section>
    </>
  );
}
