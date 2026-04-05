import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleCanvas from '../components/ParticleCanvas';
import './Chronicles.css';

// ── Uncomment these imports once photos are added to src/assets/chronicles/ ──
// import orientationImg  from '../assets/chronicles/01-orientation.jpg';
// import firstCodeImg    from '../assets/chronicles/02-firstcode.jpg';
// import hackathonImg    from '../assets/chronicles/03-hackathon.jpg';
// import festsImg        from '../assets/chronicles/04-fests.jpg';
// import internshipImg   from '../assets/chronicles/05-internship.jpg';
// import projectsImg     from '../assets/chronicles/06-projects.jpg';
// import farewellImg     from '../assets/chronicles/07-farewell.jpg';
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
  { id: 1, date: 'August 2022',     title: 'Day One — The Beginning',       body: 'Strangers carrying laptops and nervous smiles walked into JIT. Nobody knew anyone. Everyone knew nothing. The AI & ML batch had officially begun.',                                        tag: 'Orientation',   image: null /* orientationImg */  },
  { id: 2, date: '2022 — Sem 1',    title: 'First Code. First Bug. First Panic.', body: 'C programs that somehow printed the wrong output. Matrix math that made no sense. And the first taste of what late nights in the lab actually feel like.',                             tag: 'Academics',     image: null /* firstCodeImg */    },
  { id: 3, date: '2023',            title: 'The Hackathon Era Begins',       body: 'Sleep-deprived, over-caffeinated, and dangerously optimistic — the batch started competing. And winning. [Add hackathon names here]',                                                        tag: 'Hackathons',    image: null /* hackathonImg */    },
  { id: 4, date: '2023 — Fests',    title: 'Chaos, Music & the Canteen',    body: 'Tech fests, cultural nights, and the canteen that was somehow always open. The batch found its rhythm — loud, brilliant, and unapologetic.',                                                  tag: 'Campus Life',   image: null /* festsImg */        },
  { id: 5, date: '2024 — 3rd Year', title: 'Internship Season',             body: 'Offer letters, rejections, referrals, and random LinkedIn DMs. The real-world education had started. [Add notable companies/internship stories here]',                                         tag: 'Internships',   image: null /* internshipImg */   },
  { id: 6, date: '2025',            title: 'The Project Marathon',           body: 'Final-year projects, capstone presentations, and the dawning realisation that this was actually ending. [Add project titles/themes here]',                                                    tag: 'Final Project', image: null /* projectsImg */     },
  { id: 7, date: 'April 2026',      title: 'The Farewell — EndOfBeginning', body: 'They called it a goodbye. We\'re calling it a launch. The batch of 2022–26 steps into the world — and the world better be ready.',                                                           tag: 'Farewell 2026', image: null /* farewellImg */     },
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

    document.querySelectorAll('.tl-item').forEach((item, i) => {
      gsap.from(item, {
        opacity: 0, x: i % 2 === 0 ? -50 : 50, y: 20, duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 83%' },
      });
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
          return (
            <div className={`tl-item ${side}`} key={item.id}>
              {side === 'right' && <div className="tl-spacer" />}
              <div className="tl-dot" />
              {side === 'left'  && <div className="tl-spacer" />}

              <div className="tl-card glass-card">
                <div className="tl-date">{item.date}</div>
                <div className="tl-title">{item.title}</div>
                <p className="tl-body">{item.body}</p>
                <span className="tl-tag">{item.tag}</span>

                {/* Cascading photo — always visible, overlaps next card by 50px */}
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
            </div>
          );
        })}
      </section>
    </>
  );
}
