// src/api.ts
import { QuestionsArray } from './questions';

export async function generateQuestionsProxy(promptPayload: any): Promise<QuestionsArray> {
  const res = await fetch('/.netlify/functions/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ payload: promptPayload })
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Server error: ${res.status} ${txt}`);
  }

  const json = await res.json();
  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? json?.text ?? '[]';

  const cleaned = extractJson(text);
  const parsed = JSON.parse(cleaned);

  if (!Array.isArray(parsed) || parsed.length === 0) throw new Error('API did not return questions');
  return parsed as QuestionsArray;
}

function extractJson(s: string) {
  const arrMatch = s.match(/\[[\s\S]*\]/);
  if (arrMatch) return arrMatch[0];
  const objMatch = s.match(/\{[\s\S]*\}/);
  if (objMatch) return objMatch[0];
  return '[]';
}
