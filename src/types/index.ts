export interface DayData {
  date: string;
  dairy: boolean;
  sugar: boolean;
  sleepQuality: 'good' | 'poor';
  stress: 'low' | 'medium' | 'high';
  skincareDone: boolean;
  acneSeverity: number;
}

export interface HabitPattern {
  habit: string;
  habitKey: keyof Pick<DayData, 'dairy' | 'sugar' | 'sleepQuality' | 'stress' | 'skincareDone'>;
  icon: string;
  occurrences: number;
  worsenCount: number;
  improveCount: number;
  confidence: number;
  impact: 'negative' | 'positive' | 'neutral';
  description: string;
  confidenceLevel: 'weak' | 'moderate' | 'strong' | 'insufficient';
  explanation: string;
  recommendation?: string;
  multiLagData?: {
    lag1: number;
    lag2: number;
    lag3: number;
    strongestLag: number;
  };
}

export interface TriggerInsight {
  habit: string;
  icon: string;
  message: string;
  confidence: number;
  impact: 'negative' | 'positive' | 'neutral';
}

export interface WhatChangedItem {
  habit: string;
  icon: string;
  reason: string;
}

export interface AIInsight {
  id: string;
  text: string;
  type: 'observation' | 'recommendation' | 'pattern';
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  habit: string;
  icon: string;
  impact: 'high' | 'medium';
  effort: 'easy' | 'moderate' | 'challenging';
  reason: string;
}

export interface WeeklyDigest {
  topImprovement: string;
  topConcern: string;
  focusHabit: string;
  focusIcon: string;
  focusReason: string;
  progressMessage: string;
}

export interface AnalysisResult {
  patterns: HabitPattern[];
  triggers: TriggerInsight[];
  todaySpike: {
    occurred: boolean;
    contributors: WhatChangedItem[];
    acneChange: number;
  };
  scorecards: HabitPattern[];
  recommendations: Recommendation[];
  weeklyDigest: WeeklyDigest;
}
