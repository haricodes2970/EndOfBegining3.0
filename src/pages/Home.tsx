import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import ParticleCanvas from '../components/ParticleCanvas';
import logoHorizontal from '../assets/logo-horizontal.jpeg';
import './Home.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════ */
const tickerItems = [
  "The Proxy King once answered attendance for 6 people. Simultaneously.",
  "Mr. Last Bench had the best notes. Nobody knows how.",
  "The Deadline Whisperer submitted at 11:59 PM. Every. Single. Time.",
  "WiFi went down. 60 engineers became philosophers.",
  "The Canteen Oracle predicted every exam date before the professor did.",
  '"Sir, he\'s in the washroom" — said for the same guy by 4 different people.',
  "The group project had 4 members. One person knows who did the work.",
];

const allLegends = [
  { nick: 'The Proxy Maestro', tag: 'Attendance Artiste', pull: '"Present, sir" — six voices, one phone.', accentColor: '#c9a96e', story: `Six names. Six different voices. One phone.\n\nHe never rehearsed, never got caught, and somehow his "present, sir" sounded more convincing than the actual person's. Attendance registers across four departments still carry his ghost signatures. A true method actor — just never for the right course.` },
  { nick: 'The Last Bench Oracle', tag: 'The Silent Scorer', pull: '"How did he top again?"', accentColor: '#7aaed4', story: `Terrible attendance. Never spotted near the library. Zero visible study habits. Yet every internal result had his name sitting quietly near the top, like he'd made a deal nobody else knew about.\n\nJuniors whispered his name like folklore. Seniors never figured out his system. He took the secret with him.` },
  { nick: 'The 11:59 Whisperer', tag: 'Deadline Deity', pull: '"Submitted at 11:59:04. Closed laptop. Back to sleep."', accentColor: '#ff6b35', story: `While the group chat was in full meltdown — "bro it's 11:40 WHERE ARE YOU" — he was asleep.\n\nAt 11:45 he opened his laptop. At 11:58 he formatted the PDF. Submitted at 11:59:04. Closed laptop. Back to sleep.\n\nNever explained his process. We stopped asking.` },
  { nick: 'The Presentation Ghost', tag: 'Lab Report Ghost', pull: '"Full formals. Tie straight. Like he built it himself."', accentColor: '#9bc4a8', story: `Missing for three weeks straight. Not on the group chat. Not in the lab. Not anywhere.\n\nPresentation day: he walks in. Full formals. Tie straight. Speaks for seven minutes like he built the entire project himself.\n\nProfessor loved him. We never spoke of it.` },
  { nick: 'The Canteen Philosopher', tag: 'Canteen Philosopher', pull: '"Zero attendance. Infinite wisdom."', accentColor: '#ffd700', story: `Zero attendance. Infinite wisdom.\n\nEvery crisis — academic, existential, romantic — was solved over one chai and a samosa at his corner table. He had a new startup idea every week. Most were terrible. Two were genuinely brilliant.\n\nHe never attended the entrepreneurship elective. He didn't need to.` },
  { nick: 'The Night Before Explainer', tag: 'The Explainer', pull: '"A teacher who never got the title."', accentColor: '#c084fc', story: `Didn't top a single exam. But every topper called him the night before theirs.\n\nFifteen minutes before any internal, his phone was unreachable — not because he was studying, but because seven people were already on hold.\n\nHe made concepts make sense in ways textbooks never could. A teacher who never got the title.` },
  { nick: 'The Xerox King', tag: 'The Duplicator', pull: '"The original was never found."', accentColor: '#fb923c', story: `Nobody ever saw him take notes. Nobody ever saw him study. But ten minutes before every submission, a perfectly formatted printout appeared in his hand.\n\nThe xerox shop owner knew his order by heart. The original? Nobody ever found it.` },
  { nick: 'The WiFi Wizard', tag: 'Network Necromancer', pull: '"Connected when no one else could."', accentColor: '#2ed573', story: `College WiFi was down. Sixty engineers became philosophers.\n\nHe connected. Nobody knows how. He never explained. He just quietly shared his hotspot with the people he liked and watched the rest debate existence.\n\nPower is knowing something and saying nothing.` },
  { nick: "The Backbencher's Frontbencher", tag: 'Strategic Seater', pull: '"Front row energy. Last bench spirit."', accentColor: '#1e90ff', story: `He sat in the front row. But only because the last bench had no power socket.\n\nLaptop always open. Never taking notes. Nobody questioned it because he looked diligent.\n\nHe was six seasons into a show. The professor thought he was the most engaged student in the room.` },
  { nick: 'The Group Chat Admin', tag: 'The Curator', pull: '"He never replied. But he never left."', accentColor: '#ff4757', story: `Created the group. Set the rules. Pinned the syllabus. Sent the reminders.\n\nNever replied to any message. Never confirmed if he read anything. But whenever chaos broke out — he appeared, pinned one message, and disappeared.\n\nThe group functioned because of him. He knew it. That was enough.` },
  { nick: 'The Attendance Negotiator', tag: 'The Diplomat', pull: '"Sir, technically speaking..."', accentColor: '#a78bfa', story: `He had 28% attendance. The minimum was 75%.\n\nHe walked into the HOD's office with a spreadsheet, a medical certificate, three character references, and an argument so compelling that the HOD — who had never budged once in eleven years — said "fine."\n\nWe don't know what he said. We don't ask. We just watch in awe.` },
  { nick: 'Softy Santu', tag: 'The Heart of the Batch', pull: '"He remembered everyone\'s birthday. Always."', accentColor: '#f9a8d4', story: `He remembered everyone's birthday. Not because of reminders — he just remembered.\n\nWhen someone cried in the corridor, he appeared with water and silence. When someone failed, he texted at midnight — not with advice, just "I'm here."\n\nIn a batch full of characters, he was the quiet anchor. The one who held it together without anyone asking him to.` },
];

const chapters = [
  { num: '01', icon: '🌊', title: 'Echoes of Time', sub: 'Every Road We Took', desc: 'Every road we took together — Gokarna, Dandeli, the Fort, and beyond.', to: '/echoes-of-time' },
  { num: '02', icon: '✦', title: 'The Constellation', sub: 'Student Directory', desc: "Every moment. Every event. Every star.", to: '/constellation' },
  { num: '03', icon: '🎞', title: 'The Vault', sub: 'Media Gallery', desc: "Unfiltered. Unscripted. The photos and videos you'll look back at in 20 years.", to: '/vault' },
];

const FISH_DATA = [
  { id: 'f1', top: '28%', color: 'rgba(255,140,0,0.5)', dir: 1, dur: 6, bDur: 1.6, del: 0 },
  { id: 'f2', top: '38%', color: 'rgba(0,188,212,0.45)', dir: -1, dur: 7, bDur: 1.5, del: 0.8 },
  { id: 'f3', top: '52%', color: 'rgba(255,215,0,0.4)', dir: 1, dur: 6.5, bDur: 1.7, del: 1.5 },
  { id: 'f4', top: '33%', color: 'rgba(155,89,182,0.35)', dir: -1, dur: 5.5, bDur: 1.4, del: 2 },
  { id: 'f5', top: '60%', color: 'rgba(46,204,113,0.3)', dir: 1, dur: 7, bDur: 1.5, del: 2.5 },
  { id: 'f6', top: '46%', color: 'rgba(52,152,219,0.38)', dir: -1, dur: 6, bDur: 1.6, del: 3 },
];

const BUBBLE_DATA = Array.from({ length: 14 }, (_, i) => ({
  id: i, left: `${8 + (i * 6.2) % 84}%`, top: `${30 + (i * 5.1) % 50}%`,
  size: 3 + (i % 4) * 2, dur: 6 + (i % 5) * 2, delay: (i * 0.9) % 6,
}));

const SEAWEED_DATA = [
  { left: '4%', h: 70, c1: '#27ae60', c2: '#1e8449' },
  { left: '9%', h: 95, c1: '#2ecc71', c2: '#27ae60' },
  { left: '14%', h: 60, c1: '#1a9b4e', c2: '#145f31' },
  { left: '20%', h: 80, c1: '#2ecc71', c2: '#1e8449' },
  { left: '78%', h: 65, c1: '#2ecc71', c2: '#27ae60' },
  { left: '84%', h: 85, c1: '#1a9b4e', c2: '#2ecc71' },
  { left: '90%', h: 90, c1: '#27ae60', c2: '#1e8449' },
  { left: '95%', h: 72, c1: '#2ecc71', c2: '#1a9b4e' },
];

const ROCK_DATA = [
  { left: '6%', w: 32, h: 14 }, { left: '16%', w: 22, h: 11 },
  { left: '28%', w: 40, h: 18 }, { left: '40%', w: 26, h: 12 },
  { left: '52%', w: 36, h: 16 }, { left: '62%', w: 20, h: 10 },
  { left: '74%', w: 30, h: 14 }, { left: '86%', w: 24, h: 12 },
  { left: '94%', w: 30, h: 13 },
];

const GOD_RAY_DATA = [
  { left: '10%', h: '48vh', rot: -8 }, { left: '26%', h: '40vh', rot: -3 },
  { left: '42%', h: '54vh', rot: 3 }, { left: '58%', h: '44vh', rot: 8 },
  { left: '74%', h: '38vh', rot: 13 }, { left: '88%', h: '50vh', rot: 18 },
];

const CAUSTIC_DATA = [
  { w: 140, h: 70, left: '12%', top: '8%' }, { w: 100, h: 50, left: '38%', top: '15%' },
  { w: 180, h: 90, left: '62%', top: '5%' }, { w: 120, h: 60, left: '82%', top: '12%' },
];

/* ════════════════════════════════════════════════════
   SVG COMPONENTS — shadow-puppet silhouettes
   ════════════════════════════════════════════════════ */
const FishSVG = ({ color, size = 1 }: { color: string; size?: number }) => (
  <svg viewBox="0 0 56 26" width={56 * size} height={26 * size} fill="none" style={{ display: 'block' }}>
    <path d="M2,13 L-5,4 L-5,22 Z" fill={color} />
    <path d="M2,13 Q10,1 24,1 Q38,1 48,13 Q38,25 24,25 Q10,25 2,13 Z" fill={color} />
    <circle cx="40" cy="10" r="2" fill="rgba(255,255,255,0.8)" />
    <circle cx="41" cy="9.5" r="0.9" fill="#111" />
  </svg>
);

const SchoolFishSVG = ({ color }: { color: string }) => (
  <svg viewBox="0 0 130 50" width="130" height="50" fill="none">
    <path d="M12,25 L6,17 L6,33 Z" fill={color} opacity=".55" />
    <path d="M12,25 Q18,15 28,15 Q36,15 40,25 Q36,35 28,35 Q18,35 12,25 Z" fill={color} opacity=".55" />
    <path d="M35,18 L29,10 L29,26 Z" fill={color} opacity=".45" />
    <path d="M35,18 Q41,8 51,8 Q59,8 63,18 Q59,28 51,28 Q41,28 35,18 Z" fill={color} opacity=".45" />
    <path d="M22,32 L16,24 L16,40 Z" fill={color} opacity=".4" />
    <path d="M22,32 Q28,22 38,22 Q46,22 50,32 Q46,42 38,42 Q28,42 22,32 Z" fill={color} opacity=".4" />
    <path d="M58,22 L52,14 L52,30 Z" fill={color} opacity=".5" />
    <path d="M58,22 Q64,12 74,12 Q82,12 86,22 Q82,32 74,32 Q64,32 58,22 Z" fill={color} opacity=".5" />
    <path d="M80,28 L74,20 L74,36 Z" fill={color} opacity=".35" />
    <path d="M80,28 Q86,18 96,18 Q104,18 108,28 Q104,38 96,38 Q86,38 80,28 Z" fill={color} opacity=".35" />
  </svg>
);

const SharkSVG = () => (
  <svg viewBox="0 0 96 42" width="96" height="42" fill="none" style={{ display: 'block' }}>
    <path d="M4,21 L-10,5 L-10,37 Z" fill="#1e3a4a" />
    <path d="M4,21 Q14,2 36,2 Q56,2 72,21 Q56,40 36,40 Q14,40 4,21 Z" fill="#1e3a4a" />
    <path d="M36,2 L42,-14 Z" fill="#1e3a4a" />
  </svg>
);

const JellyfishSVG = ({ size = 1 }: { size?: number }) => (
  <svg viewBox="0 0 36 56" width={36 * size} height={56 * size} fill="none" className="jelly-svg">
    <path d="M3,22 Q3,5 18,5 Q33,5 33,22 Q28,26 18,26 Q8,26 3,22 Z" fill="rgba(120,200,255,0.15)" stroke="rgba(120,200,255,0.25)" strokeWidth=".8" />
    <path d="M9,26 Q7,38 11,50" stroke="rgba(120,200,255,0.2)" strokeWidth="1.2" fill="none" />
    <path d="M15,26 Q13,40 17,54" stroke="rgba(120,200,255,0.18)" strokeWidth="1.2" fill="none" />
    <path d="M21,26 Q21,42 21,56" stroke="rgba(120,200,255,0.2)" strokeWidth="1.2" fill="none" />
    <path d="M27,26 Q29,40 25,54" stroke="rgba(120,200,255,0.18)" strokeWidth="1.2" fill="none" />
    <ellipse cx="18" cy="16" rx="8" ry="7" fill="rgba(120,200,255,0.08)" filter="blur(3px)" />
  </svg>
);

const BirdSVG = ({ size = 1 }: { size?: number }) => (
  <svg viewBox="0 0 18 8" width={18 * size} height={8 * size} fill="none" stroke="rgba(40,40,40,0.45)" strokeWidth="1.3" strokeLinecap="round">
    <path d="M0,4 Q4.5,0 9,4" /><path d="M9,4 Q13.5,0 18,4" />
  </svg>
);

const CupSVG = () => (
  <svg viewBox="0 0 36 44" width="36" height="44" fill="none" className="room-obj-svg">
    <path d="M4,12 L4,36 Q4,42 10,42 L24,42 Q30,42 30,36 L30,12 Z" fill="rgba(160,140,120,0.35)" stroke="rgba(160,140,120,0.45)" strokeWidth="1" />
    <path d="M30,16 Q40,16 40,25 Q40,34 30,34" stroke="rgba(160,140,120,0.35)" strokeWidth="2" fill="none" />
    <path d="M12,10 Q10,4 14,-1" stroke="rgba(200,190,170,0.2)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M20,8 Q18,1 22,-3" stroke="rgba(200,190,170,0.15)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
  </svg>
);

const PlantSVG = () => (
  <svg viewBox="0 0 44 72" width="44" height="72" fill="none" className="room-obj-svg">
    <path d="M8,44 L6,66 Q6,70 12,70 L32,70 Q38,70 38,66 L36,44 Z" fill="rgba(140,100,60,0.3)" />
    <path d="M22,44 Q14,28 6,18" stroke="rgba(50,130,70,0.35)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M22,44 Q30,24 40,14" stroke="rgba(50,130,70,0.35)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M22,44 Q16,32 8,30" stroke="rgba(50,130,70,0.25)" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M22,44 Q28,30 36,28" stroke="rgba(50,130,70,0.25)" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="6" cy="16" rx="7" ry="3.5" fill="rgba(50,130,70,0.25)" transform="rotate(-35 6 16)" />
    <ellipse cx="40" cy="12" rx="7" ry="3.5" fill="rgba(50,130,70,0.25)" transform="rotate(30 40 12)" />
  </svg>
);

const NotebookSVG = () => (
  <svg viewBox="0 0 46 60" width="46" height="60" fill="none" className="room-obj-svg">
    <rect x="4" y="4" width="34" height="50" rx="2" fill="rgba(230,225,210,0.25)" stroke="rgba(160,150,130,0.3)" strokeWidth="1" />
    <line x1="10" y1="16" x2="32" y2="16" stroke="rgba(140,130,110,0.2)" strokeWidth=".8" />
    <line x1="10" y1="22" x2="32" y2="22" stroke="rgba(140,130,110,0.2)" strokeWidth=".8" />
    <line x1="10" y1="28" x2="32" y2="28" stroke="rgba(140,130,110,0.2)" strokeWidth=".8" />
    <line x1="10" y1="34" x2="24" y2="34" stroke="rgba(140,130,110,0.2)" strokeWidth=".8" />
    <line x1="42" y1="6" x2="34" y2="52" stroke="rgba(100,80,60,0.25)" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

/* ════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════ */
export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const storyCardRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLElement>(null);
  const legendsRef = useRef<HTMLElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [depth, setDepth] = useState(0);
  const [depthColor, setDepthColor] = useState('#87CEEB');
  const [isDesktop] = useState(() => typeof window !== 'undefined' && window.innerWidth > 900);

  const nextStory = useCallback(() => {
    const el = storyCardRef.current;
    if (!el) return;
    gsap.timeline()
      .to(el, { opacity: 0, y: -14, duration: 0.22, ease: 'power2.in' })
      .call(() => setCurrentIdx(p => {
        let n = Math.floor(Math.random() * allLegends.length);
        while (n === p) n = Math.floor(Math.random() * allLegends.length);
        return n;
      }))
      .to(el, { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' });
  }, []);

  /* ── ROOM DISSOLVE ── */
  useEffect(() => {
    if (!isDesktop) return;
    const ctx = gsap.context(() => {
      gsap.to('.dust-mote', {
        y: '+=25', x: '+=12', duration: 5.5, repeat: -1, yoyo: true,
        ease: 'sine.inOut', stagger: { each: 0.7, from: 'random' },
      });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.room-spacer', start: 'top top', end: 'bottom top', scrub: 1.2 },
      });
      tl.to('.room-cup', { x: -120, opacity: 0, duration: 0.18 }, 0)
        .to('.room-plant', { x: -90, opacity: 0, duration: 0.18 }, 0.03)
        .to('.room-notebook', { x: 110, opacity: 0, duration: 0.18 }, 0.05)
        .to('.room-window-area', { opacity: 0, duration: 0.22 }, 0.08)
        .to('.room-desk', { y: 70, opacity: 0, duration: 0.18 }, 0.12)
        .to('.room-monitor-glow', { opacity: 0, duration: 0.12 }, 0.16)
        .to('.monitor-stand', { opacity: 0, scaleY: 0, duration: 0.12 }, 0.2)
        .to('.monitor-frame', { opacity: 0, duration: 0.15 }, 0.25)
        .to('.monitor-screen', { scale: 2.5, opacity: 0, duration: 0.3, ease: 'power2.in' }, 0.24)
        .to('.room-bg', { opacity: 0, duration: 0.2 }, 0.4)
        .to('.room-scroll-hint', { opacity: 0, duration: 0.04 }, 0);
    });
    return () => ctx.revert();
  }, [isDesktop]);

  /* ── DECORATIVE LAYER VISIBILITY ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const layers = [
        { trigger: '.hero-section', layer: '.sky-layer', inEnd: 'top 10%', outStart: 'bottom 30%' },
        { trigger: '.manifesto', layer: '.shallow-layer', inEnd: 'top 15%', outStart: 'bottom 40%' },
        { trigger: '.chapters', layer: '.mid-layer', inEnd: 'top 15%', outStart: 'bottom 40%' },
        { trigger: '.legends-section', layer: '.deep-layer', inEnd: 'top 15%', outStart: 'bottom 50%' },
        { trigger: '.floor-spacer', layer: '.floor-layer', inEnd: 'top 25%', outStart: 'bottom 60%' },
      ];
      layers.forEach(({ trigger, layer, inEnd, outStart }) => {
        gsap.set(layer, { opacity: 0 });
        gsap.to(layer, { opacity: 1, scrollTrigger: { trigger, start: 'top bottom', end: inEnd, scrub: true } });
        gsap.to(layer, { opacity: 0, scrollTrigger: { trigger, start: outStart, end: 'bottom top', scrub: true } });
      });
      gsap.set('.bubble-layer', { opacity: 0 });
      gsap.to('.bubble-layer', { opacity: 1, scrollTrigger: { trigger: '.hero-section', start: 'center center', end: 'center top', scrub: true } });
      gsap.to('.bubble-layer', { opacity: 0, scrollTrigger: { trigger: '.floor-spacer', start: 'top 50%', end: 'top top', scrub: true } });
      gsap.set('.surface-ripple', { opacity: 0, scaleX: 0.3 });
      gsap.to('.surface-ripple', { opacity: 0.5, scaleX: 1, scrollTrigger: { trigger: '.hero-section', start: 'bottom 35%', end: 'bottom 20%', scrub: true } });
      gsap.to('.surface-ripple', { opacity: 0, scaleX: 1.6, scrollTrigger: { trigger: '.manifesto', start: 'top 90%', end: 'top 70%', scrub: true } });
    });
    return () => ctx.revert();
  }, []);

  /* ── FISH / SHARK / BUBBLES / SEAWEED / JELLYFISH ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const w = () => window.innerWidth;
      const margin = 80;
      const swim = (sel: string, startDir: number, dur: number, bDur: number, del: number, m = margin) => {
        const el = document.querySelector(sel) as HTMLElement | null;
        if (!el) return;
        let d = startDir;
        gsap.set(el, { x: d > 0 ? m : w() - m - 80, scaleX: d });
        const go = () => {
          gsap.to(el, {
            x: d > 0 ? w() - m - 80 : m, duration: dur, ease: 'none',
            onComplete() { d = -d; gsap.set(el, { scaleX: d }); go(); },
          });
        };
        gsap.delayedCall(del, go);
        gsap.to(el, { y: '+=10', duration: bDur, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      };
      FISH_DATA.forEach(f => swim(`#${f.id}`, f.dir, f.dur, f.bDur, f.del));
      swim('#school-fish', 1, 8, 2, 0.5, 40);
      swim('#shark-el', 1, 4, 3.5, 2, 30);

      document.querySelectorAll('.bubble').forEach(b => {
        const el = b as HTMLElement;
        const dur = parseFloat(el.dataset.dur ?? '8');
        const del = parseFloat(el.dataset.delay ?? '0');
        gsap.fromTo(el, { y: 0, opacity: 0 }, {
          y: '-100vh', duration: dur, delay: del, repeat: -1, ease: 'none',
          keyframes: [{ opacity: 0 }, { opacity: 0.4, offset: 0.2 }, { opacity: 0.3, offset: 0.7 }, { opacity: 0 }],
        });
      });

      document.querySelectorAll('.seaweed').forEach((el, i) => {
        gsap.fromTo(el, { rotation: -8 }, { rotation: 8, duration: 2.8 + i * 0.3, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: 'bottom center', delay: i * 0.25 });
      });

      document.querySelectorAll('.god-ray').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0.03, scaleX: 0.85 }, { opacity: 0.1, scaleX: 1.15, duration: 4.5 + i * 0.6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.8 });
      });

      document.querySelectorAll('.caustic-patch').forEach((el, i) => {
        gsap.to(el, { opacity: 0.22, x: `+=${14 + i * 4}`, duration: 2.5 + i * 0.3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.4 });
      });

      document.querySelectorAll('.jellyfish-el').forEach((el, i) => {
        gsap.to(el, { y: '+=18', x: `+=${i % 2 === 0 ? 35 : -35}`, duration: 10 + i * 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to(el.querySelector('.jelly-svg'), { scaleY: 0.85, duration: 2.5 + i * 0.5, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: 'top center' });
      });

      gsap.to('.abyss-glow', { opacity: 0.55, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    });
    return () => ctx.revert();
  }, []);

  /* ── SKY ANIMATIONS ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.sun', { y: -12, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.sun-ray', { rotation: '+=360', duration: 25, repeat: -1, ease: 'none', transformOrigin: 'center 50px' });
      gsap.fromTo('.cloud-1', { x: '110vw' }, { x: -200, duration: 28, repeat: -1, ease: 'none' });
      gsap.fromTo('.cloud-2', { x: '110vw' }, { x: -200, duration: 38, repeat: -1, ease: 'none', delay: -14 });
      gsap.fromTo('.cloud-3', { x: '110vw' }, { x: -200, duration: 22, repeat: -1, ease: 'none', delay: -7 });
      gsap.to('.water-surface', { x: '-50%', duration: 7, repeat: -1, ease: 'none' });
      gsap.fromTo('.bird-1', { x: '105vw', y: 0 }, { x: -60, y: -20, duration: 18, repeat: -1, ease: 'none' });
      gsap.fromTo('.bird-2', { x: '108vw', y: 5 }, { x: -50, y: -15, duration: 22, repeat: -1, ease: 'none', delay: -8 });
      gsap.fromTo('.bird-3', { x: '102vw', y: -5 }, { x: -70, y: -25, duration: 20, repeat: -1, ease: 'none', delay: -4 });
      gsap.fromTo('.bird-4', { x: '110vw', y: 10 }, { x: -40, y: -10, duration: 25, repeat: -1, ease: 'none', delay: -15 });
    });
    return () => ctx.revert();
  }, []);

  /* ── HERO ANIMATIONS ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitText(titleRef.current!, { type: 'chars' });
      gsap.set(split.chars, { opacity: 0, y: 50, rotation: 8 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: heroRef.current, start: 'top 55%', once: true } });
      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0)
        .to('.hero-logo-horizontal', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.15)
        .to(split.chars, { opacity: 1, y: 0, rotation: 0, duration: 0.7, stagger: 0.035, ease: 'back.out(1.7)' }, 0.3)
        .to(scrollRef.current, { opacity: 1, duration: 0.5 }, 1.2);
      gsap.set(subtitleRef.current, { opacity: 1, text: '' });
      gsap.to(subtitleRef.current, {
        delay: 0.6, duration: 1.8,
        text: { value: 'BE AI & ML · Batch 2022–26 · Jyothy Institute of Technology', delimiter: '' },
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top 55%', once: true },
      });
      return () => split.revert();
    });
    return () => ctx.revert();
  }, []);

  /* ── CONTENT SCROLL ANIMATIONS ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mw = new SplitText('.manifesto-text', { type: 'words' });
      gsap.set(mw.words, { opacity: 0, y: 30 });
      gsap.to(mw.words, { opacity: 1, y: 0, duration: 0.6, stagger: 0.025, ease: 'power3.out', scrollTrigger: { trigger: '.manifesto-text', start: 'top 65%' } });
      gsap.set('.m-divider', { scaleX: 0 });
      gsap.to('.m-divider', { scaleX: 1, duration: 0.7, scrollTrigger: { trigger: '.m-divider', start: 'top 82%' } });
      gsap.fromTo('.m-sub', { opacity: 0, y: 16 }, { opacity: 0.75, y: 0, duration: 0.8, scrollTrigger: { trigger: '.m-sub', start: 'top 82%' } });
      gsap.fromTo('.chapter-card', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: cardsRef.current, start: 'top 78%' } });
      gsap.fromTo('.section-ttl', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: '.section-ttl', start: 'top 80%' } });
      gsap.fromTo('.lgd-tag', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, scrollTrigger: { trigger: '.lgd-tag', start: 'top 82%' } });
      gsap.fromTo('.lgd-heading', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: '.lgd-heading', start: 'top 82%' } });
      gsap.fromTo('.lgd-sub', { opacity: 0, y: 14 }, { opacity: 0.55, y: 0, duration: 0.5, scrollTrigger: { trigger: '.lgd-sub', start: 'top 82%' } });
      gsap.fromTo('.story-card', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '.story-card', start: 'top 82%' } });
      /* floor elements reveal */
      gsap.fromTo('.floor-layer .seaweed, .floor-layer .rock, .floor-layer .fish-bone-container', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, scrollTrigger: { trigger: '.floor-spacer', start: 'top 60%' } });
      return () => mw.revert();
    });
    return () => ctx.revert();
  }, []);

  /* ── DEPTH OVERLAY ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.depth-overlay', { opacity: 0.52, ease: 'none', scrollTrigger: { trigger: '.home-wrapper', start: 'top top', end: 'bottom bottom', scrub: true } });
    });
    return () => ctx.revert();
  }, []);

  /* ── CURSOR BUBBLES ── */
  useEffect(() => {
    if (!isDesktop) return;
    let last = 0;
    const move = (e: MouseEvent) => {
      const now = Date.now();
      if (now - last < 70) return;
      last = now;
      if (window.scrollY < window.innerHeight * 0.22) return;
      const b = document.createElement('div');
      b.className = 'cursor-bubble';
      b.style.left = e.clientX + 'px';
      b.style.top = e.clientY + 'px';
      document.body.appendChild(b);
      setTimeout(() => b.remove(), 1200);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [isDesktop]);

  /* ── DEPTH METER ── */
  useEffect(() => {
    if (!isDesktop) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.min(window.scrollY / max, 1);
      const m = Math.round(p * 200);
      setDepth(m);
      if (m < 5) setDepthColor('#87CEEB');
      else if (m < 30) setDepthColor('#1a6fa8');
      else if (m < 70) setDepthColor('#052d54');
      else if (m < 140) setDepthColor('#021a35');
      else setDepthColor('#8B7355');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isDesktop]);

  const legend = allLegends[currentIdx];

  return (
    <div className="home-wrapper">

      {/* ═══ FIXED OCEAN BACKGROUND ═══ */}
      <div className="ocean-bg" />
      <div className="depth-overlay" />

      {/* ═══ ROOM FRAME (desktop) ═══ */}
      {isDesktop && (
        <section className="room-frame">
          <div className="room-bg" />
          <div className="room-window-area">
            <div className="window-frame">
              <div className="window-cross-h" /><div className="window-cross-v" />
            </div>
            <div className="window-light-rays">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-light-ray" style={{ left: `${15 + i * 18}%`, transform: `rotate(${-20 + i * 10}deg)` }} />
              ))}
            </div>
          </div>
          {[...Array(12)].map((_, i) => (
            <div key={i} className="dust-mote" style={{
              left: `${10 + (i * 7) % 80}%`, top: `${15 + (i * 5) % 50}%`,
              width: 2 + (i % 3), height: 2 + (i % 3),
              opacity: 0.12 + (i % 4) * 0.06,
            }} />
          ))}
          <div className="room-cup room-obj"><CupSVG /></div>
          <div className="room-plant room-obj"><PlantSVG /></div>
          <div className="room-notebook room-obj"><NotebookSVG /></div>
          <div className="room-desk" />
          <div className="room-monitor">
            <div className="monitor-frame">
              <div className="monitor-screen">
                <div className="screen-content">
                  <div className="screen-badge">Batch 2022–26 · JIT</div>
                  <div className="screen-title">End of Beginning</div>
                  <div className="screen-line" />
                  <div className="screen-sub">AI Nexus · BE AI &amp; ML</div>
                </div>
                <div className="screen-reflection" />
              </div>
            </div>
            <div className="monitor-stand" />
            <div className="room-monitor-glow" />
          </div>
          <div className="room-scroll-hint">Scroll to enter</div>
        </section>
      )}
      <div className="room-spacer" style={{ height: isDesktop ? '100vh' : '0' }} />

      {/* ═══ DECORATIVE LAYERS (fixed) ═══ */}
      <div className="decor-layer sky-layer">
        <div className="sky-glow" />
        <div className="sun" />
        {[...Array(8)].map((_, i) => (
          <div key={i} className="sun-ray" style={{ transform: `translateX(-50%) rotate(${i * 45}deg)` }} />
        ))}
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
        <div className="bird-1"><BirdSVG size={0.9} /></div>
        <div className="bird-2"><BirdSVG size={0.7} /></div>
        <div className="bird-3"><BirdSVG size={0.8} /></div>
        <div className="bird-4"><BirdSVG size={0.6} /></div>
        <div className="water-surface" />
        <div className="surface-ripple" />
      </div>

      <div className="decor-layer shallow-layer">
        {CAUSTIC_DATA.map((p, i) => (
          <div key={i} className="caustic-patch" style={{ width: p.w, height: p.h, left: p.left, top: p.top, opacity: 0 }} />
        ))}
        {GOD_RAY_DATA.map((r, i) => (
          <div key={i} className="god-ray" style={{ left: r.left, height: r.h, transform: `rotate(${r.rot}deg)`, opacity: 0 }} />
        ))}
        <div id="school-fish" className="swim-el shallow-decor"><SchoolFishSVG color="rgba(135,206,235,0.4)" /></div>
      </div>

      <div className="decor-layer mid-layer">
        {FISH_DATA.slice(0, 3).map(f => (
          <div key={f.id} id={f.id} className="swim-el mid-decor" style={{ top: f.top }}>
            <FishSVG color={f.color} />
          </div>
        ))}
        <div id="shark-el" className="swim-el mid-decor" style={{ top: '55%' }}><SharkSVG /></div>
      </div>

      <div className="decor-layer deep-layer">
        {FISH_DATA.slice(3).map(f => (
          <div key={f.id} id={f.id} className="swim-el deep-decor" style={{ top: f.top }}>
            <FishSVG color={f.color} size={0.85} />
          </div>
        ))}
        <div className="jellyfish-el deep-decor" style={{ top: '35%', left: '20%' }}><JellyfishSVG size={1} /></div>
        <div className="jellyfish-el deep-decor" style={{ top: '50%', left: '72%' }}><JellyfishSVG size={0.7} /></div>
        <div className="abyss-creature deep-decor" style={{ top: '72%', left: '58%' }}>
          <div className="abyss-glow" />
          <svg viewBox="0 0 48 22" width="48" height="22" fill="none">
            <path d="M2,11 L-4,4 L-4,18 Z" fill="#0d1b2a" />
            <path d="M2,11 Q8,1 20,1 Q32,1 40,11 Q32,21 20,21 Q8,21 2,11 Z" fill="#0d1b2a" stroke="rgba(0,255,180,0.25)" strokeWidth="0.8" />
            <circle cx="34" cy="8" r="2" fill="rgba(0,255,180,0.85)" />
            <line x1="18" y1="1" x2="16" y2="-10" stroke="rgba(0,255,180,0.35)" strokeWidth="0.8" />
            <circle cx="16" cy="-11" r="3" fill="rgba(0,255,180,0.7)" />
          </svg>
        </div>
      </div>

      <div className="decor-layer floor-layer" ref={floorRef}>
        <div className="ocean-floor">
          {SEAWEED_DATA.map((s, i) => {
            const h = Math.round(s.h * 0.6);
            const d1 = `M9,${h} C3,${h * 0.75} 15,${h * 0.52} 8,${h * 0.38} C2,${h * 0.24} 14,${h * 0.09} 9,0`;
            const d2 = `M13,${h} C7,${h * 0.78} 18,${h * 0.58} 11,${h * 0.42} C5,${h * 0.27} 16,${h * 0.12} 12,${h * 0.02}`;
            return (
              <svg key={i} className="seaweed" style={{ left: s.left, bottom: '100%', position: 'absolute' }} width="24" height={h} viewBox={`0 0 24 ${h}`} fill="none">
                <path d={d2} stroke={s.c2} strokeWidth="4" strokeLinecap="round" opacity="0.7" />
                <path d={d1} stroke={s.c1} strokeWidth="5" strokeLinecap="round" />
              </svg>
            );
          })}
          {ROCK_DATA.map((r, i) => (
            <div key={i} className="rock" style={{ left: r.left, width: r.w, height: r.h }} />
          ))}
          <div className="fish-bone-container" style={{ bottom: '55%', left: '18%' }}>
            <svg viewBox="0 0 160 40" width="160" height="40" fill="none">
              <line x1="18" y1="20" x2="136" y2="20" stroke="rgba(201,169,110,0.6)" strokeWidth="2" strokeLinecap="round" />
              {[38, 56, 74, 92, 110, 126].map(x => (
                <g key={x}>
                  <line x1={x} y1="20" x2={x - 2} y2="9" stroke="rgba(201,169,110,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1={x} y1="20" x2={x - 2} y2="31" stroke="rgba(201,169,110,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                </g>
              ))}
              <circle cx="133" cy="20" r="8" stroke="rgba(201,169,110,0.6)" strokeWidth="1.8" fill="none" />
              <circle cx="136" cy="18" r="2" fill="rgba(201,169,110,0.5)" />
              <line x1="18" y1="20" x2="6" y2="11" stroke="rgba(201,169,110,0.6)" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="18" y1="20" x2="4" y2="20" stroke="rgba(201,169,110,0.6)" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="18" y1="20" x2="6" y2="29" stroke="rgba(201,169,110,0.6)" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <div className="fish-bone-container" style={{ bottom: '40%', left: '58%' }}>
            <svg viewBox="0 0 110 32" width="110" height="32" fill="none">
              <line x1="14" y1="16" x2="92" y2="16" stroke="rgba(201,169,110,0.45)" strokeWidth="1.8" strokeLinecap="round" />
              {[30, 46, 62, 78].map(x => (
                <g key={x}>
                  <line x1={x} y1="16" x2={x - 2} y2="7" stroke="rgba(201,169,110,0.45)" strokeWidth="1.3" strokeLinecap="round" />
                  <line x1={x} y1="16" x2={x - 2} y2="25" stroke="rgba(201,169,110,0.45)" strokeWidth="1.3" strokeLinecap="round" />
                </g>
              ))}
              <circle cx="90" cy="16" r="7" stroke="rgba(201,169,110,0.45)" strokeWidth="1.6" fill="none" />
              <line x1="14" y1="16" x2="4" y2="9" stroke="rgba(201,169,110,0.45)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="14" y1="16" x2="2" y2="16" stroke="rgba(201,169,110,0.45)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="14" y1="16" x2="4" y2="23" stroke="rgba(201,169,110,0.45)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="fish-bone-container" style={{ bottom: '48%', left: '38%' }}>
            <svg viewBox="0 0 90 28" width="90" height="28" fill="none">
              <line x1="12" y1="14" x2="74" y2="14" stroke="rgba(201,169,110,0.35)" strokeWidth="1.6" strokeLinecap="round" />
              {[28, 42, 58, 70].map(x => (
                <g key={x}>
                  <line x1={x} y1="14" x2={x - 2} y2="6" stroke="rgba(201,169,110,0.35)" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1={x} y1="14" x2={x - 2} y2="22" stroke="rgba(201,169,110,0.35)" strokeWidth="1.2" strokeLinecap="round" />
                </g>
              ))}
              <circle cx="72" cy="14" r="6" stroke="rgba(201,169,110,0.35)" strokeWidth="1.5" fill="none" />
              <line x1="12" y1="14" x2="4" y2="8" stroke="rgba(201,169,110,0.35)" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="12" y1="14" x2="2" y2="14" stroke="rgba(201,169,110,0.35)" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="12" y1="14" x2="4" y2="20" stroke="rgba(201,169,110,0.35)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      <div className="decor-layer bubble-layer">
        {BUBBLE_DATA.map(b => (
          <div key={b.id} className="bubble" style={{ left: b.left, top: b.top, width: b.size, height: b.size }} data-dur={b.dur} data-delay={b.delay} />
        ))}
      </div>

      {/* ═══ PARTICLE CANVAS ═══ */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.15 }}>
        <ParticleCanvas />
      </div>

      {/* ═══ DEPTH METER ═══ */}
      {isDesktop && (
        <div className="depth-meter">
          <div className="depth-bar" style={{ background: `linear-gradient(to bottom, #87CEEB, ${depthColor})` }}>
            <div className="depth-fill" style={{ height: `${(depth / 200) * 100}%` }} />
          </div>
          <span className="depth-val">{depth}m</span>
          <span className="depth-zone">
            {depth < 5 ? 'Sky' : depth < 30 ? 'Sunlight' : depth < 70 ? 'Shallow' : depth < 140 ? 'Twilight' : depth < 185 ? 'Midnight' : 'The Floor'}
          </span>
        </div>
      )}

      {/* ═══ HERO ═══ */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-inner">
          <div className="hero-badge" ref={badgeRef}>Batch of 2022–26 · Jyothy Institute of Technology</div>
          <img src={logoHorizontal} alt="EndOfBeginning" className="hero-logo-horizontal" />
          <h1 className="hero-title" ref={titleRef}>End of Beginning</h1>
          <div className="hero-gold-divider" />
          <p className="hero-subtitle" ref={subtitleRef}></p>
          <div className="scroll-indicator" ref={scrollRef}>
            <div className="scroll-line" />
            <span>Dive</span>
          </div>
        </div>
      </section>

      {/* ═══ MANIFESTO ═══ */}
      <section className="manifesto" ref={manifestoRef}>
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

      {/* ═══ CHAPTERS ═══ */}
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

      {/* ═══ LEGENDS ═══ */}
      <section className="legends-section" ref={legendsRef}>
        <div className="ticker-wrap">
          <div className="ticker-track">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="ticker-item">{item} <span className="ticker-dot">·</span></span>
            ))}
          </div>
        </div>
        <div className="lgd-header">
          <p className="lgd-tag">— Every Batch Has Them —</p>
          <h2 className="lgd-heading">Legends Never Graduate</h2>
          <p className="lgd-sub">Click to meet the next one</p>
        </div>
        <div className="story-area">
          <div
            className="story-card"
            ref={storyCardRef}
            style={{ '--accent': legend.accentColor } as React.CSSProperties}
          >
            <div className="story-card-top">
              <p className="story-nick">{legend.nick}</p>
              <span className="story-pill">{legend.tag}</span>
            </div>
            <p className="story-pull">{legend.pull}</p>
            <div className="story-text-scroll">
              <p className="story-text">
                {legend.story.split('\n\n').map((para, j) => (
                  <span key={j}>{para}<br /><br /></span>
                ))}
              </p>
            </div>
            <div className="story-dots">
              {allLegends.map((_, i) => (
                <span key={i} className={`story-dot${i === currentIdx ? ' active' : ''}`} />
              ))}
            </div>
          </div>
          <button className="story-next-btn" onClick={nextStory}>
            Another Legend <span>→</span>
          </button>
        </div>
      </section>

      {/* ═══ FLOOR SPACER ═══ */}
      <div className="floor-spacer" />

      {/* ═══ FOOTER ═══ */}
      <footer className="site-footer">
        <p>EndOfBeginning · Jyothy Institute of Technology · BE AI &amp; ML · Batch of 2022–26 · Made with memory</p>
      </footer>
    </div>
  );
}
