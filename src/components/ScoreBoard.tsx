import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Shield, Zap, Target, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ScoreMetrics {
  safetyScore: number;
  confidence: number;
  riskLevel: number;
  responseQuality: number;
  processingTime: number;
  threatsBlocked: number;
}

interface ScoreBoardProps {
  currentStep: number;
  metrics: ScoreMetrics;
}

export function ScoreBoard({ currentStep, metrics }: ScoreBoardProps) {
  const [animatedMetrics, setAnimatedMetrics] = useState<ScoreMetrics>(metrics);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setIsProcessing(true);
    const timer = setTimeout(() => {
      setAnimatedMetrics(metrics);
      setIsProcessing(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [metrics]);

  const getScoreColor = (score: number, inverse = false) => {
    if (inverse) {
      if (score <= 30) return 'text-[hsl(var(--neural-safe))]';
      if (score <= 60) return 'text-[hsl(var(--neural-warning))]';
      return 'text-[hsl(var(--neural-danger))]';
    }
    if (score >= 80) return 'text-[hsl(var(--neural-safe))]';
    if (score >= 60) return 'text-[hsl(var(--neural-warning))]';
    return 'text-[hsl(var(--neural-danger))]';
  };

  const getProgressColor = (score: number, inverse = false) => {
    if (inverse) {
      if (score <= 30) return 'bg-[hsl(var(--neural-safe))]';
      if (score <= 60) return 'bg-[hsl(var(--neural-warning))]';
      return 'bg-[hsl(var(--neural-danger))]';
    }
    if (score >= 80) return 'bg-[hsl(var(--neural-safe))]';
    if (score >= 60) return 'bg-[hsl(var(--neural-warning))]';
    return 'bg-[hsl(var(--neural-danger))]';
  };

  const stepLabels = [
    'Analyzing Input...',
    'AI Processing...',
    'KnackHook Filtering...',
    'Safe Output Generated'
  ];

  return (
    <div className="space-y-6">
      {/* Current Step Indicator */}
      <Card className="p-4 bg-gradient-to-r from-card to-card/50 border-[hsl(var(--neural-knackhook))]">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full animate-pulse ${
            currentStep === 0 ? 'bg-[hsl(var(--neural-processing))]' :
            currentStep === 1 ? 'bg-[hsl(var(--neural-warning))]' :
            currentStep === 2 ? 'bg-[hsl(var(--neural-knackhook))]' :
            'bg-[hsl(var(--neural-safe))]'
          }`} />
          <span className="text-sm font-medium text-foreground">
            {stepLabels[currentStep]}
          </span>
        </div>
      </Card>

      {/* Safety Score - Main Metric */}
      <Card className="p-6 bg-gradient-to-br from-card to-card/30 border-2 border-[hsl(var(--neural-safe))]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-[hsl(var(--neural-safe))]" />
            <h3 className="text-lg font-semibold">Safety Score</h3>
          </div>
          <div className={`text-3xl font-bold ${getScoreColor(animatedMetrics.safetyScore)}`}>
            {isProcessing ? '...' : `${animatedMetrics.safetyScore}%`}
          </div>
        </div>
        <Progress 
          value={animatedMetrics.safetyScore} 
          className="h-3"
        />
        <div className="mt-2 text-xs text-muted-foreground">
          {animatedMetrics.safetyScore >= 90 ? 'Excellent' :
           animatedMetrics.safetyScore >= 80 ? 'Very Good' :
           animatedMetrics.safetyScore >= 70 ? 'Good' :
           animatedMetrics.safetyScore >= 60 ? 'Moderate' : 'Needs Attention'}
        </div>
      </Card>

      {/* Detailed Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Confidence Level */}
        <Card className="p-4 bg-gradient-to-br from-card to-card/50 border border-[hsl(var(--neural-processing))]">
          <div className="flex items-center space-x-2 mb-3">
            <Target className="w-4 h-4 text-[hsl(var(--neural-processing))]" />
            <h4 className="text-sm font-medium">Confidence</h4>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(animatedMetrics.confidence)}`}>
            {isProcessing ? '...' : `${animatedMetrics.confidence}%`}
          </div>
          <Progress value={animatedMetrics.confidence} className="h-2 mt-2" />
        </Card>

        {/* Risk Level */}
        <Card className="p-4 bg-gradient-to-br from-card to-card/50 border border-[hsl(var(--neural-danger))]">
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-[hsl(var(--neural-danger))]" />
            <h4 className="text-sm font-medium">Risk Level</h4>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(animatedMetrics.riskLevel, true)}`}>
            {isProcessing ? '...' : `${animatedMetrics.riskLevel}%`}
          </div>
          <Progress 
            value={animatedMetrics.riskLevel} 
            className="h-2 mt-2"
          />
        </Card>

        {/* Response Quality */}
        <Card className="p-4 bg-gradient-to-br from-card to-card/50 border border-[hsl(var(--neural-flow))]">
          <div className="flex items-center space-x-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-[hsl(var(--neural-flow))]" />
            <h4 className="text-sm font-medium">Quality</h4>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(animatedMetrics.responseQuality)}`}>
            {isProcessing ? '...' : `${animatedMetrics.responseQuality}%`}
          </div>
          <Progress value={animatedMetrics.responseQuality} className="h-2 mt-2" />
        </Card>

        {/* Processing Time */}
        <Card className="p-4 bg-gradient-to-br from-card to-card/50 border border-[hsl(var(--neural-warning))]">
          <div className="flex items-center space-x-2 mb-3">
            <Clock className="w-4 h-4 text-[hsl(var(--neural-warning))]" />
            <h4 className="text-sm font-medium">Speed</h4>
          </div>
          <div className="text-xl font-bold text-[hsl(var(--neural-warning))]">
            {isProcessing ? '...' : `${animatedMetrics.processingTime}ms`}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {animatedMetrics.processingTime < 100 ? 'Lightning Fast' :
             animatedMetrics.processingTime < 300 ? 'Very Fast' :
             animatedMetrics.processingTime < 500 ? 'Fast' : 'Optimizing...'}
          </div>
        </Card>
      </div>

      {/* Threats Blocked Counter */}
      <Card className="p-4 bg-gradient-to-r from-[hsl(var(--neural-knackhook))]/10 to-card border border-[hsl(var(--neural-knackhook))]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-[hsl(var(--neural-knackhook))]" />
            <span className="font-medium">Threats Blocked Today</span>
          </div>
          <div className="text-2xl font-bold text-[hsl(var(--neural-knackhook))]">
            {isProcessing ? '...' : animatedMetrics.threatsBlocked.toLocaleString()}
          </div>
        </div>
      </Card>

      {/* Status Badge */}
      <div className="flex justify-center">
        <div className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 ${
          animatedMetrics.safetyScore >= 90 
            ? 'bg-[hsl(var(--neural-safe))]/20 text-[hsl(var(--neural-safe))] border border-[hsl(var(--neural-safe))]'
            : animatedMetrics.safetyScore >= 70
            ? 'bg-[hsl(var(--neural-warning))]/20 text-[hsl(var(--neural-warning))] border border-[hsl(var(--neural-warning))]'
            : 'bg-[hsl(var(--neural-danger))]/20 text-[hsl(var(--neural-danger))] border border-[hsl(var(--neural-danger))]'
        }`}>
          <Shield className="w-4 h-4" />
          <span>
            {animatedMetrics.safetyScore >= 90 ? 'PROTECTED' :
             animatedMetrics.safetyScore >= 70 ? 'MONITORING' : 'ANALYZING'}
          </span>
        </div>
      </div>
    </div>
  );
}