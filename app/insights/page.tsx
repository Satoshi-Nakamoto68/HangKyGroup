"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Search,
  RotateCcw,
  Mail,
  ChevronDown,
} from "lucide-react";

const normalizeText = (s: string): string =>
  s.toLowerCase().trim().replace(/\s+/g, " ");

const MONTHS: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};

const parseDateString = (dateStr: string): { year: number; month: number } => {
  const parts = dateStr.trim().split(/\s+/);
  if (parts.length < 2) return { year: 0, month: 0 };
  const monthName = parts[0].toLowerCase();
  const year = parseInt(parts[1], 10) || 0;
  const month = MONTHS[monthName] ?? 0;
  return { year, month };
};

const compareDates = (a: string, b: string): number => {
  const da = parseDateString(a);
  const db = parseDateString(b);
  if (da.year !== db.year) return db.year - da.year;
  return db.month - da.month;
};

const categoryIds = [
  "all",
  "Market Updates",
  "Governance",
  "Growth Strategy",
  "Investment Philosophy",
] as const;

const translations = {
  en: {
    categories: {
      all: "All",
      "Market Updates": "Market Updates",
      Governance: "Governance",
      "Growth Strategy": "Growth Strategy",
      "Investment Philosophy": "Investment Philosophy",
    },
    searchPlaceholder: "Search by title, excerpt, or category...",
    searchLabel: "Search insights",
    sortLabel: "Sort by",
    sortLatest: "Latest",
    sortFeaturedFirst: "Featured first",
    reset: "Reset",
    resetLabel: "Reset filters and search",
    showing: "Showing",
    insights: "insight",
    insightsPlural: "insights",
    helperText: "Select an inquiry type to route your message.",
  },
  vi: {
    categories: {
      all: "Tất cả",
      "Market Updates": "Cập nhật thị trường",
      Governance: "Quản trị",
      "Growth Strategy": "Chiến lược tăng trưởng",
      "Investment Philosophy": "Triết lý đầu tư",
    },
    searchPlaceholder: "Tìm kiếm theo tiêu đề, mô tả hoặc danh mục...",
    searchLabel: "Tìm kiếm góc nhìn",
    sortLabel: "Sắp xếp theo",
    sortLatest: "Mới nhất",
    sortFeaturedFirst: "Nổi bật trước",
    reset: "Đặt lại",
    resetLabel: "Đặt lại bộ lọc và tìm kiếm",
    showing: "Hiển thị",
    insights: "góc nhìn",
    insightsPlural: "góc nhìn",
    helperText: "Chọn danh mục để lọc bài viết.",
  },
  ja: {
    categories: {
      all: "すべて",
      "Market Updates": "市場アップデート",
      Governance: "ガバナンス",
      "Growth Strategy": "成長戦略",
      "Investment Philosophy": "投資哲学",
    },
    searchPlaceholder: "タイトル、抜粋、またはカテゴリで検索...",
    searchLabel: "インサイトを検索",
    sortLabel: "並び替え",
    sortLatest: "最新",
    sortFeaturedFirst: "注目記事優先",
    reset: "リセット",
    resetLabel: "フィルターと検索をリセット",
    showing: "表示中",
    insights: "インサイト",
    insightsPlural: "インサイト",
    helperText: "カテゴリを選択して記事をフィルタリングします。",
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

const editorialChips = [
  "Governance",
  "Markets",
  "Value creation",
  "Risk discipline",
];

type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
};

const articles: Article[] = [
  {
    id: "1",
    title: "The Importance of Corporate Governance in Private Equity",
    excerpt:
      "Strong corporate governance is not just a regulatory requirement—it is a fundamental driver of sustainable value creation. In this article, we explore how governance frameworks contribute to investment success.",
    category: "Governance",
    date: "January 2026",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "2",
    title: "Southeast Asia Technology Landscape: 2026 Outlook",
    excerpt:
      "The technology sector in Southeast Asia continues to evolve rapidly. We examine key trends, opportunities, and challenges facing tech investors in the region.",
    category: "Market Updates",
    date: "January 2026",
    readTime: "12 min read",
    featured: true,
  },
  {
    id: "3",
    title: "Building Long-term Value: Our Investment Philosophy",
    excerpt:
      "At Eternal Order Investment Group, we believe sustainable value creation requires patience, discipline, and a commitment to principles. Here is how we approach investing.",
    category: "Investment Philosophy",
    date: "December 2025",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: "4",
    title: "Fashion Industry Trends: Sustainability and Digital Transformation",
    excerpt:
      "The fashion industry is undergoing significant transformation. We analyze how sustainability and digital innovation are reshaping investment opportunities.",
    category: "Market Updates",
    date: "December 2025",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: "5",
    title: "Scaling with Purpose: Growth Strategies for Portfolio Companies",
    excerpt:
      "Rapid growth without proper foundations can be destructive. We share our approach to helping portfolio companies scale sustainably.",
    category: "Growth Strategy",
    date: "November 2025",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: "6",
    title: "Risk Management in Multi-Sector Investment Portfolios",
    excerpt:
      "Diversification is more than just spreading capital. We discuss our framework for managing risk across our six investment pillars.",
    category: "Investment Philosophy",
    date: "November 2025",
    readTime: "9 min read",
    featured: false,
  },
];

type SortOption = "latest" | "featured-first";

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
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
  const categories = useMemo(
    () =>
      categoryIds.map((id) => ({
        id,
        label: t.categories[id as keyof typeof t.categories],
      })),
    [t],
  );

  const matchesSearch = (article: Article): boolean => {
    if (!searchQuery.trim()) return true;
    const q = normalizeText(searchQuery);
    const title = normalizeText(article.title);
    const excerpt = normalizeText(article.excerpt);
    const category = normalizeText(article.category);
    return title.includes(q) || excerpt.includes(q) || category.includes(q);
  };

  const matchesCategory = (article: Article): boolean => {
    if (selectedCategory === "all") return true;
    return article.category === selectedCategory;
  };

  const filteredArticles = useMemo(() => {
    return articles
      .filter((a) => matchesCategory(a) && matchesSearch(a))
      .slice()
      .sort((a, b) => {
        if (sortBy === "featured-first") {
          if (a.featured !== b.featured) return a.featured ? -1 : 1;
        }
        return compareDates(a.date, b.date);
      });
  }, [selectedCategory, searchQuery, sortBy]);

  const featuredArticlesFiltered = useMemo(
    () => filteredArticles.filter((a) => a.featured),
    [filteredArticles],
  );
  const regularArticlesFiltered = useMemo(
    () => filteredArticles.filter((a) => !a.featured),
    [filteredArticles],
  );

  const hasActiveFilters =
    selectedCategory !== "all" || searchQuery.trim() !== "";

  const handleReset = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSortBy("latest");
    setSortDropdownOpen(false);
  };

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative py-20 sm:py-24 lg:py-28 overflow-hidden"
        aria-labelledby="insights-hero-heading"
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(165deg,var(--cream)_0%,color-mix(in_oklab,var(--gold)_6%,var(--cream))_45%,var(--cream)_100%)]"
          aria-hidden
        />
        <div
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold/30 via-gold/15 to-transparent"
          aria-hidden
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
          aria-hidden
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold font-medium text-sm uppercase tracking-wider mb-3">
            Knowledge & Perspectives
          </p>
          <h1
            id="insights-hero-heading"
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-navy mt-2 mb-6 text-balance"
          >
            Insights
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Market updates, governance notes, and investment perspectives from
            Eternal Order Investment Group.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {editorialChips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-navy/5 border border-navy/10 text-navy text-sm font-medium"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Categories + Search + Sort – notranslate prevents gtranslate from mutating DOM and breaking React */}
      <section
        className="notranslate sticky top-0 z-20 py-4 sm:py-5 bg-card border-y border-border shadow-sm"
        aria-label="Filter and search insights"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="relative flex-1 min-w-0">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
                  aria-hidden
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full h-10 pl-9 pr-4 rounded-lg border-2 border-border bg-background text-navy placeholder:text-muted-foreground text-sm transition-colors focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  aria-label={t.searchLabel}
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSortDropdownOpen((o) => !o)}
                    onBlur={() =>
                      setTimeout(() => setSortDropdownOpen(false), 150)
                    }
                    className="cursor-pointer inline-flex items-center gap-2 h-10 px-4 rounded-lg border-2 border-border bg-background text-navy text-sm font-medium transition-colors hover:border-gold/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                    aria-haspopup="listbox"
                    aria-expanded={sortDropdownOpen}
                    aria-label={t.sortLabel}
                  >
                    {t.sortLabel}:{" "}
                    {sortBy === "latest" ? t.sortLatest : t.sortFeaturedFirst}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        sortDropdownOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                  {sortDropdownOpen && (
                    <ul
                      role="listbox"
                      className="absolute top-full left-0 mt-1 min-w-[180px] py-1 rounded-lg border-2 border-border bg-card shadow-lg z-10"
                    >
                      <li role="option" aria-selected={sortBy === "latest"}>
                        <button
                          type="button"
                          onClick={() => {
                            setSortBy("latest");
                            setSortDropdownOpen(false);
                          }}
                          className="cursor-pointer w-full text-left px-4 py-2 text-sm text-navy hover:bg-gold/10 focus:bg-gold/10 focus:outline-none"
                        >
                          {t.sortLatest}
                        </button>
                      </li>
                      <li
                        role="option"
                        aria-selected={sortBy === "featured-first"}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setSortBy("featured-first");
                            setSortDropdownOpen(false);
                          }}
                          className="cursor-pointer w-full text-left px-4 py-2 text-sm text-navy hover:bg-gold/10 focus:bg-gold/10 focus:outline-none"
                        >
                          {t.sortFeaturedFirst}
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="cursor-pointer inline-flex items-center gap-2 h-10 px-4 rounded-lg border-2 border-border bg-navy/5 text-navy text-sm font-medium transition-colors hover:border-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                    aria-label={t.resetLabel}
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden />
                    {t.reset}
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isSelected =
                  selectedCategory === "all"
                    ? cat.id === "all"
                    : selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    aria-pressed={isSelected}
                    className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
                      isSelected
                        ? "bg-navy text-cream"
                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-navy"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
              <span className="text-sm text-muted-foreground ml-2">
                {t.showing} {filteredArticles.length}{" "}
                {filteredArticles.length !== 1 ? t.insightsPlural : t.insights}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticlesFiltered.length > 0 && (
        <section className="py-16 bg-cream" aria-labelledby="featured-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              id="featured-heading"
              className="font-serif text-2xl text-navy mb-8"
            >
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticlesFiltered.map((article) => (
                <Link
                  key={article.id}
                  href={`/insights/${article.id}`}
                  className="cursor-pointer group block rounded-xl border-2 border-border bg-card p-6 lg:p-8 transition-all duration-300 hover:border-gold hover:shadow-lg hover:shadow-gold/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                >
                  <article>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded bg-gold/20 text-gold text-xs font-semibold uppercase tracking-wider">
                        Featured
                      </span>
                      <span className="px-2.5 py-1 bg-navy/5 text-navy text-xs font-medium rounded-lg">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" aria-hidden />
                        {article.readTime}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {article.date}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl lg:text-2xl text-navy mb-3 group-hover:text-gold transition-colors duration-300">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium text-navy group-hover:text-gold transition-colors">
                      Read Article
                      <ArrowRight
                        className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                        aria-hidden
                      />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section
        className="py-16 bg-card border-t border-border"
        aria-labelledby="all-articles-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="all-articles-heading"
            className="font-serif text-2xl text-navy mb-8"
          >
            All Articles
          </h2>
          {regularArticlesFiltered.length > 0 ? (
            <ul className="space-y-0 divide-y divide-border" role="list">
              {regularArticlesFiltered.map((article) => (
                <li key={article.id}>
                  <Link
                    href={`/insights/${article.id}`}
                    className="cursor-pointer group flex flex-col md:flex-row md:items-start gap-4 py-6 md:py-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-inset rounded-lg -mx-2 px-2"
                  >
                    <div className="md:w-40 shrink-0 flex flex-row md:flex-col gap-2 md:gap-1">
                      <span className="px-2.5 py-1 bg-navy/5 text-navy text-xs font-medium rounded-lg w-fit">
                        {article.category}
                      </span>
                      <span className="text-xs text-muted-foreground md:order-first">
                        {article.date}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-lg text-navy group-hover:text-gold transition-colors duration-300">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs">
                          <Clock className="h-3 w-3" aria-hidden />
                          {article.readTime}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-navy group-hover:text-gold transition-colors">
                          Read
                          <ArrowRight
                            className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform"
                            aria-hidden
                          />
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground py-8">
              No articles match the current filters. Try adjusting category or
              search, or{" "}
              <button
                type="button"
                onClick={handleReset}
                className="cursor-pointer text-gold font-medium underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded"
              >
                reset filters
              </button>
              .
            </p>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section
        className="py-16 sm:py-20 bg-navy"
        aria-labelledby="newsletter-heading"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4" aria-hidden>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-gold">
              <Mail className="h-6 w-6" />
            </span>
          </div>
          <h2
            id="newsletter-heading"
            className="font-serif text-2xl sm:text-3xl text-cream mb-3"
          >
            Stay Informed
          </h2>
          <p className="text-cream/70 text-sm mb-6">
            Subscribe to receive our latest insights and market perspectives.
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <label htmlFor="insights-newsletter-email" className="sr-only">
              Email address for newsletter subscription
            </label>
            <input
              id="insights-newsletter-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="flex-1 min-w-0 px-4 py-3 bg-cream/10 border-2 border-cream/20 rounded-lg text-cream placeholder:text-cream/40 transition-colors focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
              aria-describedby="newsletter-helper"
            />
            <button
              type="submit"
              className="cursor-pointer px-6 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Subscribe
            </button>
          </form>
          <p id="newsletter-helper" className="text-cream/50 text-xs mt-3">
            We send periodic updates. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </>
  );
}
