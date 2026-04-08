import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import ParticleCanvas from '../components/ParticleCanvas';
import logoHorizontal from '../assets/logo-horizontal.jpeg';
import aiNexus from '../assets/ainexus.jpeg';
import './Home.css';

/* ── CSS FISH DATA ── */
const FISH_DATA = [
  { cls: 'css-fish-1',     top: '22%', color: '#ff8c00', dir:  1, dur:  4, bDur: 1.5, del: 0,  opacity: 1.0  },
  { cls: 'css-fish-2',     top: '30%', color: '#00bcd4', dir: -1, dur:  5, bDur: 1.4, del: 0.5,opacity: 0.95 },
  { cls: 'css-fish-3',     top: '38%', color: '#ffd700', dir:  1, dur:  5, bDur: 1.6, del: 1,  opacity: 0.88 },
  { cls: 'css-fish-chase', top: '55%', color: '#ff6b35', dir:  1, dur:  4, bDur: 1.2, del: 0,  opacity: 0.8  },
  /* deep zone density */
  { cls: 'css-fish-d1',    top: '58%', color: '#9b59b6', dir: -1, dur:  5, bDur: 1.4, del: 1,  opacity: 0.75 },
  { cls: 'css-fish-d2',    top: '62%', color: '#2ecc71', dir:  1, dur:  3, bDur: 1.1, del: 0.5,opacity: 0.70 },
  { cls: 'css-fish-d3',    top: '66%', color: '#e74c3c', dir: -1, dur:  4, bDur: 1.3, del: 2,  opacity: 0.65 },
  { cls: 'css-fish-d4',    top: '60%', color: '#f39c12', dir:  1, dur:  5, bDur: 1.2, del: 2.5,opacity: 0.70 },
  { cls: 'css-fish-d5',    top: '64%', color: '#1abc9c', dir: -1, dur:  4, bDur: 1.5, del: 1.5,opacity: 0.65 },
  { cls: 'css-fish-d6',    top: '70%', color: '#3498db', dir:  1, dur:  4, bDur: 1.1, del: 3,  opacity: 0.55 },
  { cls: 'css-fish-d7',    top: '73%', color: '#e91e63', dir: -1, dur:  3, bDur: 1.3, del: 1,  opacity: 0.50 },
] as const;

/* Tiny school fish — shallow zone, just below water surface */
const SCHOOL_DATA = [
  { cls: 'sf-1', top: '19%',   color: '#87ceeb', dir:  1, dur: 2.5, del: 0   },
  { cls: 'sf-2', top: '20%',   color: '#87ceeb', dir:  1, dur: 2.5, del: 0.2 },
  { cls: 'sf-3', top: '19.5%', color: '#87ceeb', dir:  1, dur: 2.5, del: 0.4 },
  { cls: 'sf-4', top: '21%',   color: '#a0d8ef', dir: -1, dur: 3,   del: 0.8 },
  { cls: 'sf-5', top: '20.5%', color: '#a0d8ef', dir: -1, dur: 3,   del: 1.0 },
] as const;

/* God-rays from water surface */
const GOD_RAY_DATA = [
  { left: '8%',  height: '52vh', rotation: -10 },
  { left: '22%', height: '44vh', rotation: -5  },
  { left: '38%', height: '58vh', rotation:  1  },
  { left: '54%', height: '48vh', rotation:  7  },
  { left: '70%', height: '42vh', rotation:  12 },
  { left: '84%', height: '55vh', rotation:  16 },
];

const BUBBLE_DATA = Array.from({ length: 16 }, (_, i) => ({
  id:    i,
  left:  `${6  + (i * 5.8) % 88}%`,
  top:   `${24 + (i * 4.7) % 55}%`,
  size:  3 + (i % 4) * 2.5,
  dur:   5 + (i % 5) * 2.0,
  delay: (i * 0.85) % 6,
}));

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
  { num: '01', icon: '🌊', title: 'Echoes of Time',     sub: 'Every Road We Took',   desc: 'Every road we took together — Gokarna, Dandeli, the Fort, and beyond.',              to: '/echoes-of-time'   },
  { num: '02', icon: '✦',  title: 'The Constellation',  sub: 'Student Directory',    desc: 'Every moment. Every event. Every star.',                                              to: '/constellation'    },
  { num: '03', icon: '🎞', title: 'The Vault',           sub: 'Media Gallery',        desc: "Unfiltered. Unscripted. The photos and videos you'll look back at in 20 years.",    to: '/vault'            },
];


/* ── SEAWEEDS ── */
const seaweeds = [
  { left: '3%',  height: 80,  color: '#27ae60', color2: '#1e8449' },
  { left: '7%',  height: 110, color: '#2ecc71', color2: '#27ae60' },
  { left: '11%', height: 70,  color: '#1a9b4e', color2: '#145f31' },
  { left: '17%', height: 90,  color: '#2ecc71', color2: '#1e8449' },
  { left: '23%', height: 65,  color: '#27ae60', color2: '#1a9b4e' },
  { left: '76%', height: 72,  color: '#2ecc71', color2: '#27ae60' },
  { left: '81%', height: 95,  color: '#1a9b4e', color2: '#2ecc71' },
  { left: '86%', height: 100, color: '#27ae60', color2: '#1e8449' },
  { left: '91%', height: 85,  color: '#2ecc71', color2: '#1a9b4e' },
  { left: '96%', height: 75,  color: '#1e8449', color2: '#27ae60' },
];

/* ── ROCKS ── */
const rocks = [
  { left: '5%',  w: 36, h: 16 },
  { left: '13%', w: 24, h: 12 },
  { left: '22%', w: 44, h: 20 },
  { left: '33%', w: 28, h: 14 },
  { left: '42%', w: 38, h: 18 },
  { left: '51%', w: 26, h: 12 },
  { left: '59%', w: 40, h: 18 },
  { left: '68%', w: 22, h: 10 },
  { left: '77%', w: 32, h: 15 },
  { left: '86%', w: 26, h: 13 },
  { left: '93%', w: 34, h: 16 },
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

    /* ── LOGO ENTRANCE ── */
    gsap.from('.hero-logo-horizontal', {
      opacity: 0,
      y: -30,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.2,
    });

    /* ── AI NEXUS CLUB LOGO — party entrance ── */
    const clubTl = gsap.timeline({ delay: 1.5 });
    clubTl
      .from('.hero-club-logo', {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(2)',
      })
      .to('.hero-club-logo img', {
        boxShadow: '0 0 20px rgba(201,169,110,0.8)',
        duration: 0.4,
        yoyo: true,
        repeat: 3,
        ease: 'power2.inOut',
      })
      .to('.hero-club-logo', {
        y: -5,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

    /* ── HERO ZOOM SCROLL — title only, not full inner div ── */
    gsap.set('.hero-title', { scale: 1.3 });
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: '+=500',
      pin: true,
      scrub: 1,
      animation: gsap.timeline()
        .to('.hero-title',      { scale: 1,  ease: 'none' })
        .from('.hero-side-left',  { x: -80, opacity: 0, ease: 'none' }, 0)
        .from('.hero-side-right', { x:  80, opacity: 0, ease: 'none' }, 0),
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

    /* ── FISH BOUNCE — stays inside screen, flips at edges ── */
    const swimBounce = (
      sel: string, startDir: number, dur: number,
      bDur: number, del: number, opacity: number, margin = 80
    ) => {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (!el) return;
      let d = startDir;
      gsap.set(el, { x: d > 0 ? margin : window.innerWidth - margin - 70, scaleX: d, opacity });
      const swim = () => {
        const toX = d > 0 ? window.innerWidth - margin - 70 : margin;
        gsap.to(el, {
          x: toX, duration: dur, ease: 'none',
          onComplete() { d = -d; gsap.set(el, { scaleX: d }); swim(); },
        });
      };
      gsap.delayedCall(del, swim);
      gsap.to(el, { y: '+=12', duration: bDur, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: del * 0.4 });
    };

    FISH_DATA.forEach(({ cls, dir, dur, bDur, del, opacity }) =>
      swimBounce(`.${cls}`, dir, dur, bDur, del, opacity, 80));

    /* ── SCHOOL FISH ── */
    SCHOOL_DATA.forEach(({ cls, dir, dur, del }) =>
      swimBounce(`.${cls}`, dir, dur, 1.5, del, 0.7, 50));

    /* ── GOD-RAYS: pulse in/out ── */
    document.querySelectorAll('.god-ray').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0.04, scaleX: 0.8 },
        { opacity: 0.13, scaleX: 1.2, duration: 4 + i * 0.7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.9 }
      );
    });

    /* ── SHARK (bounces, faster than chase fish) ── */
    swimBounce('.css-shark', 1, 3, 3, 1.5, 0.85, 40);

    /* ── ABYSS GLOW pulse ── */
    gsap.to('.abyss-glow', { opacity: 0.7, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });


    /* ── MANIFESTO ── */
    const manifestoWords = new SplitText('.manifesto-text', { type: 'words' });
    gsap.set(manifestoWords.words, { opacity: 0, y: 40 });
    gsap.to(manifestoWords.words, { opacity: 1, y: 0, duration: 0.65, stagger: 0.03, ease: 'power3.out', scrollTrigger: { trigger: '.manifesto-text', start: 'top 70%' } });
    gsap.to('.m-divider',  { scaleX: 1, duration: 0.8, scrollTrigger: { trigger: '.m-divider', start: 'top 85%' } });
    gsap.fromTo('.m-sub',  { opacity: 0, y: 20 }, { opacity: 0.8, y: 0, duration: 0.9, scrollTrigger: { trigger: '.m-sub', start: 'top 85%' } });
    gsap.fromTo('.chapter-card', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' } });
    gsap.fromTo('.section-ttl', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: '.section-ttl', start: 'top 80%' } });

    return () => {
      clubTl.kill();
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

      {/* ── GOD-RAYS (crepuscular rays from water surface) ── */}
      {GOD_RAY_DATA.map((r, i) => (
        <div key={i} className="god-ray" style={{
          left: r.left,
          height: r.height,
          transform: `rotate(${r.rotation}deg)`,
          opacity: 0,
        }} />
      ))}

      {/* ── SCHOOL FISH (tiny shallow fish) ── */}
      {SCHOOL_DATA.map(f => (
        <div key={f.cls} className={`css-fish school-fish ${f.cls}`} style={{ color: f.color, top: f.top }}>
          <div className="fish-wrap">
            <div className="fish-tail" />
            <div className="fish-body school-body">
              <div className="fish-eye school-eye" />
            </div>
          </div>
        </div>
      ))}

      {/* ── CSS FISH (mid + deep) ── */}
      {FISH_DATA.map(f => (
        <div key={f.cls} className={`css-fish ${f.cls}`} style={{ color: f.color, top: f.top }}>
          <div className="fish-wrap">
            <div className="fish-tail" />
            <div className="fish-body">
              <div className="fish-eye"><div className="fish-pupil" /></div>
            </div>
          </div>
        </div>
      ))}

      {/* ── SHARK ── */}
      <div className="css-fish css-shark" style={{ top: '57%' }}>
        <div className="fish-wrap">
          <div className="fish-tail shark-tail" />
          <div className="fish-body shark-body">
            <div className="shark-fin" />
            <div className="fish-eye shark-eye"><div className="fish-pupil" /></div>
          </div>
        </div>
      </div>

      {/* ── BUBBLES ── */}
      {BUBBLE_DATA.map(b => (
        <div key={b.id} className="bubble"
          style={{ left: b.left, top: b.top, width: b.size, height: b.size }}
          data-dur={b.dur} data-delay={b.delay} />
      ))}

      {/* ── FISH BONES (seabed) ── */}
      {/* ── ABYSS CREATURE (deep bioluminescent fish) ── */}
      <div className="abyss-creature" style={{ top: '78%', left: '65%' }}>
        <div className="abyss-glow" />
        <div className="css-fish" style={{ color: '#1a1a2e', position: 'relative' }}>
          <div className="fish-wrap abyss-fish-wrap">
            <div className="fish-tail abyss-tail" />
            <div className="fish-body abyss-body">
              <div className="fish-eye abyss-eye"><div className="fish-pupil" /></div>
              <div className="abyss-lure" />
            </div>
          </div>
        </div>
      </div>

      {/* ── OCEAN FLOOR (seaweed + rocks + bones all inside) ── */}
      <div className="ocean-floor">

        {/* seaweed grows upward out of the sand */}
        {seaweeds.map((s, i) => {
          const h = Math.round(s.height * 0.55); // shorter to match thin floor
          const d1 = `M9,${h} C3,${h*0.75} 15,${h*0.52} 8,${h*0.38} C2,${h*0.24} 14,${h*0.09} 9,0`;
          const d2 = `M13,${h} C7,${h*0.78} 18,${h*0.58} 11,${h*0.42} C5,${h*0.27} 16,${h*0.12} 12,${h*0.02}`;
          return (
            <svg key={i} className="seaweed" style={{ left: s.left, bottom: '100%', position: 'absolute' }}
              width="24" height={h} viewBox={`0 0 24 ${h}`} fill="none">
              <path d={d2} stroke={s.color2} strokeWidth="4" strokeLinecap="round" opacity="0.75" />
              <path d={d1} stroke={s.color}  strokeWidth="5" strokeLinecap="round" />
            </svg>
          );
        })}

        {/* rocks sitting on the sand surface */}
        {rocks.map((r, i) => (
          <div key={i} className="rock" style={{ left: r.left, width: r.w, height: r.h }} />
        ))}

        {/* fish skeletons half-buried in sand */}
        <div className="fish-bone-container" style={{ bottom: '55%', left: '18%' }}>
          <svg viewBox="0 0 160 40" width="160" height="40" fill="none">
            <line x1="18" y1="20" x2="136" y2="20" stroke="rgba(201,169,110,0.75)" strokeWidth="2" strokeLinecap="round"/>
            {[38,56,74,92,110,126].map(x => (
              <g key={x}>
                <line x1={x} y1="20" x2={x-2} y2="9"  stroke="rgba(201,169,110,0.75)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1={x} y1="20" x2={x-2} y2="31" stroke="rgba(201,169,110,0.75)" strokeWidth="1.5" strokeLinecap="round"/>
              </g>
            ))}
            <circle cx="133" cy="20" r="8"  stroke="rgba(201,169,110,0.75)" strokeWidth="1.8" fill="none"/>
            <circle cx="136" cy="18" r="2"  fill="rgba(201,169,110,0.6)"/>
            <line x1="18" y1="20" x2="6"  y2="11" stroke="rgba(201,169,110,0.75)" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="18" y1="20" x2="4"  y2="20" stroke="rgba(201,169,110,0.75)" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="18" y1="20" x2="6"  y2="29" stroke="rgba(201,169,110,0.75)" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="fish-bone-container" style={{ bottom: '40%', left: '55%' }}>
          <svg viewBox="0 0 110 32" width="110" height="32" fill="none">
            <line x1="14" y1="16" x2="92" y2="16" stroke="rgba(201,169,110,0.55)" strokeWidth="1.8" strokeLinecap="round"/>
            {[30,46,62,78].map(x => (
              <g key={x}>
                <line x1={x} y1="16" x2={x-2} y2="7"  stroke="rgba(201,169,110,0.55)" strokeWidth="1.3" strokeLinecap="round"/>
                <line x1={x} y1="16" x2={x-2} y2="25" stroke="rgba(201,169,110,0.55)" strokeWidth="1.3" strokeLinecap="round"/>
              </g>
            ))}
            <circle cx="90" cy="16" r="7"  stroke="rgba(201,169,110,0.55)" strokeWidth="1.6" fill="none"/>
            <line x1="14" y1="16" x2="4"  y2="9"  stroke="rgba(201,169,110,0.55)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="14" y1="16" x2="2"  y2="16" stroke="rgba(201,169,110,0.55)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="14" y1="16" x2="4"  y2="23" stroke="rgba(201,169,110,0.55)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="fish-bone-container" style={{ bottom: '50%', left: '37%' }}>
          <svg viewBox="0 0 90 28" width="90" height="28" fill="none">
            <line x1="12" y1="14" x2="74" y2="14" stroke="rgba(201,169,110,0.45)" strokeWidth="1.6" strokeLinecap="round"/>
            {[28,42,58,70].map(x => (
              <g key={x}>
                <line x1={x} y1="14" x2={x-2} y2="6"  stroke="rgba(201,169,110,0.45)" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1={x} y1="14" x2={x-2} y2="22" stroke="rgba(201,169,110,0.45)" strokeWidth="1.2" strokeLinecap="round"/>
              </g>
            ))}
            <circle cx="72" cy="14" r="6"  stroke="rgba(201,169,110,0.45)" strokeWidth="1.5" fill="none"/>
            <line x1="12" y1="14" x2="4"  y2="8"  stroke="rgba(201,169,110,0.45)" strokeWidth="1.4" strokeLinecap="round"/>
            <line x1="12" y1="14" x2="2"  y2="14" stroke="rgba(201,169,110,0.45)" strokeWidth="1.4" strokeLinecap="round"/>
            <line x1="12" y1="14" x2="4"  y2="20" stroke="rgba(201,169,110,0.45)" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </div>

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
        {/* AI Nexus club logo — top left hero decoration */}
        <div className="hero-club-logo">
          <img src={aiNexus} alt="AI Nexus Club" />
          <span>AI Nexus</span>
        </div>

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
          {/* 1. Badge */}
          <div className="hero-badge" ref={badgeRef}>
            Batch of 2022–26 &nbsp;·&nbsp; Jyothy Institute of Technology
          </div>

          {/* 2. Horizontal logo */}
          <img
            src={logoHorizontal}
            alt="EndOfBeginning"
            className="hero-logo-horizontal"
          />

          {/* 3. Title */}
          <h1 className="hero-title" ref={titleRef}>End of Beginning</h1>

          {/* 4. Divider */}
          <div className="hero-gold-divider" />

          {/* 5. Subtitle — flex child, never absolutely positioned */}
          <p className="hero-subtitle" ref={subtitleRef}></p>

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
          <h2 className="section-ttl">Four Chapters. One Story.</h2>
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
