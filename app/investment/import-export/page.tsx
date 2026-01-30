import { Metadata } from "next";
import { Ship } from "lucide-react";
import { PillarPage } from "@/components/investment/pillar-page";

export const metadata: Metadata = {
  title: "Import & Export Investments | Eternal Order Investment Group",
  description:
    "Facilitating international trade with a focus on quality goods and reliable logistics.",
};

export default function ImportExportPage() {
  return (
    <PillarPage
      title="Import & Export"
      subtitle="Investment Pillar"
      description="Facilitating international trade with a focus on quality goods and reliable logistics. We invest in companies that bridge global markets efficiently while maintaining the highest standards of compliance and operational excellence."
      icon={Ship}
      whatWeInvest={[
        "Trade facilitation and sourcing companies",
        "Logistics and supply chain solutions",
        "Cross-border e-commerce platforms",
        "Warehousing and distribution networks",
        "Trade finance and documentation",
        "Quality assurance and compliance services",
      ]}
      investmentModels={[
        {
          title: "Operating Company",
          description:
            "Direct investment in trading companies with established supplier relationships and customer networks.",
        },
        {
          title: "Infrastructure Investment",
          description:
            "Investment in logistics infrastructure including warehousing, transportation, and distribution.",
        },
        {
          title: "Technology Platform",
          description:
            "Backing technology solutions that digitize and streamline trade operations.",
        },
      ]}
      valueCreation={[
        {
          title: "Network Expansion",
          description:
            "Expanding supplier and customer networks across key trading corridors and markets.",
        },
        {
          title: "Operational Efficiency",
          description:
            "Implementing technology and processes to reduce costs and improve service levels.",
        },
        {
          title: "Compliance Excellence",
          description:
            "Strengthening compliance frameworks to ensure smooth operations across jurisdictions.",
        },
        {
          title: "Working Capital Optimization",
          description:
            "Improving capital efficiency through better inventory management and trade finance.",
        },
      ]}
      opportunities={[
        {
          title: "Trade & Sourcing Company",
          description:
            "Established trading company with strong supplier relationships seeking growth capital.",
          metrics: [
            "Revenue: $20M+",
            "Diversified customer base",
            "Profitable operations",
          ],
        },
        {
          title: "Logistics Platform",
          description:
            "Technology platform optimizing cross-border logistics and customs clearance.",
          metrics: [
            "Growing transaction volume",
            "Technology-enabled",
            "Regulatory expertise",
          ],
        },
        {
          title: "Distribution Network",
          description:
            "Regional distribution company with infrastructure in key markets.",
          metrics: [
            "Strategic locations",
            "Established operations",
            "Expansion potential",
          ],
        },
      ]}
    />
  );
}
