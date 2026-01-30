import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use | Hang Ky Investment Group",
  description: "Terms of Use for Hang Ky Investment Group (HKIG Jsc) website.",
};

export default function TermsPage() {
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
            Terms of Use
          </h1>
          <p className="text-muted-foreground mb-2">
            Hang Ky Investment Group (HKIG Jsc)
          </p>
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
                  1. Acceptance of Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using this website, you accept and agree to
                  be bound by these Terms of Use. If you do not agree to these
                  terms, please do not use this website.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-navy mb-4">
                  2. Use of Website
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  This website is provided for informational purposes only.
                  Nothing on this website constitutes investment advice,
                  financial advice, or any other form of professional advice.
                  You should consult with appropriate professionals before
                  making any investment decisions.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-navy mb-4">
                  3. Intellectual Property
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content on this website, including text, graphics, logos,
                  and images, is the property of Hang Ky Investment Group (HKIG
                  Jsc) and is protected by copyright and other intellectual
                  property laws. You may not reproduce, distribute, or use any
                  content without our prior written consent.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-navy mb-4">
                  4. Disclaimer
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  This website is provided {'"as is"'} without any warranties,
                  express or implied. We do not warrant that the website will be
                  uninterrupted, error-free, or free of viruses or other harmful
                  components.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-navy mb-4">
                  5. Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the fullest extent permitted by law, Hang Ky Investment
                  Group (HKIG Jsc) Investment Group (HKIG Jsc) shall not be
                  liable for any damages arising from your use of this website
                  or any information contained herein.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-navy mb-4">
                  6. Changes to Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms of Use at any time.
                  Changes will be effective immediately upon posting to the
                  website. Your continued use of the website constitutes
                  acceptance of the modified terms.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-navy mb-4">
                  7. Contact
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about these Terms of Use, please contact
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
