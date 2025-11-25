import { HeroSection } from "@/app/(landing)/_components/hero";
import { ProblemSection } from "@/app/(landing)/_components/problem";
import { TerminalSection } from "@/app/(landing)/_components/terminal";
import { FeaturesSection } from "@/app/(landing)/_components/features";
import { ComparisonSection } from "@/app/(landing)/_components/comparison";
import { PricingSection } from "@/app/(landing)/_components/pricing";
import { ScrollProgress } from "@/app/(landing)/_components/shared/scroll-progress";
import { Footer } from "@/app/(landing)/_components/shared/footer";
import { Header } from "@/components/common/header";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ScrollProgress />
      <HeroSection />
      <ProblemSection />
      <TerminalSection />
      <FeaturesSection />
      <ComparisonSection />
      <PricingSection />
      <Footer />
    </main>
  );
}
