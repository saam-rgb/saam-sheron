import { useEffect, useRef } from 'react';

function humanDwell(s) {
  if (s < 60) return `${s} seconds`;
  const m = Math.floor(s / 60);
  return `${m} minute${m > 1 ? 's' : ''} ${s % 60}s`;
}

export default function ObserveCard({ dwell }) {
  const ref = useRef(null);
  const engagePct = Math.min(99, Math.floor((dwell / 11) * 50));

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
    <div className="observe reveal" ref={ref}>
      <div className="observe-card">
        <div className="observe-text">
          You've spent{' '}
          <b>{humanDwell(dwell)}</b> here.{' '}
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>
            Most recruiters bounce in 11s. You haven't.
          </span>{' '}
          Means you're either <b>seriously hiring</b> — or{' '}
          <span style={{ fontStyle: 'italic' }}>about to</span>.
        </div>
        <div className="observe-stat">
          <b>{engagePct}%</b>
          engagement<br />vs avg visitor
        </div>
      </div>
    </div>
  );
}
