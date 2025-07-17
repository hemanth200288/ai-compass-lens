import { Shield, Lock, Scale, Zap, CheckCircle, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TrustSection = () => {
  const trustFactors = [
    {
      icon: Scale,
      title: "Legal Compliance",
      description: "Built with legal frameworks in mind to protect your business from AI-related liability",
      stats: "99.9% Risk Reduction"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security ensures your AI interactions remain private and secure",
      stats: "SOC 2 Certified"
    },
    {
      icon: Lock,
      title: "Data Protection",
      description: "Zero data retention policy - your AI conversations stay private",
      stats: "GDPR Compliant"
    },
    {
      icon: Users,
      title: "Trusted by Teams",
      description: "Leading organizations rely on KnackHook for responsible AI deployment",
      stats: "500+ Companies"
    }
  ];

  const features = [
    "Real-time hallucination detection",
    "Automated bias filtering",
    "Legal risk assessment",
    "Compliance monitoring",
    "Response verification",
    "Audit trail logging"
  ];

  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Trust </span>
            KnackHook?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We understand the critical importance of AI safety. Our solution is designed 
            with enterprise-grade security and legal compliance at its core.
          </p>
        </div>

        {/* Trust Factors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustFactors.map((factor, index) => {
            const Icon = factor.icon;
            return (
              <Card key={index} className="group hover:shadow-medium transition-all duration-300 bg-card border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{factor.title}</h3>
                  <p className="text-muted-foreground mb-3 text-sm">{factor.description}</p>
                  <div className="text-primary font-bold text-sm">{factor.stats}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features and Visual */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Comprehensive AI Safety Features
            </h3>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-ai-safe flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-card rounded-lg border border-border/50">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="h-6 w-6 text-accent" />
                <h4 className="font-semibold text-foreground">Lightning Fast</h4>
              </div>
              <p className="text-muted-foreground">
                Add AI safety without compromising performance. Our optimized algorithms 
                add less than 50ms to response times.
              </p>
            </div>
          </div>

          <div className="relative">
            {/* AI Safety Visualization */}
            <div className="bg-gradient-card rounded-2xl p-8 shadow-strong">
              <div className="text-center mb-6">
                <h4 className="text-xl font-semibold text-foreground mb-2">AI Safety Dashboard</h4>
                <p className="text-muted-foreground text-sm">Real-time monitoring</p>
              </div>
              
              {/* Mock dashboard elements */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <span className="text-sm text-foreground">Hallucination Detection</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-ai-safe rounded-full animate-pulse"></div>
                    <span className="text-xs text-ai-safe font-medium">Active</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <span className="text-sm text-foreground">Legal Risk Score</span>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-2 bg-ai-neutral rounded-full overflow-hidden">
                      <div className="w-1/4 h-full bg-ai-safe"></div>
                    </div>
                    <span className="text-xs text-ai-safe font-medium">Low</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <span className="text-sm text-foreground">Responses Filtered</span>
                  <span className="text-xs text-primary font-medium">2,847 today</span>
                </div>
              </div>
              
              {/* Shield visualization */}
              <div className="mt-6 flex justify-center">
                <div className="relative">
                  <Shield className="h-16 w-16 text-primary animate-ai-shield" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;