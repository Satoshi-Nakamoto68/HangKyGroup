import { Metadata } from "next";
import { Shirt } from "lucide-react";
import { PillarPage } from "@/components/investment/pillar-page";

export const metadata: Metadata = {
  title: "Fashion Investments | Hang Ky Investment Group",
  description:
    "Strategic investments in apparel, luxury goods, and lifestyle brands with global growth potential.",
};

export default function FashionPage() {
  return (
    <PillarPage
      title="Fashion Investments"
      subtitle="Investment Pillar"
      description="We invest in apparel, luxury goods, and lifestyle brands that combine strong brand equity with scalable business models and clear paths to international expansion. Our focus is on companies with differentiated positioning, sustainable supply chains, and the ability to capture value across omnichannel and direct-to-consumer channels."
      icon={Shirt}
      heroStats={[
        "Global brand building",
        "Omnichannel growth",
        "Sustainable value",
        "Luxury & lifestyle",
      ]}
      whatWeInvest={[
        "Luxury and premium apparel brands with defensible positioning",
        "Sustainable and ethical fashion companies with traceable supply chains",
        "Fashion e-commerce platforms and curated marketplaces",
        "Lifestyle and accessories brands with strong repeat purchase dynamics",
        "Fashion technology and innovation (fit, personalisation, logistics)",
        "Manufacturing and supply chain excellence (vertical integration, speed to market)",
      ]}
      investmentModels={[
        {
          title: "Minority Stake",
          description:
            "Strategic minority investments in established brands seeking growth capital and operational expertise. We provide patient capital and governance support while preserving founder-led culture where appropriate.",
        },
        {
          title: "Majority Control",
          description:
            "Control positions in brands ready for transformation, international expansion, or operational scaling. We work alongside management to implement best practices and accelerate value creation.",
        },
        {
          title: "Partnership",
          description:
            "Joint ventures and strategic partnerships for market entry, product development, or channel expansion. We bring capital, governance, and network access; partners bring category expertise and operational execution.",
        },
      ]}
      valueCreation={[
        {
          title: "Brand Strategy",
          description:
            "Refining brand positioning, visual identity, and narrative to expand market presence. We support strategic marketing, wholesale and retail distribution, and customer acquisition that builds long-term brand value.",
        },
        {
          title: "Operational Excellence",
          description:
            "Implementing best practices in supply chain, inventory management, and retail operations. We focus on speed, quality, and cost efficiency without compromising sustainability or brand integrity.",
        },
        {
          title: "Digital Transformation",
          description:
            "Building e-commerce capabilities, data-driven merchandising, and technology-led customer engagement. We invest in platforms and talent that enable omnichannel growth and repeat purchase behaviour.",
        },
        {
          title: "International Expansion",
          description:
            "Supporting entry into new markets through our network, local partnerships, and market insight. We help portfolio companies navigate regulatory, logistical, and cultural considerations for sustainable cross-border growth.",
        },
      ]}
      opportunities={[
        {
          title: "Premium Lifestyle Brand",
          description:
            "Established brand with a loyal customer base and strong gross margins, seeking growth capital for international expansion and digital acceleration. Clear path to category leadership in key segments.",
          metrics: [
            "Revenue: $10M–50M",
            "EBITDA positive",
            "Strong brand recognition",
          ],
        },
        {
          title: "Sustainable Fashion Platform",
          description:
            "E-commerce platform connecting conscious consumers with verified sustainable fashion brands. Growing GMV, repeat purchase rates, and clear unit economics with potential for category expansion.",
          metrics: ["GMV: $5M+", "Growing user base", "Clear unit economics"],
        },
        {
          title: "Fashion Tech Solution",
          description:
            "Technology solution addressing key industry challenges in supply chain visibility, fit and sizing, or customer experience. Proven product with enterprise or scaled SMB adoption and a defensible roadmap.",
          metrics: ["Proven product", "Enterprise customers", "Scalable model"],
        },
      ]}
    />
  );
}
