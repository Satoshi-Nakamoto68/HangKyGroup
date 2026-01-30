"use client";

import { useState, useEffect } from "react";
import { Building2, Shield, Layers, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCompanyName } from "@/lib/company-name";

function getLangFromDocument(): string {
  if (typeof document === "undefined") return "en";
  const lang = document.documentElement.getAttribute("lang") || "";
  return lang.toLowerCase().slice(0, 2);
}

export function TrustStrip() {
  const [companyName, setCompanyName] = useState(() => {
    if (typeof window !== "undefined") {
      return getCompanyName(getLangFromDocument());
    }
    return "Hang Ky Investment Group";
  });

  useEffect(() => {
    const updateCompanyName = () => {
      setCompanyName(getCompanyName(getLangFromDocument()));
    };
    updateCompanyName();
    const observer = new MutationObserver(updateCompanyName);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
    return () => observer.disconnect();
  }, []);

  const TRUST_ITEMS = [
    {
      label: companyName,
      sublabel: "HKIG Jsc",
      icon: Building2,
      ariaLabel: "Company legal name and entity",
    },
    {
      label: "Founded on Absolute Trust",
      sublabel: "Integrity & Transparency",
      icon: Shield,
      ariaLabel: "Core value: trust and integrity",
    },
    {
      label: "Multi-sector Investments",
      sublabel: "Diversified Portfolio",
      icon: Layers,
      ariaLabel: "Investment focus: multi-sector",
    },
    {
      label: "Governance & Compliance",
      sublabel: "Regulatory Excellence",
      icon: Award,
      ariaLabel: "Governance and compliance commitment",
    },
  ];

  return (
    <section
      aria-label="Company identity and trust pillars"
      className="relative bg-navy text-cream overflow-hidden"
    >
      {/* Gold accent line */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-90"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {TRUST_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === TRUST_ITEMS.length - 1;
            return (
              <div
                key={item.label}
                className={cn(
                  "group flex items-start gap-3 py-1",
                  !isLast && "lg:border-r lg:border-cream/10 lg:pr-6",
                )}
                role="listitem"
              >
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-md bg-navy-light/80 border border-cream/10 flex items-center justify-center text-gold transition-colors duration-200 group-hover:border-gold/40 group-hover:bg-gold/10"
                  aria-hidden
                >
                  <Icon className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="text-sm font-semibold text-cream tracking-tight leading-tight"
                    aria-label={item.ariaLabel}
                  >
                    {item.label}
                  </p>
                  <p className="text-xs text-cream/70 mt-0.5 leading-tight">
                    {item.sublabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom subtle border */}
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-cream/5"
        aria-hidden
      />
    </section>
  );
}
