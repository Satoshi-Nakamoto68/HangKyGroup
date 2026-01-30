import { HeroSection } from "@/components/home/hero-section";
import { PillarsSection } from "@/components/home/pillars-section";
import { TrustSection } from "@/components/home/trust-section";
import { CtaSection } from "@/components/home/cta-section";
import { MissionSection } from "@/components/home/mission-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <PillarsSection />
      <TrustSection />
      <CtaSection />
    </>
  );
}
