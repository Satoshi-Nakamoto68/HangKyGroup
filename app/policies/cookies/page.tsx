"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCompanyName } from "@/lib/company-name";

function getLangFromDocument(): string {
  if (typeof document === "undefined") return "en";
  const lang = document.documentElement.getAttribute("lang") || "";
  return lang.toLowerCase().slice(0, 2);
}

export default function CookiePolicyPage() {
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
      <section className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-navy transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="font-serif text-4xl sm:text-5xl text-navy mb-6">
            Cookie Policy
          </h1>
          <p className="text-muted-foreground mb-2">{companyName} (HKIG Jsc)</p>
          <p className="text-sm text-muted-foreground">
            Last updated: January 2026
          </p>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-navy max-w-none">
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl text-navy mb-4">
                  1. What Are Cookies
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files that are placed on your device
                  when you visit a website. They are widely used to make
                  websites work more efficiently and provide information to
                  website owners.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-navy mb-4">
                  2. How We Use Cookies
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use cookies for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    <strong>Essential cookies:</strong> Required for the website
                    to function properly
                  </li>
                  <li>
                    <strong>Analytics cookies:</strong> Help us understand how
                    visitors interact with our website
                  </li>
                  <li>
                    <strong>Preference cookies:</strong> Remember your
                    preferences and settings
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-navy mb-4">
                  3. Managing Cookies
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  You can control and manage cookies through your browser
                  settings. Please note that disabling certain cookies may
                  affect the functionality of this website.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-navy mb-4">
                  4. Third-Party Cookies
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Some cookies on our website are placed by third-party services
                  that appear on our pages. We do not control these cookies. You
                  should refer to the privacy policies of these third parties
                  for information about their cookies.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-navy mb-4">
                  5. Contact
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about our use of cookies, please contact
                  us at:{" "}
                  <Link href="/contact" className="text-gold hover:underline">
                    Contact Page
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
