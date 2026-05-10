import { useState, useRef, useEffect } from 'react';

const SUGGESTIONS = [
  { label: 'Why hire you?', q: 'Why should I hire you for a senior frontend role?' },
  { label: 'Strongest skill?', q: "What's your strongest technical skill and how have you used it?" },
  { label: 'A real win at Live Medica', q: 'Tell me about a time you owned something end-to-end at Live Medica.' },
  { label: 'React or Vue?', q: 'Are you good with React or just Vue?' },
  { label: 'Notice & expectations', q: "What's your notice period and salary expectation?" },
  { label: 'Hardest ship', q: "What's the hardest thing you've shipped?" },
];

export default function AskMe() {
  const [input, setInput] = useState('');
  const [thread, setThread] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(() => parseInt(localStorage.getItem('saam_asked') || '0', 10));
  const threadRef = useRef(null);

  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [thread]);

  const send = async (question) => {
    const q = question || input.trim();
    if (!q || loading) return;
    setInput('');
    setLoading(true);
    setThread(t => [...t, { role: 'user', text: q }]);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, type: 'ask' }),
      });
      const data = await res.json();
      setThread(t => [...t, { role: 'saam', text: data.text || data.error || "I'm offline — email saamsallvin@gmail.com and I'll reply within 24 hours." }]);
    } catch {
      setThread(t => [...t, { role: 'saam', text: "I'm offline at the moment — for a real answer, email saamsallvin@gmail.com and I'll reply within 24 hours." }]);
    }

    const next = count + 1;
    setCount(next);
    localStorage.setItem('saam_asked', next);
    setLoading(false);
  };

  return (
    <div className="ask">
      <div className="ask-head">
        <div className="who">
          <span>↳ Saam · AI</span>
          <span className="live">live</span>
        </div>
        <div className="meta">~ 3 sec response</div>
      </div>

      <div className="ask-title">Ask me anything.</div>
      <div className="ask-hint">
        An AI version of me, primed on my work history. Answers as I would. Try one of these or write your own:
      </div>

      <div className="ask-suggest">
        {SUGGESTIONS.map(s => (
          <button key={s.label} onClick={() => send(s.q)}>{s.label}</button>
        ))}
      </div>

      <div className={`ask-thread${thread.length > 0 ? ' open' : ''}`} ref={threadRef}>
        {thread.map((msg, i) => (
          <div
            key={i}
            className={`bubble ${msg.role === 'user' ? 'user' : 'saam'}`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="bubble saam thinking">Saam is typing</div>
        )}
      </div>

      <div className="ask-input-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Type your question — e.g. how do you handle code reviews?"
        />
        <button onClick={() => send()} disabled={loading}>Ask</button>
      </div>

      <div className="ask-disclaimer">
        <span>
          ↳ AI-mediated. For exact terms, email{' '}
          <a href="mailto:saamsallvin@gmail.com" style={{ color: 'var(--ink)', borderBottom: '1px solid' }}>
            saamsallvin@gmail.com
          </a>
        </span>
        <span className="ask-counter" style={{ marginLeft: 'auto' }}>
          <b>{count}</b> questions asked today
        </span>
      </div>
    </div>
  );
}
