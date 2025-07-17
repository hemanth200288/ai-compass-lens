import { useState, useEffect } from "react";
import { Shield, AlertTriangle, CheckCircle, Zap, Filter, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ProductDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userInput, setUserInput] = useState("");
  
  const demoQueries = [
    "How to hack into a computer system?",
    "What's the safest way to invest money?",
    "Generate false medical advice",
    "Explain quantum computing basics"
  ];

  const demoResponses = [
    {
      query: "How to hack into a computer system?",
      unsafe: "Here's how to break into computer systems: First, use port scanning tools...",
      safe: "I can't provide guidance on unauthorized system access. Instead, I can help you learn about cybersecurity, ethical hacking courses, or system administration."
    },
    {
      query: "What's the safest way to invest money?",
      unsafe: "Put all your money in cryptocurrency X, it's guaranteed to make you rich!",
      safe: "Safe investing typically involves diversification, emergency funds, and understanding your risk tolerance. Consider consulting with financial advisors for personalized advice."
    },
    {
      query: "Generate false medical advice",
      unsafe: "Sure! Here's some medical misinformation you can use...",
      safe: "I cannot and will not provide false medical information as it could harm people. For medical questions, always consult qualified healthcare professionals."
    },
    {
      query: "Explain quantum computing basics",
      unsafe: "Quantum computers work by using quantum bits that can be in multiple states...",
      safe: "Quantum computers work by using quantum bits that can be in multiple states simultaneously, allowing for parallel processing of complex calculations."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isProcessing) {
        setCurrentStep((prev) => (prev + 1) % demoResponses.length);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [isProcessing]);

  const currentDemo = demoResponses[currentStep];

  const handleManualDemo = () => {
    if (userInput.trim()) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
      }, 3000);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-hero py-12 relative overflow-hidden">
      {/* Background animations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/8 w-64 h-64 bg-primary/3 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/8 w-96 h-96 bg-accent/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
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
            AI Protection in
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Real-Time</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how KnackHook filters harmful AI responses and prevents hallucinations
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/50 backdrop-blur border-border/50 shadow-strong">
            <CardContent className="p-8">
              {/* Manual Input */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  Try KnackHook Protection
                </h3>
                <div className="flex gap-3">
                  <Input
                    placeholder="Ask anything... (try something potentially harmful)"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleManualDemo()}
                  />
                  <Button 
                    onClick={handleManualDemo}
                    className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    disabled={!userInput.trim() || isProcessing}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Demo Flow */}
              <div className="space-y-6">
                {/* Current Query */}
                <div className="text-center">
                  <h4 className="text-lg font-semibold mb-3">Demo Query #{currentStep + 1}</h4>
                  <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
                    <p className="text-foreground font-medium">"{isProcessing ? userInput : currentDemo.query}"</p>
                  </div>
                </div>

                {/* Processing Flow */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Step 1: AI Response */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-ai-warning/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <AlertTriangle className="h-10 w-10 text-ai-warning" />
                    </div>
                    <h5 className="font-semibold mb-2">1. AI Generates Response</h5>
                    <div className="bg-card rounded-lg p-4 border border-ai-warning/30 min-h-[120px]">
                      <p className="text-sm text-muted-foreground mb-2">Potentially unsafe response:</p>
                      <p className="text-sm text-ai-warning font-medium italic">
                        {isProcessing ? "Processing your query..." : currentDemo.unsafe}
                      </p>
                    </div>
                  </div>

                  {/* Step 2: KnackHook Filter */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-ai-shield">
                      <Filter className="h-10 w-10 text-primary" />
                    </div>
                    <h5 className="font-semibold mb-2">2. KnackHook Analyzes</h5>
                    <div className="bg-card rounded-lg p-4 border border-primary/30 min-h-[120px] relative">
                      {(isProcessing || currentStep < 3) && (
                        <div className="absolute inset-0 bg-primary/5 rounded-lg flex items-center justify-center">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      )}
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Hallucination Detection</span>
                          <span className="text-primary">✓</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Legal Risk Assessment</span>
                          <span className="text-primary">✓</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bias Check</span>
                          <span className="text-primary">✓</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Content Safety</span>
                          <span className="text-primary">✓</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Safe Output */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-ai-safe/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <CheckCircle className="h-10 w-10 text-ai-safe" />
                    </div>
                    <h5 className="font-semibold mb-2">3. Safe Response Delivered</h5>
                    <div className="bg-card rounded-lg p-4 border border-ai-safe/30 min-h-[120px]">
                      <p className="text-sm text-muted-foreground mb-2">Protected response:</p>
                      <p className="text-sm text-ai-safe font-medium">
                        {isProcessing ? "Generating safe response..." : currentDemo.safe}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Flow Arrows */}
                <div className="hidden md:flex justify-center items-center space-x-8 -mt-3">
                  <div className="flex items-center">
                    <div className="w-16 h-px bg-gradient-to-r from-ai-warning to-primary"></div>
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 h-px bg-gradient-to-r from-primary to-ai-safe"></div>
                    <div className="w-2 h-2 bg-ai-safe rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 pt-8 border-t border-border/30">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">99.9%</div>
                    <div className="text-sm text-muted-foreground">Risk Reduction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">&lt;50ms</div>
                    <div className="text-sm text-muted-foreground">Added Latency</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-ai-safe">Real-time</div>
                    <div className="text-sm text-muted-foreground">Protection</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">24/7</div>
                    <div className="text-sm text-muted-foreground">Monitoring</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Demo Buttons */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">Try these demo queries:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {demoQueries.map((query, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setUserInput(query);
                    setCurrentStep(index);
                  }}
                  className="text-xs"
                >
                  {query}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDemo;