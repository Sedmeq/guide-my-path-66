import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <footer className="py-12 text-center text-muted-foreground text-sm border-t border-border">
        <p>© 2026 PathFinder AI · Discover your future, powered by AI</p>
      </footer>
    </div>
  );
};

export default Index;
