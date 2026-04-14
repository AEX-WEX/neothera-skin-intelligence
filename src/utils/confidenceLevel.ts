/**
 * Confidence Level Utilities
 * Determines correlation strength from percentage values
 */

export type ConfidenceLevel = 'weak' | 'moderate' | 'strong' | 'insufficient';

export function getConfidenceLevel(confidence: number): ConfidenceLevel {
  if (confidence < 50) return 'insufficient';
  if (confidence < 60) return 'weak';
  if (confidence < 70) return 'moderate';
  return 'strong';
}

export function getConfidenceLabel(level: ConfidenceLevel): string {
  const labels: Record<ConfidenceLevel, string> = {
    insufficient: 'Insufficient Data',
    weak: 'Weak Correlation',
    moderate: 'Moderate Correlation',
    strong: 'Strong Correlation',
  };
  return labels[level];
}

export function getConfidenceColor(level: ConfidenceLevel): string {
  const colors: Record<ConfidenceLevel, string> = {
    insufficient: 'text-slate-500',
    weak: 'text-amber-600',
    moderate: 'text-blue-600',
    strong: 'text-emerald-600',
  };
  return colors[level];
}
