import { useState, useRef, useEffect } from 'react';

const PROMPTS = [
  { label: 'DICOM viewer arch', text: 'How would you architect an image-viewer module for a RIS/PACS app where studies can have 500+ DICOM frames? Walk me through state, performance, and a11y.' },
  { label: 'Vue perf debug', text: 'Vue 3 component re-rendering on every keystroke in a parent. How would you debug it?' },
  { label: '60-field form lag', text: 'React form with 60+ inputs is laggy. What\'s your first 3 things to try?' },
  { label: 'Vue vs React', text: 'When would you pick Vue over React, and vice versa?' },
];

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

export default function TryMe() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
      el.classList.add('in');
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('in'); io.disconnect(); } },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    const t = setTimeout(() => el.classList.add('in'), 1500);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);

  const run = async () => {
    const q = input.trim();
    if (!q) return;
    setLoading(true);
    setOutput({ status: 'loading' });

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, type: 'tryme' }),
      });
      const data = await res.json();
      setOutput({ status: 'done', text: data.text || data.error });
    } catch {
      setOutput({ status: 'error' });
    }
    setLoading(false);
  };

  return (
    <section className="section">
      <div className="sec-head reveal-head">
        <div className="sec-num"><b>04</b> · TRY ME</div>
        <div className="sec-title">Throw me a <span className="it">problem.</span></div>
        <div className="sec-meta">No interview required</div>
      </div>

      <div className="tryme reveal" ref={ref}>
        <div className="tryme-l">
          <h3>Drop a question. <span className="it">Watch me think.</span></h3>
          <p>
            A scoping problem. A debugging riddle. A "how would you build…" prompt. AI Saam will give you
            the same answer I'd give in a real screen — minus the umms.
          </p>
          <div className="tryme-prompts">
            {PROMPTS.map(p => (
              <button key={p.label} onClick={() => setInput(p.text)}>{p.label}</button>
            ))}
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Or type your own…"
          />
          <button className="tryme-go" onClick={run} disabled={loading}>
            ▸ Run
          </button>
        </div>

        <div className="tryme-r">
          {!output && (
            <>
              <div className="head">
                <span>OUTPUT · saam.think()</span>
                <span className="acc">▮ ready</span>
              </div>
              <div className="empty">Pick a prompt or type your own. I'll respond as I would on a real call.</div>
            </>
          )}
          {output?.status === 'loading' && (
            <>
              <div className="head">
                <span>OUTPUT · saam.think()</span>
                <span style={{ color: 'var(--accent)' }}>▮ thinking…</span>
              </div>
              <div style={{ color: 'var(--dim)', fontStyle: 'italic' }}>Composing answer…</div>
            </>
          )}
          {output?.status === 'done' && (
            <>
              <div className="head">
                <span>OUTPUT · saam.think()</span>
                <span className="acc">▮ done</span>
              </div>
              <div dangerouslySetInnerHTML={{ __html: escapeHtml(output.text) }} />
            </>
          )}
          {output?.status === 'error' && (
            <>
              <div className="head">
                <span>OUTPUT</span>
                <span style={{ color: 'var(--red)' }}>▮ offline</span>
              </div>
              <div style={{ color: 'var(--dim)' }}>
                Can't reach the model right now. Email me your problem at saamsallvin@gmail.com — I'll think on it and reply within 24 hours.
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
