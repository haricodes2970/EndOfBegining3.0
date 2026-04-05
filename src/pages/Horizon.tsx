import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleCanvas from '../components/ParticleCanvas';
import './Horizon.css';

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  { name: '[Student Name]', city: 'Bengaluru',   country: 'India',         next: 'Placement'      },
  { name: '[Student Name]', city: 'San Francisco',country: 'USA',           next: 'Higher Studies' },
  { name: '[Student Name]', city: 'London',       country: 'UK',            next: 'Higher Studies' },
  { name: '[Student Name]', city: 'Bengaluru',    country: 'India',         next: 'Startup'        },
  { name: '[Student Name]', city: 'Toronto',      country: 'Canada',        next: 'Higher Studies' },
  { name: '[Student Name]', city: 'Hyderabad',    country: 'India',         next: 'Placement'      },
];

const legacy = [
  { icon: '🏆', text: '[Hackathon win — add details]'        },
  { icon: '📄', text: '[Research paper published — add details]' },
  { icon: '🚀', text: '[Startup founded — add details]'      },
  { icon: '🎓', text: '[Scholarship awarded — add details]'  },
  { icon: '💡', text: '[Project that impacted the college — add details]' },
];

const credits = [
  { role: 'Concept & Direction', name: '[Name]'  },
  { role: 'Design & Development', name: '[Name]' },
  { role: 'Photography',           name: '[Name]' },
  { role: 'Video',                  name: '[Name]' },
  { role: 'Content',               name: '[Name]' },
  { role: 'Coordination',          name: '[Name]' },
];

export default function Horizon() {
  useEffect(() => {
    gsap.to('.pg-tag',   { opacity: 1, y: 0, duration: 0.7, delay: 0.3 });
    gsap.to('.pg-title', { opacity: 1, y: 0, duration: 0.9, delay: 0.5 });
    gsap.to('.pg-desc',  { opacity: 0.7, y: 0, duration: 0.8, delay: 0.7 });

    gsap.from('.dest-row', {
      opacity: 0, x: -30, duration: 0.6, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: '.dest-table', start: 'top 82%' },
    });

    gsap.from('.legacy-item', {
      opacity: 0, y: 25, duration: 0.6, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.legacy-list', start: 'top 82%' },
    });

    gsap.from('.credit-row', {
      opacity: 0, y: 20, duration: 0.5, stagger: 0.07, ease: 'power3.out',
      scrollTrigger: { trigger: '.credits-grid', start: 'top 85%' },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <>
      <ParticleCanvas />
      <div className="orb orb-1" /> <div className="orb orb-2" />

      <div className="page-hero">
        <p className="page-tag pg-tag">Chapter 05</p>
        <h1 className="page-title pg-title">The Horizon</h1>
        <p className="page-subtitle pg-desc">Where they go from here. A map of new beginnings and the legacy left behind.</p>
      </div>

      {/* MAP PLACEHOLDER */}
      <section className="map-section" style={{ position:'relative', zIndex:1 }}>
        <div className="map-ph">
          <div className="map-inner">
            <p className="map-label">World Map</p>
            <p className="map-sub">Integrate Leaflet.js or embed a custom map here</p>
            <div className="map-dots">
              {destinations.map((d, i) => (
                <div className="map-dot" key={i} style={{ '--i': i } as React.CSSProperties}>
                  <div className="dot-pulse" />
                  <div className="dot-tooltip">{d.city}, {d.country}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS TABLE */}
      <section className="dest-section" style={{ position:'relative', zIndex:1 }}>
        <h2 className="section-h2">Where We're Going</h2>
        <div className="dest-table glass-card">
          <div className="dest-header">
            <span>Name</span><span>City</span><span>Country</span><span>Next Chapter</span>
          </div>
          {destinations.map((d, i) => (
            <div className="dest-row" key={i}>
              <span>{d.name}</span>
              <span>{d.city}</span>
              <span>{d.country}</span>
              <span className="dest-next">{d.next}</span>
            </div>
          ))}
        </div>
      </section>

      {/* LEGACY */}
      <section className="legacy-section" style={{ position:'relative', zIndex:1 }}>
        <h2 className="section-h2">What We Leave Behind</h2>
        <div className="legacy-list">
          {legacy.map((l, i) => (
            <div className="legacy-item glass-card" key={i}>
              <span className="legacy-icon">{l.icon}</span>
              <p>{l.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CINEMATIC CREDITS */}
      <section className="credits-section" style={{ position:'relative', zIndex:1 }}>
        <div className="credits-header">
          <p className="credits-label">— A Film About Growing Up —</p>
          <h2 className="credits-title">EndOfBeginning</h2>
          <p className="credits-year">2022 – 2026</p>
        </div>
        <div className="credits-grid">
          {credits.map((c, i) => (
            <div className="credit-row" key={i}>
              <span className="credit-role">{c.role}</span>
              <span className="credit-name">{c.name}</span>
            </div>
          ))}
        </div>
        <div className="credits-finale">
          <p>Jyothy Institute of Technology &nbsp;·&nbsp; BE AI &amp; ML &nbsp;·&nbsp; Batch of 2022–26</p>
          <p className="finale-tagline">The beginning was always the destination.</p>
        </div>
      </section>
    </>
  );
}
