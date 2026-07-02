import { Hero } from "@/components/Hero";
import { FeaturedListings } from "@/components/FeaturedListings";
import { TrustSection } from "@/components/TrustSection";
import { CalculatorBand } from "@/components/CalculatorBand";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedListings />
      <TrustSection />
      <CalculatorBand />
    </>
  );
}
