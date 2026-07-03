import { Hero } from "@/components/Hero";
import { CommunityTiles } from "@/components/CommunityTiles";
import { FeaturedListings } from "@/components/FeaturedListings";
import { FeaturedRentals } from "@/components/FeaturedRentals";
import { AgentSpotlight } from "@/components/AgentSpotlight";
import { TrustSection } from "@/components/TrustSection";
import { Testimonials } from "@/components/Testimonials";
import { CalculatorBand } from "@/components/CalculatorBand";

export default function Home() {
  return (
    <>
      <Hero />
      <CommunityTiles />
      <FeaturedListings />
      <FeaturedRentals />
      <AgentSpotlight />
      <TrustSection />
      <Testimonials />
      <CalculatorBand />
    </>
  );
}
