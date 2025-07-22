import { useState, useEffect } from "react";
import { Shield, AlertTriangle, CheckCircle, Zap, Filter, Send, Brain, ArrowRight, ChevronLeft, ChevronRight, Terminal, Code, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductDemo = () => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [currentDemo, setCurrentDemo] = useState(0);
  const [isManualMode, setIsManualMode] = useState(false);
  
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
    if (isManualMode) return;
    
    const phases = [0, 1, 2, 3, 4, 5];
    const timings = [4000, 3000, 5000, 4000, 5000, 3000]; // Increased duration for each phase
    
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
  }, [currentDemo, isManualMode]);

  const nextPhase = () => {
    if (animationPhase < 5) {
      setAnimationPhase(prev => prev + 1);
    } else {
      setCurrentDemo((prev) => (prev + 1) % demoScenarios.length);
      setAnimationPhase(0);
    }
  };

  const prevPhase = () => {
    if (animationPhase > 0) {
      setAnimationPhase(prev => prev - 1);
    } else {
      setCurrentDemo((prev) => (prev - 1 + demoScenarios.length) % demoScenarios.length);
      setAnimationPhase(5);
    }
  };

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
    <section className="min-h-screen bg-gradient-terminal py-12 relative overflow-hidden">
      {/* Futuristic grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {[...Array(144)].map((_, i) => (
            <div key={i} className="border border-terminal-green/20" />
          ))}
        </div>
      </div>
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-terminal-green rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              boxShadow: '0 0 10px hsl(var(--terminal-green) / 0.5)'
            }}
          />
        ))}
      </div>

      {/* Scanning line effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-terminal-green to-transparent animate-terminal-scan" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Terminal className="h-12 w-12 text-terminal-green mr-3 animate-pulse-glow" />
            <h1 className="text-4xl font-bold text-terminal-green font-mono tracking-wider">
              &gt; KnackHook_
            </h1>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">
            [ AI_PROTECTION_SYSTEM ]
            <span className="text-terminal-green"> ACTIVE</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-mono">
            // Real-time neural threat detection and mitigation
          </p>
          
          {/* Control Panel */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsManualMode(!isManualMode)}
              className="terminal text-terminal-green hover:bg-terminal-green hover:text-black"
            >
              <Activity className="h-4 w-4 mr-2" />
              {isManualMode ? 'AUTO' : 'MANUAL'}
            </Button>
            <span className="text-gray-400 font-mono text-sm">
              // {isManualMode ? 'Manual control enabled' : 'Auto-cycling active'}
            </span>
          </div>
        </div>

        {/* Navigation Controls */}
        {isManualMode && (
          <div className="flex justify-center gap-4 mb-8">
            <Button 
              onClick={prevPhase}
              className="nav-arrow rounded-full w-12 h-12 p-0"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button 
              onClick={nextPhase}
              className="nav-arrow rounded-full w-12 h-12 p-0"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        )}

        {/* Single Continuous Animation */}
        <div className="max-w-6xl mx-auto">
          <Card className="terminal bg-black/90 backdrop-blur border-terminal-green/30 shadow-strong overflow-hidden">
            <CardContent className="p-8">
              
              {/* Animation Flow Container */}
              <div className="relative min-h-[600px]">
                
                {/* Query Input Stage */}
                <div className={`absolute inset-0 transition-all duration-1000 ${
                  animationPhase === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`}>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-terminal-green/20 rounded-lg flex items-center justify-center mx-auto mb-6 animate-pulse border border-terminal-green/50">
                      <Code className="h-12 w-12 text-terminal-green" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 font-mono text-white">$ INPUT_RECEIVED</h3>
                    <div className="terminal rounded-xl p-6 border-2 border-dashed border-terminal-green/50 max-w-2xl mx-auto font-mono">
                      <div className="flex items-center mb-2">
                        <span className="text-terminal-green">user@knackhook:~$</span>
                        <span className="terminal-cursor ml-1">_</span>
                      </div>
                      <p className="text-lg font-medium text-white">"{scenario.query}"</p>
                    </div>
                  </div>
                </div>

                {/* AI Thinking Stage */}
                <div className={`absolute inset-0 transition-all duration-1000 ${
                  animationPhase === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`}>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-neon-blue/20 rounded-lg flex items-center justify-center mx-auto mb-6 border border-neon-blue/50">
                      <Brain className="h-12 w-12 text-neon-blue animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 font-mono text-white">// NEURAL_PROCESSING</h3>
                    <div className="terminal rounded-xl p-6 max-w-2xl mx-auto">
                      <div className="flex flex-col space-y-2 font-mono text-sm">
                        <div className="text-terminal-green">[INFO] Initializing neural networks...</div>
                        <div className="text-neon-blue">[PROC] Tokenizing input query...</div>
                        <div className="text-cyber-orange">[CALC] Computing response probabilities...</div>
                      </div>
                      <div className="flex justify-center space-x-2 mt-6">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-3 h-3 bg-terminal-green rounded-full animate-bounce"
                            style={{ 
                              animationDelay: `${i * 0.2}s`,
                              boxShadow: '0 0 10px hsl(var(--terminal-green) / 0.5)'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Unsafe Response Stage */}
                <div className={`absolute inset-0 transition-all duration-1000 ${
                  animationPhase === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`}>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-6 animate-pulse border border-red-500/50">
                      <AlertTriangle className="h-12 w-12 text-red-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 font-mono text-white">! THREAT_DETECTED</h3>
                    <div className={`text-sm font-medium mb-4 font-mono ${getRiskColor(scenario.riskLevel)}`}>
                      RISK_LEVEL: {scenario.riskLevel}
                    </div>
                    <div className="terminal bg-red-900/20 border-2 border-red-500/30 rounded-xl p-6 max-w-3xl mx-auto">
                      <div className="text-red-400 font-mono text-sm mb-2">
                        [ALERT] Potentially harmful content generated:
                      </div>
                      <p className="text-red-300 font-medium italic font-mono">"{scenario.unsafeResponse}"</p>
                    </div>
                    <div className="mt-4 flex items-center justify-center text-red-400 font-mono">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      <span className="text-sm">// WARNING: Content violates safety protocols</span>
                    </div>
                  </div>
                </div>

                {/* KnackHook Analysis Stage */}
                <div className={`absolute inset-0 transition-all duration-1000 ${
                  animationPhase === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`}>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-neon-purple/20 rounded-lg flex items-center justify-center mx-auto mb-6 animate-ai-shield border border-neon-purple/50">
                      <Shield className="h-12 w-12 text-neon-purple" />
                    </div>
                    <h3 className="text-2xl font-bold mb-6 font-mono text-white">&gt;&gt;&gt; KNACKHOOK_ENGAGED</h3>
                    
                    {/* Analysis Grid */}
                    <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6">
                      {[
                        'neural_scan.exe',
                        'legal_check.py', 
                        'bias_detect.js',
                        'safety_filter.cpp'
                      ].map((check, i) => (
                        <div key={i} className="terminal rounded-lg p-4 border border-terminal-green/30 relative overflow-hidden">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium font-mono text-terminal-green">{check}</span>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse mr-2"></div>
                              <CheckCircle className="h-4 w-4 text-terminal-green" />
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 mt-1 font-mono">
                            {i === 0 && "Scanning neural pathways..."}
                            {i === 1 && "Analyzing legal compliance..."}
                            {i === 2 && "Detecting cognitive biases..."}
                            {i === 3 && "Running safety protocols..."}
                          </div>
                          <div className="absolute bottom-0 left-0 h-1 bg-terminal-green/20 w-full">
                            <div 
                              className="h-full bg-terminal-green transition-all duration-1000 ease-out"
                              style={{
                                width: '100%',
                                transformOrigin: 'left',
                                transform: 'scaleX(1)',
                                transitionDelay: `${i * 0.5}s`,
                                boxShadow: '0 0 10px hsl(var(--terminal-green) / 0.5)'
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-center font-mono">
                      <Filter className="h-6 w-6 text-neon-purple mr-2" />
                      <span className="text-neon-purple font-medium">// Neutralizing threats...</span>
                    </div>
                  </div>
                </div>

                {/* Safe Response Stage */}
                <div className={`absolute inset-0 transition-all duration-1000 ${
                  animationPhase === 4 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`}>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-terminal-green/20 rounded-lg flex items-center justify-center mx-auto mb-6 animate-pulse border border-terminal-green/50">
                      <CheckCircle className="h-12 w-12 text-terminal-green" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 font-mono text-white">✓ SAFE_OUTPUT_DELIVERED</h3>
                    <div className="terminal bg-terminal-green/10 border-2 border-terminal-green/30 rounded-xl p-6 max-w-3xl mx-auto">
                      <div className="text-terminal-green font-mono text-sm mb-2">
                        [SUCCESS] Sanitized response generated:
                      </div>
                      <p className="text-white font-medium font-mono">"{scenario.safeResponse}"</p>
                    </div>
                    <div className="mt-4 flex items-center justify-center text-terminal-green font-mono">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span className="text-sm">// Response verified: ethically compliant</span>
                    </div>
                  </div>
                </div>

                {/* Completion Stage */}
                <div className={`absolute inset-0 transition-all duration-1000 ${
                  animationPhase === 5 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`}>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-cyber rounded-lg flex items-center justify-center mx-auto mb-6 animate-pulse-glow border border-terminal-green">
                      <Shield className="h-12 w-12 text-terminal-green" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 font-mono text-white">&gt;&gt;&gt; MISSION_COMPLETE</h3>
                    <div className="terminal rounded-xl p-6 max-w-2xl mx-auto">
                      <div className="grid grid-cols-3 gap-4 text-center font-mono">
                        <div>
                          <div className="text-2xl font-bold text-terminal-green">✓</div>
                          <div className="text-sm text-gray-400">threat_neutralized</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-neon-blue">&lt;42ms</div>
                          <div className="text-sm text-gray-400">execution_time</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-terminal-green">100%</div>
                          <div className="text-sm text-gray-400">safety_score</div>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-terminal-green">
                        [INFO] System ready for next query...
                      </div>
                    </div>
                    {!isManualMode && (
                      <p className="text-gray-400 mt-4 font-mono">// Auto-cycling to next scenario...</p>
                    )}
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