import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import ParticleCanvas from '../components/ParticleCanvas';
import OceanScene from '../components/OceanScene';
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

/* ── ALL LEGENDS (12 stories for story card) ── */
const allLegends = [
  {
    nick: 'The Proxy Maestro',
    tag: 'Attendance Artiste',
    pull: '"Present, sir" — six voices, one phone.',
    accentColor: '#c9a96e',
    story: `Six names. Six different voices. One phone.\n\nHe never rehearsed, never got caught, and somehow his "present, sir" sounded more convincing than the actual person's. Attendance registers across four departments still carry his ghost signatures. A true method actor — just never for the right course.`,
  },
  {
    nick: 'The Last Bench Oracle',
    tag: 'The Silent Scorer',
    pull: '"How did he top again?"',
    accentColor: '#7aaed4',
    story: `Terrible attendance. Never spotted near the library. Zero visible study habits. Yet every internal result had his name sitting quietly near the top, like he'd made a deal nobody else knew about.\n\nJuniors whispered his name like folklore. Seniors never figured out his system. He took the secret with him.`,
  },
  {
    nick: 'The 11:59 Whisperer',
    tag: 'Deadline Deity',
    pull: '"Submitted at 11:59:04. Closed laptop. Back to sleep."',
    accentColor: '#ff6b35',
    story: `While the group chat was in full meltdown — "bro it's 11:40 WHERE ARE YOU" — he was asleep.\n\nAt 11:45 he opened his laptop. At 11:58 he formatted the PDF. Submitted at 11:59:04. Closed laptop. Back to sleep.\n\nNever explained his process. We stopped asking.`,
  },
  {
    nick: 'The Presentation Ghost',
    tag: 'Lab Report Ghost',
    pull: '"Full formals. Tie straight. Like he built it himself."',
    accentColor: '#9bc4a8',
    story: `Missing for three weeks straight. Not on the group chat. Not in the lab. Not anywhere.\n\nPresentation day: he walks in. Full formals. Tie straight. Speaks for seven minutes like he built the entire project himself.\n\nProfessor loved him. We never spoke of it.`,
  },
  {
    nick: 'The Canteen Philosopher',
    tag: 'Canteen Philosopher',
    pull: '"Zero attendance. Infinite wisdom."',
    accentColor: '#ffd700',
    story: `Zero attendance. Infinite wisdom.\n\nEvery crisis — academic, existential, romantic — was solved over one chai and a samosa at his corner table. He had a new startup idea every week. Most were terrible. Two were genuinely brilliant.\n\nHe never attended the entrepreneurship elective. He didn't need to.`,
  },
  {
    nick: 'The Night Before Explainer',
    tag: 'The Explainer',
    pull: '"A teacher who never got the title."',
    accentColor: '#c084fc',
    story: `Didn't top a single exam. But every topper called him the night before theirs.\n\nFifteen minutes before any internal, his phone was unreachable — not because he was studying, but because seven people were already on hold.\n\nHe made concepts make sense in ways textbooks never could. A teacher who never got the title.`,
  },
  {
    nick: 'The Xerox King',
    tag: 'The Duplicator',
    pull: '"The original was never found."',
    accentColor: '#fb923c',
    story: `Nobody ever saw him take notes. Nobody ever saw him study. But ten minutes before every submission, a perfectly formatted printout appeared in his hand.\n\nThe xerox shop owner knew his order by heart. The original? Nobody ever found it.`,
  },
  {
    nick: 'The WiFi Wizard',
    tag: 'Network Necromancer',
    pull: '"Connected when no one else could."',
    accentColor: '#2ed573',
    story: `College WiFi was down. Sixty engineers became philosophers.\n\nHe connected. Nobody knows how. He never explained. He just quietly shared his hotspot with the people he liked and watched the rest debate existence.\n\nPower is knowing something and saying nothing.`,
  },
  {
    nick: 'The Backbencher\'s Frontbencher',
    tag: 'Strategic Seater',
    pull: '"Front row energy. Last bench spirit."',
    accentColor: '#1e90ff',
    story: `He sat in the front row. But only because the last bench had no power socket.\n\nLaptop always open. Never taking notes. Nobody questioned it because he looked diligent.\n\nHe was six seasons into a show. The professor thought he was the most engaged student in the room.`,
  },
  {
    nick: 'The Group Chat Admin',
    tag: 'The Curator',
    pull: '"He never replied. But he never left."',
    accentColor: '#ff4757',
    story: `Created the group. Set the rules. Pinned the syllabus. Sent the reminders.\n\nNever replied to any message. Never confirmed if he read anything. But whenever chaos broke out — he appeared, pinned one message, and disappeared.\n\nThe group functioned because of him. He knew it. That was enough.`,
  },
  {
    nick: 'The Attendance Negotiator',
    tag: 'The Diplomat',
    pull: '"Sir, technically speaking..."',
    accentColor: '#a78bfa',
    story: `He had 28% attendance. The minimum was 75%.\n\nHe walked into the HOD's office with a spreadsheet, a medical certificate, three character references, and an argument so compelling that the HOD — who had never budged once in eleven years — said "fine."\n\nWe don't know what he said. We don't ask. We just watch in awe.`,
  },
  {
    nick: 'Softy Santu',
    tag: 'The Heart of the Batch',
    pull: '"He remembered everyone\'s birthday. Always."',
    accentColor: '#f9a8d4',
    story: `He remembered everyone's birthday. Not because of reminders — he just remembered.\n\nWhen someone cried in the corridor, he appeared with water and silence. When someone failed, he texted at midnight — not with advice, just "I'm here."\n\nIn a batch full of characters, he was the quiet anchor. The one who held it together without anyone asking him to.`,
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


/* ── SEAWEEDS ── */
const seaweeds = [
  { left: '3%',  height: 80  },
  { left: '7%',  height: 110 },
  { left: '11%', height: 70  },
  { left: '86%', height: 100 },
  { left: '91%', height: 85  },
  { left: '96%', height: 75  },
];

/* ── ROCKS ── */
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

/* ── CAUSTICS ── */
const causticData = [
  { w: 160, h: 80,  left: '10%', top: '5%'  },
  { w: 120, h: 60,  left: '35%', top: '15%' },
  { w: 200, h: 100, left: '60%', top: '8%'  },
  { w: 140, h: 70,  left: '80%', top: '18%' },
  { w: 100, h: 50,  left: '50%', top: '25%' },
];

/* ── SUN RAYS (8) ── */
const sunRays = Array.from({ length: 8 }, (_, i) => i * 45);

export default function Home() {
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);
  const yearRef      = useRef<HTMLParagraphElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);
  const cardsRef     = useRef<HTMLDivElement>(null);
  const heroRef      = useRef<HTMLElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const wrapperRef   = useRef<HTMLDivElement>(null);
  const storyCardRef = useRef<HTMLDivElement>(null);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [prevIdx, setPrevIdx]       = useState<number | null>(null);

  const nextStory = useCallback(() => {
    const cardEl = storyCardRef.current;
    if (!cardEl) return;
    gsap.timeline()
      .to(cardEl, { opacity: 0, y: -20, duration: 0.3, ease: 'power2.in' })
      .call(() => {
        setPrevIdx(currentIdx);
        setCurrentIdx(prev => {
          let next = Math.floor(Math.random() * allLegends.length);
          while (next === prev) next = Math.floor(Math.random() * allLegends.length);
          return next;
        });
      })
      .to(cardEl, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
  }, [currentIdx]);

  // Suppress unused prevIdx warning
  void prevIdx;

  useEffect(() => {
    /* ── HERO TITLE ── */
    const split = new SplitText(titleRef.current!, { type: 'chars' });
    gsap.set(split.chars, { opacity: 0, y: 80, rotation: 15 });
    const tl = gsap.timeline({ delay: 0.3 });
    tl.set('.orb', { opacity: 0 });
    tl.to('.orb', { opacity: 1, duration: 2, stagger: 0.3 }, 0);
    tl.to(badgeRef.current,  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.6);
    tl.to(split.chars, { opacity: 1, y: 0, rotation: 0, duration: 0.8, stagger: 0.04, ease: 'back.out(1.7)' }, 0.9);
    tl.to(yearRef.current,   { opacity: 0.65, y: 0, duration: 0.6, ease: 'power3.out' }, 2.1);
    tl.to(scrollRef.current, { opacity: 1, duration: 0.6 }, 2.5);

    gsap.set(subtitleRef.current, { opacity: 1, text: '' });
    gsap.to(subtitleRef.current, {
      delay: 1.2, duration: 2,
      text: { value: 'BE AI & ML · Batch 2022–26 · Jyothy Institute of Technology', delimiter: '' },
      ease: 'none',
    });

    /* ── SUN BOB ── */
    gsap.to('.sun', { y: -15, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    /* ── SUN RAYS SPIN ── */
    gsap.to('.sun-ray', { rotation: '+=360', duration: 20, repeat: -1, ease: 'none', transformOrigin: 'center 60px' });

    /* ── CLOUDS DRIFT ── */
    gsap.fromTo('.cloud-1', { x: '110vw' }, { x: -200, duration: 25, repeat: -1, ease: 'none' });
    gsap.fromTo('.cloud-2', { x: '110vw' }, { x: -200, duration: 35, repeat: -1, ease: 'none', delay: -12 });
    gsap.fromTo('.cloud-3', { x: '110vw' }, { x: -200, duration: 20, repeat: -1, ease: 'none', delay: -6  });

    /* ── WATER SURFACE SHIMMER ── */
    gsap.to('.water-surface', { x: '-50%', duration: 6, repeat: -1, ease: 'none' });

    /* ── PARALLAX ── */
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

    /* ── DEPTH OVERLAY ── */
    gsap.to('.depth-overlay', {
      opacity: 0.6, ease: 'none',
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top top', end: 'bottom bottom',
        scrub: true,
      },
    });

    /* ── CAUSTICS ── */
    document.querySelectorAll('.caustic-patch').forEach((el, i) => {
      gsap.to(el, { opacity: 0.3, x: `+=${20 + i * 5}`, duration: 2 + i * 0.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.3 });
    });
    gsap.fromTo('.caustics', { opacity: 0 }, { opacity: 1, scrollTrigger: { trigger: '.caustics', start: 'top 80%', end: 'bottom 20%', scrub: true } });

    /* ── BUBBLES ── */
    document.querySelectorAll('.bubble').forEach(el => {
      const b   = el as HTMLElement;
      const dur = parseFloat(b.dataset.dur   ?? '8');
      const del = parseFloat(b.dataset.delay ?? '0');
      gsap.fromTo(b,
        { y: 0, opacity: 0 },
        { y: '-100vh', duration: dur, delay: del, repeat: -1, ease: 'none',
          keyframes: [{ opacity: 0, y: 0 }, { opacity: 0.5, y: '-50vh' }, { opacity: 0, y: '-100vh' }] }
      );
    });

    /* ── SEAWEED ── */
    document.querySelectorAll('.seaweed').forEach((el, i) => {
      gsap.fromTo(el, { rotation: -10 }, { rotation: 10, duration: 2.5 + i * 0.2, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: 'bottom center', delay: i * 0.3 });
    });


    /* ── MANIFESTO ── */
    const manifestoWords = new SplitText('.manifesto-text', { type: 'words' });
    gsap.set(manifestoWords.words, { opacity: 0, y: 40 });
    gsap.to(manifestoWords.words, { opacity: 1, y: 0, duration: 0.65, stagger: 0.03, ease: 'power3.out', scrollTrigger: { trigger: '.manifesto-text', start: 'top 70%' } });
    gsap.to('.m-divider',  { scaleX: 1, duration: 0.8, scrollTrigger: { trigger: '.m-divider', start: 'top 85%' } });
    gsap.fromTo('.m-sub',  { opacity: 0, y: 20 }, { opacity: 0.8, y: 0, duration: 0.9, scrollTrigger: { trigger: '.m-sub', start: 'top 85%' } });
    gsap.fromTo('.chapter-card', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' } });
    gsap.fromTo('.section-ttl', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: '.section-ttl', start: 'top 80%' } });

    return () => {
      window.removeEventListener('scroll', parallaxHandler);
      split.revert();
      manifestoWords.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.killTweensOf('*');
    };
  }, []);

  /* Scroll-through manifesto/chapters on desktop path too */
  useEffect(() => {
    const manifestoWords = new SplitText('.manifesto-text', { type: 'words' });
    gsap.set(manifestoWords.words, { opacity: 0, y: 40 });
    gsap.to(manifestoWords.words, { opacity: 1, y: 0, duration: 0.65, stagger: 0.03, ease: 'power3.out', scrollTrigger: { trigger: '.manifesto-text', start: 'top 70%' } });
    gsap.to('.m-divider',  { scaleX: 1, duration: 0.8, scrollTrigger: { trigger: '.m-divider', start: 'top 85%' } });
    gsap.fromTo('.m-sub',  { opacity: 0, y: 20 }, { opacity: 0.8, y: 0, duration: 0.9, scrollTrigger: { trigger: '.m-sub', start: 'top 85%' } });
    gsap.fromTo('.chapter-card', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' } });
    gsap.fromTo('.section-ttl', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: '.section-ttl', start: 'top 80%' } });

    // Legends header
    gsap.fromTo('.lgd-tag',     { opacity: 0, y: 16 }, { opacity: 1,   y: 0, duration: 0.6, scrollTrigger: { trigger: '.lgd-tag',     start: 'top 85%' } });
    gsap.fromTo('.lgd-heading', { opacity: 0, y: 24 }, { opacity: 1,   y: 0, duration: 0.7, scrollTrigger: { trigger: '.lgd-heading', start: 'top 85%' } });
    gsap.fromTo('.lgd-sub',     { opacity: 0, y: 16 }, { opacity: 0.6, y: 0, duration: 0.6, scrollTrigger: { trigger: '.lgd-sub',     start: 'top 85%' } });
    gsap.fromTo('.story-card',  { opacity: 0, y: 30 }, { opacity: 1,   y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.story-card', start: 'top 85%' } });

    return () => { manifestoWords.revert(); };
  }, []);

  const legend = allLegends[currentIdx];

  return (
    <div className="home-wrapper" ref={wrapperRef}>

      {/* ── DEPTH OVERLAY ── */}
      <div className="depth-overlay" />

      {/* ── SKY GLOW ── */}
      <div className="sky-glow" />

      {/* ── SUN ── */}
      <div className="sun" />
      {sunRays.map(deg => (
        <div key={deg} className="sun-ray" style={{ transform: `translateX(-50%) rotate(${deg}deg)` }} />
      ))}

      {/* ── CLOUDS ── */}
      <div className="cloud cloud-1" />
      <div className="cloud cloud-2" />
      <div className="cloud cloud-3" />

      {/* ── WATER SURFACE ── */}
      <div className="water-surface" />

      {/* ── CAUSTICS ── */}
      <div className="caustics">
        {causticData.map((p, i) => (
          <div key={i} className="caustic-patch" style={{ width: p.w, height: p.h, left: p.left, top: p.top, opacity: 0 }} />
        ))}
      </div>

      {/* ── THREE.JS OCEAN (fish, shark, bones handled in OceanScene) ── */}
      <OceanScene />

      {/* ── SEAWEED ── */}
      <div className="seaweed-container">
        {seaweeds.map((s, i) => (
          <svg key={i} className="seaweed" style={{ left: s.left, bottom: 0, position: 'absolute' }}
            width="18" height={s.height} viewBox={`0 0 18 ${s.height}`} fill="none">
            <path
              d={`M9,${s.height} C4,${s.height * 0.75} 14,${s.height * 0.55} 9,${s.height * 0.4} C4,${s.height * 0.25} 14,${s.height * 0.1} 9,0`}
              stroke="#2d6a2d" strokeWidth="4" strokeLinecap="round" fill="none"
            />
          </svg>
        ))}
      </div>

      {/* ── OCEAN FLOOR ── */}
      <div className="ocean-floor">
        {rocks.map((r, i) => (
          <div key={i} className="rock" style={{ left: r.left, width: r.w, height: r.h }} />
        ))}
      </div>

      {/* ── PARTICLE CANVAS ── */}
      <div style={{ opacity: 0.2, position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
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
              <span key={i} className="ticker-item">{item} <span className="ticker-dot">·</span></span>
            ))}
          </div>
        </div>

        {/* HEADER */}
        <div className="lgd-header">
          <p className="lgd-tag">— Every Batch Has Them —</p>
          <h2 className="lgd-heading">Legends Never Graduate</h2>
          <p className="lgd-sub">Click to meet the next one</p>
        </div>

        {/* SINGLE STORY CARD */}
        <div className="story-area">
          <div className="story-card" ref={storyCardRef} style={{ borderLeftColor: legend.accentColor }}>
            <div className="story-card-top">
              <p className="story-nick">{legend.nick}</p>
              <span className="story-pill" style={{ background: legend.accentColor + '22', color: legend.accentColor, borderColor: legend.accentColor + '55' }}>
                {legend.tag}
              </span>
            </div>
            <p className="story-pull" style={{ color: legend.accentColor }}>{legend.pull}</p>
            <p className="story-text">
              {legend.story.split('\n\n').map((para, j) => (
                <span key={j}>{para}<br /><br /></span>
              ))}
            </p>
            <div className="story-dots">
              {allLegends.map((_, i) => (
                <span key={i} className={`story-dot${i === currentIdx ? ' active' : ''}`}
                  style={i === currentIdx ? { background: legend.accentColor } : {}} />
              ))}
            </div>
          </div>

          <button className="story-next-btn" onClick={nextStory}>
            Another Legend <span>→</span>
          </button>
        </div>
      </section>

      <footer className="site-footer">
        <p>EndOfBeginning &nbsp;·&nbsp; Jyothy Institute of Technology &nbsp;·&nbsp; BE AI &amp; ML &nbsp;·&nbsp; Batch of 2022–26 &nbsp;·&nbsp; Made with memory</p>
      </footer>
    </div>
  );
}
