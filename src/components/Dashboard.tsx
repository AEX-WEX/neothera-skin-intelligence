'use client';

import { useState, useEffect, useCallback } from 'react';
import { DayData, AnalysisResult, AIInsight } from '@/types';
import { syntheticData } from '@/lib/data';
import { analyzeData, getBaselineAcne, getAcneTrend } from '@/lib/analysis';
import { generateAIInsights } from '@/lib/ai';
import { TabView, Tab } from './TabView';
import { InsightsTab } from './InsightsTab';
import { TimelineTab } from './TimelineTab';
import { PatternsTab } from './PatternsTab';
import { CoachTab } from './CoachTab';
import { StreakTracker } from './StreakTracker';
import { PatternCorrelationCard } from './PatternCorrelationCard';
import { HistoryTimeline } from './HistoryTimeline';

export function Dashboard() {
  const [data, setData] = useState<DayData[]>([]);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [baseline, setBaseline] = useState(0);
  const [trend, setTrend] = useState<'improving' | 'worsening' | 'stable'>('stable');

  useEffect(() => {
    const synthetic = syntheticData;
    setData(synthetic);
    const analysisResult = analyzeData(synthetic);
    setResult(analysisResult);
    setBaseline(getBaselineAcne(synthetic));
    setTrend(getAcneTrend(synthetic));

    loadAIInsights(synthetic, analysisResult);
  }, []);

  const loadAIInsights = async (d: DayData[], r: AnalysisResult) => {
    setIsLoadingAI(true);
    try {
      const insights = await generateAIInsights(d, r, r.recommendations);
      setAiInsights(insights);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleRetryAI = useCallback(() => {
    if (data.length && result) {
      loadAIInsights(data, result);
    }
  }, [data, result]);

  if (!result) {
    return (
      <div className="space-y-4">
        <div className="card-glass rounded-2xl p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-white/10 rounded w-1/2" />
            <div className="h-4 bg-white/5 rounded w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  const tabs: Tab[] = [
    { id: 'timeline', label: 'Timeline', icon: '📈' },
    { id: 'patterns', label: 'Patterns', icon: '🔍' },
    { id: 'insights', label: 'Insights', icon: '💡' },
    { id: 'coach', label: 'Coach', icon: '🧠' },
  ];

  // Sort patterns by confidence (strongest first)
  const sortedPatterns = [...result.scorecards].sort((a, b) => b.confidence - a.confidence);
  const topPatterns = sortedPatterns.slice(0, 5);

  return (
    <div className="space-y-6 w-full pb-8">
      {/* Floating Header with Brand */}
      <header className="animate-fade-in-up opacity-0 text-center pt-6 mb-8">
        <div className="mb-4">
          <p className="text-xs font-bold tracking-widest text-rose-600 uppercase">Analysis Engine</p>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">Neothera</h1>
        <p className="text-sm text-slate-600">
          Pattern detection from {data.length} days of tracked data
        </p>
      </header>

      {/* Streak Tracker - Premium Card */}
      <StreakTracker data={data} />

      {/* Hero Section: Pattern Correlations */}
      <div className="animate-fade-in-up opacity-0 stagger-1 mb-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-slate-800">Detected Patterns</h2>
          <p className="text-sm text-slate-600 mt-2">
            Your tracked habits show the following correlations with skin changes. Stronger percentages indicate higher confidence.
          </p>
        </div>

        {/* Pattern Cards */}
        <div className="space-y-3">
          {topPatterns.map((pattern, idx) => (
            <PatternCorrelationCard key={pattern.habit} pattern={pattern} index={idx} />
          ))}
        </div>

        {topPatterns.length === 0 && (
          <div className="card-glass rounded-lg p-6 text-center border border-slate-200">
            <p className="text-slate-600">Continue logging to identify patterns in your data</p>
          </div>
        )}
      </div>

      {/* History Timeline */}
      <HistoryTimeline data={data} />

      {/* Tab Navigation for Detailed Views */}
      <div className="animate-fade-in-up opacity-0 stagger-3 mb-8">
        <div className="card-glass rounded-lg border border-white/10 overflow-hidden">
          <TabView defaultTab="timeline" tabs={tabs}>
            <TimelineTab
              data={data}
              contributors={result.todaySpike.contributors}
              acneChange={result.todaySpike.acneChange}
            />
            <PatternsTab scorecards={result.scorecards} />
            <InsightsTab
              data={data}
              result={result}
              baseline={baseline}
              trend={trend}
            />
            <CoachTab insights={aiInsights} isLoading={isLoadingAI} onRetry={handleRetryAI} />
          </TabView>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8">
        <p className="text-xs text-slate-500">
          Patterns are based on correlation analysis. Always consult a dermatologist.
        </p>
      </footer>
    </div>
  );
}

