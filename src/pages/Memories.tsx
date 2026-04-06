import { useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { TextPlugin } from 'gsap/TextPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import ParticleCanvas from '../components/ParticleCanvas';
import './Memories.css';

// ── GOKARNA (JPGs) ────────────────────────────────────────────────────────────
import g01 from '../assets/trips/gokarna/20240721_201232.jpg';
import g02 from '../assets/trips/gokarna/20240721_201233_resized.jpg';
import g03 from '../assets/trips/gokarna/448c2e42-914c-4276-9aca-362003b2f9a6.jpg';
import g04 from '../assets/trips/gokarna/609a5f56-d59b-4a0b-9346-fa8d4fcf301a.jpg';
import g05 from '../assets/trips/gokarna/78c72229-3fcf-4c0e-9611-269460390f69.jpg';
import g06 from '../assets/trips/gokarna/93dd5198-208d-4f64-a38d-fc5ba9c312be.jpg';
import g07 from '../assets/trips/gokarna/IMG20240722142659.jpg';
import g08 from '../assets/trips/gokarna/IMG20240722142704.jpg';
import g09 from '../assets/trips/gokarna/IMG_0261.JPG';
import g10 from '../assets/trips/gokarna/IMG_0263.JPG';
import g11 from '../assets/trips/gokarna/IMG_0265.JPG';
import g12 from '../assets/trips/gokarna/IMG_0268.JPG';
import g13 from '../assets/trips/gokarna/IMG_0319.JPG';
import g14 from '../assets/trips/gokarna/IMG_0322.JPG';
import g15 from '../assets/trips/gokarna/IMG_2719.JPG';
import g16 from '../assets/trips/gokarna/IMG_2731.JPG';
import g17 from '../assets/trips/gokarna/IMG_2735.JPG';
import g18 from '../assets/trips/gokarna/IMG_2738.JPG';
import g19 from '../assets/trips/gokarna/IMG_2869.JPG';
import g20 from '../assets/trips/gokarna/IMG_2875.JPG';
import g21 from '../assets/trips/gokarna/IMG_2878.JPG';
import g22 from '../assets/trips/gokarna/IMG_2881.JPG';
import g23 from '../assets/trips/gokarna/IMG_2885.JPG';
import g24 from '../assets/trips/gokarna/IMG_2886.JPG';
import g25 from '../assets/trips/gokarna/IMG_2958.JPG';
import g26 from '../assets/trips/gokarna/IMG_2963.JPG';
import g27 from '../assets/trips/gokarna/IMG_2965.JPG';
import g28 from '../assets/trips/gokarna/IMG_2967.JPG';
import g29 from '../assets/trips/gokarna/IMG_2969.JPG';
import g30 from '../assets/trips/gokarna/IMG_2971.JPG';
import g31 from '../assets/trips/gokarna/IMG_2976.JPG';
import g32 from '../assets/trips/gokarna/IMG_3116.JPG';
import g33 from '../assets/trips/gokarna/IMG_3117.JPG';
import g34 from '../assets/trips/gokarna/IMG_9291.JPG';
import g35 from '../assets/trips/gokarna/IMG_9450.JPG';
import g36 from '../assets/trips/gokarna/IMG_9451.JPG';
import g37 from '../assets/trips/gokarna/IMG_9452.JPG';
import g38 from '../assets/trips/gokarna/IMG_9453.JPG';
import g39 from '../assets/trips/gokarna/IMG_9454.JPG';
import g40 from '../assets/trips/gokarna/IMG_9455.JPG';
import g41 from '../assets/trips/gokarna/IMG_9456.JPG';
import g42 from '../assets/trips/gokarna/IMG_9457.JPG';
import g43 from '../assets/trips/gokarna/IMG_9458.JPG';
import g44 from '../assets/trips/gokarna/IMG_9459.JPG';
import g45 from '../assets/trips/gokarna/IMG_9460.JPG';
import g46 from '../assets/trips/gokarna/IMG_9461.JPG';
import g47 from '../assets/trips/gokarna/IMG_9462.JPG';
import g48 from '../assets/trips/gokarna/IMG_9463.JPG';
import g49 from '../assets/trips/gokarna/IMG_9467.JPG';
import g50 from '../assets/trips/gokarna/Snapchat-586899129.jpg';
import g51 from '../assets/trips/gokarna/ddf79095-b62b-4802-bef7-016f8fdbe0ca.jpg';

// ── DANDELI ───────────────────────────────────────────────────────────────────
import d01 from '../assets/trips/dandeli/IMG_0942.JPG';
import d02 from '../assets/trips/dandeli/IMG_0943.JPG';
import d03 from '../assets/trips/dandeli/IMG_0944.JPG';

// ── FORT ─────────────────────────────────────────────────────────────────────
import f01 from '../assets/trips/fort/574CF3C1-E061-46E4-B848-32876BED71B3.jpg';

interface Photo { src: string; }

interface TripLocation {
  key: string;
  name: string;
  emoji: string;
  tagline: string;
  date: string;
  photos: Photo[];
}

const locations: TripLocation[] = [
  {
    key: 'gokarna', name: 'Gokarna', emoji: '🌊',
    tagline: 'Salt, sand, and no deadlines.',
    date: 'July 2024',
    photos: [
      { src: g01 }, { src: g02 }, { src: g03 }, { src: g04 },
      { src: g05 }, { src: g06 }, { src: g07 }, { src: g08 },
      { src: g09 }, { src: g10 }, { src: g11 }, { src: g12 },
      { src: g13 }, { src: g14 }, { src: g15 }, { src: g16 },
      { src: g17 }, { src: g18 }, { src: g19 }, { src: g20 },
      { src: g21 }, { src: g22 }, { src: g23 }, { src: g24 },
      { src: g25 }, { src: g26 }, { src: g27 }, { src: g28 },
      { src: g29 }, { src: g30 }, { src: g31 }, { src: g32 },
      { src: g33 }, { src: g34 }, { src: g35 }, { src: g36 },
      { src: g37 }, { src: g38 }, { src: g39 }, { src: g40 },
      { src: g41 }, { src: g42 }, { src: g43 }, { src: g44 },
      { src: g45 }, { src: g46 }, { src: g47 }, { src: g48 },
      { src: g49 }, { src: g50 }, { src: g51 },
    ],
  },
  {
    key: 'dandeli', name: 'Dandeli', emoji: '🌿',
    tagline: 'Into the wild, all of us.',
    date: '2024',
    photos: [{ src: d01 }, { src: d02 }, { src: d03 }],
  },
  {
    key: 'fort', name: 'The Fort', emoji: '🏰',
    tagline: 'History beneath our feet.',
    date: '2024',
    photos: [{ src: f01 }],
  },
];

// mode: 'grid' = show all photos in grid, 'single' = fullscreen one photo
interface LightboxState {
  location: TripLocation;
  mode: 'grid' | 'single';
  index: number; // only used in 'single' mode
}

export default function Memories() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  // Hero entrance + DrawSVG spine + card hover GSAP
  useEffect(() => {
    // ── PAGE TITLE — SplitText bounce ──
    const split = new SplitText('.pg-title', { type: 'chars' });
    gsap.set(split.chars, { opacity: 0, y: 60, rotation: -10 });
    gsap.to(split.chars, { opacity: 1, y: 0, rotation: 0, duration: 0.9, stagger: 0.06, ease: 'back.out(2)', delay: 0.2 });

    gsap.fromTo('.pg-tag',  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.1 });

    // ── SUBTITLE — TextPlugin typewriter ──
    const subEl = document.querySelector('.pg-desc') as HTMLElement | null;
    if (subEl) {
      gsap.set(subEl, { opacity: 1, text: '' });
      gsap.to(subEl, { delay: 1.1, duration: 1.8, text: { value: 'Every road we took together.', delimiter: '' }, ease: 'none' });
    }

    // ── DRAW SVG SPINE ──
    gsap.fromTo('.mem-spine-line',
      { drawSVG: '0%' },
      { drawSVG: '100%', ease: 'none',
        scrollTrigger: { trigger: '.mem-timeline-wrap', start: 'top center', end: 'bottom center', scrub: 1 } }
    );

    // ── LOCATION NODES — alternating slide in ──
    locations.forEach((loc, i) => {
      const xFrom = i % 2 === 0 ? -80 : 80;
      gsap.fromTo(`.mem-node-${loc.key}`,
        { opacity: 0, x: xFrom },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: `.mem-node-${loc.key}`, start: 'top 75%' } }
      );
      gsap.fromTo(`.mem-node-${loc.key} .mem-dot`,
        { scale: 0 },
        { scale: 1, duration: 0.4, ease: 'back.out(2)',
          scrollTrigger: { trigger: `.mem-node-${loc.key}`, start: 'top 75%' } }
      );
      gsap.fromTo(`.mem-node-${loc.key} .mem-thumb`,
        { opacity: 0, scale: 0.82, y: 18 },
        { opacity: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: `.mem-node-${loc.key}`, start: 'top 72%' } }
      );
    });

    // ── CARD HOVER — GSAP timeline ──
    const cards = gsap.utils.toArray<HTMLElement>('.mem-card');
    const cleanups: (() => void)[] = [];
    cards.forEach(card => {
      const tl = gsap.timeline({ paused: true });
      tl.to(card, { y: -10, duration: 0.3, ease: 'power2.out' })
        .to(card, { borderColor: '#e8825a', boxShadow: '0 16px 40px rgba(232,130,90,0.25)', duration: 0.2 }, '<');
      const enter = () => tl.play();
      const leave = () => tl.reverse();
      card.addEventListener('mouseenter', enter);
      card.addEventListener('mouseleave', leave);
      cleanups.push(() => {
        card.removeEventListener('mouseenter', enter);
        card.removeEventListener('mouseleave', leave);
        tl.kill();
      });
    });

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
      cleanups.forEach(fn => fn());
    };
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!lightbox) return;
    if (e.key === 'Escape') {
      if (lightbox.mode === 'single') setLightbox(s => s ? { ...s, mode: 'grid' } : null);
      else setLightbox(null);
      return;
    }
    if (lightbox.mode !== 'single') return;
    const max = lightbox.location.photos.length - 1;
    if (e.key === 'ArrowRight') setLightbox(s => s ? { ...s, index: Math.min(s.index + 1, max) } : null);
    if (e.key === 'ArrowLeft')  setLightbox(s => s ? { ...s, index: Math.max(s.index - 1, 0) } : null);
  }, [lightbox]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // clicking a preview photo or "view all" → open grid
  const openGrid   = (loc: TripLocation) => setLightbox({ location: loc, mode: 'grid', index: 0 });
  // from grid, click a photo → fullscreen
  const openSingle = (idx: number) => setLightbox(s => s ? { ...s, mode: 'single', index: idx } : null);
  const prev = () => setLightbox(s => s ? { ...s, index: Math.max(s.index - 1, 0) } : null);
  const next = () => setLightbox(s => s ? { ...s, index: Math.min(s.index + 1, s.location.photos.length - 1) } : null);

  return (
    <>
      <div className="page-bg page-bg-memories" />
      <ParticleCanvas />
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="page-hero">
        <p className="page-tag pg-tag">Chapter 01</p>
        <h1 className="page-title pg-title">Memories</h1>
        <p className="page-subtitle pg-desc"></p>
      </div>

      {/* TIMELINE */}
      <div className="mem-timeline-wrap">
        {/* DrawSVG spine */}
        <svg className="mem-spine-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true">
          <line className="mem-spine-line" x1="50%" y1="0" x2="50%" y2="100%" />
        </svg>

        {locations.map((loc, locIdx) => {
          const side = locIdx % 2 === 0 ? 'left' : 'right';
          const preview = loc.photos.slice(0, 4);
          return (
            <div key={loc.key} className={`mem-node mem-node--${side} mem-node-${loc.key}`}>

              {/* DOT on spine */}
              <div className="mem-dot" />

              {/* CONTENT CARD */}
              <div className="mem-card glass-card">
                <div className="mem-card-header">
                  <span className="mem-loc-emoji">{loc.emoji}</span>
                  <div>
                    <h2 className="mem-loc-name">{loc.name}</h2>
                    <p className="mem-loc-meta">{loc.date} &nbsp;·&nbsp; {loc.photos.length} photos</p>
                  </div>
                  <p className="mem-loc-tag">{loc.tagline}</p>
                </div>

                {/* 4 preview thumbnails */}
                <div className="mem-thumbs">
                  {preview.map((photo, i) => (
                    <div key={i} className="mem-thumb" onClick={() => openGrid(loc)}>
                      <img src={photo.src} alt={`${loc.name} ${i + 1}`} className="mem-thumb-img" />
                      <div className="mem-thumb-overlay">
                        <span className="mem-thumb-zoom">⊞</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mem-view-all" onClick={() => openGrid(loc)}>
                  View all {loc.photos.length} photos →
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* ── GRID POPUP ── */}
      {lightbox && lightbox.mode === 'grid' && (
        <div className="lb-overlay" onClick={() => setLightbox(null)}>
          <div className="lb-modal" onClick={e => e.stopPropagation()}>

            <div className="lb-header">
              <span className="lb-title">{lightbox.location.emoji} {lightbox.location.name}</span>
              <span className="lb-count">{lightbox.location.photos.length} photos</span>
              <button className="lb-close" onClick={() => setLightbox(null)}>✕</button>
            </div>

            <div className="lb-grid">
              {lightbox.location.photos.map((photo, i) => (
                <div key={i} className="lb-grid-cell" onClick={() => openSingle(i)}>
                  <img src={photo.src} alt={`${lightbox.location.name} ${i + 1}`} className="lb-grid-img" />
                  <div className="lb-grid-hover">
                    <span className="lb-grid-num">{i + 1}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* ── FULLSCREEN SINGLE ── */}
      {lightbox && lightbox.mode === 'single' && (
        <div className="fs-overlay" onClick={() => setLightbox(s => s ? { ...s, mode: 'grid' } : null)}>
          <div className="fs-inner" onClick={e => e.stopPropagation()}>

            <div className="fs-bar">
              <button className="fs-back" onClick={() => setLightbox(s => s ? { ...s, mode: 'grid' } : null)}>
                ← Back to grid
              </button>
              <span className="fs-bar-loc">
                {lightbox.location.emoji} {lightbox.location.name}
                <span className="fs-bar-count">{lightbox.index + 1} / {lightbox.location.photos.length}</span>
              </span>
              <button className="fs-close" onClick={() => setLightbox(null)}>✕</button>
            </div>

            <div className="fs-img-wrap">
              <button className="fs-arrow" onClick={prev} disabled={lightbox.index === 0}>‹</button>
              <img
                key={lightbox.index}
                src={lightbox.location.photos[lightbox.index].src}
                alt={`${lightbox.location.name} ${lightbox.index + 1}`}
                className="fs-img"
              />
              <button className="fs-arrow" onClick={next} disabled={lightbox.index === lightbox.location.photos.length - 1}>›</button>
            </div>

            <div className="fs-strip">
              {lightbox.location.photos.map((p, i) => (
                <div
                  key={i}
                  className={`fs-strip-thumb ${i === lightbox.index ? 'active' : ''}`}
                  onClick={() => setLightbox(s => s ? { ...s, index: i } : null)}
                >
                  <img src={p.src} alt="" />
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
