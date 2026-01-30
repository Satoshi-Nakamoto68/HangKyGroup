import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Eternal Order Investment Group",
  description:
    "Privacy Policy for Eternal Order Investment Group (HKIG Jsc) website and services.",
};

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-2">
            Eternal Order Investment Group (HKIG Jsc)
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
                  1. Introduction
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Eternal Order Investment Group (HKIG Jsc) ({"\"we\""}, {"\"our\""}, or
                  {"\"us\""}) respects your privacy and is committed to protecting
                  your personal data. This privacy policy explains how we
                  collect, use, and safeguard your information when you visit
                  our website or interact with our services.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-navy mb-4">
                  2. Information We Collect
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may collect the following types of information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    Contact information (name, email address, phone number)
                  </li>
                  <li>Professional information (company name, job title)</li>
                  <li>Communication preferences</li>
                  <li>
                    Technical data (IP address, browser type, device
                    information)
                  </li>
                  <li>Usage data (how you interact with our website)</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-navy mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use your information for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>To respond to your inquiries and requests</li>
                  <li>To provide information about our services</li>
                  <li>To send newsletters and updates (with your consent)</li>
                  <li>To improve our website and services</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-navy mb-4">
                  4. Data Security
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures
                  to protect your personal data against unauthorized access,
                  alteration, disclosure, or destruction. However, no method of
                  transmission over the Internet is 100% secure.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-navy mb-4">
                  5. Your Rights
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Depending on your location, you may have the following rights:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Right to access your personal data</li>
                  <li>Right to rectification of inaccurate data</li>
                  <li>Right to erasure of your data</li>
                  <li>Right to restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-navy mb-4">
                  6. Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about this Privacy Policy or wish to
                  exercise your rights, please contact us at:{" "}
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
