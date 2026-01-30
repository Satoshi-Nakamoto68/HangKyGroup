"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Shield,
  FileText,
  CheckCircle,
  Building2,
  Mail,
  User,
  Briefcase,
  MessageSquare,
  Phone,
  Clock,
  Send,
  ArrowRight,
} from "lucide-react";
import { getCompanyName, getCompanyNameFull } from "@/lib/company-name";

function getLangFromDocument(): string {
  if (typeof document === "undefined") return "en";
  const lang = document.documentElement.getAttribute("lang") || "";
  return lang.toLowerCase().slice(0, 2);
}

const documents = [
  {
    name: "Business Registration Certificate",
    description:
      "Official company registration document from relevant authorities.",
    status: "Available upon request",
    icon: FileText,
  },
  {
    name: "Corporate Governance Policy",
    description: "Our framework for corporate governance and board oversight.",
    status: "Available upon request",
    icon: Shield,
  },
  {
    name: "AML/Compliance Statement",
    description: "Anti-money laundering policies and compliance procedures.",
    status: "Available upon request",
    icon: CheckCircle,
  },
  {
    name: "Company Profile",
    description: "Comprehensive overview of the company and its operations.",
    status: "Available upon request",
    icon: Building2,
  },
];

const processSteps = [
  { number: 1, label: "Submit request" },
  { number: 2, label: "Compliance review" },
  { number: 3, label: "Secure document access" },
];

const trustChips = [
  "KYC-ready",
  "Confidential handling",
  "2–3 business day response",
];

export default function CompliancePage() {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    purpose: "",
    purposeOther: "",
    message: "",
    ndaAgreed: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState("");
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

  const handleRequestDocument = (docName: string) => {
    setFormData((prev) => ({
      ...prev,
      message: prev.message
        ? `${prev.message}\n\nRequesting: ${docName}`
        : `Requesting: ${docName}`,
    }));
    const formSection = document.getElementById("verification-request");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    const refId = `VER-${Date.now().toString(36).toUpperCase()}`;
    setReferenceId(refId);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setReferenceId("");
    setFormData({
      name: "",
      organization: "",
      email: "",
      purpose: "",
      purposeOther: "",
      message: "",
      ndaAgreed: false,
    });
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative py-20 sm:py-24 lg:py-28 overflow-hidden"
        aria-labelledby="compliance-hero-heading"
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
            Bank & Partner Verification
          </p>
          <h1
            id="compliance-hero-heading"
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-navy mt-2 mb-6 text-balance"
          >
            Compliance & Verification
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
            This page provides corporate identity information for banks, payment
            providers, and business partners conducting due diligence or KYC
            verification on {companyName}.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {trustChips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-navy/5 border border-navy/10 text-navy text-sm font-medium"
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 border-t border-border/50">
            {processSteps.map((step, index) => (
              <div key={step.number} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-gold font-serif text-sm font-bold border border-gold/30">
                    {step.number}
                  </span>
                  <span className="text-sm text-navy font-medium">
                    {step.label}
                  </span>
                </div>
                {index < processSteps.length - 1 && (
                  <ArrowRight
                    className="h-4 w-4 text-muted-foreground hidden sm:block"
                    aria-hidden
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section
        className="py-16 sm:py-20 bg-navy text-cream"
        aria-labelledby="company-info-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold font-medium text-sm uppercase tracking-wider">
              Official Corporate Identity
            </span>
            <h2
              id="company-info-heading"
              className="font-serif text-3xl sm:text-4xl text-cream mt-4 mb-2"
            >
              Company Information
            </h2>
            <p className="text-cream/60 text-xs mt-4">
              Last updated: January 2026
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
            <div className="p-5 bg-cream/5 border border-cream/10 rounded-lg">
              <p className="text-gold text-xs uppercase tracking-wider mb-2 font-medium">
                Legal Name (Vietnamese)
              </p>
              <p className="font-serif text-lg text-cream leading-relaxed">
                CÔNG TY CỔ PHẦN TẬP ĐOÀN ĐẦU TƯ HẰNG KỶ
              </p>
            </div>
            <div className="p-5 bg-cream/5 border border-cream/10 rounded-lg">
              <p className="text-gold text-xs uppercase tracking-wider mb-2 font-medium">
                English Name
              </p>
              <p className="font-serif text-lg text-cream leading-relaxed">
                {companyNameFull}
              </p>
            </div>
            <div className="p-5 bg-cream/5 border border-cream/10 rounded-lg">
              <p className="text-gold text-xs uppercase tracking-wider mb-2 font-medium">
                Abbreviation
              </p>
              <p className="font-serif text-lg text-cream">HKIG Jsc</p>
            </div>
            <div className="p-5 bg-cream/5 border border-cream/10 rounded-lg">
              <p className="text-gold text-xs uppercase tracking-wider mb-2 font-medium">
                International Trade Name
              </p>
              <p className="font-serif text-lg text-cream">
                {companyName}
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-8">
            <div className="p-5 bg-cream/5 border border-cream/10 rounded-lg">
              <p className="text-gold text-xs uppercase tracking-wider mb-3 font-medium">
                Verification Contacts
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cream">
                  <Mail
                    className="h-4 w-4 text-cream/70 shrink-0"
                    aria-hidden
                  />
                  <a
                    href="mailto:compliance@hangkyinvestmentgroup.com"
                    className="text-cream hover:text-gold transition-colors underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded"
                  >
                    compliance@hangkyinvestmentgroup.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-cream/70 text-sm">
                  <Phone className="h-4 w-4 shrink-0" aria-hidden />
                  <span>Available upon request</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-lg border border-gold/20">
              <Shield className="w-4 h-4 text-gold" aria-hidden />
              <p className="font-serif text-sm text-gold/90 italic">
                Founded on Absolute Trust
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-24 bg-card" aria-labelledby="documents-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold font-medium text-sm uppercase tracking-wider">
              Corporate Documents
            </span>
            <h2
              id="documents-heading"
              className="font-serif text-3xl sm:text-4xl text-navy mt-4 mb-4"
            >
              Verification Documents
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The following corporate documents are available for verification
              purposes. Please submit a verification request to access these
              documents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {documents.map((doc) => (
              <div
                key={doc.name}
                className="p-6 bg-background border-2 border-border rounded-xl transition-all hover:border-gold/40 hover:shadow-md focus-within:border-gold/40 focus-within:ring-2 focus-within:ring-gold/20 focus-within:ring-offset-2"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-navy/5 rounded-lg shrink-0">
                    <doc.icon className="w-5 h-5 text-navy" aria-hidden />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-navy mb-1.5">
                      {doc.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {doc.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
                  <span className="inline-flex items-center gap-1 text-xs text-gold bg-gold/10 px-2.5 py-1 rounded-lg font-medium">
                    <CheckCircle className="h-3 w-3" aria-hidden />
                    {doc.status}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRequestDocument(doc.name)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-navy bg-navy/5 rounded-lg hover:bg-navy/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                  >
                    Request
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              Documents are shared via secure channel after verification and,
              where applicable, NDA execution.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Links */}
      <section
        className="py-12 bg-cream border-y border-border"
        aria-label="Policy links"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              href="/policies/privacy"
              className="text-navy hover:text-gold transition-colors font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded"
            >
              Privacy Policy
            </Link>
            <span className="text-border" aria-hidden>
              |
            </span>
            <Link
              href="/policies/terms"
              className="text-navy hover:text-gold transition-colors font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded"
            >
              Terms of Use
            </Link>
            <span className="text-border" aria-hidden>
              |
            </span>
            <Link
              href="/policies/cookies"
              className="text-navy hover:text-gold transition-colors font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded"
            >
              Cookie Policy
            </Link>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            By requesting access, you agree to our policies and terms.
          </p>
        </div>
      </section>

      {/* Verification Form */}
      <section
        id="verification-request"
        className="py-24 bg-cream"
        aria-labelledby="verification-form-heading"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold font-medium text-sm uppercase tracking-wider">
              Request Access
            </span>
            <h2
              id="verification-form-heading"
              className="font-serif text-3xl sm:text-4xl text-navy mt-4 mb-4"
            >
              Verification Request
            </h2>
            <p className="text-muted-foreground">
              Submit your verification request and our compliance team will
              respond within 2–3 business days.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-8 bg-card border-2 border-gold/30 rounded-xl text-center shadow-sm">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-gold" aria-hidden />
              </div>
              <h3 className="font-serif text-2xl text-navy mb-3">
                Request Submitted
              </h3>
              <p className="text-muted-foreground mb-6">
                Your verification request has been received. Our compliance team
                will review and respond within 2–3 business days.
              </p>
              <div className="p-4 bg-navy/5 rounded-lg inline-block mb-6">
                <p className="text-xs text-muted-foreground mb-1">
                  Reference ID
                </p>
                <p className="font-mono text-lg text-navy font-semibold">
                  {referenceId}
                </p>
              </div>
              <div className="text-left max-w-md mx-auto mb-6">
                <p className="text-sm font-medium text-navy mb-2">
                  Next steps:
                </p>
                <ul className="space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
                  <li>Our team will review your request</li>
                  <li>We will follow up via email within 2–3 business days</li>
                  <li>Documents will be shared via secure channel</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-cream font-medium rounded-lg hover:bg-navy/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-8 bg-card border-2 border-border rounded-xl shadow-sm"
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="compliance-name"
                      className="flex items-center gap-2 text-sm font-medium text-navy mb-2"
                    >
                      <User className="w-4 h-4" aria-hidden />
                      Full Name *
                    </label>
                    <input
                      id="compliance-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-navy placeholder:text-muted-foreground transition-all focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="compliance-organization"
                      className="flex items-center gap-2 text-sm font-medium text-navy mb-2"
                    >
                      <Briefcase className="w-4 h-4" aria-hidden />
                      Organization *
                    </label>
                    <input
                      id="compliance-organization"
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          organization: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-navy placeholder:text-muted-foreground transition-all focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                      placeholder="Company or institution name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="compliance-email"
                    className="flex items-center gap-2 text-sm font-medium text-navy mb-2"
                  >
                    <Mail className="w-4 h-4" aria-hidden />
                    Business Email *
                  </label>
                  <input
                    id="compliance-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-navy placeholder:text-muted-foreground transition-all focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    placeholder="your.email@company.com"
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Use your institutional email for faster verification.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="compliance-purpose"
                    className="flex items-center gap-2 text-sm font-medium text-navy mb-2"
                  >
                    <Shield className="w-4 h-4" aria-hidden />
                    Verification Purpose *
                  </label>
                  <select
                    id="compliance-purpose"
                    required
                    value={formData.purpose}
                    onChange={(e) =>
                      setFormData({ ...formData, purpose: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-navy transition-all focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  >
                    <option value="">Select purpose...</option>
                    <option value="bank-kyc">Bank KYC/Due Diligence</option>
                    <option value="partner-dd">
                      Business Partner Due Diligence
                    </option>
                    <option value="investor-dd">Investor Due Diligence</option>
                    <option value="regulatory">Regulatory Compliance</option>
                    <option value="other">Other</option>
                  </select>
                  {formData.purpose === "other" && (
                    <div className="mt-3">
                      <label
                        htmlFor="compliance-purpose-other"
                        className="block text-sm font-medium text-navy mb-2"
                      >
                        Specify purpose *
                      </label>
                      <input
                        id="compliance-purpose-other"
                        type="text"
                        required
                        value={formData.purposeOther}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            purposeOther: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-navy placeholder:text-muted-foreground transition-all focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                        placeholder="Please specify..."
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="compliance-message"
                    className="flex items-center gap-2 text-sm font-medium text-navy mb-2"
                  >
                    <MessageSquare className="w-4 h-4" aria-hidden />
                    Additional Information
                  </label>
                  <textarea
                    id="compliance-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-navy placeholder:text-muted-foreground transition-all resize-none focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    placeholder="Please specify the documents you need and any additional context..."
                  />
                </div>

                <div className="p-4 bg-muted/50 border-2 border-border rounded-lg">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="compliance-nda"
                      required
                      checked={formData.ndaAgreed}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ndaAgreed: e.target.checked,
                        })
                      }
                      className="mt-0.5 w-4 h-4 text-gold border-border rounded focus:ring-gold focus:ring-2 focus:ring-offset-2"
                    />
                    <label
                      htmlFor="compliance-nda"
                      className="text-sm text-muted-foreground leading-relaxed"
                    >
                      I agree to maintain confidentiality of any information
                      shared and understand that certain documents may require
                      signing a Non-Disclosure Agreement (NDA) before release. *
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 ml-7">
                    NDA may be required for certain documents.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-navy text-cream font-semibold rounded-lg hover:bg-navy/90 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="h-4 w-4 animate-spin" aria-hidden />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden />
                      Submit Verification Request
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
