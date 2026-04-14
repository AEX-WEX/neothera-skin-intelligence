/**
 * useAnalysis Hook
 * Encapsulates data analysis logic for components
 */

'use client';

import { useMemo } from 'react';
import { DayData, AnalysisResult } from '@/types';
import { analyzeData, getBaselineAcne, getAcneTrend } from '@/lib/analysis';

interface UseAnalysisResult {
  result: AnalysisResult | null;
  baseline: number;
  trend: 'improving' | 'worsening' | 'stable';
}

export function useAnalysis(data: DayData[]): UseAnalysisResult {
  const result = useMemo(() => {
    if (!data || data.length === 0) return null;
    return analyzeData(data);
  }, [data]);

  const baseline = useMemo(() => {
    if (!data || data.length === 0) return 0;
    return getBaselineAcne(data);
  }, [data]);

  const trend = useMemo(() => {
    if (!data || data.length === 0) return 'stable';
    return getAcneTrend(data);
  }, [data]);

  return { result, baseline, trend };
}
