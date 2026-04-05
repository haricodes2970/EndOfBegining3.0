import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleCanvas from '../components/ParticleCanvas';
import './Chronicles.css';

// ── Active imports (JPG — browser compatible) ────────────────────────────────
import tripImg1 from '../assets/chronicles/IMG_0942.JPG';
import tripImg2 from '../assets/chronicles/IMG_0943.JPG';
import tripImg3 from '../assets/chronicles/IMG_0944.JPG';
// ── Pending conversion from HEIC (see src/assets/chronicles/README.txt) ──────
// import tripImg4  from '../assets/chronicles/IMG_1246.HEIC';
// import tripImg5  from '../assets/chronicles/IMG_1248.HEIC';
// import tripImg6  from '../assets/chronicles/IMG_1255.HEIC';
// import tripImg7  from '../assets/chronicles/IMG_1256.HEIC';
// import tripImg8  from '../assets/chronicles/IMG_1272.HEIC';
// import tripImg9  from '../assets/chronicles/IMG_1573.HEIC';
// import tripImg10 from '../assets/chronicles/IMG_1574.HEIC';
// ─────────────────────────────────────────────────────────────────────────────

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  id: number;
  date: string;
  title: string;
  body: string;
  tag: string;
  image: string | null;  // set to imported image variable once photos are added
}

const items: TimelineItem[] = [
  { id: 1, date: 'August 2022',     title: 'Day One — The Beginning',       body: 'Strangers carrying laptops and nervous smiles walked into JIT. Nobody knew anyone. Everyone knew nothing. The AI & ML batch had officially begun.',                                        tag: 'Orientation',   image: tripImg1  },
  { id: 2, date: '2022 — Sem 1',    title: 'First Code. First Bug. First Panic.', body: 'C programs that somehow printed the wrong output. Matrix math that made no sense. And the first taste of what late nights in the lab actually feel like.',                             tag: 'Academics',     image: tripImg2  },
  { id: 3, date: '2023',            title: 'The Hackathon Era Begins',       body: 'Sleep-deprived, over-caffeinated, and dangerously optimistic — the batch started competing. And winning. [Add hackathon names here]',                                                        tag: 'Hackathons',    image: tripImg3  },
  { id: 4, date: '2023 — Fests',    title: 'Chaos, Music & the Canteen',    body: 'Tech fests, cultural nights, and the canteen that was somehow always open. The batch found its rhythm — loud, brilliant, and unapologetic.',                                                  tag: 'Campus Life',   image: null      },
  { id: 5, date: '2024 — 3rd Year', title: 'Internship Season',             body: 'Offer letters, rejections, referrals, and random LinkedIn DMs. The real-world education had started. [Add notable companies/internship stories here]',                                         tag: 'Internships',   image: null      },
  { id: 6, date: '2025',            title: 'The Project Marathon',           body: 'Final-year projects, capstone presentations, and the dawning realisation that this was actually ending. [Add project titles/themes here]',                                                    tag: 'Final Project', image: null      },
  { id: 7, date: 'April 2026',      title: 'The Farewell — EndOfBeginning', body: 'They called it a goodbye. We\'re calling it a launch. The batch of 2022–26 steps into the world — and the world better be ready.',                                                           tag: 'Farewell 2026', image: null      },
];

export default function Chronicles() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to('.pg-tag',   { opacity: 1, y: 0, duration: 0.7, delay: 0.3 });
    gsap.to('.pg-title', { opacity: 1, y: 0, duration: 0.9, delay: 0.5 });
    gsap.to('.pg-desc',  { opacity: 0.7, y: 0, duration: 0.8, delay: 0.7 });

    ScrollTrigger.create({
      trigger: '#timeline',
      start: 'top 80%', end: 'bottom 20%', scrub: true,
      onUpdate: s => {
        if (fillRef.current) fillRef.current.style.height = s.progress * 100 + '%';
      },
    });

    document.querySelectorAll<HTMLElement>('.tl-item').forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50, y: 20 },
        {
          opacity: 1, x: 0, y: 0, duration: 0.75, ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',  // fires earlier so top items don't stay invisible
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <>
      <ParticleCanvas />
      <div className="orb orb-1" /> <div className="orb orb-2" />

      <div className="page-hero">
        <p className="page-tag pg-tag">Chapter 01</p>
        <h1 className="page-title pg-title">The Neural Drift</h1>
        <p className="page-subtitle pg-desc">Four years of signal and noise. Scroll through every moment that trained us.</p>
      </div>

      <section id="timeline" className="tl-section">
        <div className="tl-spine"><div className="tl-fill" ref={fillRef} /></div>

        {items.map((item, i) => {
          const side = i % 2 === 0 ? 'left' : 'right';

          const card = (
            <div className="tl-card glass-card">
              <div className="tl-date">{item.date}</div>
              <div className="tl-title">{item.title}</div>
              <p className="tl-body">{item.body}</p>
              <span className="tl-tag">{item.tag}</span>

              {/* Cascading photo — always visible, overlaps next card by ~50px */}
              <div className={`tl-photo tl-photo--${side}`}>
                {item.image ? (
                  <img src={item.image} alt={item.title} className="tl-photo-img" />
                ) : (
                  <div className="tl-photo-ph">
                    <span className="tl-photo-ph-icon">📷</span>
                    <span className="tl-photo-ph-label">{item.title}</span>
                  </div>
                )}
              </div>
            </div>
          );

          return (
            <div className={`tl-item ${side}`} key={item.id}>
              {/* left: card · spine · spacer  |  right: spacer · spine · card */}
              {side === 'left'  && <>{card}<div className="tl-spacer" /></>}
              <div className="tl-dot" />
              {side === 'right' && <><div className="tl-spacer" />{card}</>}
            </div>
          );
        })}
      </section>
    </>
  );
}
