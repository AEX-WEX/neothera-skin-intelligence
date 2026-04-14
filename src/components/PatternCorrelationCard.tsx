'use client';

import { HabitPattern } from '@/types';

interface PatternCorrelationCardProps {
  pattern: HabitPattern;
  index: number;
}

export function PatternCorrelationCard({ pattern, index }: PatternCorrelationCardProps) {
  const isStrong = pattern.confidence >= 70;
  const isModerate = pattern.confidence >= 55;

  const strengthLabel = isStrong ? 'STRONG' : isModerate ? 'MODERATE' : 'WEAK';
  const borderColor = isStrong ? 'border-red-200' : isModerate ? 'border-amber-200' : 'border-slate-200';
  const bgColor = isStrong ? 'bg-red-50' : isModerate ? 'bg-amber-50' : 'bg-slate-50';
  const badgeColor = isStrong ? 'bg-red-500' : isModerate ? 'bg-amber-500' : 'bg-slate-400';
  const textColor = isStrong ? 'text-red-700' : isModerate ? 'text-amber-700' : 'text-slate-600';

  const correlationStatus = pattern.impact === 'negative' 
    ? 'Suggests worsening' 
    : pattern.impact === 'positive' 
    ? 'Suggests improvement' 
    : 'Unclear correlation';

  return (
    <div
      className={`card-glass rounded-lg p-5 mb-3 border transition-all duration-300 ${borderColor} ${bgColor} animate-fade-in-up opacity-0`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="font-semibold text-slate-800 text-lg">{pattern.habit}</p>
            <p className={`text-xs font-bold mt-1 ${textColor}`}>
              {strengthLabel} CORRELATION
            </p>
          </div>
          <div className={`${badgeColor} rounded px-3 py-2 text-center min-w-fit flex-shrink-0`}>
            <p className="text-2xl font-bold text-white">{pattern.confidence.toFixed(0)}</p>
            <p className="text-xs text-white/90">%</p>
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="space-y-2">
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
            <div
              className={`h-full transition-all duration-500 ${
                isStrong 
                  ? 'bg-gradient-to-r from-red-500 to-red-400' 
                  : isModerate
                  ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                  : 'bg-gradient-to-r from-slate-500 to-slate-400'
              }`}
              style={{ width: `${pattern.confidence}%` }}
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 py-3 border-y border-slate-200">
          <div className="text-center">
            <p className="text-rose-600 font-bold text-sm">{pattern.occurrences}</p>
            <p className="text-xs text-slate-500 mt-1">occurrences</p>
          </div>
          <div className="text-center">
            <p className="text-red-600 font-bold text-sm">{pattern.worsenCount}</p>
            <p className="text-xs text-slate-500 mt-1">worsened</p>
          </div>
          <div className="text-center">
            <p className="text-emerald-600 font-bold text-sm">{pattern.improveCount}</p>
            <p className="text-xs text-slate-500 mt-1">improved</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {correlationStatus} in your skin data. Observed in {pattern.occurrences} tracked instances with {((pattern.worsenCount / pattern.occurrences) * 100).toFixed(0)}% correlation to negative changes.
          </p>
        </div>
      </div>
    </div>
  );
}
