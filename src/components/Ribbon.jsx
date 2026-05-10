import { useEffect, useState } from 'react';

function fmtTime(s) {
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${String(m).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
}

export default function Ribbon({ dwell, scrollPct }) {
  const [visId] = useState(() => '#' + Math.random().toString(36).slice(2, 6).toUpperCase());

  return (
    <header className="ribbon">
      <div>
        <span className="pulse" />
        <span><b style={{ color: 'var(--accent-soft)' }}>SAAM.LIVE</b></span>
      </div>
      <div>
        <span className="label">VISITOR:</span>
        <span>{visId}</span>
      </div>
      <div>
        <span className="label">DWELL:</span>
        <span>{fmtTime(dwell)}</span>
      </div>
      <div>
        <span className="label">SCROLL:</span>
        <span>{scrollPct}%</span>
      </div>
      <div className="right">
        <span className="label">RESPONSE SLA:</span>
        <b>&lt; 24H</b>
      </div>
      <div>
        <span className="label">STATUS:</span>
        <span style={{ color: 'var(--accent-soft)' }}>OPEN-TO-HIRE</span>
      </div>
    </header>
  );
}
