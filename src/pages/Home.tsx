import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { TextPlugin } from 'gsap/TextPlugin';
import ParticleCanvas from '../components/ParticleCanvas';
import logo from '../assets/ainexus.jpeg';
import './Home.css';

const tickerItems = [
  "The Proxy King once answered attendance for 6 people. Simultaneously.",
  "Mr. Last Bench had the best notes. Nobody knows how.",
  "The Deadline Whisperer submitted at 11:59 PM. Every. Single. Time.",
  "WiFi went down. 60 engineers became philosophers.",
  "The Canteen Oracle predicted every exam date before the professor did.",
  '"Sir, he\'s in the washroom" — said for the same guy by 4 different people.',
  "The group project had 4 members. One person knows who did the work.",
];

const legends = [
  {
    nick: 'The Proxy Maestro',
    tag: 'Attendance Artiste',
    story: `Six names. Six different voices. One phone.\nHe never rehearsed, never got caught, and somehow his "present, sir" sounded more convincing than the actual person's. Attendance registers across four departments still carry his ghost signatures. A true method actor — just never for the right course.`,
  },
  {
    nick: 'The Last Bench Oracle',
    tag: 'The Silent Scorer',
    story: `Terrible attendance. Never spotted near the library. Zero visible study habits. Yet every internal result had his name sitting quietly near the top, like he'd made a deal nobody else knew about.\nJuniors whispered his name like folklore. Seniors never figured out his system. He took the secret with him.`,
  },
  {
    nick: 'The 11:59 Whisperer',
    tag: 'Deadline Deity',
    story: `While the group chat was in full meltdown — "bro it's 11:40 WHERE ARE YOU" — he was asleep.\nAt 11:45 he opened his laptop. At 11:58 he formatted the PDF. Submitted at 11:59:04. Closed laptop. Back to sleep.\nNever explained his process. We stopped asking.`,
  },
  {
    nick: 'The Presentation Ghost',
    tag: 'Lab Report Ghost',
    story: `Missing for three weeks straight. Not on the group chat. Not in the lab. Not anywhere.\nPresentation day: he walks in. Full formals. Tie straight. Speaks for seven minutes like he built the entire project himself.\nProfessor loved him. We never spoke of it.`,
  },
  {
    nick: 'The Canteen Philosopher',
    tag: 'Canteen Philosopher',
    story: `Zero attendance. Infinite wisdom.\nEvery crisis — academic, existential, romantic — was solved over one chai and a samosa at his corner table. He had a new startup idea every week. Most were terrible. Two were genuinely brilliant.\nHe never attended the entrepreneurship elective. He didn't need to.`,
  },
  {
    nick: 'The Night Before Explainer',
    tag: 'The Explainer',
    story: `Didn't top a single exam. But every topper called him the night before theirs.\nFifteen minutes before any internal, his phone was unreachable — not because he was studying, but because seven people were already on hold.\nHe made concepts make sense in ways textbooks never could. A teacher who never got the title.`,
  },
];

const chapters = [
  { num: '01', icon: '🌊', title: 'Memories',      sub: 'Trips & Adventures',  desc: 'Gokarna, Dandeli, the Fort — every road we took together, relived.',                         to: '/memories'   },
  { num: '02', icon: '✦',  title: 'The Pantheon',  sub: 'Student Directory',    desc: 'Faces, stories, and futures. Meet every soul who made this batch legendary.',               to: '/pantheon'   },
  { num: '03', icon: '🎞', title: 'The Vault',     sub: 'Media Gallery',        desc: 'Unfiltered. Unscripted. The photos and videos you\'ll look back at in 20 years.',           to: '/vault'      },
  { num: '04', icon: '💬', title: 'Echoes',        sub: 'Messages & Tributes',  desc: 'Words left behind — from juniors, professors, and the seniors themselves.',                  to: '/echoes'     },
];

export default function Home() {
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const badgeRef    = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const yearRef     = useRef<HTMLParagraphElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const logoRef     = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);
  const legendsRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── HERO TITLE — SplitText bounce ──
    const split = new SplitText(titleRef.current!, { type: 'chars' });
    gsap.set(split.chars, { opacity: 0, y: 80, rotation: 15 }); // set before animate (fallback: opacity:1 in CSS)
    const tl = gsap.timeline({ delay: 0.3 });
    tl.set('.orb', { opacity: 0 });
    tl.to('.orb', { opacity: 1, duration: 2, stagger: 0.3 }, 0);
    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.6);
    tl.to(split.chars, { opacity: 1, y: 0, rotation: 0, duration: 0.8, stagger: 0.04, ease: 'back.out(1.7)' }, 0.9);
    tl.to(logoRef.current,  { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, 1.4);
    tl.to(yearRef.current,  { opacity: 0.65, y: 0, duration: 0.6, ease: 'power3.out' }, 2.1);
    tl.to(scrollRef.current, { opacity: 1, duration: 0.6 }, 2.5);

    // ── HERO SUBTITLE — TextPlugin typewriter ──
    gsap.set(subtitleRef.current, { opacity: 1, text: '' });
    gsap.to(subtitleRef.current, {
      delay: 1.2, duration: 2,
      text: { value: 'BE AI & ML · Batch 2022–26 · Jyothy Institute of Technology', delimiter: '' },
      ease: 'none',
    });

    // ── PARALLAX ──
    const onScroll = () => {
      const y = window.scrollY;
      gsap.to(titleRef.current,    { y: y * 0.28, duration: 0 });
      gsap.to(subtitleRef.current, { y: y * 0.18, duration: 0 });
    };
    window.addEventListener('scroll', onScroll);

    // ── MANIFESTO — word-level SplitText ──
    const manifestoWords = new SplitText('.manifesto-text', { type: 'words' });
    gsap.set(manifestoWords.words, { opacity: 0, y: 40 });
    gsap.to(manifestoWords.words, {
      opacity: 1, y: 0, duration: 0.65, stagger: 0.03, ease: 'power3.out',
      scrollTrigger: { trigger: '.manifesto-text', start: 'top 70%' },
    });
    gsap.to('.m-divider', { scaleX: 1, duration: 0.8, scrollTrigger: { trigger: '.m-divider', start: 'top 85%' } });
    gsap.fromTo('.m-sub', { opacity: 0, y: 20 }, { opacity: 0.8, y: 0, duration: 0.9, scrollTrigger: { trigger: '.m-sub', start: 'top 85%' } });

    // ── CHAPTER CARDS — stagger slide up ──
    gsap.fromTo('.chapter-card',
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' } });
    gsap.fromTo('.section-ttl',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: '.section-ttl', start: 'top 80%' } });

    // ── LEGENDS SECTION ──
    gsap.fromTo('.lgd-tag',     { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: '.lgd-tag',     start: 'top 85%' } });
    gsap.fromTo('.lgd-heading', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: '.lgd-heading', start: 'top 85%' } });
    gsap.fromTo('.lgd-sub',     { opacity: 0, y: 16 }, { opacity: 0.6, y: 0, duration: 0.6, scrollTrigger: { trigger: '.lgd-sub',   start: 'top 85%' } });
    gsap.fromTo('.legend-card', { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: legendsRef.current, start: 'top 80%' } });

    return () => {
      window.removeEventListener('scroll', onScroll);
      split.revert();
      manifestoWords.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <div className="page-bg page-bg-home" />
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

        <p className="hero-subtitle" ref={subtitleRef}></p>
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

      {/* LEGENDS NEVER GRADUATE */}
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

        {/* CARDS */}
        <div className="legends-grid" ref={legendsRef}>
          {legends.map((l, i) => (
            <div key={i} className="legend-card glass-card">
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

      </section>

      <footer className="site-footer">
        <p>EndOfBeginning &nbsp;·&nbsp; Jyothy Institute of Technology &nbsp;·&nbsp; BE AI &amp; ML &nbsp;·&nbsp; Batch of 2022–26 &nbsp;·&nbsp; Made with memory</p>
      </footer>
    </>
  );
}
