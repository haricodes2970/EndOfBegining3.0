import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import ParticleCanvas from '../components/ParticleCanvas';
import logo from '../assets/ainexus.jpeg';
import './Home.css';

/* ── TICKER ── */
const tickerItems = [
  "The Proxy King once answered attendance for 6 people. Simultaneously.",
  "Mr. Last Bench had the best notes. Nobody knows how.",
  "The Deadline Whisperer submitted at 11:59 PM. Every. Single. Time.",
  "WiFi went down. 60 engineers became philosophers.",
  "The Canteen Oracle predicted every exam date before the professor did.",
  '"Sir, he\'s in the washroom" — said for the same guy by 4 different people.',
  "The group project had 4 members. One person knows who did the work.",
];

/* ── LEGENDS DATA ── */
const legends = [
  {
    nick: 'The Proxy Maestro',
    tag: 'Attendance Artiste',
    story: `Six names. Six different voices. One phone.\nHe never rehearsed, never got caught, and somehow his "present, sir" sounded more convincing than the actual person's. Attendance registers across four departments still carry his ghost signatures.`,
    pull: '"Present, sir" — six voices, one phone.',
    variant: 'lc-navy',
  },
  {
    nick: 'The Last Bench Oracle',
    tag: 'The Silent Scorer',
    story: `Terrible attendance. Never spotted near the library. Zero visible study habits. Yet every internal result had his name sitting quietly near the top, like he'd made a deal nobody else knew about.\nJuniors whispered his name like folklore.`,
    pull: '',
    variant: 'lc-blue',
  },
  {
    nick: 'The 11:59 Whisperer',
    tag: 'Deadline Deity',
    story: `While the group chat was in full meltdown — "bro it's 11:40 WHERE ARE YOU" — he was asleep.\nAt 11:45 he opened his laptop. At 11:58 he formatted the PDF. Submitted at 11:59:04. Closed laptop. Back to sleep.`,
    pull: '',
    variant: 'lc-shallow',
  },
  {
    nick: 'The Presentation Ghost',
    tag: 'Lab Report Ghost',
    story: `Missing for three weeks straight. Not on the group chat. Not in the lab. Not anywhere.\nPresentation day: he walks in. Full formals. Tie straight. Speaks for seven minutes like he built the entire project himself.\nProfessor loved him.`,
    pull: '',
    variant: 'lc-navy',
  },
  {
    nick: 'The Canteen Philosopher',
    tag: 'Canteen Philosopher',
    story: `Zero attendance. Infinite wisdom.\nEvery crisis — academic, existential, romantic — was solved over one chai and a samosa at his corner table. He had a new startup idea every week. Most were terrible. Two were genuinely brilliant.`,
    pull: '',
    variant: 'lc-shallow',
  },
  {
    nick: 'The Night Before Explainer',
    tag: 'The Explainer',
    story: `Didn't top a single exam. But every topper called him the night before theirs.\nFifteen minutes before any internal, his phone was unreachable — not because he was studying, but because seven people were already on hold.\nA teacher who never got the title.`,
    pull: '',
    variant: 'lc-rose',
  },
];

/* ── CHAPTERS ── */
const chapters = [
  { num: '01', icon: '🌊', title: 'Memories',     sub: 'Trips & Adventures',  desc: 'Gokarna, Dandeli, the Fort — every road we took together, relived.',                       to: '/memories'     },
  { num: '02', icon: '✦',  title: 'Neural Drift', sub: 'Chronicles Timeline', desc: 'Milestones, detours, and the moments that shaped the batch.',                                to: '/neural-drift' },
  { num: '03', icon: '✦',  title: 'The Pantheon', sub: 'Student Directory',   desc: 'Faces, stories, and futures. Meet every soul who made this batch legendary.',              to: '/pantheon'     },
  { num: '04', icon: '🎞', title: 'The Vault',    sub: 'Media Gallery',       desc: "Unfiltered. Unscripted. The photos and videos you'll look back at in 20 years.",          to: '/vault'        },
  { num: '05', icon: '💬', title: 'Echoes',       sub: 'Messages & Tributes', desc: 'Words left behind — from juniors, professors, and the seniors themselves.',                to: '/echoes'       },
];

/* ── FISH CONFIG ── */
const fishConfig = [
  { color: '#ff6b35', size: 32, top: '35%',  duration: 14 },
  { color: '#ffd700', size: 26, top: '55%',  duration: 18 },
  { color: '#ff4757', size: 30, top: '65%',  duration: 12 },
  { color: '#2ed573', size: 22, top: '75%',  duration: 20 },
];

/* ── BUBBLE CONFIG (20 bubbles) ── */
const bubbles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: 4 + Math.random() * 8,
  left: Math.random() * 100,
  delay: Math.random() * 10,
  duration: 6 + Math.random() * 9,
}));

/* ── SEAWEED POSITIONS ── */
const seaweeds = [
  { left: '3%',  height: 80, delay: 0 },
  { left: '7%',  height: 110, delay: 0.4 },
  { left: '11%', height: 70, delay: 0.8 },
  { left: '86%', height: 100, delay: 0.2 },
  { left: '91%', height: 85, delay: 0.6 },
  { left: '96%', height: 75, delay: 1.0 },
];

/* ── ROCK POSITIONS ── */
const rocks = [
  { left: '8%',  w: 55, h: 28 },
  { left: '18%', w: 38, h: 20 },
  { left: '30%', w: 70, h: 35 },
  { left: '48%', w: 44, h: 22 },
  { left: '62%', w: 60, h: 30 },
  { left: '74%', w: 35, h: 18 },
  { left: '85%', w: 50, h: 25 },
  { left: '93%', w: 42, h: 20 },
];

/* ── CAUSTIC PATCHES ── */
const causticPatches = [
  { w: 160, h: 80,  left: '10%', top: '5%'  },
  { w: 120, h: 60,  left: '35%', top: '15%' },
  { w: 200, h: 100, left: '60%', top: '8%'  },
  { w: 140, h: 70,  left: '80%', top: '18%' },
  { w: 100, h: 50,  left: '50%', top: '25%' },
];

export default function Home() {
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);
  const yearRef      = useRef<HTMLParagraphElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);
  const logoRef      = useRef<HTMLDivElement>(null);
  const cardsRef     = useRef<HTMLDivElement>(null);
  const legendsRef   = useRef<HTMLDivElement>(null);
  const heroRef      = useRef<HTMLElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const wrapperRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* ── HERO TITLE — SplitText bounce ── */
    const split = new SplitText(titleRef.current!, { type: 'chars' });
    gsap.set(split.chars, { opacity: 0, y: 80, rotation: 15 });
    const tl = gsap.timeline({ delay: 0.3 });
    tl.set('.orb', { opacity: 0 });
    tl.to('.orb', { opacity: 1, duration: 2, stagger: 0.3 }, 0);
    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.6);
    tl.to(split.chars, { opacity: 1, y: 0, rotation: 0, duration: 0.8, stagger: 0.04, ease: 'back.out(1.7)' }, 0.9);
    tl.to(logoRef.current,  { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, 1.4);
    tl.to(yearRef.current,  { opacity: 0.65, y: 0, duration: 0.6, ease: 'power3.out' }, 2.1);
    tl.to(scrollRef.current, { opacity: 1, duration: 0.6 }, 2.5);

    /* ── SUBTITLE typewriter ── */
    gsap.set(subtitleRef.current, { opacity: 1, text: '' });
    gsap.to(subtitleRef.current, {
      delay: 1.2, duration: 2,
      text: { value: 'BE AI & ML · Batch 2022–26 · Jyothy Institute of Technology', delimiter: '' },
      ease: 'none',
    });

    /* ── PARALLAX scroll handler ── */
    const parallaxHandler = () => {
      const y = window.scrollY;
      gsap.to(titleRef.current,    { y: y * 0.28, duration: 0 });
      gsap.to(subtitleRef.current, { y: y * 0.18, duration: 0 });
    };
    window.addEventListener('scroll', parallaxHandler);

    /* ── HERO ZOOM SCROLL ── */
    gsap.set(heroInnerRef.current, { scale: 1.4 });
    gsap.set('.hero-side-left',  { x: -120, opacity: 0 });
    gsap.set('.hero-side-right', { x:  120, opacity: 0 });
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: '+=600',
      pin: true,
      scrub: 1,
      animation: gsap.timeline()
        .to(heroInnerRef.current, { scale: 1.0, ease: 'none' })
        .to('.hero-side-left',  { x: 0, opacity: 1, ease: 'none' }, 0)
        .to('.hero-side-right', { x: 0, opacity: 1, ease: 'none' }, 0),
    });

    /* ── DEPTH OVERLAY (scroll → darken) ── */
    gsap.to('.depth-overlay', {
      opacity: 0.6,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    /* ── CAUSTICS (shimmer in shallow section) ── */
    const causticPatches = document.querySelectorAll('.caustic-patch');
    causticPatches.forEach((el, i) => {
      gsap.to(el, {
        opacity: 0.3,
        x: `+=${20 + i * 5}`,
        duration: 2 + i * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3,
      });
    });
    gsap.fromTo('.caustics', { opacity: 0 }, {
      opacity: 1,
      scrollTrigger: {
        trigger: '.caustics',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
      },
    });

    /* ── BUBBLES ── */
    document.querySelectorAll('.bubble').forEach((el) => {
      const b = el as HTMLElement;
      const delay  = parseFloat(b.dataset.delay  ?? '0');
      const dur    = parseFloat(b.dataset.dur    ?? '8');
      gsap.fromTo(b,
        { y: '100vh', opacity: 0 },
        {
          y: '-10vh',
          opacity: 0,
          duration: dur,
          delay,
          repeat: -1,
          ease: 'none',
          keyframes: [
            { opacity: 0,   y: '100vh' },
            { opacity: 0.5, y: '50vh'  },
            { opacity: 0,   y: '-10vh' },
          ],
        }
      );
    });

    /* ── SEAWEED ── */
    document.querySelectorAll('.seaweed').forEach((el, i) => {
      gsap.to(el, {
        rotation: 10,
        duration: 2.5 + i * 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: 'bottom center',
        delay: i * 0.3,
      });
      gsap.from(el, { rotation: -10 });
    });

    /* ── FISH — MotionPath swim ── */
    document.querySelectorAll('.fish').forEach((el, i) => {
      const dir = i % 2 === 0 ? 1 : -1;
      const startX = dir > 0 ? -80 : window.innerWidth + 80;
      const endX   = dir > 0 ? window.innerWidth + 80 : -80;
      const dur    = fishConfig[i]?.duration ?? 15;
      gsap.set(el, { x: startX, scaleX: dir });
      gsap.to(el, {
        motionPath: {
          path: [
            { x: startX },
            { x: (startX + endX) / 2, y: -30 + (i % 3) * 20 },
            { x: endX },
          ],
          type: 'cubic',
        },
        duration: dur,
        repeat: -1,
        ease: 'none',
        delay: i * 3,
        onRepeat() {
          gsap.set(el, { x: startX });
        },
      });
    });

    /* ── MANIFESTO ── */
    const manifestoWords = new SplitText('.manifesto-text', { type: 'words' });
    gsap.set(manifestoWords.words, { opacity: 0, y: 40 });
    gsap.to(manifestoWords.words, {
      opacity: 1, y: 0, duration: 0.65, stagger: 0.03, ease: 'power3.out',
      scrollTrigger: { trigger: '.manifesto-text', start: 'top 70%' },
    });
    gsap.to('.m-divider', { scaleX: 1, duration: 0.8, scrollTrigger: { trigger: '.m-divider', start: 'top 85%' } });
    gsap.fromTo('.m-sub', { opacity: 0, y: 20 }, { opacity: 0.8, y: 0, duration: 0.9, scrollTrigger: { trigger: '.m-sub', start: 'top 85%' } });

    /* ── CHAPTER CARDS ── */
    gsap.fromTo('.chapter-card',
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' } });
    gsap.fromTo('.section-ttl',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: '.section-ttl', start: 'top 80%' } });

    /* ── LEGENDS HEADER ── */
    gsap.fromTo('.lgd-tag',     { opacity: 0, y: 16 }, { opacity: 1,   y: 0, duration: 0.6, scrollTrigger: { trigger: '.lgd-tag',     start: 'top 85%' } });
    gsap.fromTo('.lgd-heading', { opacity: 0, y: 24 }, { opacity: 1,   y: 0, duration: 0.7, scrollTrigger: { trigger: '.lgd-heading', start: 'top 85%' } });
    gsap.fromTo('.lgd-sub',     { opacity: 0, y: 16 }, { opacity: 0.6, y: 0, duration: 0.6, scrollTrigger: { trigger: '.lgd-sub',     start: 'top 85%' } });

    /* ── MAGAZINE ROW ANIMATIONS ── */
    // Row 1 — scale in
    gsap.fromTo('.mag-row-1 .legend-card',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.mag-row-1', start: 'top 82%' } });
    // Row 2 — slide from sides
    gsap.fromTo('.mag-row-2 .mag-col-60 .legend-card',
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.mag-row-2', start: 'top 82%' } });
    gsap.fromTo('.mag-row-2 .mag-col-40 .legend-card',
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.mag-row-2', start: 'top 82%' } });
    // Row 3 — cascade stagger
    gsap.fromTo('.mag-row-3 .legend-card',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.mag-row-3', start: 'top 82%' } });

    return () => {
      window.removeEventListener('scroll', parallaxHandler);
      split.revert();
      manifestoWords.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="home-wrapper" ref={wrapperRef}>

      {/* ── DEPTH OVERLAY (fixed, darkens on scroll) ── */}
      <div className="depth-overlay" />

      {/* ── OCEAN LAYERS ── */}
      <div className="sun-rays" />

      <div className="caustics">
        {causticPatches.map((p, i) => (
          <div
            key={i}
            className="caustic-patch"
            style={{ width: p.w, height: p.h, left: p.left, top: p.top, opacity: 0 }}
          />
        ))}
      </div>

      <div className="ocean-surface" />

      {/* 20 bubbles */}
      {bubbles.map(b => (
        <div
          key={b.id}
          className="bubble"
          data-delay={b.delay}
          data-dur={b.duration}
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            bottom: 0,
          }}
        />
      ))}

      {/* Fish */}
      {fishConfig.map((f, i) => (
        <div
          key={i}
          className="fish"
          style={{ top: f.top, width: f.size, height: Math.round(f.size * 0.56) }}
        >
          <div className="fish-body" style={{ background: f.color, width: Math.round(f.size * 0.75), height: Math.round(f.size * 0.44) }} />
          <div className="fish-tail" style={{ borderRightColor: f.color }} />
          <div className="fish-eye" />
        </div>
      ))}

      {/* Seaweed */}
      <div className="seaweed-container">
        {seaweeds.map((s, i) => (
          <svg
            key={i}
            className="seaweed"
            style={{ left: s.left, bottom: 0 }}
            width="18" height={s.height}
            viewBox={`0 0 18 ${s.height}`}
            fill="none"
          >
            <path
              d={`M9,${s.height} C4,${s.height * 0.75} 14,${s.height * 0.55} 9,${s.height * 0.4} C4,${s.height * 0.25} 14,${s.height * 0.1} 9,0`}
              stroke="#2d6a2d"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        ))}
      </div>

      {/* Ocean floor */}
      <div className="ocean-floor">
        {rocks.map((r, i) => (
          <div key={i} className="rock" style={{ left: r.left, width: r.w, height: r.h }} />
        ))}
      </div>

      {/* ParticleCanvas — reduced opacity for ocean */}
      <div style={{ opacity: 0.3, position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <ParticleCanvas />
      </div>

      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* ══════════ HERO ══════════ */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-side-left">
          <span className="year">2022</span>
          <div className="deco-line" />
          <span className="label">AI &amp; ML</span>
        </div>
        <div className="hero-side-right">
          <span className="year">2026</span>
          <div className="deco-line" />
          <span className="label">JIT</span>
        </div>

        <div className="hero-inner" ref={heroInnerRef}>
          <div className="hero-club-logo" ref={logoRef}>
            <img src={logo} alt="AI Nexus" />
            <span>AI Nexus</span>
          </div>

          <div className="hero-badge" ref={badgeRef}>
            Batch of 2022–26 &nbsp;·&nbsp; Jyothy Institute of Technology
          </div>

          <h1 className="hero-title" ref={titleRef}>End of Beginning</h1>

          <div className="hero-gold-divider" />

          <p className="hero-subtitle" ref={subtitleRef}></p>
          <p className="hero-year" ref={yearRef}>
            2022 – 2026 &nbsp;·&nbsp; BE AI &amp; ML &nbsp;·&nbsp; JIT Bengaluru
          </p>

          <div className="scroll-indicator" ref={scrollRef}>
            <div className="scroll-line" />
            <span>Scroll</span>
          </div>
        </div>
      </section>

      {/* ══════════ MANIFESTO ══════════ */}
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

      {/* ══════════ CHAPTERS ══════════ */}
      <section className="chapters">
        <div className="chapters-header">
          <h2 className="section-ttl">Six Chapters. One Story.</h2>
          <p className="section-sub">Choose where you want to begin</p>
        </div>
        <div className="chapters-grid" ref={cardsRef}>
          {chapters.map(c => (
            <Link to={c.to} className="chapter-card" key={c.num}>
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

      {/* ══════════ LEGENDS ══════════ */}
      <section className="legends-section">

        {/* TICKER */}
        <div className="ticker-wrap">
          <div className="ticker-track">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="ticker-item">
                {item} <span className="ticker-dot">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* HEADER */}
        <div className="lgd-header">
          <p className="lgd-tag">— Every Batch Has Them —</p>
          <h2 className="lgd-heading">Legends Never Graduate</h2>
          <p className="lgd-sub">No names. You already know exactly who we mean.</p>
        </div>

        {/* MAGAZINE LAYOUT */}
        <div className="magazine-layout" ref={legendsRef}>

          {/* ROW 1 — full width, horizontal */}
          <div className="mag-row mag-row-1">
            <div className={`legend-card ${legends[0].variant}`} style={{ width: '100%' }}>
              <div className="lc-left">
                <p className="lgd-nick">{legends[0].nick}</p>
                <span className="lgd-pill">{legends[0].tag}</span>
              </div>
              <div className="lc-center">
                <p className="pull-quote">{legends[0].pull}</p>
              </div>
              <div className="lc-right">
                <p className="lgd-story">
                  {legends[0].story.split('\n').map((line, j) => (
                    <span key={j}>{line}<br /></span>
                  ))}
                </p>
              </div>
            </div>
          </div>

          {/* ROW 2 — 60/40 */}
          <div className="mag-row mag-row-2">
            <div className="mag-col-60">
              <div className={`legend-card ${legends[1].variant}`} style={{ height: '100%' }}>
                <p className="lgd-nick">{legends[1].nick}</p>
                <p className="lgd-story">
                  {legends[1].story.split('\n').map((line, j) => (
                    <span key={j}>{line}<br /></span>
                  ))}
                </p>
                <span className="lgd-pill">{legends[1].tag}</span>
              </div>
            </div>
            <div className="mag-col-40">
              <div className={`legend-card ${legends[2].variant}`}>
                <p className="lgd-nick">{legends[2].nick}</p>
                <p className="lgd-story">
                  {legends[2].story.split('\n').map((line, j) => (
                    <span key={j}>{line}<br /></span>
                  ))}
                </p>
                <span className="lgd-pill">{legends[2].tag}</span>
              </div>
            </div>
          </div>

          {/* ROW 3 — three cascade, middle offset down */}
          <div className="mag-row mag-row-cascade mag-row-3">
            {[legends[3], legends[4], legends[5]].map((l, i) => (
              <div key={i} className={`legend-card ${l.variant}`} style={{ flex: 1 }}>
                <p className="lgd-nick">{l.nick}</p>
                <p className="lgd-story">
                  {l.story.split('\n').map((line, j) => (
                    <span key={j}>{line}<br /></span>
                  ))}
                </p>
                <span className="lgd-pill">{l.tag}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      <footer className="site-footer">
        <p>EndOfBeginning &nbsp;·&nbsp; Jyothy Institute of Technology &nbsp;·&nbsp; BE AI &amp; ML &nbsp;·&nbsp; Batch of 2022–26 &nbsp;·&nbsp; Made with memory</p>
      </footer>
    </div>
  );
}
