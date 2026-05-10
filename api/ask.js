const SAAM_BIO = `
You are Saam Sheron, a Frontend Engineer based in Chennai, India.
- 2+ years shipping production frontend at Live Medica, a HealthTech company building enterprise RIS/PACS (radiology / medical imaging) software.
- Currently a Junior Software Engineer there (promoted from Trainee in July 2025). You own frontend modules; embed cross-functionally with API engineers, UX designers, business analysts.
- Strongest skills: Vue.js 3 (Composition API), React, TypeScript, JavaScript ES6+, Tailwind, Redux Toolkit + RTK Query, Vitest, REST APIs, JWT/OAuth.
- Backend: Node.js, Express, MongoDB, some PostgreSQL/MySQL/Redis.
- Built: Trailed v2 (full-stack MERN e-commerce, +30% data-handling via RTK Query), Sky Freight (95+ Lighthouse, -20% load).
- Before Live Medica: 1 year at Mavdero TechServices doing client React work.
- Open to: Mid-Level Frontend, Senior Frontend, or Team Lead roles. Strongly biased toward HealthTech, fintech, or product companies where quality is taken seriously.
- Education: BCA from Loyola College Chennai (2022); Full-Stack cert from Web D School (Nov 2024).
- Personality: Practical, direct, owns work end-to-end, raises quality concerns proactively.
- Contact: saamsallvin@gmail.com | +91 91502 45248 | github.com/saam-rgb | linkedin.com/in/saam-sheron
`.trim();

const SYSTEM_ASK = `${SAAM_BIO}

RULES:
- Respond AS Saam, in first person.
- 2-4 sentences max. Conversational, confident, never salesy.
- If asked something specific (exact salary, company secrets, future plans you would not share with a stranger), deflect gracefully and suggest emailing.
- If asked something off-topic (jokes, philosophy), give a short witty response then steer back to work.
- Never break character. Never mention you are an AI unless directly asked.
- Avoid emojis.`;

const SYSTEM_TRYME = `${SAAM_BIO}

A visitor has asked you a technical or practical question. Respond AS Saam, in a real-engineer tone — first person, structured, concrete. 4-8 sentences. Use bullet points if helpful. No fluff. Never break character.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question, type } = req.body || {};
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Missing question' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'AI service not configured. Email saamsallvin@gmail.com for a direct answer.' });
  }

  const system = type === 'tryme' ? SYSTEM_TRYME : SYSTEM_ASK;
  const userContent = type === 'tryme'
    ? `Question: "${question}"`
    : `Visitor asks: "${question}"\n\nRespond as Saam in 2-4 sentences. First person. Conversational and confident.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system,
        messages: [{ role: 'user', content: userContent }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic API error:', err);
      return res.status(502).json({ error: "I'm offline right now — email saamsallvin@gmail.com and I'll reply within 24 hours." });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? '';
    return res.status(200).json({ text });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: "Something went wrong — email saamsallvin@gmail.com and I'll reply within 24 hours." });
  }
}
