import { Shield, Zap, Brain, CheckCircle, AlertTriangle, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      icon: Zap,
      title: "Easy Integration",
      description: "Connect KnackHook to your existing AI models with minimal code changes",
      detail: "Simple API integration that works with any AI model or platform"
    },
    {
      icon: Filter,
      title: "Real-time Analysis",
      description: "Our AI safety layer analyzes responses before they reach users",
      detail: "Advanced filtering detects potential hallucinations and harmful content"
    },
    {
      icon: Shield,
      title: "Risk Prevention",
      description: "Automatically block or modify responses that could cause legal issues",
      detail: "Protect your business from liability while maintaining AI functionality"
    },
    {
      icon: CheckCircle,
      title: "Trusted Output",
      description: "Deliver responsible, verified AI responses to your users",
      detail: "Build user trust with consistently reliable AI interactions"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How KnackHook
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Protects </span>
            Your AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our responsible AI layer seamlessly integrates with your existing systems to 
            prevent hallucinations and ensure legal compliance.
          </p>
        </div>

        {/* Process Flow */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="relative group hover:shadow-medium transition-all duration-300 bg-gradient-card border-border/50">
                <CardContent className="p-6 text-center">
                  {/* Step number */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground mb-3">{step.description}</p>
                  <p className="text-sm text-primary font-medium">{step.detail}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Integration Example */}
        <div className="bg-card rounded-2xl p-8 shadow-soft border border-border/50">
          <h3 className="text-2xl font-bold text-center mb-8">AI Response Flow</h3>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* User Input */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-muted-foreground" />
              </div>
              <h4 className="font-semibold mb-2">User Query</h4>
              <p className="text-sm text-muted-foreground">User asks AI a question</p>
            </div>

            {/* Arrow */}
            <div className="flex items-center">
              <div className="w-8 h-px bg-border"></div>
              <div className="w-2 h-2 bg-border rounded-full mx-2"></div>
              <div className="w-8 h-px bg-border"></div>
            </div>

            {/* AI Processing */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-ai-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-ai-warning" />
              </div>
              <h4 className="font-semibold mb-2">AI Response</h4>
              <p className="text-sm text-muted-foreground">May contain hallucinations</p>
            </div>

            {/* Arrow */}
            <div className="flex items-center">
              <div className="w-8 h-px bg-border"></div>
              <div className="w-2 h-2 bg-border rounded-full mx-2"></div>
              <div className="w-8 h-px bg-border"></div>
            </div>

            {/* KnackHook Processing */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">KnackHook Filter</h4>
              <p className="text-sm text-muted-foreground">Analyzes & protects</p>
            </div>

            {/* Arrow */}
            <div className="flex items-center">
              <div className="w-8 h-px bg-border"></div>
              <div className="w-2 h-2 bg-border rounded-full mx-2"></div>
              <div className="w-8 h-px bg-border"></div>
            </div>

            {/* Safe Output */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-ai-safe/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-ai-safe" />
              </div>
              <h4 className="font-semibold mb-2">Safe Response</h4>
              <p className="text-sm text-muted-foreground">Verified & responsible</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;