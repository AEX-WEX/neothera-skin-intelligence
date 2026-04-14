import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';

const SYSTEM_PROMPT = `You are a compassionate, data-driven skincare intelligence assistant. You help users understand their skin patterns based on their personal data. 
Rules:
- ALWAYS reference specific numbers from the user's data (percentages, days, counts)
- Use cautious language: "may", "appears", "associated with", "suggests"
- Never claim causation, only correlation
- Be warm, supportive, and actionable
- Keep insights concise (1-2 sentences each)
- Prioritize insights based on data confidence
- Include next steps the user can take`;

export async function POST(request: NextRequest) {
  try {
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const { dataSummary } = await request.json();

    if (!dataSummary) {
      return NextResponse.json(
        { error: 'Missing dataSummary in request body' },
        { status: 400 }
      );
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: `Analyze this user's skin pattern data and provide 3 concise, data-driven insights:\n\n${dataSummary}\n\nFormat each insight as a single strong sentence that references specific numbers from their data. Prioritize: 1) Actionable recommendation, 2) Strongest pattern, 3) Success to celebrate.`,
          },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter API error:', response.status, errorData);
      return NextResponse.json(
        { error: `API error: ${response.status}` },
        { status: response.status }
      );
    }

    const json = await response.json();
    const content = json.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: 'No content in API response' },
        { status: 500 }
      );
    }

    const insights = content
      .split(/\n/)
      .filter((line: string) => line.trim().length > 10)
      .map((line: string, i: number) => ({
        id: String(i + 1),
        text: line.replace(/^\d+\.\s*/, '').trim(),
        type: i === 0 ? 'recommendation' as const : i === 1 ? 'pattern' as const : 'observation' as const,
      }))
      .slice(0, 3);

    return NextResponse.json({ insights });
  } catch (error) {
    console.error('Error in /api/insights:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
