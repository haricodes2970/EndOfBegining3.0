import { useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleCanvas from '../components/ParticleCanvas';
import './Memories.css';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// GOKARNA — uncomment imports as photos are added to src/assets/trips/gokarna/
// import g01 from '../assets/trips/gokarna/01.jpg';
// import g02 from '../assets/trips/gokarna/02.jpg';
// import g03 from '../assets/trips/gokarna/03.jpg';
// import g04 from '../assets/trips/gokarna/04.jpg';
// import g05 from '../assets/trips/gokarna/05.jpg';
// import g06 from '../assets/trips/gokarna/06.jpg';
// import g07 from '../assets/trips/gokarna/07.jpg';
// import g08 from '../assets/trips/gokarna/08.jpg';

// DANDELI — uncomment imports as photos are added to src/assets/trips/dandeli/
// import d01 from '../assets/trips/dandeli/01.jpg';
// import d02 from '../assets/trips/dandeli/02.jpg';
// import d03 from '../assets/trips/dandeli/03.jpg';
// import d04 from '../assets/trips/dandeli/04.jpg';
// import d05 from '../assets/trips/dandeli/05.jpg';
// import d06 from '../assets/trips/dandeli/06.jpg';
// import d07 from '../assets/trips/dandeli/07.jpg';
// import d08 from '../assets/trips/dandeli/08.jpg';

// FORT — uncomment imports as photos are added to src/assets/trips/fort/
// import f01 from '../assets/trips/fort/01.jpg';
// import f02 from '../assets/trips/fort/02.jpg';
// import f03 from '../assets/trips/fort/03.jpg';
// import f04 from '../assets/trips/fort/04.jpg';
// import f05 from '../assets/trips/fort/05.jpg';
// import f06 from '../assets/trips/fort/06.jpg';
// import f07 from '../assets/trips/fort/07.jpg';
// import f08 from '../assets/trips/fort/08.jpg';
// ─────────────────────────────────────────────────────────────────────────────

interface Photo { id: number; src: string | null; }

interface TripLocation {
  key: string;
  name: string;
  emoji: string;
  tagline: string;
  photos: Photo[];
}

// Placeholder arrays — replace null with the imported variable once photos are added
const gokarnaPhotos: Photo[] = [
  { id: 1, src: null }, // { id: 1, src: g01 },
  { id: 2, src: null }, // { id: 2, src: g02 },
  { id: 3, src: null }, // { id: 3, src: g03 },
  { id: 4, src: null }, // { id: 4, src: g04 },
  { id: 5, src: null }, // { id: 5, src: g05 },
  { id: 6, src: null }, // { id: 6, src: g06 },
  { id: 7, src: null }, // { id: 7, src: g07 },
  { id: 8, src: null }, // { id: 8, src: g08 },
];

const dandeliPhotos: Photo[] = [
  { id: 1, src: null }, // { id: 1, src: d01 },
  { id: 2, src: null }, // { id: 2, src: d02 },
  { id: 3, src: null }, // { id: 3, src: d03 },
  { id: 4, src: null }, // { id: 4, src: d04 },
  { id: 5, src: null }, // { id: 5, src: d05 },
  { id: 6, src: null }, // { id: 6, src: d06 },
  { id: 7, src: null }, // { id: 7, src: d07 },
  { id: 8, src: null }, // { id: 8, src: d08 },
];

const fortPhotos: Photo[] = [
  { id: 1, src: null }, // { id: 1, src: f01 },
  { id: 2, src: null }, // { id: 2, src: f02 },
  { id: 3, src: null }, // { id: 3, src: f03 },
  { id: 4, src: null }, // { id: 4, src: f04 },
  { id: 5, src: null }, // { id: 5, src: f05 },
  { id: 6, src: null }, // { id: 6, src: f06 },
  { id: 7, src: null }, // { id: 7, src: f07 },
  { id: 8, src: null }, // { id: 8, src: f08 },
];

const locations: TripLocation[] = [
  { key: 'gokarna', name: 'Gokarna',  emoji: '🌊', tagline: 'Salt, sand, and no deadlines.', photos: gokarnaPhotos },
  { key: 'dandeli', name: 'Dandeli',  emoji: '🌿', tagline: 'Into the wild, all of us.',      photos: dandeliPhotos },
  { key: 'fort',    name: 'The Fort', emoji: '🏰', tagline: 'History beneath our feet.',      photos: fortPhotos    },
];

// Random rotation seeds per card (stable across renders)
const rotations = [-2.8, 1.9, -1.4, 2.5, -0.8, 3.0, -2.2, 1.2];

interface LightboxState {
  location: TripLocation;
  photoIndex: number;  // -1 = grid view
}

export default function Memories() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  // ── GSAP entrance ──
  useEffect(() => {
    gsap.fromTo('.pg-tag',   { opacity: 0, y: 20 }, { opacity: 1,   y: 0, duration: 0.7, delay: 0.3 });
    gsap.fromTo('.pg-title', { opacity: 0, y: 30 }, { opacity: 1,   y: 0, duration: 0.9, delay: 0.5 });
    gsap.fromTo('.pg-desc',  { opacity: 0, y: 20 }, { opacity: 0.7, y: 0, duration: 0.8, delay: 0.7 });

    locations.forEach(loc => {
      gsap.fromTo(`.loc-heading-${loc.key}`,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: `.loc-section-${loc.key}`, start: 'top 85%' } }
      );
      gsap.fromTo(`.loc-cards-${loc.key} .polaroid`,
        { opacity: 0, y: 40, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: `.loc-cards-${loc.key}`, start: 'top 88%' } }
      );
      gsap.fromTo(`.loc-btn-${loc.key}`,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: 'power2.out',
          scrollTrigger: { trigger: `.loc-btn-${loc.key}`, start: 'top 92%' } }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  // ── ESC key ──
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!lightbox) return;
    if (e.key === 'Escape') { setLightbox(null); return; }
    if (lightbox.photoIndex === -1) return;
    if (e.key === 'ArrowRight') {
      const max = lightbox.location.photos.length - 1;
      setLightbox(s => s ? { ...s, photoIndex: Math.min(s.photoIndex + 1, max) } : null);
    }
    if (e.key === 'ArrowLeft') {
      setLightbox(s => s ? { ...s, photoIndex: Math.max(s.photoIndex - 1, 0) } : null);
    }
  }, [lightbox]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const openGrid  = (loc: TripLocation) => setLightbox({ location: loc, photoIndex: -1 });
  const openPhoto = (loc: TripLocation, idx: number) => setLightbox({ location: loc, photoIndex: idx });
  const prevPhoto = () => setLightbox(s => s ? { ...s, photoIndex: Math.max(s.photoIndex - 1, 0) } : null);
  const nextPhoto = () => setLightbox(s => s ? { ...s, photoIndex: Math.min(s.photoIndex + 1, s.location.photos.length - 1) } : null);

  return (
    <>
      <ParticleCanvas />
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* PAGE HEADER */}
      <div className="page-hero">
        <p className="page-tag pg-tag">Chapter 05</p>
        <h1 className="page-title pg-title">Memories</h1>
        <p className="page-subtitle pg-desc">Every road we took together.</p>
      </div>

      {/* LOCATION SECTIONS */}
      <div className="memories-body">
        {locations.map(loc => (
          <section key={loc.key} className={`loc-section loc-section-${loc.key}`}>

            {/* Heading */}
            <div className={`loc-heading loc-heading-${loc.key}`}>
              <span className="loc-emoji">{loc.emoji}</span>
              <div>
                <h2 className="loc-name">{loc.name}</h2>
                <p className="loc-tagline">{loc.tagline}</p>
              </div>
              <div className="loc-divider" />
            </div>

            {/* 4 Polaroid preview cards */}
            <div className={`polaroid-row loc-cards-${loc.key}`}>
              {loc.photos.slice(0, 4).map((photo, i) => (
                <div
                  key={photo.id}
                  className="polaroid"
                  style={{ '--rot': `${rotations[i]}deg` } as React.CSSProperties}
                  onClick={() => openPhoto(loc, i)}
                >
                  <div className="polaroid-frame">
                    {photo.src ? (
                      <img src={photo.src} alt={`${loc.name} ${photo.id}`} className="polaroid-img" />
                    ) : (
                      <div className="polaroid-ph">
                        <span className="polaroid-ph-loc">{loc.name}</span>
                        <span className="polaroid-ph-num">#{photo.id}</span>
                      </div>
                    )}
                  </div>
                  <div className="polaroid-caption">{loc.name}</div>
                </div>
              ))}
            </div>

            {/* View All button */}
            <button className={`view-all-btn loc-btn-${loc.key}`} onClick={() => openGrid(loc)}>
              View All Photos →
            </button>

          </section>
        ))}
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="lb-overlay" onClick={() => setLightbox(null)}>
          <div className="lb-modal" onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="lb-header">
              <div className="lb-header-left">
                <span className="lb-emoji">{lightbox.location.emoji}</span>
                <span className="lb-loc-name">{lightbox.location.name}</span>
                {lightbox.photoIndex >= 0 && (
                  <span className="lb-count">
                    {lightbox.photoIndex + 1} / {lightbox.location.photos.length}
                  </span>
                )}
              </div>
              <div className="lb-header-right">
                {lightbox.photoIndex >= 0 && (
                  <button className="lb-back-btn" onClick={() => setLightbox(s => s ? { ...s, photoIndex: -1 } : null)}>
                    ← Grid
                  </button>
                )}
                <button className="lb-close-btn" onClick={() => setLightbox(null)}>✕</button>
              </div>
            </div>

            {/* GRID VIEW */}
            {lightbox.photoIndex === -1 && (
              <div className="lb-grid">
                {lightbox.location.photos.map((photo, i) => (
                  <div key={photo.id} className="lb-grid-item" onClick={() => openPhoto(lightbox.location, i)}>
                    {photo.src ? (
                      <img src={photo.src} alt={`${lightbox.location.name} ${photo.id}`} className="lb-grid-img" />
                    ) : (
                      <div className="lb-grid-ph">
                        <span>{lightbox.location.name} #{photo.id}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* SINGLE PHOTO VIEW */}
            {lightbox.photoIndex >= 0 && (
              <div className="lb-single">
                <button
                  className="lb-arrow lb-arrow--prev"
                  onClick={prevPhoto}
                  disabled={lightbox.photoIndex === 0}
                >‹</button>

                <div className="lb-single-img-wrap">
                  {lightbox.location.photos[lightbox.photoIndex].src ? (
                    <img
                      src={lightbox.location.photos[lightbox.photoIndex].src!}
                      alt={`${lightbox.location.name} ${lightbox.photoIndex + 1}`}
                      className="lb-single-img"
                    />
                  ) : (
                    <div className="lb-single-ph">
                      <span>{lightbox.location.name} #{lightbox.photoIndex + 1}</span>
                    </div>
                  )}
                </div>

                <button
                  className="lb-arrow lb-arrow--next"
                  onClick={nextPhoto}
                  disabled={lightbox.photoIndex === lightbox.location.photos.length - 1}
                >›</button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
