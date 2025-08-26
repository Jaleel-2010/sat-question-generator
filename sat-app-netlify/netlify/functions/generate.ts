import type { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const payload = body.payload;

    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await r.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (e: any) {
    console.error("Gemini proxy failed", e);
    return { statusCode: 500, body: JSON.stringify({ error: "Gemini proxy failed" }) };
  }
};

export { handler };
