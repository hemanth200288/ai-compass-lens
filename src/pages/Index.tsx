import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import TrustSection from "@/components/TrustSection";

const Index = () => {
  return (
    <SmoothScroll>
      <div className="min-h-screen">
        <Hero />
        <HowItWorks />
        <TrustSection />
      </div>
    </SmoothScroll>
  );
};

export default Index;
