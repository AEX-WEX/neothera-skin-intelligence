'use client';

import { useState } from 'react';
import { HabitPattern } from '@/types';

interface EnhancedScorecardCardProps {
  pattern: HabitPattern;
  index: number;
}

export function EnhancedScorecardCard({ pattern, index }: EnhancedScorecardCardProps) {
  const [expanded, setExpanded] = useState(false);

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

  const confidenceLevelConfig = {
    strong: { label: '💪 Strong Pattern', bg: 'bg-emerald-100', text: 'text-emerald-700' },
    moderate: { label: '📊 Moderate Pattern', bg: 'bg-amber-100', text: 'text-amber-700' },
    weak: { label: '🔍 Weak Signal', bg: 'bg-slate-100', text: 'text-slate-700' },
    insufficient: { label: '⏳ Needs More Data', bg: 'bg-gray-100', text: 'text-gray-700' },
  };

  const confidenceConfig = confidenceLevelConfig[pattern.confidenceLevel];

  return (
    <div
      className={`card-glass rounded-xl border ${config.border} shadow-card animate-fade-in-up stagger-${index + 1} opacity-0 overflow-hidden`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 hover:bg-slate-50 transition-colors text-left"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{pattern.icon}</span>
            <span className="text-sm font-semibold text-slate-800">{pattern.habit}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${config.bg} ${config.color}`}>
              {config.label}
            </span>
            <span className="text-slate-400">{expanded ? '▼' : '▶'}</span>
          </div>
        </div>

        {/* Main Confidence Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Pattern Strength</span>
            <span className={`font-semibold ${config.color}`}>{pattern.confidence}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${config.bar}`}
              style={{ width: `${pattern.confidence}%` }}
            />
          </div>
        </div>
      </button>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-slate-100 px-4 py-3 bg-slate-50 space-y-3">
          {/* Confidence Level */}
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${confidenceConfig.bg} ${confidenceConfig.text}`}>
              {confidenceConfig.label}
            </span>
          </div>

          {/* Scientific Explanation */}
          <div>
            <p className="text-xs font-medium text-slate-700 mb-1">Why this matters:</p>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              {pattern.explanation}
            </p>
          </div>

          {/* Data Breakdown */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-500 mb-1">Tracked</p>
              <p className="text-base font-bold text-slate-700">{pattern.occurrences}</p>
              <p className="text-xs text-slate-400">days</p>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-500 mb-1">Worsened</p>
              <p className="text-base font-bold text-red-600">{pattern.worsenCount}</p>
              <p className="text-xs text-slate-400">times</p>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-500 mb-1">Improved</p>
              <p className="text-base font-bold text-emerald-600">{pattern.improveCount}</p>
              <p className="text-xs text-slate-400">times</p>
            </div>
          </div>

          {/* Multi-lag Insights */}
          {pattern.multiLagData && (
            <div>
              <p className="text-xs font-medium text-slate-700 mb-1">Effect Timeline:</p>
              <div className="grid grid-cols-3 gap-1">
                <div className="text-center p-2 bg-white rounded border border-slate-200">
                  <p className="text-xs text-slate-500">T+1</p>
                  <p className="text-sm font-bold text-slate-700">{pattern.multiLagData.lag1}%</p>
                </div>
                <div className="text-center p-2 bg-white rounded border border-slate-200">
                  <p className="text-xs text-slate-500">T+2</p>
                  <p className="text-sm font-bold text-slate-700">{pattern.multiLagData.lag2}%</p>
                </div>
                <div className="text-center p-2 bg-white rounded border border-slate-200">
                  <p className="text-xs text-slate-500">T+3</p>
                  <p className="text-sm font-bold text-slate-700">{pattern.multiLagData.lag3}%</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Strongest effect: <strong>Day {pattern.multiLagData.strongestLag === pattern.multiLagData.lag1 ? '+1' : pattern.multiLagData.strongestLag === pattern.multiLagData.lag2 ? '+2' : '+3'}</strong>
              </p>
            </div>
          )}

          {/* Data Quality Note */}
          <div className="text-xs text-slate-500 italic">
            {pattern.occurrences >= 10
              ? '✓ High confidence—based on substantial data'
              : pattern.occurrences >= 5
              ? '📊 Moderate confidence—track more to confirm'
              : '⏳ Low confidence—continue logging for clarity'}
          </div>
        </div>
      )}
    </div>
  );
}
