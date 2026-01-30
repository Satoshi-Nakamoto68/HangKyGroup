import { Metadata } from "next";
import Link from "next/link";
import {
  Shirt,
  Cpu,
  Ship,
  Building2,
  TrendingUp,
  Home,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Investment Focus | Eternal Order Investment Group",
  description:
    "Explore our six investment pillars: Fashion, Technology, Import & Export, Governance, Marketing, and Real Estate.",
};

const investmentPillars = [
  {
    title: "Fashion Investments",
    description:
      "Strategic investments in apparel, luxury goods, and lifestyle brands with global growth potential. We partner with fashion companies that demonstrate strong brand equity and sustainable business models.",
    icon: Shirt,
    href: "/investment/fashion",
    highlights: [
      "Luxury & premium brands",
      "Sustainable fashion",
      "E-commerce platforms",
    ],
  },
  {
    title: "Technology Investments",
    description:
      "Backing innovative technology companies driving digital transformation across industries. Our focus includes enterprise software, fintech, and emerging technologies.",
    icon: Cpu,
    href: "/investment/technology",
    highlights: ["Enterprise software", "Fintech solutions", "AI & automation"],
  },
  {
    title: "Import & Export",
    description:
      "Facilitating international trade with a focus on quality goods and reliable logistics. We invest in companies that bridge global markets efficiently.",
    icon: Ship,
    href: "/investment/import-export",
    highlights: [
      "Trade facilitation",
      "Logistics & supply chain",
      "Cross-border commerce",
    ],
  },
  {
    title: "Governance & Management",
    description:
      "Advisory and investment in management consulting, corporate governance, and organizational development services.",
    icon: Building2,
    href: "/investment/governance",
    highlights: [
      "Management consulting",
      "Corporate restructuring",
      "Board advisory",
    ],
  },
  {
    title: "Marketing & Growth",
    description:
      "Investing in agencies and platforms that drive brand growth and market expansion through innovative marketing strategies.",
    icon: TrendingUp,
    href: "/investment/marketing",
    highlights: ["Digital marketing", "Brand development", "Growth agencies"],
  },
  {
    title: "Real Estate",
    description:
      "Strategic property investments in commercial, residential, and mixed-use developments across key markets.",
    icon: Home,
    href: "/investment/real-estate",
    highlights: [
      "Commercial properties",
      "Residential development",
      "Mixed-use projects",
    ],
  },
];

export default function InvestmentPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-gold font-medium text-sm uppercase tracking-wider">
              Investment Focus
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-navy mt-4 mb-6 text-balance">
              Six Pillars of Strategic Investment
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our diversified investment approach spans six key sectors, each
              selected for its growth potential and alignment with our values of
              governance and transparency. We seek opportunities where we can
              create lasting value through active partnership.
            </p>
          </div>
        </div>
      </section>

      {/* Investment Approach */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                label: "Investment Models",
                items: [
                  "Minority stakes",
                  "Majority control",
                  "Strategic partnerships",
                ],
              },
              {
                label: "Value Creation",
                items: [
                  "Governance enhancement",
                  "Operational improvement",
                  "Market expansion",
                ],
              },
              {
                label: "Investment Criteria",
                items: [
                  "Strong management",
                  "Clear growth path",
                  "Ethical operations",
                ],
              },
            ].map((column) => (
              <div key={column.label}>
                <h3 className="text-gold font-medium text-sm uppercase tracking-wider mb-4">
                  {column.label}
                </h3>
                <ul className="space-y-2">
                  {column.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-navy rounded-full" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Pillars */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8">
            {investmentPillars.map((pillar, index) => (
              <Link
                key={pillar.title}
                href={pillar.href}
                className="group block"
              >
                <div className="p-8 md:p-12 bg-card border border-border rounded-lg hover:border-gold/30 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start gap-8">
                    <div className="shrink-0">
                      <div className="w-16 h-16 bg-navy/5 rounded-lg flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                        <pillar.icon className="w-8 h-8 text-navy group-hover:text-gold transition-colors duration-300" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="text-gold text-sm font-medium">
                            0{index + 1}
                          </span>
                          <h2 className="font-serif text-2xl md:text-3xl text-navy group-hover:text-gold transition-colors duration-300">
                            {pillar.title}
                          </h2>
                        </div>
                        <ArrowRight className="w-6 h-6 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {pillar.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {pillar.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="px-3 py-1 bg-navy/5 text-navy text-sm rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl text-cream mb-4">
            Have an Investment Opportunity?
          </h2>
          <p className="text-cream/70 mb-8">
            We are always looking for exceptional businesses and investment
            opportunities that align with our values and strategic focus.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-medium rounded hover:bg-gold-light transition-colors duration-300"
          >
            Submit a Proposal
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
