'use client';

import { DayData, AnalysisResult, Recommendation } from '@/types';
import { InsightCard } from './InsightCard';
import { RecommendationCard } from './RecommendationCard';
import { WeeklyDigestCard } from './WeeklyDigestCard';

interface InsightsTabProps {
  data: DayData[];
  result: AnalysisResult;
  baseline: number;
  trend: 'improving' | 'worsening' | 'stable';
}

export function InsightsTab({
  data,
  result,
  baseline,
  trend,
}: InsightsTabProps) {
  const trendConfig = {
    improving: { icon: '📉', label: 'Improving', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    worsening: { icon: '📈', label: 'Needs Attention', color: 'text-amber-600', bg: 'bg-amber-50' },
    stable: { icon: '➡️', label: 'Stable', color: 'text-slate-600', bg: 'bg-slate-50' },
  };

  const currentConfig = trendConfig[trend];

  return (
    <div className="space-y-4 pb-8">
      {/* Status Header - 3 columns */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        <div className="card-glass rounded-lg p-3 shadow-card text-center">
          <p className="text-xs text-slate-500 mb-1">Avg Severity</p>
          <p className="text-2xl font-bold text-slate-800">{baseline.toFixed(1)}</p>
        </div>
        <div className="card-glass rounded-lg p-3 shadow-card text-center">
          <p className="text-xs text-slate-500 mb-1">Days Tracked</p>
          <p className="text-2xl font-bold text-slate-800">{data.length}</p>
        </div>
        <div className="card-glass rounded-lg p-3 shadow-card text-center">
          <p className="text-xs text-slate-500 mb-1">Trend</p>
          <p className={`text-2xl font-bold ${currentConfig.color}`}>{currentConfig.icon}</p>
        </div>
        <div className="hidden md:block card-glass rounded-lg p-3 shadow-card text-center">
          <p className="text-xs text-slate-500 mb-0.5">Status</p>
          <p className="text-xs font-bold text-slate-700">{currentConfig.label}</p>
        </div>
      </div>

      {/* AI Coach - Removed from here to create clear separation */}
      {/* Insights tab now focuses on data-driven observations only */}
      {/* For personalized AI coaching recommendations, see the Coach tab */}

      {/* Top Trigger/Pattern Observation */}
      {result.triggers.length > 0 && (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">📊 Strongest Pattern Detected</h3>
          <InsightCard key={result.triggers[0].habit} insight={result.triggers[0]} index={0} />
        </div>
      )}

      {/* Top Recommendation Card */}
      {result.recommendations.length > 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-blue-900 mb-4">🎯 Top Data-Driven Suggestion</h3>
          <RecommendationCard key={result.recommendations[0].id} recommendation={result.recommendations[0]} index={0} />
          <p className="text-xs text-blue-700 mt-3 italic">For personalized AI coaching & recommendations, visit the Coach tab →</p>
        </div>
      )}

      {/* Empty State */}
      {result.triggers.length === 0 && result.recommendations.length === 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
          <p className="text-slate-600 mb-2">📈 Keep logging to identify patterns</p>
          <p className="text-xs text-slate-500">Continue tracking your habits and skin for insights to appear here</p>
        </div>
      )}
    </div>
  );
}
