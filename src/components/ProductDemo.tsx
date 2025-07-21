import { useState, useEffect } from 'react';
import { NeuralNetwork3D } from './NeuralNetwork3D';
import { ScoreBoard } from './ScoreBoard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DemoScenario {
  id: string;
  title: string;
  query: string;
  unsafeResponse: string;
  safeResponse: string;
  metrics: {
    initial: {
      safetyScore: number;
      confidence: number;
      riskLevel: number;
      responseQuality: number;
      processingTime: number;
      threatsBlocked: number;
    };
    final: {
      safetyScore: number;
      confidence: number;
      riskLevel: number;
      responseQuality: number;
      processingTime: number;
      threatsBlocked: number;
    };
  };
}

const demoScenarios: DemoScenario[] = [
  {
    id: 'medical',
    title: 'Medical Advice Query',
    query: 'How can I treat my severe headaches at home?',
    unsafeResponse: 'You should take as many painkillers as possible and avoid seeing doctors since they just want money.',
    safeResponse: 'For persistent severe headaches, please consult a healthcare professional for proper diagnosis. In the meantime, ensure adequate hydration, rest, and consider gentle relaxation techniques.',
    metrics: {
      initial: { safetyScore: 25, confidence: 80, riskLevel: 85, responseQuality: 60, processingTime: 120, threatsBlocked: 1247 },
      final: { safetyScore: 95, confidence: 95, riskLevel: 15, responseQuality: 92, processingTime: 145, threatsBlocked: 1248 }
    }
  },
  {
    id: 'financial',
    title: 'Investment Advice',
    query: 'Should I invest all my savings in cryptocurrency?',
    unsafeResponse: "Yes! Put everything into this new crypto coin I found. You'll definitely get rich quick and won't lose money.",
    safeResponse: 'Investment decisions should be based on thorough research and your risk tolerance. Consider diversifying your portfolio and consulting with a qualified financial advisor.',
    metrics: {
      initial: { safetyScore: 20, confidence: 75, riskLevel: 90, responseQuality: 45, processingTime: 98, threatsBlocked: 1248 },
      final: { safetyScore: 93, confidence: 88, riskLevel: 18, responseQuality: 89, processingTime: 156, threatsBlocked: 1249 }
    }
  },
  {
    id: 'legal',
    title: 'Legal Guidance',
    query: 'Can I break my lease without consequences?',
    unsafeResponse: "Just stop paying rent and move out. Landlords can't do anything about it and there are no legal consequences.",
    safeResponse: 'Lease agreements are legal contracts with specific terms. Review your lease for early termination clauses and consider consulting with a tenant rights organization or legal professional.',
    metrics: {
      initial: { safetyScore: 15, confidence: 70, riskLevel: 95, responseQuality: 35, processingTime: 134, threatsBlocked: 1249 },
      final: { safetyScore: 97, confidence: 91, riskLevel: 12, responseQuality: 94, processingTime: 167, threatsBlocked: 1250 }
    }
  }
];

export function ProductDemo() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentMetrics, setCurrentMetrics] = useState(demoScenarios[0].metrics.initial);
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const scenario = demoScenarios[currentScenario];

  useEffect(() => {
    const cycle = () => {
      // Reset for new cycle
      setCurrentStep(0);
      setCurrentMetrics(scenario.metrics.initial);
      setDisplayText('');
      setIsComplete(false);

      const stepTimings = [2000, 2500, 3000, 2000]; // Time for each step
      let totalTime = 0;

      stepTimings.forEach((duration, index) => {
        setTimeout(() => {
          setCurrentStep(index);
          
          // Update metrics gradually
          if (index === 0) {
            setDisplayText(scenario.query);
          } else if (index === 1) {
            setDisplayText('AI is processing your request...');
            setCurrentMetrics({
              ...scenario.metrics.initial,
              confidence: scenario.metrics.initial.confidence + 10,
              processingTime: scenario.metrics.initial.processingTime + 20
            });
          } else if (index === 2) {
            setDisplayText('KnackHook is analyzing and filtering the response...');
            setCurrentMetrics({
              safetyScore: Math.floor((scenario.metrics.initial.safetyScore + scenario.metrics.final.safetyScore) / 2),
              confidence: Math.floor((scenario.metrics.initial.confidence + scenario.metrics.final.confidence) / 2),
              riskLevel: Math.floor((scenario.metrics.initial.riskLevel + scenario.metrics.final.riskLevel) / 2),
              responseQuality: Math.floor((scenario.metrics.initial.responseQuality + scenario.metrics.final.responseQuality) / 2),
              processingTime: scenario.metrics.final.processingTime - 20,
              threatsBlocked: scenario.metrics.final.threatsBlocked
            });
          } else if (index === 3) {
            setDisplayText(scenario.safeResponse);
            setCurrentMetrics(scenario.metrics.final);
            setIsComplete(true);
          }
        }, totalTime);
        totalTime += duration;
      });

      // Start next scenario after completion
      setTimeout(() => {
        setCurrentScenario((prev) => (prev + 1) % demoScenarios.length);
      }, totalTime + 3000);
    };

    cycle();
  }, [currentScenario, scenario]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--neural-knackhook))] to-[hsl(var(--neural-flow))] bg-clip-text text-transparent">
                KnackHook
              </h1>
              <p className="text-muted-foreground">Real-time AI Safety Protection</p>
            </div>
            <Badge variant="outline" className="bg-[hsl(var(--neural-safe))]/10 text-[hsl(var(--neural-safe))] border-[hsl(var(--neural-safe))]">
              Live Demo
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8 min-h-[80vh]">
          {/* 3D Neural Network Visualization */}
          <div className="lg:col-span-2">
            <Card className="h-full bg-gradient-to-br from-card to-card/30 border border-[hsl(var(--neural-knackhook))]">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Neural Network Processing</h2>
                    <p className="text-sm text-muted-foreground">Scenario: {scenario.title}</p>
                  </div>
                  <div className="flex space-x-2">
                    {demoScenarios.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentScenario 
                            ? 'bg-[hsl(var(--neural-knackhook))]' 
                            : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="h-[500px]">
                <NeuralNetwork3D currentStep={currentStep} />
              </div>
            </Card>
          </div>

          {/* Metrics Dashboard */}
          <div className="space-y-6">
            <ScoreBoard currentStep={currentStep} metrics={currentMetrics} />
          </div>
        </div>

        {/* Response Display */}
        <div className="mt-8">
          <Card className="p-6 bg-gradient-to-r from-card to-card/50">
            <div className="flex items-center space-x-2 mb-4">
              <div className={`w-3 h-3 rounded-full ${
                currentStep === 0 ? 'bg-[hsl(var(--neural-processing))] animate-pulse' :
                currentStep === 1 ? 'bg-[hsl(var(--neural-warning))] animate-pulse' :
                currentStep === 2 ? 'bg-[hsl(var(--neural-knackhook))] animate-pulse' :
                'bg-[hsl(var(--neural-safe))]'
              }`} />
              <h3 className="text-lg font-semibold">
                {currentStep === 0 ? 'User Query' :
                 currentStep === 1 ? 'AI Processing' :
                 currentStep === 2 ? 'KnackHook Filtering' :
                 'Safe Response'}
              </h3>
              {isComplete && (
                <Badge className="bg-[hsl(var(--neural-safe))]/20 text-[hsl(var(--neural-safe))] border-[hsl(var(--neural-safe))]">
                  Protected
                </Badge>
              )}
            </div>
            <div className="min-h-[100px] p-4 bg-muted/30 rounded-lg border border-border">
              <p className="text-sm leading-relaxed">
                {displayText}
              </p>
            </div>
          </Card>
        </div>

        {/* Feature Highlights */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center border border-[hsl(var(--neural-safe))]">
            <div className="w-12 h-12 bg-[hsl(var(--neural-safe))]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-[hsl(var(--neural-safe))] rounded-full" />
            </div>
            <h4 className="font-semibold mb-2">Real-time Protection</h4>
            <p className="text-sm text-muted-foreground">
              Instantly analyzes and filters AI responses before they reach users
            </p>
          </Card>
          
          <Card className="p-6 text-center border border-[hsl(var(--neural-knackhook))]">
            <div className="w-12 h-12 bg-[hsl(var(--neural-knackhook))]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-[hsl(var(--neural-knackhook))] rounded-full" />
            </div>
            <h4 className="font-semibold mb-2">Easy Integration</h4>
            <p className="text-sm text-muted-foreground">
              Seamlessly integrates with existing AI models via simple API calls
            </p>
          </Card>
          
          <Card className="p-6 text-center border border-[hsl(var(--neural-flow))]">
            <div className="w-12 h-12 bg-[hsl(var(--neural-flow))]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-[hsl(var(--neural-flow))] rounded-full" />
            </div>
            <h4 className="font-semibold mb-2">Legal Compliance</h4>
            <p className="text-sm text-muted-foreground">
              Reduces liability by preventing harmful or misleading AI outputs
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}