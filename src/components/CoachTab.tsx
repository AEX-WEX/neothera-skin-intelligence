'use client';

import { AIInsight } from '@/types';
import { CoachPanel } from './CoachPanel';

interface CoachTabProps {
  insights: AIInsight[];
  isLoading: boolean;
  onRetry: () => void;
}

export function CoachTab({ insights, isLoading, onRetry }: CoachTabProps) {
  return (
    <div className="space-y-4 pb-8">
      {/* Coach Panel */}
      <CoachPanel insights={insights} isLoading={isLoading} onRetry={onRetry} />

      {/* Coach Guide */}
      <div className="card-glass rounded-xl p-4 shadow-card border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3">🧠 About the AI Coach</h3>
        <div className="space-y-2 text-xs text-slate-600">
          <p>
            The AI Coach analyzes your personal data and generates insights specific to your patterns. It considers:
          </p>
          <ul className="space-y-1 ml-3 text-slate-600">
            <li>✓ Your strongest pattern correlations</li>
            <li>✓ Recent trends in your skin data</li>
            <li>✓ Opportunities for quick wins</li>
            <li>✓ Scientific explanations for patterns</li>
          </ul>
          <p className="mt-3 italic text-slate-500">
            💡 Refresh the insights to get a new analysis of your data, or explore the Patterns tab for detailed breakdowns.
          </p>
        </div>
      </div>

      {/* Insights Breakdown */}
      <div className="card-glass rounded-xl p-4 shadow-card border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3">📊 Insight Types</h3>
        <div className="space-y-2 text-xs text-slate-600">
          <div className="flex gap-2">
            <span className="text-base">💡</span>
            <span><strong>Observations:</strong> What your data shows about your patterns</span>
          </div>
          <div className="flex gap-2">
            <span className="text-base">📈</span>
            <span><strong>Patterns:</strong> Specific correlations between habits and skin</span>
          </div>
          <div className="flex gap-2">
            <span className="text-base">🎯</span>
            <span><strong>Recommendations:</strong> Actions you can take based on your data</span>
          </div>
        </div>
      </div>
    </div>
  );
}
