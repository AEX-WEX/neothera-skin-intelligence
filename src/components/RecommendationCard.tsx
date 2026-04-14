'use client';

import { Recommendation } from '@/types';

interface RecommendationCardProps {
  recommendation: Recommendation;
  index: number;
}

export function RecommendationCard({ recommendation, index }: RecommendationCardProps) {
  const effortConfig = {
    easy: { label: 'Easy', bg: 'bg-emerald-100', text: 'text-emerald-700' },
    moderate: { label: 'Moderate', bg: 'bg-amber-100', text: 'text-amber-700' },
    challenging: { label: 'Challenging', bg: 'bg-orange-100', text: 'text-orange-700' },
  };

  const effortBadge = effortConfig[recommendation.effort];

  return (
    <div
      className={`card-glass rounded-2xl p-4 border border-teal-200 shadow-card animate-fade-in-up stagger-${index + 1} opacity-0 hover:border-teal-300 transition-all`}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-100 to-teal-50 flex items-center justify-center text-lg flex-shrink-0">
          {recommendation.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-slate-800">
              {recommendation.title}
            </h3>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed mb-2">
            {recommendation.description}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${effortBadge.bg} ${effortBadge.text}`}>
              {effortBadge.label} effort
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${recommendation.impact === 'high' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
              {recommendation.impact === 'high' ? '⭐ High impact' : 'Medium impact'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 italic">
            {recommendation.reason}
          </p>
        </div>
      </div>
    </div>
  );
}
