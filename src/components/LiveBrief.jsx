const ROLES = [
  { id: 'frontend', label: 'Frontend Engineer', pct: '98%' },
  { id: 'healthtech', label: 'HealthTech / Medical Imaging', pct: '96%' },
  { id: 'lead', label: 'Team Lead', pct: '82%' },
  { id: 'fullstack', label: 'Full-Stack (MERN)', pct: '88%' },
  { id: 'ux', label: 'Design Engineer / UX-FE', pct: '79%' },
];

const ROLE_COPY = {
  frontend: { match: 98, why: "You're hiring frontend. <b>I am the frontend.</b> Vue 3 + React, TypeScript, 2+ years shipping production. Pinned the 4 builds that show range." },
  healthtech: { match: 96, why: "You're in HealthTech. So am I. <b>RIS/PACS specialist</b> at Live Medica — I already speak DICOM, study viewers, and clinical UX. Pinned the work." },
  lead: { match: 82, why: "Stepping into Team Lead is the next move I'm planning for. I already <b>own modules end-to-end</b> and push back on bad specs — happy to talk about how I'd lead a team." },
  fullstack: { match: 88, why: "MERN end-to-end build is in the portfolio (Trailed v2). Frontend is sharper, but the full stack is real. Pinned the relevant work." },
  ux: { match: 79, why: "I came up through Figma → React. <b>Design-eng bridge</b> is one of my strongest moves. Pinned the work where I designed and shipped." },
};

export default function LiveBrief({ activeRole, onRoleSelect }) {
  const result = activeRole ? ROLE_COPY[activeRole] : null;

  return (
    <section className="brief">
      <div className="brief-inner">
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.16em', marginBottom: 16 }}>
            <b style={{ color: 'var(--accent-soft)', fontWeight: 500 }}>02</b> · LIVE BRIEF
          </div>
          <h2 className="brief-q">
            What are <span className="it">you</span> hiring for?
          </h2>
          <p style={{ marginTop: 16, color: 'rgba(255,255,255,0.6)', fontSize: 15, maxWidth: 460 }}>
            Pick a role below. The work below reorders to show what's relevant, with a fit-score pinned to each. No more scrolling for the right project.
          </p>
        </div>

        <div>
          <div className="brief-options">
            {ROLES.map(r => (
              <button
                key={r.id}
                className={`brief-opt${activeRole === r.id ? ' active' : ''}`}
                onClick={() => onRoleSelect(activeRole === r.id ? null : r.id)}
              >
                <span>{r.label}</span>
                <span className="pct">{r.pct}</span>
                <span className="arr">→</span>
              </button>
            ))}
          </div>

          {result && (
            <div className="brief-result show">
              <b>▸ Brief locked.</b> Fit score: <b>{result.match}%</b>.{' '}
              <span dangerouslySetInnerHTML={{ __html: result.why }} />{' '}
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Pinned work pushed to top.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
