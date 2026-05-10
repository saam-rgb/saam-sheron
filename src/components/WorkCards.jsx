import { useEffect, useRef } from 'react';

const PROJECTS = [
  {
    id: 'pacs',
    num: '01',
    when: '▮ Active · 2025—',
    live: true,
    name: 'Enterprise',
    nameIt: 'RIS/PACS',
    nameSuffix: ' Platform',
    co: 'Live Medica · module owner · unreleased',
    desc: 'Owning frontend modules for an enterprise medical imaging platform. UIs that stay <b>intuitive under data-heavy clinical workflows</b> — cross-functional with API engineers, designers, business analysts. Production every sprint.',
    stack: ['Vue 3', 'Composition API', 'TypeScript', 'REST', 'Tailwind', 'Vitest'],
    side: [
      ['SCOPE', 'Module owner'],
      ['STACK', 'Vue 3 · TS'],
      ['DOMAIN', 'Radiology'],
      ['STATUS', '● Active', 'var(--green)'],
    ],
    href: '#',
    tags: ['frontend', 'healthtech', 'lead'],
  },
  {
    id: 'trailed',
    num: '02',
    when: 'Nov 2024',
    live: false,
    name: 'Trailed — ',
    nameIt: 'v2',
    nameSuffix: '',
    co: 'Full-stack MERN · solo build · live',
    desc: 'End-to-end e-commerce build: product browsing, cart, COD checkout, scalable inventories. Firebase Auth + Google OAuth, JWT admin RBAC. Optimised state with <b>Redux Toolkit + RTK Query for +30% data-handling efficiency.</b>',
    stack: ['React', 'Node', 'Express', 'MongoDB', 'RTK Query', 'Firebase', 'JWT'],
    side: [
      ['SCOPE', 'Solo build'],
      ['STACK', 'MERN'],
      ['STATUS', '● Live', 'var(--green)'],
      ['URL', 'trailed-v2 ↗'],
    ],
    href: 'https://trailed-v2.vercel.app/',
    tags: ['fullstack', 'frontend', 'ux'],
  },
  {
    id: 'skyfreight',
    num: '03',
    when: 'Nov 2024',
    live: false,
    name: 'Sky ',
    nameIt: 'Freight',
    nameSuffix: '',
    co: 'Air cargo SPA · design + build · live',
    desc: 'Designed and built a responsive corporate site — shipment tracking, services, testimonials. <b>Performance-tuned to 95+ Lighthouse</b> with optimised asset loading (–20% load). SEO + strategic CTAs lifted estimated reach +30%.',
    stack: ['React', 'Tailwind', 'Node', 'Lighthouse 95+'],
    side: [
      ['SCOPE', 'Design + build'],
      ['TYPE', 'Marketing'],
      ['STATUS', '● Live', 'var(--green)'],
      ['URL', 'sky-freight ↗'],
    ],
    href: 'https://sky-freight.vercel.app/',
    tags: ['frontend', 'ux'],
  },
  {
    id: 'archive',
    num: '04',
    when: '2022—2023',
    live: false,
    name: 'Archive · ',
    nameIt: '09 client deployments',
    nameSuffix: '',
    co: 'Mavdero TechServices · 1 yr · client work',
    desc: 'Built and maintained client-facing applications in React with focus on <b>component architecture, reusability, and responsive design.</b> Translated Figma into pixel-accurate, cross-browser UIs. Agile, client-facing, delivery under pressure.',
    stack: ['React', 'Figma', 'JS ES6+', 'HTML5', 'CSS3'],
    side: [
      ['SCOPE', 'Client work'],
      ['SECTOR', 'Services'],
      ['SHIPPED', '9 apps'],
    ],
    href: '#',
    tags: ['fullstack', 'frontend'],
  },
];

export default function WorkCards({ activeRole }) {
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

  const sorted = activeRole
    ? [...PROJECTS].sort((a, b) => {
        const am = a.tags.includes(activeRole) ? 0 : 1;
        const bm = b.tags.includes(activeRole) ? 0 : 1;
        return am - bm;
      })
    : PROJECTS;

  const filterLabel = activeRole
    ? `Filtered · ${activeRole} · pinned to top`
    : 'Showing all · 04 of 12';

  return (
    <section className="section">
      <div className="sec-head reveal-head">
        <div className="sec-num"><b>03</b> · WORK</div>
        <div className="sec-title">What I've <span className="it">shipped.</span></div>
        <div className="sec-meta">{filterLabel}</div>
      </div>

      <div className="cards reveal" ref={ref}>
        {sorted.map(p => {
          const matched = activeRole ? p.tags.includes(activeRole) : null;
          const pinned = matched === true;
          const dim = matched === false;
          return (
            <a
              key={p.id}
              className={`card${pinned ? ' pinned' : ''}${dim ? ' dim' : ''}`}
              href={p.href}
              target={p.href !== '#' ? '_blank' : undefined}
              rel={p.href !== '#' ? 'noopener' : undefined}
            >
              <div className="card-meta">
                <div>
                  <div className="num">{p.num}</div>
                  <div className={`when${p.live ? ' live' : ''}`}>{p.when}</div>
                </div>
                <div className="pin">▸ Pinned for your brief</div>
              </div>

              <div className="card-body">
                <div className="card-name">
                  {p.name}<span className="it">{p.nameIt}</span>{p.nameSuffix}
                </div>
                <div className="card-co">{p.co}</div>
                <p className="card-desc" dangerouslySetInnerHTML={{ __html: p.desc }} />
                <div className="card-stack">
                  {p.stack.map(s => (
                    <span key={s} className="pill">{s}</span>
                  ))}
                </div>
              </div>

              <div className="card-side">
                <div>
                  {p.side.map(([k, v, color]) => (
                    <div className="row" key={k}>
                      <span>{k}</span>
                      <span className="v" style={color ? { color } : undefined}>{v}</span>
                    </div>
                  ))}
                </div>
                <span className="arr">↗</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
