import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CursorFollower.css';

export default function CursorFollower() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on pointer-capable devices
    if (window.matchMedia('(hover: none)').matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;

    // Quick-set initial position off-screen
    gsap.set([dot, ring], { x: -100, y: -100 });

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows instantly
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.08, ease: 'none' });

      // Ring follows with gentle lag
      gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.42, ease: 'power2.out' });
    };

    // Hover: scale up on interactive elements
    const onEnter = () => {
      gsap.to(ring, { scale: 1.8, opacity: 0.55, duration: 0.3, ease: 'power2.out' });
      gsap.to(dot,  { scale: 0.5, opacity: 0.7,  duration: 0.3, ease: 'power2.out' });
    };

    const onLeave = () => {
      gsap.to(ring, { scale: 1,   opacity: 0.35, duration: 0.4, ease: 'power2.out' });
      gsap.to(dot,  { scale: 1,   opacity: 1,    duration: 0.4, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', onMove);

    // Attach hover listeners to interactive elements
    const addHover = () => {
      document.querySelectorAll('a, button, [role="button"], input, label, .chapter-card, .vault-card, .mem-thumb')
        .forEach(el => {
          el.addEventListener('mouseenter', onEnter);
          el.addEventListener('mouseleave', onLeave);
        });
    };

    addHover();

    // Re-attach on DOM mutations (route changes)
    const observer = new MutationObserver(addHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cf-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cf-ring" aria-hidden="true" />
    </>
  );
}
