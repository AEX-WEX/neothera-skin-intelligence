'use client';

import { HabitPattern } from '@/types';

interface ScorecardCardProps {
  pattern: HabitPattern;
  index: number;
}

export function ScorecardCard({ pattern, index }: ScorecardCardProps) {
  const impactConfig = {
    negative: {
      label: 'May Worsen',
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      bar: 'bg-red-400',
      icon: '⚠️',
    },
    positive: {
      label: 'May Help',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      bar: 'bg-emerald-400',
      icon: '✓',
    },
    neutral: {
      label: 'Unclear',
      color: 'text-slate-600',
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      bar: 'bg-slate-400',
      icon: '?',
    },
  };

  const config = impactConfig[pattern.impact];

  return (
    <div
      className={`card-glass rounded-xl p-4 shadow-card animate-fade-in-up stagger-${index + 1} opacity-0 border ${config.border}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{pattern.icon}</span>
          <span className="text-sm font-semibold text-slate-800">{pattern.habit}</span>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${config.bg} ${config.color}`}>
          {config.label}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">Pattern Confidence</span>
          <span className={`font-semibold ${config.color}`}>{pattern.confidence}%</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${config.bar}`}
            style={{ width: `${pattern.confidence}%` }}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>{pattern.occurrences} tracked days</span>
        <span>{pattern.worsenCount}w / {pattern.improveCount}i</span>
      </div>
    </div>
  );
}
