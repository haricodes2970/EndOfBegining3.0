import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './EchoesOfTime.css';

/* ── All trip photos via Vite glob (jpg/JPG only, skips .heif) ── */
const imageModules = import.meta.glob(
  '../assets/trips/*.{jpg,JPG,jpeg,JPEG}',
  { eager: true }
) as Record<string, { default: string }>;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* Shuffle once at module load → fresh every hard refresh */
const allPhotos = shuffle(Object.values(imageModules).map(m => m.default));

/* ── Layout ── */
const COLS     = 5;
const ROW_H    = 340;           // px between row tops (cards ~300px tall → ~30–40px gap)
const COL_L    = [2, 21, 40, 59, 78]; // % left per column
const W_MIN    = 175;
const W_MAX    = 250;

const n        = allPhotos.length;
const CONT_H   = Math.ceil(n / COLS) * ROW_H + 440;

const cards = allPhotos.map((src, i) => ({
  src,
  topPx:   220 + Math.floor(i / COLS) * ROW_H + (Math.random() - 0.4) * 70,
  leftPct: COL_L[i % COLS] + (Math.random() - 0.5) * 7,
  width:   W_MIN + Math.random() * (W_MAX - W_MIN),
  rotate:  (Math.random() - 0.5) * 22,
  zIdx:    4 + Math.floor(Math.random() * 22),
}));

/* ── Balloons ── */
const COLORS = ['#FF6B6B','#FFD93D','#6BCB77','#4D96FF','#FF6FC8','#C77DFF','#FF9A3C','#FF8C42','#00C9A7'];
const BALLOONS = Array.from({ length: 14 }, (_, i) => ({
  id:     i,
  color:  COLORS[i % COLORS.length],
  left:   2 + (i * 7.1) % 91,
  size:   45 + Math.random() * 35,
  dur:    9  + Math.random() * 10,
  delay:  Math.random() * 12,
  xDrift: (Math.random() - 0.5) * 90,
}));

export default function EchoesOfTime() {
  const balloonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = balloonRef.current?.querySelectorAll<HTMLElement>('.balloon-el');
    if (!els) return;
    const vh = window.innerHeight;

    els.forEach((el, i) => {
      const b = BALLOONS[i];
      gsap.set(el, { y: vh + 100, opacity: 0 });

      /* Vertical float — repeats endlessly */
      gsap.to(el, {
        y: -220,
        duration: b.dur,
        delay: b.delay,
        ease: 'none',
        repeat: -1,
        onRepeat: () => { gsap.set(el, { y: vh + 100, opacity: 0 }); },
      });

      /* Fade in shortly after start */
      gsap.to(el, { opacity: 0.85, duration: 1.4, delay: b.delay + 0.3 });

      /* Horizontal bob (x is independent of y in GSAP) */
      gsap.to(el, {
        x: b.xDrift,
        duration: b.dur / 3.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: b.delay,
      });
    });

    return () => { gsap.killTweensOf(els); };
  }, []);

  return (
    <div className="echoes-wrapper">

      {/* ── Balloons: fixed, behind everything ── */}
      <div className="echoes-balloons" ref={balloonRef}>
        {BALLOONS.map(b => (
          <div key={b.id} className="balloon-el" style={{ left: `${b.left}%` }}>
            <svg viewBox="0 0 60 105" width={b.size} height={b.size * 105 / 60} fill="none">
              {/* Body */}
              <ellipse cx="30" cy="32" rx="26" ry="28" fill={b.color} opacity="0.9"/>
              {/* Shine */}
              <ellipse cx="22" cy="20" rx="8" ry="6" fill="rgba(255,255,255,0.28)" transform="rotate(-20 22 20)"/>
              {/* Knot */}
              <polygon points="25,58 35,58 30,66" fill={b.color}/>
              {/* String */}
              <path d="M30 66 Q26 78 30 90 Q34 96 30 103"
                stroke="rgba(0,0,0,0.25)" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
        ))}
      </div>

      {/* ── Page header ── */}
      <div className="echoes-header">
        <p className="echoes-tag">Batch of 2022–26</p>
        <h1 className="echoes-title">Echoes of Time</h1>
        <p className="echoes-sub">Every road we took together.</p>
        <p className="echoes-hint">↓ Scroll to explore</p>
      </div>

      {/* ── Polaroid scatter ── */}
      <div className="echoes-float-field" style={{ height: CONT_H }}>
        {cards.map((c, idx) => (
          <div
            key={idx}
            className="echoes-card"
            style={{
              top:       `${c.topPx}px`,
              left:      `${c.leftPct}%`,
              width:     `${c.width}px`,
              transform: `rotate(${c.rotate}deg)`,
              zIndex:    c.zIdx,
            }}
          >
            <div className="echoes-photo">
              <img
                src={c.src}
                alt={`Memory ${idx + 1}`}
                className="echoes-img"
                loading="lazy"
              />
            </div>
            <div className="echoes-caption">
              <span className="echoes-num">{String(idx + 1).padStart(2, '0')}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
