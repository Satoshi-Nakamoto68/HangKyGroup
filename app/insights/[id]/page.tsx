"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Share2, Linkedin, Twitter } from "lucide-react";
import { getCompanyName } from "@/lib/company-name";

function getLangFromDocument(): string {
  if (typeof document === "undefined") return "en";
  const lang = document.documentElement.getAttribute("lang") || "";
  return lang.toLowerCase().slice(0, 2);
}

const getArticleContent = (companyName: string) => `
    <p>Strong corporate governance is not just a regulatory requirement—it is a fundamental driver of sustainable value creation. In the world of private equity and investment management, governance frameworks directly impact everything from operational efficiency to risk management to exit valuations.</p>
    
    <h2>Why Governance Matters</h2>
    <p>At ${companyName}, we have observed that companies with robust governance structures consistently outperform their peers over the long term. This is not coincidental. Good governance creates accountability, transparency, and alignment between stakeholders—all essential ingredients for sustainable growth.</p>
    
    <h2>Key Elements of Effective Governance</h2>
    <p>Effective corporate governance in portfolio companies typically encompasses several key elements:</p>
    <ul>
      <li><strong>Board Composition:</strong> A balanced board with independent directors brings diverse perspectives and objective oversight.</li>
      <li><strong>Clear Reporting Lines:</strong> Well-defined roles and responsibilities ensure accountability throughout the organization.</li>
      <li><strong>Risk Management:</strong> Systematic identification and mitigation of risks protects value and enables confident decision-making.</li>
      <li><strong>Ethical Standards:</strong> A strong ethical culture, reinforced from the top, builds trust with all stakeholders.</li>
    </ul>
    
    <h2>Governance as Value Creation</h2>
    <p>We view governance not as a constraint but as a value creation tool. When implemented thoughtfully, governance frameworks:</p>
    <ul>
      <li>Improve operational decision-making through better information flow</li>
      <li>Reduce risk and the cost of capital</li>
      <li>Enhance reputation with customers, partners, and regulators</li>
      <li>Increase attractiveness to future investors and acquirers</li>
    </ul>
    
    <h2>Our Approach</h2>
    <p>At ${companyName}, governance is not an afterthought—it is central to our investment process. From due diligence through exit, we work with portfolio companies to establish and strengthen governance frameworks that support sustainable growth.</p>
    
    <p>Our approach includes:</p>
    <ul>
      <li>Comprehensive governance assessment during due diligence</li>
      <li>Board composition and effectiveness reviews</li>
      <li>Implementation of reporting and control frameworks</li>
      <li>Ongoing governance monitoring and enhancement</li>
    </ul>
    
    <h2>Conclusion</h2>
    <p>In an increasingly complex business environment, governance is more important than ever. Companies that prioritize governance are better positioned to navigate challenges, capitalize on opportunities, and deliver sustainable value to all stakeholders.</p>
    
    <p>For investors and company leaders alike, investing in governance is investing in long-term success.</p>
  `;

const relatedArticles = [
  {
    id: "2",
    title: "Southeast Asia Technology Landscape: 2026 Outlook",
    category: "Market Updates",
  },
  {
    id: "3",
    title: "Building Long-term Value: Our Investment Philosophy",
    category: "Investment Philosophy",
  },
];

export default function ArticlePage() {
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
  const article = useMemo(
    () => ({
      title: "The Importance of Corporate Governance in Private Equity",
      category: "Governance",
      date: "January 15, 2026",
      readTime: "8 min read",
      author: companyName,
      content: getArticleContent(companyName),
    }),
    [companyName],
  );

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-navy transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-gold/10 text-gold text-sm font-medium rounded-full">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy mb-6 text-balance">
            {article.title}
          </h1>

          <div className="flex items-center justify-between pt-6 border-t border-border">
            <div>
              <p className="font-medium text-navy">{article.author}</p>
              <p className="text-sm text-muted-foreground">{article.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 text-muted-foreground hover:text-navy transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 text-muted-foreground hover:text-navy transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 text-muted-foreground hover:text-navy transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <article
            className="prose prose-lg prose-navy max-w-none"
            style={{
              lineHeight: 1.8,
            }}
          >
            <div
              className="[&>h2]:font-serif [&>h2]:text-2xl [&>h2]:text-navy [&>h2]:mt-12 [&>h2]:mb-4
                         [&>p]:text-foreground [&>p]:text-base [&>p]:leading-relaxed [&>p]:mb-6
                         [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:space-y-2
                         [&>ul>li]:text-foreground [&>ul>li]:text-base [&>ul>li]:leading-relaxed
                         [&_strong]:text-navy [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>
        </div>
      </section>

      {/* Author Bio */}
      <section className="py-12 bg-cream border-y border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center shrink-0">
              <span className="text-gold font-serif font-bold text-xl">EO</span>
            </div>
            <div>
              <h3 className="font-medium text-navy mb-1">
                {companyName}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The {companyName} research and insights team provides
                analysis and perspectives on investment trends, governance
                practices, and market developments across our six strategic
                pillars.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl text-navy mb-8">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((related) => (
              <Link
                key={related.id}
                href={`/insights/${related.id}`}
                className="group p-6 bg-background border border-border rounded-lg hover:border-gold/30 transition-all duration-300"
              >
                <span className="text-xs text-gold font-medium uppercase tracking-wider">
                  {related.category}
                </span>
                <h3 className="font-serif text-lg text-navy mt-2 group-hover:text-gold transition-colors">
                  {related.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
