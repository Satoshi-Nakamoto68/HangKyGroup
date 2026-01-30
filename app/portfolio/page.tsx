"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Shirt,
  Cpu,
  Ship,
  Building2,
  TrendingUp,
  Home,
  ArrowRight,
  Lock,
  Filter,
  Search,
  RotateCcw,
  Mail,
  FileText,
} from "lucide-react";
import { getCompanyName } from "@/lib/company-name";

function normalizeText(s: string): string {
  return s.toLowerCase().trim().replace(/\s+/g, " ");
}

const sectorIds = [
  "all",
  "fashion",
  "technology",
  "import-export",
  "governance",
  "marketing",
  "real-estate",
] as const;

const translations = {
  en: {
    sectors: {
      all: "All Sectors",
      fashion: "Fashion",
      technology: "Technology",
      "import-export": "Import & Export",
      governance: "Governance",
      marketing: "Marketing",
      "real-estate": "Real Estate",
    },
    searchLabel: "Search",
    searchPlaceholder: "Search by company name, sector, or metrics...",
    searchAriaLabel: "Search portfolio by name, description, or metrics",
    resultsLabel: "Results",
    showing: "Showing",
    investment: "investment",
    investments: "investments",
    resetFilters: "Reset filters",
    resetFiltersLabel: "Reset filters and search",
    filterBySector: "Filter by sector",
  },
  vi: {
    sectors: {
      all: "Tất cả lĩnh vực",
      fashion: "Thời trang",
      technology: "Công nghệ",
      "import-export": "Xuất nhập khẩu",
      governance: "Quản trị",
      marketing: "Marketing",
      "real-estate": "Bất động sản",
    },
    searchLabel: "Tìm kiếm",
    searchPlaceholder: "Tìm kiếm theo tên công ty, lĩnh vực hoặc chỉ số...",
    searchAriaLabel: "Tìm kiếm danh mục đầu tư theo tên, mô tả hoặc chỉ số",
    resultsLabel: "Kết quả",
    showing: "Hiển thị",
    investment: "đầu tư",
    investments: "đầu tư",
    resetFilters: "Đặt lại bộ lọc",
    resetFiltersLabel: "Đặt lại bộ lọc và tìm kiếm",
    filterBySector: "Lọc theo lĩnh vực",
  },
  ja: {
    sectors: {
      all: "すべての分野",
      fashion: "ファッション",
      technology: "テクノロジー",
      "import-export": "輸出入",
      governance: "ガバナンス",
      marketing: "マーケティング",
      "real-estate": "不動産",
    },
    searchLabel: "検索",
    searchPlaceholder: "会社名、分野、または指標で検索...",
    searchAriaLabel: "名前、説明、または指標でポートフォリオを検索",
    resultsLabel: "結果",
    showing: "表示中",
    investment: "投資",
    investments: "投資",
    resetFilters: "フィルターをリセット",
    resetFiltersLabel: "フィルターと検索をリセット",
    filterBySector: "分野でフィルタリング",
  },
} as const;

type Lang = keyof typeof translations;

function getLangFromDocument(): Lang {
  if (typeof document === "undefined") return "en";
  const lang = document.documentElement.getAttribute("lang") || "";
  const normalized = lang.toLowerCase().slice(0, 2);
  if (normalized === "vi") return "vi";
  if (normalized === "ja") return "ja";
  return "en";
}

const sectorIcons: Record<string, typeof Filter> = {
  all: Filter,
  fashion: Shirt,
  technology: Cpu,
  "import-export": Ship,
  governance: Building2,
  marketing: TrendingUp,
  "real-estate": Home,
};

const portfolioItems = [
  {
    id: "1",
    name: "Portfolio Company A",
    sector: "technology",
    description:
      "Enterprise software company providing cloud-based solutions for financial services.",
    status: "Active",
    confidential: false,
    metrics: ["SaaS Platform", "B2B Focus", "Regional Leader"],
  },
  {
    id: "2",
    name: "Portfolio Company B",
    sector: "fashion",
    description:
      "Premium lifestyle brand with growing e-commerce presence and international distribution.",
    status: "Active",
    confidential: false,
    metrics: ["Premium Brand", "E-commerce", "International"],
  },
  {
    id: "3",
    name: "Portfolio Company C",
    sector: "real-estate",
    description:
      "Mixed-use development project in prime urban location with retail and residential components.",
    status: "Development",
    confidential: true,
    metrics: ["Mixed-use", "Prime Location", "Under Development"],
  },
  {
    id: "4",
    name: "Portfolio Company D",
    sector: "import-export",
    description:
      "Trade facilitation company specializing in quality consumer goods across Asian markets.",
    status: "Active",
    confidential: false,
    metrics: ["Trade", "Asia Focus", "Consumer Goods"],
  },
  {
    id: "5",
    name: "Portfolio Company E",
    sector: "marketing",
    description:
      "Digital marketing agency with expertise in performance marketing and brand development.",
    status: "Active",
    confidential: true,
    metrics: ["Digital Marketing", "Performance", "Brand"],
  },
  {
    id: "6",
    name: "Portfolio Company F",
    sector: "governance",
    description:
      "Management consulting firm specializing in corporate governance and organizational development.",
    status: "Active",
    confidential: false,
    metrics: ["Consulting", "Governance", "Advisory"],
  },
];

export default function PortfolioPage() {
  const [selectedSector, setSelectedSector] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [lang, setLang] = useState<Lang>(() => {
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

  const t = useMemo(() => translations[lang], [lang]);
  const sectors = useMemo(
    () =>
      sectorIds.map((id) => ({
        id,
        label: t.sectors[id],
        icon: sectorIcons[id] ?? Filter,
      })),
    [t],
  );

  const filteredItems = useMemo(() => {
    const bySector =
      selectedSector === "all"
        ? portfolioItems
        : portfolioItems.filter((item) => item.sector === selectedSector);
    if (!searchQuery.trim()) return bySector;
    const q = normalizeText(searchQuery);
    return bySector.filter((item) => {
      const name = normalizeText(item.name);
      const desc = normalizeText(item.description);
      const metricsStr = item.metrics.map(normalizeText).join(" ");
      return name.includes(q) || desc.includes(q) || metricsStr.includes(q);
    });
  }, [selectedSector, searchQuery]);

  const hasActiveFilters =
    selectedSector !== "all" || searchQuery.trim() !== "";
  const currentSectorLabel =
    sectors.find((s) => s.id === selectedSector)?.label ?? t.sectors.all;

  const handleReset = () => {
    setSelectedSector("all");
    setSearchQuery("");
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-[linear-gradient(180deg,var(--secondary)_0%,var(--background)_100%)] py-20 sm:py-24 lg:py-28">
        <div
          className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent"
          aria-hidden
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gold/[0.04] to-transparent pointer-events-none"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Our Investments
            </span>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-navy sm:text-5xl md:text-6xl">
              Portfolio
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Our portfolio reflects disciplined, governance-led investments
              across six strategic pillars. We focus on long-term value
              creation, risk-adjusted returns, and active support for portfolio
              companies. Disclosure is limited to public or permitted
              information; certain holdings remain confidential under NDA.
            </p>
            <div
              className="mt-8 flex flex-wrap gap-3"
              role="list"
              aria-label="Portfolio principles"
            >
              {[
                "Long-term value",
                "Risk discipline",
                "Governance-led",
                "Active support",
              ].map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-navy shadow-sm"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter + Search (Sticky) – Premium toolbar – notranslate prevents gtranslate from mutating DOM */}
      <section
        className="notranslate sticky top-20 z-40 border-b border-border bg-card/98 py-6 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-card/95 sm:py-8"
        aria-label="Filter and search portfolio"
      >
        <div
          className="absolute inset-0 border-t border-gold/10 pointer-events-none"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Row 1: Search + Results + Reset – cùng hàng, cùng chiều cao */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
            <label className="relative flex flex-1 flex-col min-w-0">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t.searchLabel}
              </span>
              <span className="sr-only">{t.searchAriaLabel}</span>
              <div className="relative flex h-12 items-center sm:h-[3.5rem]">
                <Search
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  aria-hidden
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="h-full w-full rounded-xl border-2 border-border bg-background py-0 pl-12 pr-4 text-base text-navy placeholder:text-muted-foreground transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 focus:ring-offset-2"
                  aria-label={t.searchAriaLabel}
                />
              </div>
            </label>
            <div className="flex shrink-0 flex-col min-w-0">
              <span
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-transparent"
                aria-hidden
              >
                Results
              </span>
              <div className="flex items-center gap-3">
                <div className="flex h-12 items-center gap-2 rounded-xl border-2 border-border bg-secondary/80 px-4 sm:h-[3.5rem]">
                  <span className="text-sm font-medium text-muted-foreground">
                    {t.showing}
                  </span>
                  <span className="font-serif text-xl font-semibold tabular-nums text-navy">
                    {filteredItems.length}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {filteredItems.length !== 1 ? t.investments : t.investment}
                  </span>
                  {selectedSector !== "all" && (
                    <span className="hidden text-sm text-muted-foreground sm:inline">
                      · {currentSectorLabel}
                    </span>
                  )}
                </div>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="cursor-pointer inline-flex h-12 shrink-0 items-center gap-2 rounded-xl border-2 border-navy/20 bg-navy/5 px-4 text-sm font-semibold text-navy transition-colors hover:border-gold/40 hover:bg-gold/10 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 sm:h-[3.5rem]"
                    aria-label={t.resetFiltersLabel}
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden />
                    {t.resetFilters}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Row 2: Filter by sector */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t.filterBySector}
            </p>
            <div
              className="flex gap-3 overflow-x-auto pb-2 sm:pb-0"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0, black 20px, black calc(100% - 20px), transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0, black 20px, black calc(100% - 20px), transparent 100%)",
              }}
            >
              {sectors.map((sector) => {
                const Icon = sector.icon;
                const isSelected = selectedSector === sector.id;
                return (
                  <button
                    key={sector.id}
                    type="button"
                    onClick={() => setSelectedSector(sector.id)}
                    aria-pressed={isSelected}
                    className={`cursor-pointer flex shrink-0 items-center gap-3 rounded-xl border-2 px-5 py-3.5 text-sm font-semibold whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 ${
                      isSelected
                        ? "border-gold bg-navy text-cream shadow-md"
                        : "border-border bg-card text-muted-foreground hover:border-gold/30 hover:bg-gold/5 hover:text-navy"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 shrink-0 ${
                        isSelected ? "text-gold" : "text-muted-foreground"
                      }`}
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    {sector.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section
        className="py-16 sm:py-20 lg:py-24 bg-background"
        aria-labelledby="portfolio-grid-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="portfolio-grid-heading" className="sr-only">
            Portfolio companies
          </h2>

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => {
                const SectorIcon =
                  sectors.find((s) => s.id === item.sector)?.icon ?? Building2;
                return (
                  <Link
                    key={item.id}
                    href={`/portfolio/${item.id}`}
                    className="cursor-pointer group block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-xl"
                  >
                    <article className="flex h-full flex-col rounded-xl border-2 border-border bg-card p-6 shadow-sm transition-all duration-200 hover:border-gold/40 hover:shadow-lg focus:outline-none">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-navy transition-colors group-hover:bg-gold/10 group-hover:text-gold">
                            <SectorIcon
                              className="h-5 w-5"
                              strokeWidth={1.5}
                              aria-hidden
                            />
                          </div>
                          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            {sectors.find((s) => s.id === item.sector)?.label ??
                              item.sector}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.confidential && (
                            <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/80 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                              <Lock className="h-3.5 w-3.5" aria-hidden />
                              NDA
                            </span>
                          )}
                          <span className="rounded-md bg-gold/10 px-2.5 py-1 text-xs font-semibold text-gold">
                            {item.status}
                          </span>
                        </div>
                      </div>
                      <h3 className="mt-4 font-serif text-xl font-semibold text-navy transition-colors group-hover:text-gold">
                        {item.name}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.metrics.map((metric) => (
                          <span
                            key={metric}
                            className="rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                      {item.confidential && (
                        <p className="mt-3 text-xs text-muted-foreground italic">
                          Details available under NDA.
                        </p>
                      )}
                      <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-gold transition-colors group-hover:gap-2">
                        {item.confidential ? "Request access" : "View details"}
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card/50 py-16 px-6 text-center">
              <h3 className="font-serif text-xl font-semibold text-navy">
                No matches
              </h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                No portfolio companies match the current filters or search. Try
                a different sector or clear the search to see all investments.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="cursor-pointer mt-6 inline-flex items-center gap-2 rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-navy-light focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
                {t.resetFilters}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA + Disclaimer */}
      <section
        className="border-t border-border bg-secondary py-16 sm:py-20"
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            id="cta-heading"
            className="font-serif text-2xl font-semibold text-navy sm:text-3xl"
          >
            Explore partnership opportunities
          </h2>
          <p className="mt-4 text-muted-foreground">
            For verified portfolio information or to discuss investment
            opportunities, contact our team through official channels.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="cursor-pointer inline-flex items-center gap-2 rounded-md bg-navy px-6 py-3 text-sm font-semibold text-cream shadow-sm transition-colors hover:bg-navy-light focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Contact Investment Team
            </Link>
            <Link
              href="#"
              className="cursor-pointer inline-flex items-center gap-2 rounded-md border-2 border-border bg-card px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-gold/40 hover:bg-gold/5 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            >
              <FileText className="h-4 w-4" aria-hidden />
              Request Portfolio Overview
            </Link>
          </div>
          <div className="mt-12 pt-12 border-t border-border">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Portfolio information on this site is for illustrative and
              informational purposes only. Actual holdings, performance, and
              terms may be subject to confidentiality and verification
              requirements. No offer or solicitation is made. For authoritative
              information, contact {getCompanyName(lang)} through official
              channels and comply with applicable disclosure and NDA terms.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
