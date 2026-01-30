"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getCompanyName,
  getCompanyNameFull,
  getCompanyNameShort,
} from "@/lib/company-name";

/** Logo: same as header - place at public/logo-web.png */
const LOGO_SRC = "/logo-web.png";
const LOGO_ALT = "Hang Ky Investment Group - HKIG Jsc";

function getLangFromDocument(): string {
  if (typeof document === "undefined") return "en";
  const lang = document.documentElement.getAttribute("lang") || "";
  return lang.toLowerCase().slice(0, 2);
}

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Leadership", href: "/about/leadership" },
    { name: "Values & Ethics", href: "/about/values" },
    { name: "Careers", href: "/careers" },
  ],
  investments: [
    { name: "Fashion", href: "/investment/fashion" },
    { name: "Technology", href: "/investment/technology" },
    { name: "Import & Export", href: "/investment/import-export" },
    { name: "Real Estate", href: "/investment/real-estate" },
  ],
  resources: [
    { name: "Portfolio", href: "/portfolio" },
    { name: "Insights", href: "/insights" },
    { name: "Compliance", href: "/compliance" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/policies/privacy" },
    { name: "Terms of Use", href: "/policies/terms" },
    { name: "Cookie Policy", href: "/policies/cookies" },
  ],
};

export function Footer() {
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
  const companyNameShort = useMemo(() => getCompanyNameShort(lang), [lang]);

  return (
    <footer className="bg-navy text-cream">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6 group">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                  <Image
                    src={LOGO_SRC}
                    alt={LOGO_ALT}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 80px, 96px"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-serif text-2xl sm:text-3xl font-semibold text-cream group-hover:text-gold transition-colors">
                    {companyNameShort}
                  </p>
                  <p className="text-sm sm:text-base text-cream/60">
                    Investment Group
                  </p>
                </div>
              </div>
            </Link>
            <p className="text-cream/70 text-sm leading-relaxed mb-6 max-w-sm">
              {companyName} (HKIG Jsc) — {companyNameFull}. Founded on Absolute
              Trust.
            </p>
            <div className="space-y-2 text-sm text-cream/60">
              <p>
                <span className="text-gold">Legal Name (VN):</span>
              </p>
              <p>CÔNG TY CỔ PHẦN TẬP ĐOÀN ĐẦU TƯ HẰNG KỶ</p>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-cream/90 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 hover:text-gold transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-cream/90 mb-4">
              Investments
            </h3>
            <ul className="space-y-3">
              {footerLinks.investments.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 hover:text-gold transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-cream/90 mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 hover:text-gold transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-12 border-t border-cream/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="font-semibold mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-sm text-cream/60">
                Receive insights on investment trends and opportunities.
              </p>
            </div>
            <form className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 bg-cream/10 border border-cream/20 rounded text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gold text-navy font-medium text-sm rounded hover:bg-gold-light transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
          <p className="text-xs text-cream/40 mt-3">
            By subscribing, you agree to our Privacy Policy. We use double
            opt-in for verification.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-cream/50">
              © {new Date().getFullYear()} {companyName} (HKIG Jsc). All rights
              reserved.
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-cream/50 hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
