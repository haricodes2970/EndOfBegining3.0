import './EchoesOfTime.css';

/* ── 50 placeholders distributed across a tall scroll canvas ──
   10 rows × 5 columns, each randomised within its cell on every refresh */
const CONTAINER_H = 5400; // px — tall enough so all 50 cards have room
const ROWS        = 10;
const COLS        = 5;
const ROW_H       = CONTAINER_H / ROWS;

const placeholders = Array.from({ length: 50 }, (_, i) => {
  const row  = Math.floor(i / COLS);
  const col  = i % COLS;
  const topPx  = 260 + row * ROW_H + Math.random() * (ROW_H * 0.55);
  const leftPct = col * 19 + 1 + Math.random() * 10; // spread across 0–96%
  return {
    id:      i,
    topPx,
    leftPct: Math.min(84, Math.max(1, leftPct)),
    width:   120 + Math.random() * 80,          // 120–200 px
    rotate:  (Math.random() - 0.5) * 18,        // –9° to +9°
    dur:     5  + Math.random() * 7,
    delay:   Math.random() * 6,
    amp:     8  + Math.random() * 14,
  };
});

export default function EchoesOfTime() {
  return (
    <div className="echoes-wrapper">
      {/* ── Page header ── */}
      <div className="echoes-header">
        <p className="echoes-tag">Batch of 2022–26</p>
        <h1 className="echoes-title">Echoes of Time</h1>
        <p className="echoes-sub">Photos coming soon — every road we took together.</p>
        <p className="echoes-hint">↓ Scroll to explore</p>
      </div>

      {/* ── Tall scrollable canvas with 50 floating polaroids ── */}
      <div className="echoes-float-field" style={{ height: CONTAINER_H }}>
        {placeholders.map(p => (
          <div
            key={p.id}
            className="echoes-card"
            style={{
              top:   `${p.topPx}px`,
              left:  `${p.leftPct}%`,
              width: `${p.width}px`,
              transform: `rotate(${p.rotate}deg)`,
              animationDuration: `${p.dur}s`,
              animationDelay:    `${p.delay}s`,
              '--amp': `${p.amp}px`,
            } as React.CSSProperties}
          >
            <div className="echoes-photo">
              <svg viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="22" r="13" fill="rgba(180,130,50,0.28)" />
                <path d="M4 66 C4 46 56 46 56 66" fill="rgba(180,130,50,0.22)" />
              </svg>
            </div>
            <div className="echoes-caption">
              <span className="echoes-num">{String(p.id + 1).padStart(2, '0')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
