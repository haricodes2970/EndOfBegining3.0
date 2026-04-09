import { useEffect, useRef, useState } from 'react';
import './SoundToggle.css';

// Generate a soft click tone using Web Audio API (no external file needed)
function playClick(volume: number) {
  try {
    const ctx = new AudioContext();

    // Oscillator for a gentle tick
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);

    // Cleanup after playback
    osc.onended = () => ctx.close();
  } catch {
    // Web Audio not available — silently skip
  }
}

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const enabledRef = useRef(false);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!enabledRef.current) return;

      const target = e.target as HTMLElement;
      // Only fire on buttons, links, and interactive cards
      const isInteractive = target.closest('button, a, [role="button"], .chapter-card, .vault-card');
      // Don't re-fire on the toggle itself
      const isToggle = target.closest('.sound-toggle-btn');
      if (isInteractive && !isToggle) {
        playClick(0.06); // Very low volume
      }
    };

    window.addEventListener('click', handleClick, true);
    return () => window.removeEventListener('click', handleClick, true);
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    if (next) playClick(0.06); // Feedback on enabling
  };

  return (
    <button
      className={`sound-toggle-btn${enabled ? ' sound-on' : ''}`}
      onClick={toggle}
      aria-label={enabled ? 'Disable sound' : 'Enable sound'}
      title={enabled ? 'Sound: ON' : 'Sound: OFF'}
    >
      {enabled ? (
        /* Speaker with waves */
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        </svg>
      ) : (
        /* Speaker muted */
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <line x1="23" y1="9" x2="17" y2="15"/>
          <line x1="17" y1="9" x2="23" y2="15"/>
        </svg>
      )}
    </button>
  );
}
