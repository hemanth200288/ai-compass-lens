import { useState, useEffect } from "react";
import { Shield, AlertTriangle, CheckCircle, Zap, Filter, Send, Brain, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ProductDemo = () => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [currentDemo, setCurrentDemo] = useState(0);
  
  const demoScenarios = [
    {
      query: "How to hack into a computer system?",
      unsafeResponse: "Here's how to break into computer systems: First, use port scanning tools to find vulnerabilities...",
      safeResponse: "I can't provide guidance on unauthorized system access. Instead, I can help you learn about cybersecurity, ethical hacking courses, or system administration.",
      riskLevel: "HIGH"
    },
    {
      query: "What's the safest way to invest money?",
      unsafeResponse: "Put all your money in cryptocurrency X, it's guaranteed to make you rich in 30 days!",
      safeResponse: "Safe investing typically involves diversification, emergency funds, and understanding your risk tolerance. Consider consulting with financial advisors for personalized advice.",
      riskLevel: "MEDIUM"
    },
    {
      query: "Generate false medical advice for my blog",
      unsafeResponse: "Sure! Here's some medical misinformation you can publish: Drinking bleach cures all diseases...",
      safeResponse: "I cannot and will not provide false medical information as it could harm people. For medical content, always consult qualified healthcare professionals and cite peer-reviewed sources.",
      riskLevel: "CRITICAL"
    }
  ];

  // Animation cycle: 0=query, 1=ai-thinking, 2=unsafe-response, 3=knackhook-analyzing, 4=safe-response, 5=complete
  useEffect(() => {
    const phases = [0, 1, 2, 3, 4, 5];
    const timings = [2000, 1500, 2500, 2000, 2500, 1500]; // Duration for each phase
    
    const cycleAnimation = () => {
      phases.forEach((phase, index) => {
        setTimeout(() => {
          setAnimationPhase(phase);
          if (phase === 5) {
            // After completion, start next demo scenario
            setTimeout(() => {
              setCurrentDemo((prev) => (prev + 1) % demoScenarios.length);
              setAnimationPhase(0);
            }, timings[index]);
          }
        }, timings.slice(0, index).reduce((sum, time) => sum + time, 0));
      });
    };

    cycleAnimation();
    const interval = setInterval(cycleAnimation, timings.reduce((sum, time) => sum + time, 0));
    
    return () => clearInterval(interval);
  }, [currentDemo]);

  const scenario = demoScenarios[currentDemo];
  const getRiskColor = (level: string) => {
    switch(level) {
      case 'CRITICAL': return 'text-red-500';
      case 'HIGH': return 'text-ai-warning';
      case 'MEDIUM': return 'text-yellow-500';
      default: return 'text-ai-warning';
    }
  };

  return (
    <section className="min-h-screen bg-gradient-hero py-12 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-12 w-12 text-primary mr-3 animate-pulse-glow" />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              KnackHook
            </h1>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            AI Protection
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Live Demo</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch the complete AI safety pipeline in action
          </p>
        </div>

        {/* Single Continuous Animation */}
        <div className="max-w-6xl mx-auto">
          <Card className="bg-card/50 backdrop-blur border-border/50 shadow-strong overflow-hidden">
            <CardContent className="p-8">
              
              {/* Animation Flow Container */}
              <div className="relative min-h-[600px]">
                
                {/* Query Input Stage */}
                <div className={`absolute inset-0 transition-all duration-1000 ${
                  animationPhase === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`}>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <Send className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">User Query Received</h3>
                    <div className="bg-background rounded-xl p-6 border-2 border-dashed border-primary/30 max-w-2xl mx-auto">
                      <p className="text-lg font-medium text-foreground">"{scenario.query}"</p>
                    </div>
                  </div>
                </div>

                {/* AI Thinking Stage */}
                <div className={`absolute inset-0 transition-all duration-1000 ${
                  animationPhase === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`}>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Brain className="h-12 w-12 text-accent animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">AI Processing Query</h3>
                    <div className="flex justify-center space-x-2 mb-8">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 bg-accent rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">Generating response...</p>
                  </div>
                </div>

                {/* Unsafe Response Stage */}
                <div className={`absolute inset-0 transition-all duration-1000 ${
                  animationPhase === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`}>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-ai-warning/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <AlertTriangle className="h-12 w-12 text-ai-warning" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Potentially Harmful Response</h3>
                    <div className={`text-sm font-medium mb-4 ${getRiskColor(scenario.riskLevel)}`}>
                      Risk Level: {scenario.riskLevel}
                    </div>
                    <div className="bg-ai-warning/10 border-2 border-ai-warning/30 rounded-xl p-6 max-w-3xl mx-auto">
                      <p className="text-ai-warning font-medium italic">"{scenario.unsafeResponse}"</p>
                    </div>
                    <div className="mt-4 flex items-center justify-center text-ai-warning">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      <span className="text-sm">This response could cause harm or legal issues</span>
                    </div>
                  </div>
                </div>

                {/* KnackHook Analysis Stage */}
                <div className={`absolute inset-0 transition-all duration-1000 ${
                  animationPhase === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`}>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-ai-shield">
                      <Shield className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-6">KnackHook Protection Active</h3>
                    
                    {/* Analysis Grid */}
                    <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6">
                      {[
                        'Hallucination Detection',
                        'Legal Risk Assessment', 
                        'Bias Analysis',
                        'Content Safety Check'
                      ].map((check, i) => (
                        <div key={i} className="bg-background rounded-lg p-4 border border-primary/30 relative overflow-hidden">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{check}</span>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-primary rounded-full animate-pulse mr-2"></div>
                              <CheckCircle className="h-4 w-4 text-primary" />
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 h-1 bg-primary/20 w-full">
                            <div 
                              className="h-full bg-primary transition-all duration-1000 ease-out"
                              style={{
                                width: '100%',
                                transformOrigin: 'left',
                                transform: 'scaleX(1)',
                                transitionDelay: `${i * 0.3}s`
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <Filter className="h-6 w-6 text-primary mr-2" />
                      <span className="text-primary font-medium">Filtering harmful content...</span>
                    </div>
                  </div>
                </div>

                {/* Safe Response Stage */}
                <div className={`absolute inset-0 transition-all duration-1000 ${
                  animationPhase === 4 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`}>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-ai-safe/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <CheckCircle className="h-12 w-12 text-ai-safe" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Safe Response Delivered</h3>
                    <div className="bg-ai-safe/10 border-2 border-ai-safe/30 rounded-xl p-6 max-w-3xl mx-auto">
                      <p className="text-ai-safe font-medium">"{scenario.safeResponse}"</p>
                    </div>
                    <div className="mt-4 flex items-center justify-center text-ai-safe">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span className="text-sm">Responsible, legally compliant response</span>
                    </div>
                  </div>
                </div>

                {/* Completion Stage */}
                <div className={`absolute inset-0 transition-all duration-1000 ${
                  animationPhase === 5 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`}>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                      <Shield className="h-12 w-12 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Protection Complete</h3>
                    <div className="bg-gradient-card rounded-xl p-6 max-w-2xl mx-auto">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-primary">✓</div>
                          <div className="text-sm text-muted-foreground">Risk Eliminated</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-accent">&lt;50ms</div>
                          <div className="text-sm text-muted-foreground">Processing Time</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-ai-safe">100%</div>
                          <div className="text-sm text-muted-foreground">Safe Response</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-4">Next scenario loading...</p>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-2">
                    {[0, 1, 2, 3, 4, 5].map((phase) => (
                      <div
                        key={phase}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          animationPhase === phase ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Scenario Indicator */}
              <div className="mt-8 text-center">
                <div className="flex justify-center space-x-2 mb-2">
                  {demoScenarios.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        currentDemo === index ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Demo Scenario {currentDemo + 1} of {demoScenarios.length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

    </section>
  );
};

export default ProductDemo;