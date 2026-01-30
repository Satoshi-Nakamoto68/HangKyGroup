import { Metadata } from "next";
import { Cpu } from "lucide-react";
import { PillarPage } from "@/components/investment/pillar-page";

export const metadata: Metadata = {
  title: "Technology Investments | Eternal Order Investment Group",
  description:
    "Backing innovative technology companies driving digital transformation across industries.",
};

export default function TechnologyPage() {
  return (
    <PillarPage
      title="Technology Investments"
      subtitle="Investment Pillar"
      description="Backing innovative technology companies driving digital transformation across industries. We invest in scalable technology businesses with strong fundamentals, experienced teams, and clear paths to market leadership."
      icon={Cpu}
      whatWeInvest={[
        "Enterprise software and SaaS platforms",
        "Fintech and payment solutions",
        "AI, machine learning, and automation",
        "Cybersecurity and data privacy",
        "Cloud infrastructure and services",
        "Emerging technology applications",
      ]}
      investmentModels={[
        {
          title: "Growth Equity",
          description:
            "Providing growth capital to scaling technology companies with proven products and revenue.",
        },
        {
          title: "Strategic Investment",
          description:
            "Investments aligned with portfolio synergies and strategic objectives across our sectors.",
        },
        {
          title: "Platform Building",
          description:
            "Acquiring and combining complementary technology businesses to create market leaders.",
        },
      ]}
      valueCreation={[
        {
          title: "Go-to-Market Strategy",
          description:
            "Accelerating growth through refined sales strategies, channel development, and market expansion.",
        },
        {
          title: "Product Development",
          description:
            "Supporting R&D investment and product roadmap execution to maintain competitive advantage.",
        },
        {
          title: "Talent & Organization",
          description:
            "Building world-class teams through executive recruitment and organizational development.",
        },
        {
          title: "Strategic Partnerships",
          description:
            "Leveraging our network to create partnerships that accelerate growth and market access.",
        },
      ]}
      opportunities={[
        {
          title: "Enterprise SaaS Platform",
          description:
            "B2B software company with strong product-market fit seeking capital for sales expansion.",
          metrics: [
            "ARR: $5M-25M",
            "Net revenue retention 100%+",
            "Capital efficient growth",
          ],
        },
        {
          title: "Fintech Infrastructure",
          description:
            "Payment or financial infrastructure company serving underserved markets or segments.",
          metrics: [
            "Transaction volume growing",
            "Regulatory compliance",
            "Scalable technology",
          ],
        },
        {
          title: "AI/ML Application",
          description:
            "Applied AI company solving real business problems with measurable ROI for customers.",
          metrics: [
            "Proven use cases",
            "Enterprise customers",
            "Defensible technology",
          ],
        },
      ]}
    />
  );
}
