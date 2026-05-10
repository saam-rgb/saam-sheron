const LINKS = [
  { key: 'Email', label: 'saamsallvin@gmail.com', href: 'mailto:saamsallvin@gmail.com' },
  { key: 'LinkedIn', label: 'linkedin.com/in/saam-sheron', href: 'https://linkedin.com/in/saam-sheron/' },
  { key: 'GitHub', label: 'github.com/saam-rgb', href: 'https://github.com/saam-rgb' },
  { key: 'Phone · IST', label: '+91 91502 45248', href: 'tel:+919150245248' },
];

export default function ContactCTA() {
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
              <span>
                <span className="k">{l.key}</span>
                {l.label}
              </span>
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
