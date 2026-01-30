"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Shield, LineChart, Clock, Globe } from "lucide-react";
import { getCompanyName, getCompanyNameFull } from "@/lib/company-name";

function getLangFromDocument(): string {
  if (typeof document === "undefined") return "en";
  const lang = document.documentElement.getAttribute("lang") || "";
  return lang.toLowerCase().slice(0, 2);
}

const trustPoints = [
  {
    icon: Shield,
    title: "Governance-First Approach",
    description:
      "Every investment decision is guided by rigorous corporate governance standards and ethical principles.",
  },
  {
    icon: LineChart,
    title: "Transparent Reporting",
    description:
      "We maintain clear, honest communication with all stakeholders through regular, detailed reporting.",
  },
  {
    icon: Clock,
    title: "Long-term Value Creation",
    description:
      "Our investment philosophy prioritizes sustainable growth and lasting value over short-term gains.",
  },
  {
    icon: Globe,
    title: "Global Partnership Ready",
    description:
      "Structured for international collaboration with compliance frameworks meeting global standards.",
  },
];

export function TrustSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [lang, setLang] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return getLangFromDocument();
    }
    return "en";
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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

  return (
    <section ref={sectionRef} className="py-24 bg-navy text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-gold font-medium text-sm uppercase tracking-wider">
            Our Commitment
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream mt-4 mb-6 text-balance">
            Why Choose {companyName}
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto">
            Trust is earned through consistent action. Here is how we
            demonstrate our commitment to integrity in every aspect of our
            operations.
          </p>
        </div>

        {/* Trust Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trustPoints.map((point, index) => (
            <div
              key={point.title}
              className={`flex gap-6 p-8 bg-cream/5 border border-cream/10 rounded-lg hover:bg-cream/10 transition-all duration-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="shrink-0">
                <div className="p-3 bg-gold/20 rounded-lg">
                  <point.icon className="w-6 h-6 text-gold" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-xl text-cream mb-2">
                  {point.title}
                </h3>
                <p className="text-cream/60 text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Identity Block */}
        <div
          className={`mt-16 p-8 bg-cream/5 border border-cream/10 rounded-lg text-center transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm text-gold uppercase tracking-wider mb-4">
            Corporate Identity
          </p>
          <p className="font-serif text-2xl text-cream mb-2">
            {companyName} Investment Group
          </p>
          <p className="text-cream/70 mb-4">HKIG Jsc</p>
          <div className="h-px w-16 bg-gold/30 mx-auto my-4" />
          <p className="text-cream/60 text-sm">
            CÔNG TY CỔ PHẦN TẬP ĐOÀN ĐẦU TƯ HẰNG KỶ
          </p>
          <p className="text-cream/50 text-sm mt-1">{companyNameFull}</p>
        </div>
      </div>
    </section>
  );
}
