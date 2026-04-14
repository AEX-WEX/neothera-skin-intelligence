import { DayData, AIInsight, HabitPattern, AnalysisResult, Recommendation } from '@/types';

function generateFallbackInsights(result: AnalysisResult, recs: Recommendation[]): AIInsight[] {
  const insights: AIInsight[] = [];

  // Primary recommendation
  if (recs.length > 0) {
    const top = recs[0];
    insights.push({
      id: '1',
      text: `${top.title}: Your data shows ${top.reason.toLowerCase()}. ${top.description}`,
      type: 'recommendation',
    });
  }

  // Top negative pattern
  const negativePatterns = result.patterns.filter(p => p.impact === 'negative').sort((a, b) => b.confidence - a.confidence);
  if (negativePatterns.length > 0) {
    const top = negativePatterns[0];
    insights.push({
      id: '2',
      text: `${top.habit} shows the strongest pattern: ${top.confidence}% correlation with acne changes across ${top.occurrences} tracked days. ${top.explanation}`,
      type: 'pattern',
    });
  }

  // Positive pattern
  const positivePatterns = result.patterns.filter(p => p.impact === 'positive').sort((a, b) => b.confidence - a.confidence);
  if (positivePatterns.length > 0) {
    const top = positivePatterns[0];
    insights.push({
      id: '3',
      text: `Keep prioritizing ${top.habit.toLowerCase()}: You see improvement on ${top.improveCount} of ${top.occurrences} days you maintain this habit.`,
      type: 'observation',
    });
  }

  if (insights.length === 0) {
    insights.push({
      id: '1',
      text: "I've analyzed your patterns. Keep logging daily—more data reveals stronger insights.",
      type: 'observation',
    });
    insights.push({
      id: '2',
      text: 'Remember: skin health is a marathon. Consistency matters more than perfection.',
      type: 'recommendation',
    });
  }

  return insights;
}

function summarizeDataForAI(data: DayData[], result: AnalysisResult, recs: Recommendation[]): string {
  const summary: string[] = [];

  const avgAcne = (data.reduce((s, d) => s + d.acneSeverity, 0) / data.length).toFixed(1);
  const recentTrend = data.slice(-7).reduce((s, d) => s + d.acneSeverity, 0) / 7;
  const previousTrend = data.slice(-14, -7).reduce((s, d) => s + d.acneSeverity, 0) / 7;
  const trendDirection = recentTrend < previousTrend ? 'improving' : recentTrend > previousTrend ? 'worsening' : 'stable';

  summary.push(`User Data Summary (${data.length} days tracked):`);
  summary.push(`- Average acne severity: ${avgAcne}/5`);
  summary.push(`- Recent 7-day trend: ${trendDirection.charAt(0).toUpperCase() + trendDirection.slice(1)}`);
  summary.push('');

  summary.push('Detected Patterns (ranked by confidence):');
  result.patterns.forEach((p, i) => {
    summary.push(`${i + 1}. ${p.habit} (${p.confidence}% confidence, ${p.occurrences} observations)`);
    summary.push(`   - ${p.impact === 'negative' ? 'TRIGGER' : 'SUPPORT'}: ${p.explanation}`);
    summary.push(`   - Impact: ${p.worsenCount}x worse, ${p.improveCount}x better, ${p.improveCount}x neutral`);
  });
  summary.push('');

  summary.push('Recommended Focus Areas:');
  recs.slice(0, 2).forEach((r, i) => {
    summary.push(`${i + 1}. ${r.title}`);
    summary.push(`   - Why: ${r.reason}`);
  });
  summary.push('');

  if (result.todaySpike.occurred) {
    summary.push(`Today's Change: +${result.todaySpike.acneChange} severity`);
    summary.push(`Contributors: ${result.todaySpike.contributors.map(c => c.habit).join(', ')}`);
  }

  return summary.join('\n');
}

export async function generateAIInsights(
  data: DayData[],
  result: AnalysisResult,
  recommendations: Recommendation[]
): Promise<AIInsight[]> {
  try {
    const dataSummary = summarizeDataForAI(data, result, recommendations);

    // Call the API route instead of directly calling OpenRouter
    const response = await fetch('/api/insights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dataSummary }),
    });

    if (!response.ok) {
      console.error('API error:', response.status);
      return generateFallbackInsights(result, recommendations);
    }

    const json = await response.json();
    const insights = json.insights;

    if (!Array.isArray(insights) || insights.length === 0) {
      return generateFallbackInsights(result, recommendations);
    }

    return insights;
  } catch (error) {
    console.error('Error fetching AI insights:', error);
    return generateFallbackInsights(result, recommendations);
  }
}
