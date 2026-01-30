"use client";

import { useState, useEffect, useMemo } from "react";
import { Shield, Heart, Eye, Award, Target, Users } from "lucide-react";
import { getCompanyName } from "@/lib/company-name";

function getLangFromDocument(): string {
  if (typeof document === "undefined") return "en";
  const lang = document.documentElement.getAttribute("lang") || "";
  return lang.toLowerCase().slice(0, 2);
}

const coreValues = [
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We conduct all business with unwavering honesty and ethical standards. Our word is our bond, and we hold ourselves accountable to the highest moral principles in every transaction and relationship.",
    principles: [
      "Transparent communication with all stakeholders",
      "Ethical decision-making at every level",
      "Accountability for actions and outcomes",
    ],
  },
  {
    icon: Heart,
    title: "Responsibility",
    description:
      "We take ownership of our impact on society, the environment, and our stakeholders. Every investment decision considers not just financial returns but also broader social and environmental implications.",
    principles: [
      "Sustainable investment practices",
      "Community engagement and support",
      "Environmental consciousness",
    ],
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "We believe that trust is built through openness. We maintain clear, honest communication with investors, partners, and the public, providing regular reporting and accessible information.",
    principles: [
      "Regular and detailed reporting",
      "Open communication channels",
      "Clear disclosure of risks and opportunities",
    ],
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We pursue excellence in everything we do, from investment analysis to portfolio management to stakeholder relations. Continuous improvement is embedded in our culture.",
    principles: [
      "Rigorous investment analysis",
      "Best-in-class governance practices",
      "Continuous professional development",
    ],
  },
];

const ethicalCommitments = [
  {
    title: "Anti-Corruption",
    description:
      "Zero tolerance for bribery, corruption, or unethical business practices in any form.",
  },
  {
    title: "Fair Dealing",
    description:
      "Honest and fair treatment of all parties in business dealings, negotiations, and partnerships.",
  },
  {
    title: "Confidentiality",
    description:
      "Protection of confidential information and respect for privacy of all stakeholders.",
  },
  {
    title: "Conflict of Interest",
    description:
      "Clear policies and procedures to identify, disclose, and manage potential conflicts of interest.",
  },
  {
    title: "Human Rights",
    description:
      "Respect for human rights and dignity in all business operations and investment activities.",
  },
  {
    title: "Environmental Stewardship",
    description:
      "Commitment to environmental sustainability and responsible resource management.",
  },
];

export default function ValuesPage() {
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

  return (
    <>
      {/* Hero Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-gold font-medium text-sm uppercase tracking-wider">
              Our Foundation
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-navy mt-4 mb-6 text-balance">
              Values & Ethics
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our values are not just words on paper—they are the foundation of
              every decision we make. At {companyName}, we believe
              that sustainable success is only possible when built on a bedrock
              of integrity and ethical conduct.
            </p>
          </div>
        </div>
      </section>

      {/* Slogan Banner */}
      <section className="py-12 bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-serif text-3xl sm:text-4xl text-gold italic">
            {'"Founded on Absolute Trust"'}
          </p>
          <p className="text-cream/70 mt-4">
            Our slogan reflects our deepest commitment—to earn and maintain the
            trust of everyone we work with.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold font-medium text-sm uppercase tracking-wider">
              Guiding Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-navy mt-4 mb-6">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These four pillars guide our actions and decisions across every
              aspect of our business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreValues.map((value) => (
              <div
                key={value.title}
                className="p-8 bg-background border border-border rounded-lg hover:border-gold/30 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-navy rounded-lg shrink-0">
                    <value.icon className="w-8 h-8 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-navy mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {value.description}
                    </p>
                    <ul className="space-y-2">
                      {value.principles.map((principle) => (
                        <li
                          key={principle}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                          <span className="text-foreground">{principle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ethical Framework */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-gold font-medium text-sm uppercase tracking-wider">
                Ethical Framework
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-navy mt-4 mb-6">
                Our Ethical Commitments
              </h2>
              <p className="text-muted-foreground mb-8">
                Beyond our core values, we maintain specific ethical commitments
                that govern our conduct in all business activities. These
                commitments are enforced through clear policies, regular
                training, and robust compliance mechanisms.
              </p>
              <div className="p-6 bg-navy/5 border border-navy/10 rounded-lg">
                <Target className="w-8 h-8 text-navy mb-4" />
                <h3 className="font-serif text-xl text-navy mb-2">
                  Ethics Hotline
                </h3>
                <p className="text-muted-foreground text-sm">
                  We maintain confidential channels for reporting ethical
                  concerns. All reports are investigated thoroughly, and
                  whistleblowers are protected from retaliation.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {ethicalCommitments.map((commitment) => (
                <div
                  key={commitment.title}
                  className="p-6 bg-card border border-border rounded-lg"
                >
                  <h3 className="font-medium text-navy mb-2">
                    {commitment.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {commitment.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholder Commitment */}
      <section className="py-24 bg-navy text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold font-medium text-sm uppercase tracking-wider">
              Our Promise
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-cream mt-4 mb-6">
              Commitment to Stakeholders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Investors",
                commitments: [
                  "Transparent reporting",
                  "Prudent risk management",
                  "Long-term value creation",
                  "Open communication",
                ],
              },
              {
                icon: Target,
                title: "Portfolio Companies",
                commitments: [
                  "Strategic guidance",
                  "Operational support",
                  "Governance expertise",
                  "Growth partnership",
                ],
              },
              {
                icon: Heart,
                title: "Community",
                commitments: [
                  "Ethical business practices",
                  "Environmental responsibility",
                  "Social contribution",
                  "Local engagement",
                ],
              },
            ].map((group) => (
              <div
                key={group.title}
                className="p-8 bg-cream/5 border border-cream/10 rounded-lg"
              >
                <div className="p-3 bg-gold/20 rounded-lg w-fit mb-6">
                  <group.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-serif text-xl text-cream mb-4">
                  {group.title}
                </h3>
                <ul className="space-y-3">
                  {group.commitments.map((commitment) => (
                    <li
                      key={commitment}
                      className="flex items-center gap-2 text-cream/70 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                      {commitment}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
