import { useEffect, useRef, useState } from 'react';
import './SoundToggle.css';

/* ── Web Audio synth helpers ── */
function synth(
  type: OscillatorType,
  freqStart: number,
  freqEnd: number,
  duration: number,
  volume: number,
  delay = 0,
) {
  try {
    const ctx = new AudioContext();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freqStart, ctx.currentTime + delay);
    osc.frequency.exponentialRampToValueAtTime(freqEnd, ctx.currentTime + delay + duration * 0.7);
    gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
    osc.onended = () => ctx.close();
  } catch { /* silently skip */ }
}

/* Different sounds for different element types */
const sounds = {
  // Nav links — soft high tick
  nav: () => synth('sine', 1100, 700, 0.08, 0.055),

  // Buttons (generic) — mid pop
  button: () => {
    synth('sine',   600, 350, 0.12, 0.06);
    synth('square', 800, 400, 0.06, 0.015, 0.01);
  },

  // Chapter / feature cards — warm chime
  card: () => {
    synth('sine', 880, 660, 0.18, 0.07);
    synth('sine', 1320, 990, 0.14, 0.03, 0.03);
  },

  // Vault student cards — satisfying thud
  vault: () => {
    synth('triangle', 300, 180, 0.15, 0.08);
    synth('sine',     600, 300, 0.10, 0.04, 0.02);
  },

  // Echoes polaroid cards — shutter click
  echoes: () => {
    synth('square', 2000, 800, 0.05, 0.04);
    synth('sine',   400,  200, 0.12, 0.05, 0.03);
  },

  // Toggle on — ascending confirmation
  toggleOn: () => {
    synth('sine', 440, 880, 0.12, 0.07);
    synth('sine', 660, 1320, 0.10, 0.04, 0.06);
  },

  // Toggle off — descending
  toggleOff: () => synth('sine', 660, 330, 0.12, 0.06),
};

function getSound(target: HTMLElement) {
  if (target.closest('.vault-card'))    return sounds.vault;
  if (target.closest('.echoes-card'))   return sounds.echoes;
  if (target.closest('.chapter-card'))  return sounds.card;
  if (target.closest('.nav-links a, .nav-brand')) return sounds.nav;
  if (target.closest('button'))         return sounds.button;
  if (target.closest('a'))              return sounds.nav;
  return null;
}

export default function SoundToggle() {
  // ON by default
  const [enabled, setEnabled] = useState(true);
  const enabledRef = useRef(true);

  useEffect(() => { enabledRef.current = enabled; }, [enabled]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!enabledRef.current) return;
      const target = e.target as HTMLElement;
      if (target.closest('.sound-toggle-btn')) return; // handled separately
      const fn = getSound(target);
      if (fn) fn();
    };
    window.addEventListener('click', handleClick, true);
    return () => window.removeEventListener('click', handleClick, true);
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    (next ? sounds.toggleOn : sounds.toggleOff)();
  };

  return (
    <button
      className={`sound-toggle-btn${enabled ? ' sound-on' : ''}`}
      onClick={toggle}
      aria-label={enabled ? 'Disable sound' : 'Enable sound'}
      title={enabled ? 'Sound: ON' : 'Sound: OFF'}
    >
      {enabled ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <line x1="23" y1="9" x2="17" y2="15"/>
          <line x1="17" y1="9" x2="23" y2="15"/>
        </svg>
      )}
    </button>
  );
}
