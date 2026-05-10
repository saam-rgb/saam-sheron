import { useState } from 'react';

const LINKS = [
  { key: 'Email', label: 'saamsallvin@gmail.com', href: 'mailto:saamsallvin@gmail.com' },
  { key: 'LinkedIn', label: 'linkedin.com/in/saam-sheron', href: 'https://linkedin.com/in/saam-sheron/' },
  { key: 'GitHub', label: 'github.com/saam-rgb', href: 'https://github.com/saam-rgb' },
  { key: 'Phone · IST', label: '+91 91502 45248', href: 'tel:+919150245248' },
];

export default function ContactCTA() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: import.meta.env.VITE_WEB3FORMS_KEY, ...form }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="cta">
      <div className="cta-inner">
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>
            <b style={{ color: 'var(--accent-soft)' }}>06</b> · OPEN A CHANNEL
          </div>
          <h2 className="cta-h">
            Two clicks <br />
            from <span className="hl it">hello.</span>
          </h2>
          <p className="cta-sub">
            I read every email. Tell me the role, the stack, and the ship pressure. I'll tell you yes or no, fast.
          </p>

          <form onSubmit={handleSubmit} className="cta-form">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="cta-input"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Your email"
              className="cta-input"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Role, stack, ship pressure — go."
              className="cta-input cta-textarea"
            />
            <button type="submit" disabled={status === 'loading'} className="cta-submit">
              {status === 'loading' ? 'Sending…' : '▸ Send message'}
            </button>
            {status === 'success' && (
              <p className="cta-feedback cta-feedback--ok">✓ Sent. I'll reply within 24 hours.</p>
            )}
            {status === 'error' && (
              <p className="cta-feedback cta-feedback--err">
                Something went wrong — email saamsallvin@gmail.com directly.
              </p>
            )}
          </form>
        </div>

        <div className="cta-actions">
          {LINKS.map(l => (
            <a
              key={l.key}
              href={l.href}
              className="cta-btn"
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener' : undefined}
            >
              <span><span className="k">{l.key}</span>{l.label}</span>
              <span className="arr">↗</span>
            </a>
          ))}
        </div>
      </div>

      <div className="cta-grid">
        <div>Location<b>Chennai, India · Remote-friendly</b></div>
        <div>Notice<b>Negotiable</b></div>
        <div>Reply SLA<b>&lt; 24 hours</b></div>
        <div>Status<b style={{ color: 'var(--accent-soft)' }}>● Open to hire</b></div>
      </div>
    </section>
  );
}
