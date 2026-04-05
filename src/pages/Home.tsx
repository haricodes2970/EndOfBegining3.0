import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleCanvas from '../components/ParticleCanvas';
import logo from '../assets/ainexus.jpeg';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  { num: '01', icon: '📜', title: 'The Chronicles', sub: 'Timeline & History',   desc: 'Every milestone, every all-nighter, every moment that shaped four unforgettable years.', to: '/chronicles' },
  { num: '02', icon: '✦',  title: 'The Pantheon',   sub: 'Student Directory',    desc: 'Faces, stories, and futures. Meet every soul who made this batch legendary.',               to: '/pantheon'   },
  { num: '03', icon: '🎞', title: 'The Vault',       sub: 'Media Gallery',        desc: 'Unfiltered. Unscripted. The photos and videos you\'ll look back at in 20 years.',           to: '/vault'      },
  { num: '04', icon: '💬', title: 'Echoes',          sub: 'Messages & Tributes',  desc: 'Words left behind — from juniors, professors, and the seniors themselves.',                  to: '/echoes'     },
];

export default function Home() {
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const badgeRef    = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const yearRef     = useRef<HTMLParagraphElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const logoRef     = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Split title letters
    const el = titleRef.current!;
    const text = el.textContent || '';
    el.innerHTML = text.split('').map(c =>
      `<span class="tl-char">${c === ' ' ? '&nbsp;' : c}</span>`
    ).join('');

    const tl = gsap.timeline({ delay: 0.3 });

    tl.set('.orb', { opacity: 0 });
    tl.to('.orb', { opacity: 1, duration: 2, stagger: 0.3 }, 0);
    tl.to(badgeRef.current,    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.6);
    tl.to('.tl-char',          { opacity: 1, y: 0, rotation: 0, duration: 0.55, stagger: 0.028, ease: 'back.out(1.7)' }, 0.9);
    tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.8);
    tl.to(yearRef.current,     { opacity: 0.65, y: 0, duration: 0.6, ease: 'power3.out' }, 2.1);
    tl.to(scrollRef.current,   { opacity: 1, duration: 0.6 }, 2.5);
    tl.to(logoRef.current,     { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, 1.4);

    // Parallax
    const onScroll = () => {
      const y = window.scrollY;
      gsap.to(el,                { y: y * 0.28, duration: 0 });
      gsap.to(subtitleRef.current, { y: y * 0.18, duration: 0 });
    };
    window.addEventListener('scroll', onScroll);

    // Cards
    gsap.from('.chapter-card', {
      opacity: 0, y: 40, duration: 0.65, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
    });

    // Manifesto lines
    gsap.to('.m-line', {
      y: 0, opacity: 1, duration: 0.85, stagger: 0.18, ease: 'power3.out',
      scrollTrigger: { trigger: '.manifesto-text', start: 'top 78%' },
    });
    gsap.to('.m-divider',  { scaleX: 1, duration: 0.8, scrollTrigger: { trigger: '.m-divider',  start: 'top 85%' } });
    gsap.to('.m-sub',      { opacity: 0.8, duration: 0.9, scrollTrigger: { trigger: '.m-sub', start: 'top 85%' } });
    gsap.to('.section-ttl', { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: '.section-ttl', start: 'top 80%' } });

    return () => {
      window.removeEventListener('scroll', onScroll);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <ParticleCanvas />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* HERO */}
      <section className="hero">
        <div className="hero-club-logo" ref={logoRef}>
          <img src={logo} alt="AI Nexus" />
          <span>AI Nexus</span>
        </div>

        <div className="hero-badge" ref={badgeRef}>
          Batch of 2022–26 &nbsp;·&nbsp; Jyothy Institute of Technology
        </div>

        <h1 className="hero-title" ref={titleRef}>EndOfBeginning</h1>

        <p className="hero-subtitle" ref={subtitleRef}>
          — because every ending is just the prologue —
        </p>
        <p className="hero-year" ref={yearRef}>
          2022 – 2026 &nbsp;·&nbsp; BE AI &amp; ML &nbsp;·&nbsp; JIT Bengaluru
        </p>

        <div className="scroll-indicator" ref={scrollRef}>
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto">
        <div className="manifesto-inner">
          <p className="manifesto-label">— The Manifesto —</p>
          <h2 className="manifesto-text">
            <span className="line"><span className="m-line">Four years ago, we walked in</span></span>
            <span className="line"><span className="m-line">as strangers with <em className="accent">dreams too loud</em></span></span>
            <span className="line"><span className="m-line">for the silence of lecture halls.</span></span>
          </h2>
          <div className="m-divider" />
          <p className="m-sub">
            This isn't a goodbye. It's a graduation of the soul — from who we were,
            to who we're becoming. The corridors held our chaos, the canteen held our secrets,
            and somewhere between the deadlines and the detours, we found each other.
            <br /><br />
            This is that story. Told once. Felt forever.
          </p>
        </div>
      </section>

      {/* CHAPTERS */}
      <section className="chapters">
        <div className="chapters-header">
          <h2 className="section-ttl">Five Chapters. One Story.</h2>
          <p className="section-sub">Choose where you want to begin</p>
        </div>
        <div className="chapters-grid" ref={cardsRef}>
          {chapters.map(c => (
            <Link to={c.to} className="chapter-card glass-card" key={c.num}>
              <div className="card-num">Chapter {c.num}</div>
              <span className="card-icon">{c.icon}</span>
              <div className="card-title">{c.title}</div>
              <div className="card-sub">{c.sub}</div>
              <p className="card-desc">{c.desc}</p>
              <div className="card-arrow">→</div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <p>EndOfBeginning &nbsp;·&nbsp; Jyothy Institute of Technology &nbsp;·&nbsp; BE AI &amp; ML &nbsp;·&nbsp; Batch of 2022–26 &nbsp;·&nbsp; Made with memory</p>
      </footer>
    </>
  );
}
