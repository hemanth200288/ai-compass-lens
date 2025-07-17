import { Shield, Zap, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center mb-8 animate-fade-in">
            <Shield className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              KnackHook
            </h1>
          </div>

          {/* Main headline */}
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-slide-up">
            Responsible AI
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Protection Layer
            </span>
          </h2>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Integrate our AI safety software with your existing models to prevent hallucinations, 
            reduce legal risks, and ensure responsible AI behavior.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-soft">
              <CheckCircle className="h-5 w-5 text-ai-safe" />
              <span className="text-sm font-medium">Legal Compliance</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-soft">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">AI Safety</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-soft">
              <Zap className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Easy Integration</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300 px-8 py-6 text-lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Learn More
            </Button>
          </div>

          {/* AI Protection visualization */}
          <div className="mt-16 relative animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <div className="flex items-center justify-center space-x-8">
              {/* Before - Risky AI */}
              <div className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-ai-warning/20 rounded-full flex items-center justify-center mb-3 mx-auto">
                    <AlertTriangle className="h-8 w-8 text-ai-warning" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-ai-warning rounded-full animate-pulse"></div>
                </div>
                <p className="text-sm text-muted-foreground">Unprotected AI</p>
                <p className="text-xs text-ai-warning">Risk of hallucinations</p>
              </div>

              {/* Arrow */}
              <div className="flex-1 max-w-20">
                <div className="h-px bg-gradient-to-r from-ai-warning to-ai-safe"></div>
                <p className="text-center text-xs text-primary mt-1 font-medium">KnackHook</p>
              </div>

              {/* After - Protected AI */}
              <div className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-ai-safe/20 rounded-full flex items-center justify-center mb-3 mx-auto animate-ai-shield">
                    <Shield className="h-8 w-8 text-ai-safe" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-ai-safe rounded-full">
                    <CheckCircle className="h-6 w-6 text-background" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Protected AI</p>
                <p className="text-xs text-ai-safe">Responsible responses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;