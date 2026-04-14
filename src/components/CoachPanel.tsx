'use client';

import { useState, useEffect } from 'react';
import { AIInsight } from '@/types';

interface CoachPanelProps {
  insights: AIInsight[];
  isLoading: boolean;
  onRetry: () => void;
}

export function CoachPanel({ insights, isLoading, onRetry }: CoachPanelProps) {
  const [visibleInsights, setVisibleInsights] = useState<AIInsight[]>([]);

  useEffect(() => {
    if (insights.length > 0) {
      setVisibleInsights([]);
      insights.forEach((insight, index) => {
        setTimeout(() => {
          setVisibleInsights(prev => [...prev, insight]);
        }, index * 150);
      });
    }
  }, [insights]);

  const typeConfig = {
    observation: { icon: '💡', label: 'Observation', bg: 'bg-amber-50', border: 'border-amber-200' },
    pattern: { icon: '📈', label: 'Pattern', bg: 'bg-blue-50', border: 'border-blue-200' },
    recommendation: { icon: '🎯', label: 'Recommendation', bg: 'bg-purple-50', border: 'border-purple-200' },
  };

  if (isLoading) {
    return (
      <div className="card-glass rounded-2xl p-6 shadow-card animate-fade-in-up stagger-4 opacity-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-lg">
            🧠
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800">AI Skin Coach</h3>
            <p className="text-xs text-slate-500">Analyzing your patterns...</p>
          </div>
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-slate-100 rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card-glass rounded-2xl p-4 shadow-card animate-fade-in-up stagger-4 opacity-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-lg">
            🧠
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800">AI Skin Coach</h3>
            <p className="text-xs text-slate-500">Personalized insights</p>
          </div>
        </div>
        <button
          onClick={onRetry}
          className="text-xs text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
        >
          <span>↻</span> Refresh
        </button>
      </div>

      <div className="space-y-3">
        {visibleInsights.map(insight => {
          const config = typeConfig[insight.type];
          return (
            <div
              key={insight.id}
              className={`p-3 rounded-xl ${config.bg} border ${config.border} transition-all duration-300`}
            >
              <div className="flex items-start gap-2">
                <span className="text-sm flex-shrink-0">{config.icon}</span>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {insight.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
