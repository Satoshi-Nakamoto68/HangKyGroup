import { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import { PillarPage } from "@/components/investment/pillar-page";

export const metadata: Metadata = {
  title: "Marketing & Growth Investments | Eternal Order Investment Group",
  description:
    "Investing in agencies and platforms that drive brand growth and market expansion.",
};

export default function MarketingPage() {
  return (
    <PillarPage
      title="Marketing & Growth"
      subtitle="Investment Pillar"
      description="Investing in agencies and platforms that drive brand growth and market expansion through innovative marketing strategies. We back companies that help businesses reach their audiences effectively in an increasingly digital world."
      icon={TrendingUp}
      whatWeInvest={[
        "Digital marketing agencies",
        "Brand development and creative services",
        "Performance marketing and growth agencies",
        "Marketing technology platforms",
        "Content and media companies",
        "Influencer and social media marketing",
      ]}
      investmentModels={[
        {
          title: "Agency Platform",
          description:
            "Building diversified marketing services groups through platform acquisitions and add-ons.",
        },
        {
          title: "Technology Investment",
          description:
            "Investing in marketing technology that enables more effective customer acquisition and engagement.",
        },
        {
          title: "Growth Partnership",
          description:
            "Providing capital and operational support to rapidly scaling agencies and platforms.",
        },
      ]}
      valueCreation={[
        {
          title: "Service Integration",
          description:
            "Creating integrated marketing solutions that address full client needs and increase wallet share.",
        },
        {
          title: "Technology Enablement",
          description:
            "Implementing technology to improve efficiency, measurement, and client outcomes.",
        },
        {
          title: "Talent Attraction",
          description:
            "Building employer brand and culture to attract and retain top creative and strategic talent.",
        },
        {
          title: "Client Development",
          description:
            "Expanding client relationships and developing new business through systematic sales processes.",
        },
      ]}
      opportunities={[
        {
          title: "Digital Marketing Agency",
          description:
            "Full-service digital agency with strong client relationships and specialized capabilities.",
          metrics: [
            "Revenue: $5M-25M",
            "High retention",
            "Diversified clients",
          ],
        },
        {
          title: "Marketing Technology",
          description:
            "Platform enabling better marketing performance, measurement, or automation.",
          metrics: [
            "Growing SaaS revenue",
            "Product-market fit",
            "Scalable technology",
          ],
        },
        {
          title: "Content & Media",
          description:
            "Content creation or media company with engaged audience and monetization potential.",
          metrics: [
            "Growing audience",
            "Engagement metrics",
            "Revenue diversification",
          ],
        },
      ]}
    />
  );
}
