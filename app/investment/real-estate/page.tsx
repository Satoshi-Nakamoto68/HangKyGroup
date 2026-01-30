import { Metadata } from "next";
import { Home } from "lucide-react";
import { PillarPage } from "@/components/investment/pillar-page";

export const metadata: Metadata = {
  title: "Real Estate Investments | Eternal Order Investment Group",
  description:
    "Strategic property investments in commercial, residential, and mixed-use developments.",
};

export default function RealEstatePage() {
  return (
    <PillarPage
      title="Real Estate"
      subtitle="Investment Pillar"
      description="Strategic property investments in commercial, residential, and mixed-use developments across key markets. We take a disciplined approach to real estate investing, focusing on quality assets in prime locations with strong long-term fundamentals."
      icon={Home}
      whatWeInvest={[
        "Commercial office and retail properties",
        "Residential development projects",
        "Mixed-use developments",
        "Industrial and logistics properties",
        "Hospitality and service apartments",
        "Real estate operating platforms",
      ]}
      investmentModels={[
        {
          title: "Direct Investment",
          description:
            "Direct acquisition of stabilized properties with value-add potential through active management.",
        },
        {
          title: "Development Partnership",
          description:
            "Partnering with experienced developers on new construction and repositioning projects.",
        },
        {
          title: "Platform Investment",
          description:
            "Investment in real estate operating companies and property management platforms.",
        },
      ]}
      valueCreation={[
        {
          title: "Asset Management",
          description:
            "Active management to optimize occupancy, rental income, and operational efficiency.",
        },
        {
          title: "Development Execution",
          description:
            "Disciplined project management ensuring quality delivery on time and within budget.",
        },
        {
          title: "Capital Optimization",
          description:
            "Structuring capital efficiently and managing refinancing to enhance returns.",
        },
        {
          title: "Strategic Positioning",
          description:
            "Repositioning assets to capture emerging trends and changing market demands.",
        },
      ]}
      opportunities={[
        {
          title: "Commercial Property",
          description:
            "Quality office or retail property in prime location with stable tenancy and upside potential.",
          metrics: [
            "Prime location",
            "Quality tenants",
            "Value-add potential",
          ],
        },
        {
          title: "Development Project",
          description:
            "Residential or mixed-use development in growing market with experienced development partner.",
          metrics: [
            "Strong location",
            "Clear approvals path",
            "Experienced developer",
          ],
        },
        {
          title: "Industrial/Logistics",
          description:
            "Modern logistics or industrial property serving growing e-commerce and supply chain demand.",
          metrics: [
            "Strategic location",
            "Modern specifications",
            "Long-term demand",
          ],
        },
      ]}
    />
  );
}
