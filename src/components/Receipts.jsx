import { useEffect, useRef } from 'react';

const STATS = [
  {
    num: '2+', unit: 'yrs',
    label: 'Shipping production frontend at a HealthTech product company.',
    source: 'Source · LinkedIn ↗',
    href: 'https://linkedin.com/in/saam-sheron/',
  },
  {
    num: '95', unit: '+',
    label: 'Lighthouse score on the Sky Freight build. –20% load time over baseline.',
    source: 'Source · sky-freight.vercel.app ↗',
    href: 'https://sky-freight.vercel.app/',
  },
  {
    num: '+30', unit: '%',
    label: 'Data-handling efficiency on Trailed v2 via RTK Query + cache strategy.',
    source: 'Source · trailed-v2.vercel.app ↗',
    href: 'https://trailed-v2.vercel.app/',
  },
  {
    num: '100', unit: '%',
    label: 'On-time delivery rate across 3 sprints at Live Medica since promotion.',
    source: 'Source · Internal · ref. avail.',
    href: null,
  },
];

export default function Receipts() {
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
        <div className="sec-num"><b>01</b> · RECEIPTS</div>
        <div className="sec-title">Numbers, <span className="it">verified.</span></div>
        <div className="sec-meta">No claims, just facts</div>
      </div>

      <div className="receipts reveal" ref={ref}>
        {STATS.map((s, i) => (
          <div className="receipt" key={i}>
            <div className="verify">verified</div>
            <div className="num">
              {s.num}<span className="small">{s.unit}</span>
            </div>
            <div className="label">{s.label}</div>
            {s.href ? (
              <a className="source" href={s.href} target="_blank" rel="noopener">{s.source}</a>
            ) : (
              <div className="source">{s.source}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
