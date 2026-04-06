import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ParticleCanvas from './ParticleCanvas';
import logo from '../assets/logo-stacked.jpeg';

interface Props { onComplete: () => void; }

export default function SplashScreen({ onComplete }: Props) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const logoRef  = useRef<HTMLImageElement>(null);
  const lineRef  = useRef<HTMLDivElement>(null);
  const textRef  = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Logo entrance
    tl.fromTo(logoRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
    );

    // Gold line expands
    tl.fromTo(lineRef.current,
      { width: 0 },
      { width: 200, duration: 0.8, ease: 'power2.out' },
      1.0
    );

    // Subtitle fades in
    tl.fromTo(textRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      1.3
    );

    // Fade out whole splash after 2.8s
    tl.to(wrapRef.current,
      { opacity: 0, duration: 0.5, ease: 'power2.in', onComplete },
      2.8
    );

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={wrapRef} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#0d1117',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '1rem',
    }}>
      <ParticleCanvas />
      <img
        ref={logoRef}
        src={logo}
        alt="EndOfBeginning"
        style={{ width: 120, height: 120, objectFit: 'contain', borderRadius: 16, opacity: 0 }}
      />
      <div ref={lineRef} style={{
        height: 2, width: 0, background: '#c9a96e', borderRadius: 2,
      }} />
      <p ref={textRef} style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.78rem',
        fontWeight: 600,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: '#c9a96e',
        opacity: 0,
      }}>
        BE AI &amp; ML · Batch 2022–26
      </p>
    </div>
  );
}
