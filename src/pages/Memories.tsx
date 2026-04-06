import { useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleCanvas from '../components/ParticleCanvas';
import './Memories.css';

gsap.registerPlugin(ScrollTrigger);

// ── GOKARNA (51 JPGs) ─────────────────────────────────────────────────────────
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
// HEIC pending conversion: IMG_0066, IMG_0067, IMG_0068, IMG_0070–0085, IMG_0174,
// IMG_0203, IMG_0228–0229, IMG_0283, IMG_0299–0300, IMG_0342, IMG_0349, IMG_0352,
// IMG_9175, IMG_9207, IMG_9242–9245, IMG_9259, IMG_9277, IMG_9281, IMG_9284, IMG_9286,
// IMG_9374, IMG_9379–9380, IMG_9435–9436, IMG_9447–9448, IMG_9546, IMG_9651–9652

// ── DANDELI (3 JPGs — rest are HEIC, pending conversion) ─────────────────────
import d01 from '../assets/trips/dandeli/IMG_0942.JPG';
import d02 from '../assets/trips/dandeli/IMG_0943.JPG';
import d03 from '../assets/trips/dandeli/IMG_0944.JPG';
// HEIC pending conversion: IMG_1246, IMG_1248, IMG_1255, IMG_1256, IMG_1272, IMG_1573, IMG_1574

// ── FORT (1 JPG — rest are HEIC, pending conversion) ─────────────────────────
import f01 from '../assets/trips/fort/574CF3C1-E061-46E4-B848-32876BED71B3.jpg';
// HEIC pending conversion: IMG_0500, IMG_0502, IMG_0533, IMG_0558, IMG_0568,
// IMG_0584–0586, IMG_0590, IMG_0595, IMG_1273–1290 (series), IMG_1322
// ─────────────────────────────────────────────────────────────────────────────

interface Photo { id: number; src: string | null; }

interface TripLocation {
  key: string;
  name: string;
  emoji: string;
  tagline: string;
  photos: Photo[];
}

const gokarnaPhotos: Photo[] = [
  { id:  1, src: g01 }, { id:  2, src: g02 }, { id:  3, src: g03 },
  { id:  4, src: g04 }, { id:  5, src: g05 }, { id:  6, src: g06 },
  { id:  7, src: g07 }, { id:  8, src: g08 }, { id:  9, src: g09 },
  { id: 10, src: g10 }, { id: 11, src: g11 }, { id: 12, src: g12 },
  { id: 13, src: g13 }, { id: 14, src: g14 }, { id: 15, src: g15 },
  { id: 16, src: g16 }, { id: 17, src: g17 }, { id: 18, src: g18 },
  { id: 19, src: g19 }, { id: 20, src: g20 }, { id: 21, src: g21 },
  { id: 22, src: g22 }, { id: 23, src: g23 }, { id: 24, src: g24 },
  { id: 25, src: g25 }, { id: 26, src: g26 }, { id: 27, src: g27 },
  { id: 28, src: g28 }, { id: 29, src: g29 }, { id: 30, src: g30 },
  { id: 31, src: g31 }, { id: 32, src: g32 }, { id: 33, src: g33 },
  { id: 34, src: g34 }, { id: 35, src: g35 }, { id: 36, src: g36 },
  { id: 37, src: g37 }, { id: 38, src: g38 }, { id: 39, src: g39 },
  { id: 40, src: g40 }, { id: 41, src: g41 }, { id: 42, src: g42 },
  { id: 43, src: g43 }, { id: 44, src: g44 }, { id: 45, src: g45 },
  { id: 46, src: g46 }, { id: 47, src: g47 }, { id: 48, src: g48 },
  { id: 49, src: g49 }, { id: 50, src: g50 }, { id: 51, src: g51 },
];

const dandeliPhotos: Photo[] = [
  { id: 1, src: d01 },
  { id: 2, src: d02 },
  { id: 3, src: d03 },
];

const fortPhotos: Photo[] = [
  { id: 1, src: f01 },
];

const locations: TripLocation[] = [
  { key: 'gokarna', name: 'Gokarna',  emoji: '🌊', tagline: 'Salt, sand, and no deadlines.', photos: gokarnaPhotos },
  { key: 'dandeli', name: 'Dandeli',  emoji: '🌿', tagline: 'Into the wild, all of us.',      photos: dandeliPhotos },
  { key: 'fort',    name: 'The Fort', emoji: '🏰', tagline: 'History beneath our feet.',      photos: fortPhotos    },
];

// Rotation seeds — stable per card position
const rotations = [-2.8, 1.9, -1.4, 2.5, -0.8, 3.0, -2.2, 1.2];

interface LightboxState {
  location: TripLocation;
  photoIndex: number; // -1 = grid view
}

export default function Memories() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

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

      <div className="page-hero">
        <p className="page-tag pg-tag">Chapter 05</p>
        <h1 className="page-title pg-title">Memories</h1>
        <p className="page-subtitle pg-desc">Every road we took together.</p>
      </div>

      <div className="memories-body">
        {locations.map(loc => (
          <section key={loc.key} className={`loc-section loc-section-${loc.key}`}>

            <div className={`loc-heading loc-heading-${loc.key}`}>
              <span className="loc-emoji">{loc.emoji}</span>
              <div>
                <h2 className="loc-name">{loc.name}</h2>
                <p className="loc-tagline">{loc.tagline}</p>
              </div>
              <div className="loc-divider" />
            </div>

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

            <button className={`view-all-btn loc-btn-${loc.key}`} onClick={() => openGrid(loc)}>
              View All {loc.photos.length} Photos →
            </button>

          </section>
        ))}
      </div>

      {lightbox && (
        <div className="lb-overlay" onClick={() => setLightbox(null)}>
          <div className="lb-modal" onClick={e => e.stopPropagation()}>

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

            {lightbox.photoIndex >= 0 && (
              <div className="lb-single">
                <button className="lb-arrow lb-arrow--prev" onClick={prevPhoto} disabled={lightbox.photoIndex === 0}>‹</button>
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
                <button className="lb-arrow lb-arrow--next" onClick={nextPhoto} disabled={lightbox.photoIndex === lightbox.location.photos.length - 1}>›</button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
