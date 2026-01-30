"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/** Logo: place at public/logo.svg or public/logo-web.png. Yellow logo works best on navy header. */
const LOGO_SRC = "/logo-web.png";
const LOGO_ALT = "Hang Ky Investment Group - HKIG Jsc";

type NavItemBase = { href: string };
type NavItemWithChildren = NavItemBase & {
  key: string;
  children: { key: string; href: string }[];
};
type NavItemLeaf = NavItemBase & { key: string };

const navigationStructure: (NavItemWithChildren | NavItemLeaf)[] = [
  { key: "home", href: "/" },
  {
    key: "about",
    href: "/about",
    children: [
      { key: "aboutOverview", href: "/about" },
      { key: "aboutLeadership", href: "/about/leadership" },
      { key: "aboutValues", href: "/about/values" },
    ],
  },
  {
    key: "investment",
    href: "/investment",
    children: [
      { key: "invFashion", href: "/investment/fashion" },
      { key: "invTechnology", href: "/investment/technology" },
      { key: "invImportExport", href: "/investment/import-export" },
      { key: "invGovernance", href: "/investment/governance" },
      { key: "invMarketing", href: "/investment/marketing" },
      { key: "invRealEstate", href: "/investment/real-estate" },
    ],
  },
  { key: "portfolio", href: "/portfolio" },
  { key: "insights", href: "/insights" },
  { key: "compliance", href: "/compliance" },
  { key: "contact", href: "/contact" },
];

const translations = {
  en: {
    home: "Home",
    about: "About",
    aboutOverview: "Company Overview",
    aboutLeadership: "Leadership & Governance",
    aboutValues: "Values & Ethics",
    investment: "Investment Focus",
    invFashion: "Fashion Investments",
    invTechnology: "Technology Investments",
    invImportExport: "Import & Export",
    invGovernance: "Governance & Management",
    invMarketing: "Marketing & Growth",
    invRealEstate: "Real Estate",
    portfolio: "Portfolio",
    insights: "Insights",
    compliance: "Compliance",
    contact: "Contact",
    contactUs: "Contact Us",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
  vi: {
    home: "Trang chủ",
    about: "Về chúng tôi",
    aboutOverview: "Tổng quan công ty",
    aboutLeadership: "Lãnh đạo & Quản trị",
    aboutValues: "Giá trị & Đạo đức",
    investment: "Lĩnh vực đầu tư",
    invFashion: "Đầu tư Thời trang",
    invTechnology: "Đầu tư Công nghệ",
    invImportExport: "Xuất nhập khẩu",
    invGovernance: "Quản trị & Điều hành",
    invMarketing: "Marketing & Tăng trưởng",
    invRealEstate: "Bất động sản",
    portfolio: "Danh mục đầu tư",
    insights: "Góc nhìn",
    compliance: "Tuân thủ",
    contact: "Liên hệ",
    contactUs: "Liên hệ chúng tôi",
    menuOpen: "Mở menu",
    menuClose: "Đóng menu",
  },
  ja: {
    home: "ホーム",
    about: "会社概要",
    aboutOverview: "会社概要",
    aboutLeadership: "リーダーシップ・ガバナンス",
    aboutValues: "価値観・倫理",
    investment: "投資分野",
    invFashion: "ファッション投資",
    invTechnology: "テクノロジー投資",
    invImportExport: "輸出入",
    invGovernance: "ガバナンス・マネジメント",
    invMarketing: "マーケティング・成長",
    invRealEstate: "不動産",
    portfolio: "ポートフォリオ",
    insights: "インサイト",
    compliance: "コンプライアンス",
    contact: "お問い合わせ",
    contactUs: "お問い合わせ",
    menuOpen: "メニューを開く",
    menuClose: "メニューを閉じる",
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

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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
  const navigation = useMemo(
    () =>
      navigationStructure.map((item) => {
        if ("children" in item) {
          return {
            name: t[item.key as keyof typeof t],
            href: item.href,
            children: item.children.map((child) => ({
              name: t[child.key as keyof typeof t],
              href: child.href,
            })),
          };
        }
        return {
          name: t[item.key as keyof typeof t],
          href: item.href,
        };
      }),
    [t],
  );

  const handleMobileMenuToggle = () => setMobileMenuOpen((prev) => !prev);
  const handleCloseMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-navy shadow-lg shadow-navy/20"
      role="banner"
    >
      <nav
        className="notranslate mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex min-w-0 flex-1 items-center gap-8 lg:gap-12">
          <Link
            href="/"
            className="relative flex shrink-0 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded"
            aria-label="Hang Ky Investment Group - Go to homepage"
          >
            <span className="relative flex h-14 w-[200px] items-center sm:h-16 sm:w-[240px]">
              <Image
                src={LOGO_SRC}
                alt={LOGO_ALT}
                fill
                className="object-contain object-left"
                priority
                sizes="(max-width: 640px) 200px, 240px"
                style={{ objectFit: "contain" }}
              />
            </span>
          </Link>

          <ul className="hidden lg:flex lg:items-center lg:gap-0.5">
            {navigation.map((item) => (
              <li key={item.href + (item.name ?? "")} className="relative">
                {item.children ? (
                  <div
                    className="group/nav"
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "relative flex items-center gap-1 px-4 py-4 text-sm font-medium text-cream/90 transition-colors hover:text-cream",
                        "after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:scale-x-0 after:bg-gold after:transition-transform after:duration-200 group-hover/nav:after:scale-x-100",
                      )}
                    >
                      {item.name}
                      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover/nav:rotate-180" />
                    </Link>
                    {openDropdown === item.name && (
                      <div className="absolute left-0 top-full pt-1">
                        <ul
                          className="w-56 rounded-lg border border-border bg-card py-2 shadow-xl shadow-navy/30 animate-in fade-in-0 zoom-in-95 duration-200"
                          role="list"
                        >
                          {item.children.map((child) => (
                            <li key={child.href} role="none">
                              <Link
                                href={child.href}
                                className="flex items-center border-l-2 border-transparent px-4 py-2.5 pl-4 text-sm text-navy/80 transition-colors hover:border-gold hover:bg-muted hover:text-navy"
                                onClick={handleCloseMobileMenu}
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "relative flex items-center px-4 py-4 text-sm font-medium text-cream/90 transition-colors hover:text-cream",
                      "after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:scale-x-0 after:bg-gold after:transition-transform after:duration-200 hover:after:scale-x-100",
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden items-center gap-4 lg:flex lg:shrink-0">
          <Link
            href="/contact"
            className="rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-navy shadow-md transition-colors hover:bg-gold-light focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            {t.contactUs}
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-cream transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          onClick={handleMobileMenuToggle}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? t.menuClose : t.menuOpen}
          aria-controls="mobile-nav"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden />
          ) : (
            <Menu className="h-6 w-6" aria-hidden />
          )}
        </button>
      </nav>

      <div
        id="mobile-nav"
        className={cn(
          "lg:hidden border-t border-white/10 bg-navy notranslate",
          !mobileMenuOpen && "hidden",
        )}
        aria-hidden={!mobileMenuOpen}
      >
        {mobileMenuOpen && (
          <div className="animate-in slide-in-from-top-2 fade-in-0 duration-200 space-y-0.5 px-4 py-4">
            {navigation.map((item) => (
              <div key={item.href + (item.name ?? "")}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-cream hover:bg-white/10 transition-colors"
                  onClick={handleCloseMobileMenu}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <ul
                    className="ml-4 mt-0.5 space-y-0.5 border-l-2 border-gold/40 pl-4"
                    role="list"
                  >
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block rounded-lg px-4 py-2.5 text-sm text-cream/80 hover:bg-white/10 hover:text-cream transition-colors"
                          onClick={handleCloseMobileMenu}
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-white/10">
              <Link
                href="/contact"
                className="flex w-full items-center justify-center rounded-md bg-gold px-5 py-3 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
                onClick={handleCloseMobileMenu}
              >
                {t.contactUs}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
