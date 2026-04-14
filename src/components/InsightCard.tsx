'use client';

import { TriggerInsight } from '@/types';

interface InsightCardProps {
  insight: TriggerInsight;
  index: number;
}

export function InsightCard({ insight, index }: InsightCardProps) {
  const impactColors = {
    negative: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'bg-red-100',
      iconText: 'text-red-500',
      badge: 'bg-red-100 text-red-700',
      label: 'Potential Trigger',
    },
    positive: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      icon: 'bg-emerald-100',
      iconText: 'text-emerald-500',
      badge: 'bg-emerald-100 text-emerald-700',
      label: 'Supporting Factor',
    },
    neutral: {
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      icon: 'bg-slate-100',
      iconText: 'text-slate-500',
      badge: 'bg-slate-100 text-slate-700',
      label: 'Monitor',
    },
  };

  const colors = impactColors[insight.impact];

  return (
    <div
      className={`card-glass rounded-2xl p-4 border ${colors.border} shadow-card animate-fade-in-up stagger-${index + 1} opacity-0`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl ${colors.icon} flex items-center justify-center text-lg flex-shrink-0`}>
          {insight.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.badge}`}>
              {colors.label}
            </span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {insight.message}
          </p>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-xs text-slate-500">Confidence:</span>
            <span className={`text-xs font-semibold ${colors.iconText}`}>
              {insight.confidence}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
