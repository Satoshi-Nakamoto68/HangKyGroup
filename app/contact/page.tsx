"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  User,
  Briefcase,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Handshake,
  TrendingUp,
  Newspaper,
  HelpCircle,
  Clock,
  Send,
  Shield,
} from "lucide-react";

const inquiryTypes = [
  {
    id: "partnership",
    label: "Partnership Inquiry",
    description: "Explore strategic partnership opportunities with our group.",
    icon: Handshake,
    subjectTemplate: "Partnership inquiry",
  },
  {
    id: "investment",
    label: "Investment Proposal",
    description: "Submit an investment opportunity for our consideration.",
    icon: TrendingUp,
    subjectTemplate: "Investment proposal",
  },
  {
    id: "media",
    label: "Media Request",
    description: "Press inquiries and media interview requests.",
    icon: Newspaper,
    subjectTemplate: "Media request",
  },
  {
    id: "general",
    label: "General Inquiry",
    description: "Other questions or information requests.",
    icon: HelpCircle,
    subjectTemplate: "General inquiry",
  },
];

const trustChips = [
  "Partnership & diligence",
  "Response in 2–3 business days",
  "Confidential handling",
  "Official channels",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "",
    subject: "",
    message: "",
    investmentDetail: "",
    mediaOutlet: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInquiryTypeSelect = (typeId: string) => {
    const type = inquiryTypes.find((t) => t.id === typeId);
    setFormData((prev) => ({
      ...prev,
      inquiryType: typeId,
      subject: prev.subject || type?.subjectTemplate || "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      company: "",
      inquiryType: "",
      subject: "",
      message: "",
      investmentDetail: "",
      mediaOutlet: "",
    });
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative py-20 sm:py-24 lg:py-28 overflow-hidden"
        aria-labelledby="contact-hero-heading"
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
            Get in Touch
          </p>
          <h1
            id="contact-hero-heading"
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-navy mt-2 mb-6 text-balance"
          >
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
            We welcome inquiries from potential partners, investors, and
            stakeholders. Our team responds to all official inquiries through
            verified channels.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {trustChips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-navy/5 border border-navy/10 text-navy text-sm font-medium"
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 shrink-0" aria-hidden />
            <span>
              Preferred contact:{" "}
              <a
                href="mailto:contact@hangkyinvest.com"
                className="text-navy hover:text-gold underline underline-offset-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded"
              >
                contact@hangkyinvest.com
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* Inquiry Type Selection */}
      <section
        className="py-12 bg-card border-y border-border"
        aria-labelledby="inquiry-types-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            id="inquiry-types-heading"
            className="text-sm text-muted-foreground mb-4 text-center"
          >
            Select an inquiry type to route your message.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {inquiryTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = formData.inquiryType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleInquiryTypeSelect(type.id)}
                  aria-pressed={isSelected}
                  className={`text-left p-6 rounded-lg border-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
                    isSelected
                      ? "bg-navy text-cream border-navy shadow-md"
                      : "bg-background border-border hover:border-gold/40 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon
                      className={`h-5 w-5 shrink-0 ${
                        isSelected ? "text-gold" : "text-navy"
                      }`}
                      aria-hidden
                    />
                    <h3
                      className={`font-semibold ${
                        isSelected ? "text-cream" : "text-navy"
                      }`}
                    >
                      {type.label}
                    </h3>
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      isSelected ? "text-cream/80" : "text-muted-foreground"
                    }`}
                  >
                    {type.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section
        className="py-24 bg-cream"
        aria-labelledby="contact-form-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2
                id="contact-info-heading"
                className="font-serif text-2xl text-navy mb-8"
              >
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-navy/5 rounded-lg shrink-0">
                    <Mail className="w-5 h-5 text-navy" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-navy mb-1">Email</p>
                    <a
                      href="mailto:contact@hangkyinvest.com"
                      className="text-muted-foreground hover:text-gold transition-colors underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded"
                    >
                      contact@hangkyinvest.com
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">
                      For official inquiries and verification requests.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-navy/5 rounded-lg shrink-0">
                    <Phone className="w-5 h-5 text-navy" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-navy mb-1">Phone</p>
                    <a
                      href="tel:+84123456789"
                      className="text-muted-foreground hover:text-gold transition-colors underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded"
                    >
                      +84 XXX XXX XXX
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">
                      Business hours only.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-navy/5 rounded-lg shrink-0">
                    <MapPin className="w-5 h-5 text-navy" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-navy mb-1">Address</p>
                    <p className="text-muted-foreground text-sm">
                      Office Address
                    </p>
                    <p className="text-muted-foreground text-sm">
                      City, Vietnam
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      By appointment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Confidentiality Notice */}
              <div className="mt-8 p-5 bg-muted/50 border-2 border-border rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield
                    className="h-5 w-5 text-navy shrink-0 mt-0.5"
                    aria-hidden
                  />
                  <div>
                    <p className="text-sm font-medium text-navy mb-1">
                      Confidentiality
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Do not send sensitive documents via this form. We will
                      provide a secure channel when needed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="mt-8 p-6 bg-card border-2 border-border rounded-lg">
                <h3 className="font-medium text-navy mb-4">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Monday - Friday
                    </span>
                    <span className="text-navy font-medium">
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="text-navy font-medium">
                      By appointment
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="text-navy font-medium">Closed</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Time zone: GMT+7 (Vietnam)
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {isSubmitted ? (
                <div className="p-10 bg-card border-2 border-gold/30 rounded-xl text-center shadow-sm">
                  <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-gold" aria-hidden />
                  </div>
                  <h3 className="font-serif text-3xl text-navy mb-4">
                    Message Sent
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Thank you for contacting Hang Ky Investment Group. Our team
                    will review your inquiry and respond within 2–3 business
                    days.
                  </p>
                  <div className="text-left max-w-md mx-auto mb-8">
                    <p className="text-sm font-medium text-navy mb-2">
                      What happens next:
                    </p>
                    <ul className="space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
                      <li>Our team will review your inquiry</li>
                      <li>We will route it to the appropriate department</li>
                      <li>
                        You will receive a response within 2–3 business days
                      </li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-navy text-navy font-semibold rounded-lg hover:bg-navy hover:text-cream transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                  >
                    Send another message
                    <ArrowRight className="w-4 h-4" aria-hidden />
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-8 bg-card border-2 border-border rounded-xl shadow-sm"
                >
                  <h2
                    id="contact-form-heading"
                    className="font-serif text-2xl text-navy mb-6"
                  >
                    Send Us a Message
                  </h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="flex items-center gap-2 text-sm font-medium text-navy mb-2"
                        >
                          <User className="w-4 h-4" aria-hidden />
                          Full Name *
                        </label>
                        <input
                          id="contact-name"
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
                          htmlFor="contact-email"
                          className="flex items-center gap-2 text-sm font-medium text-navy mb-2"
                        >
                          <Mail className="w-4 h-4" aria-hidden />
                          Business Email *
                        </label>
                        <input
                          id="contact-email"
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
                          Use your institutional email for faster routing.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="contact-company"
                          className="flex items-center gap-2 text-sm font-medium text-navy mb-2"
                        >
                          <Briefcase className="w-4 h-4" aria-hidden />
                          Company/Organization
                        </label>
                        <input
                          id="contact-company"
                          type="text"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-navy placeholder:text-muted-foreground transition-all focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                          placeholder="Company name (optional)"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-inquiry-type"
                          className="flex items-center gap-2 text-sm font-medium text-navy mb-2"
                        >
                          Inquiry Type
                          {!formData.inquiryType && (
                            <span className="text-xs text-muted-foreground font-normal">
                              (recommended)
                            </span>
                          )}
                        </label>
                        <select
                          id="contact-inquiry-type"
                          value={formData.inquiryType}
                          onChange={(e) =>
                            handleInquiryTypeSelect(e.target.value)
                          }
                          className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-navy transition-all focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                        >
                          <option value="">Select type...</option>
                          {inquiryTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                        {!formData.inquiryType && (
                          <p className="text-xs text-muted-foreground mt-1.5">
                            Selecting an inquiry type helps us route your
                            message more efficiently.
                          </p>
                        )}
                      </div>
                    </div>

                    {formData.inquiryType === "investment" && (
                      <div>
                        <label
                          htmlFor="contact-investment-detail"
                          className="block text-sm font-medium text-navy mb-2"
                        >
                          Industry / sector (optional)
                        </label>
                        <input
                          id="contact-investment-detail"
                          type="text"
                          value={formData.investmentDetail}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              investmentDetail: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-navy placeholder:text-muted-foreground transition-all focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                          placeholder="e.g., Technology, Fashion, Real Estate"
                        />
                      </div>
                    )}

                    {formData.inquiryType === "media" && (
                      <div>
                        <label
                          htmlFor="contact-media-outlet"
                          className="block text-sm font-medium text-navy mb-2"
                        >
                          Publication / outlet (optional)
                        </label>
                        <input
                          id="contact-media-outlet"
                          type="text"
                          value={formData.mediaOutlet}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              mediaOutlet: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-navy placeholder:text-muted-foreground transition-all focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                          placeholder="e.g., Financial Times, Bloomberg"
                        />
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="flex items-center gap-2 text-sm font-medium text-navy mb-2"
                      >
                        Subject *
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-navy placeholder:text-muted-foreground transition-all focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                        placeholder="Brief subject of your inquiry"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="flex items-center gap-2 text-sm font-medium text-navy mb-2"
                      >
                        <MessageSquare className="w-4 h-4" aria-hidden />
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={6}
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-navy placeholder:text-muted-foreground transition-all resize-none focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                        placeholder="Please provide details about your inquiry..."
                      />
                    </div>

                    <div className="p-4 bg-muted/50 border-2 border-border rounded-lg">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="contact-privacy"
                          required
                          className="mt-0.5 w-4 h-4 text-gold border-border rounded focus:ring-gold focus:ring-2 focus:ring-offset-2"
                        />
                        <label
                          htmlFor="contact-privacy"
                          className="text-sm text-muted-foreground leading-relaxed"
                        >
                          I agree to the{" "}
                          <a
                            href="/policies/privacy"
                            className="text-navy hover:text-gold underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded"
                          >
                            Privacy Policy
                          </a>{" "}
                          and consent to Hang Ky Investment Group processing my
                          data for the purpose of responding to this inquiry. *
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-4 bg-navy text-cream font-semibold rounded-lg hover:bg-navy/90 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="h-4 w-4 animate-spin" aria-hidden />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" aria-hidden />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
