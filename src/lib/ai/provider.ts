import { z } from 'zod';

const FORBIDDEN_PATTERNS = [
  /\b4\.[789]\s*\/\s*5\s*stars?\b/i,
  /\b5\s*-\s*star\s+rated\b/i,
  /\b\d{2,},?\d*\+?\s+happy\s+customers\b/i,
  /\bselling\s+out\s+fast\b/i,
  /\bonly\s+\d+\s+left\s+in\s+stock\b/i,
  /\bvoted\s+#1\b/i,
];

export function sanitizeEthicalClaims(text: string): boolean {
  return !FORBIDDEN_PATTERNS.some((regex) => regex.test(text));
}

async function callRawLLM(systemPrompt: string, userPrompt: string): Promise<string> {
  const provider = process.env.LLM_PROVIDER || 'openai';

  if (provider === 'anthropic') {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        temperature: 0.3,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });
    if (!res.ok) throw new Error(`Anthropic API error: ${res.status}`);
    const data = await res.json();
    return data.content?.[0]?.text || '';
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.3,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    }),
  });
  if (!res.ok) throw new Error(`OpenAI API error: ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

export async function generateStructuredJSON<T>(
  schema: z.ZodType<T>,
  systemPrompt: string,
  userPrompt: string
): Promise<T> {
  const strictSystemPrompt = `${systemPrompt}
CRITICAL ETHICAL & OUTPUT RULES:
1. Return ONLY valid JSON matching the requested schema. No markdown fences.
2. NEVER invent customer reviews, star ratings, testimonials, sales counts, customer counts, or fake scarcity.`;

  let lastError = '';
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const retryPrompt =
        attempt === 1
          ? userPrompt
          : `${userPrompt}\n\nPREVIOUS OUTPUT FAILED VALIDATION (${lastError}). Fix the JSON structure and remove any fabricated claims.`;

      const raw = await callRawLLM(strictSystemPrompt, retryPrompt);
      const cleaned = raw.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
      const parsed = JSON.parse(cleaned);
      const validated = schema.parse(parsed);

      if (!sanitizeEthicalClaims(JSON.stringify(validated))) {
        throw new Error('Output contained forbidden fabricated ratings, customer counts, or fake scarcity.');
      }

      return validated;
    } catch (err: any) {
      lastError = err?.message || 'Invalid JSON schema';
      if (attempt === 2) throw new Error(`LLM failed validation after retry: ${lastError}`);
    }
  }
  throw new Error('Unreachable');
}
