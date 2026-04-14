'use client';

import { HabitPattern } from '@/types';
import { EnhancedScorecardCard } from './EnhancedScorecardCard';

interface PatternsTabProps {
  scorecards: HabitPattern[];
}

export function PatternsTab({ scorecards }: PatternsTabProps) {
  const negativePatterns = scorecards.filter(p => p.impact === 'negative');
  const positivePatterns = scorecards.filter(p => p.impact === 'positive');
  const neutralPatterns = scorecards.filter(p => p.impact === 'neutral');

  return (
    <div className="space-y-6 pb-8">
      {/* Understanding Confidence */}
      <div className="card-glass rounded-xl p-4 shadow-card border border-blue-200 bg-blue-50">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">📚 How to Read Patterns</h3>
        <ul className="space-y-1 text-xs text-blue-800">
          <li><strong>70%+:</strong> Strong pattern—take action</li>
          <li><strong>55-70%:</strong> Clear signal—worth tracking</li>
          <li><strong>Below 55%:</strong> Needs more data—keep monitoring</li>
        </ul>
      </div>

      {/* Negative Patterns (Triggers) */}
      {negativePatterns.length > 0 && (
        <section className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <span className="text-lg">⚠️</span>
            <h2 className="text-sm font-semibold text-slate-700">
              Potential Triggers ({negativePatterns.length})
            </h2>
          </div>
          <div className="space-y-2">
            {negativePatterns.map((pattern, index) => (
              <EnhancedScorecardCard key={pattern.habit} pattern={pattern} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Positive Patterns (Supporters) */}
      {positivePatterns.length > 0 && (
        <section className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <span className="text-lg">✨</span>
            <h2 className="text-sm font-semibold text-slate-700">
              Supporting Habits ({positivePatterns.length})
            </h2>
          </div>
          <div className="space-y-2">
            {positivePatterns.map((pattern, index) => (
              <EnhancedScorecardCard key={pattern.habit} pattern={pattern} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Neutral Patterns */}
      {neutralPatterns.length > 0 && (
        <section className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <span className="text-lg">❓</span>
            <h2 className="text-sm font-semibold text-slate-700">
              Unclear Patterns ({neutralPatterns.length})
            </h2>
          </div>
          <div className="space-y-2">
            {neutralPatterns.map((pattern, index) => (
              <EnhancedScorecardCard key={pattern.habit} pattern={pattern} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Educational Note */}
      <div className="card-glass rounded-xl p-4 shadow-card border border-slate-200">
        <p className="text-xs text-slate-600">
          <span className="font-medium">💡 Remember:</span> These patterns show <strong>correlation</strong>, not causation. Your skin is complex, and multiple factors interact. Use this data as a guide for self-experimentation, not as medical advice.
        </p>
      </div>
    </div>
  );
}
