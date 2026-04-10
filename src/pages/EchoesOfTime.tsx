import { useState } from 'react';
import './EchoesOfTime.css';

/* ── Generate 50 random placeholders on every page load ── */
const placeholders = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  top:    Math.random() * 82,          // % from top
  left:   Math.random() * 86,          // % from left
  width:  110 + Math.random() * 80,    // 110–190 px
  rotate: (Math.random() - 0.5) * 18, // –9° to +9°
  dur:    5 + Math.random() * 7,       // float duration
  delay:  Math.random() * 6,           // start delay
  amp:    10 + Math.random() * 14,     // float amplitude (px)
}));

export default function EchoesOfTime() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="echoes-wrapper">
      {/* Page header */}
      <div className="echoes-header">
        <p className="echoes-tag">Batch of 2022–26</p>
        <h1 className="echoes-title">Echoes of Time</h1>
        <p className="echoes-sub">Photos coming soon — every road we took together.</p>
      </div>

      {/* 50 floating placeholder cards */}
      <div className="echoes-float-field">
        {placeholders.map(p => (
          <div
            key={p.id}
            className={`echoes-card${hovered === p.id ? ' echoes-card--hovered' : ''}`}
            style={{
              top:    `${p.top}%`,
              left:   `${p.left}%`,
              width:  `${p.width}px`,
              transform: `rotate(${p.rotate}deg)`,
              animationDuration:      `${p.dur}s`,
              animationDelay:         `${p.delay}s`,
              '--amp': `${p.amp}px`,
            } as React.CSSProperties}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Photo placeholder area */}
            <div className="echoes-photo">
              <svg viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="22" r="13" fill="rgba(180,130,50,0.25)" />
                <path d="M4 64 C4 45 56 45 56 64" fill="rgba(180,130,50,0.2)" />
              </svg>
            </div>
            {/* Polaroid caption bar */}
            <div className="echoes-caption">
              <span className="echoes-num">{String(p.id + 1).padStart(2, '0')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
