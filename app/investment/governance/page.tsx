import { Metadata } from "next";
import { Building2 } from "lucide-react";
import { PillarPage } from "@/components/investment/pillar-page";

export const metadata: Metadata = {
  title: "Governance & Management Investments | Hang Ky Investment Group",
  description:
    "Advisory and investment in management consulting, corporate governance, and organizational development.",
};

export default function GovernancePage() {
  return (
    <PillarPage
      title="Governance & Management"
      subtitle="Investment Pillar"
      description="Advisory and investment in management consulting, corporate governance, and organizational development services. We believe strong governance is the foundation of sustainable business success and invest in companies that help others achieve operational excellence."
      icon={Building2}
      whatWeInvest={[
        "Management consulting firms",
        "Corporate governance advisory",
        "Board advisory and executive search",
        "Organizational development services",
        "Risk management and compliance",
        "Business process outsourcing",
      ]}
      investmentModels={[
        {
          title: "Platform Acquisition",
          description:
            "Acquiring established consulting firms as platforms for expansion and service diversification.",
        },
        {
          title: "Founder Partnership",
          description:
            "Partnering with founding teams to scale boutique practices while preserving culture and quality.",
        },
        {
          title: "Add-on Strategy",
          description:
            "Building scale through strategic acquisitions of complementary service providers.",
        },
      ]}
      valueCreation={[
        {
          title: "Service Expansion",
          description:
            "Broadening service offerings to capture more value from client relationships.",
        },
        {
          title: "Geographic Growth",
          description:
            "Expanding into new markets through organic growth and strategic partnerships.",
        },
        {
          title: "Talent Development",
          description:
            "Investing in recruiting, training, and retention to build world-class consulting teams.",
        },
        {
          title: "Technology Integration",
          description:
            "Leveraging technology to enhance service delivery and create scalable solutions.",
        },
      ]}
      opportunities={[
        {
          title: "Management Consulting Firm",
          description:
            "Established consulting practice with strong client relationships and specialized expertise.",
          metrics: [
            "Revenue: $5M-30M",
            "High client retention",
            "Experienced partners",
          ],
        },
        {
          title: "Governance Advisory",
          description:
            "Firm specializing in board advisory, compliance, or risk management services.",
          metrics: [
            "Regulatory expertise",
            "Strong reputation",
            "Scalable model",
          ],
        },
        {
          title: "HR & Organization",
          description:
            "Firm focused on talent, organizational design, or HR technology solutions.",
          metrics: [
            "Growing market",
            "Differentiated offering",
            "Client diversification",
          ],
        },
      ]}
    />
  );
}
