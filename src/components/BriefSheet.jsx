import { useEffect, useRef } from 'react';

const ROWS = [
  {
    label: 'Who',
    sub: 'Saam Sheron',
    body: 'Frontend Engineer · HealthTech specialist · Chennai, India · 2+ years shipping production at a product company.',
  },
  {
    label: 'What I do',
    sub: 'Specialty',
    body: 'Build <b>enterprise medical-imaging interfaces</b> — RIS/PACS systems where the UI has to stay intuitive under data-heavy, real-world clinical conditions. Currently at <b>Live Medica</b>, owning frontend modules in a cross-functional team.',
  },
  {
    label: 'Stack',
    sub: 'Daily drivers',
    body: '<b>Vue 3</b>, <b>React</b>, TypeScript, Redux Toolkit, RTK Query, Tailwind, Vitest, Node, Express, MongoDB. Comfortable in a Figma → production loop.',
  },
  {
    label: 'Open to',
    sub: 'Roles',
    body: '<span class="acc">Mid-Level Frontend</span>, <span class="acc">Senior Frontend</span>, or <span class="acc">Team Lead</span>. Strongly biased toward HealthTech, fintech, or any product company where quality is taken seriously.',
  },
  {
    label: 'How I work',
    sub: 'Approach',
    body: 'Owns modules end-to-end. Raises quality concerns <i>before</i> they become issues. Pushes back when the spec is wrong, ships when it\'s right. <b>Consistent on-time delivery.</b>',
  },
  {
    label: 'Reply time',
    sub: 'SLA',
    body: '< <b>24 hours</b>. Faster if it\'s a real role.',
  },
];

export default function BriefSheet() {
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

  return (
    <section className="section">
      <div className="sec-head reveal-head">
        <div className="sec-num"><b>05</b> · TL;DR</div>
        <div className="sec-title">The <span className="it">brief.</span></div>
        <div className="sec-meta">For the recruiter in a hurry</div>
      </div>

      <div className="sheet reveal" ref={ref}>
        {ROWS.map((row, i) => (
          <div className="sheet-row" key={i}>
            <div className="sheet-l">
              <b>{row.label}</b>
              {row.sub}
            </div>
            <div className="sheet-r" dangerouslySetInnerHTML={{ __html: row.body }} />
          </div>
        ))}
      </div>
    </section>
  );
}
