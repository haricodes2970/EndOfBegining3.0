import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Vault.css';

gsap.registerPlugin(ScrollTrigger);

/* ── PHOTO RESOLUTION via import.meta.glob ──────────────────────────
   Vite scans the folder at build time and maps every file to its
   hashed production URL. Special characters (spaces, parentheses,
   tildes, double-spaces) are handled correctly — no per-file import
   statement needed.                                                    */
const _photos = import.meta.glob('../assets/students/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

function p(filename: string): string | undefined {
  return _photos[`../assets/students/${filename}`];
}

/* ── STUDENTS ── */
const students = [
  { id:  1, usn: '1JT22AI001', name: 'Akash M Athreyas',    photo: undefined },
  { id:  2, usn: '1JT22AI002', name: 'Amith Kashyap P S',   photo: p('IMG-20230528-WA0019 - AMITH KASHYAP P S AMITH KASHYAP P S.jpg') },
  { id:  3, usn: '1JT22AI003', name: 'Aryan M',             photo: p('ARYAN M ARYAN M.jpg') },
  { id:  4, usn: '1JT22AI004', name: 'Asritha Y',           photo: p('photolatest - Asritha Yerramsetty.jpg') },
  { id:  5, usn: '1JT22AI005', name: 'Bhuvanesh Kumar',     photo: p('F9473 - BHUVANESH KUMAR G BHUVANESH KUMAR G.JPG') },
  { id:  6, usn: '1JT22AI006', name: 'Bindulakshmi G S',    photo: p('IMG-20230412-WA0026 - BINDULAKSHMI G S BINDULAKSHMI G S.jpg') },
  { id:  7, usn: '1JT22AI007', name: 'Chaitanya G',         photo: undefined },
  { id:  8, usn: '1JT22AI008', name: 'Chandana C Gowda',    photo: p('CHANDANA C GOWDA.jpg') },
  { id:  9, usn: '1JT22AI010', name: 'Chandana S',          photo: p('IMG_20240926_183756 - CHANDANA S CHANDANA S.jpg') },
  { id: 10, usn: '1JT22AI011', name: 'Chandra N',           photo: p('IMG_20240929_195215 - CHANDRA N CHANDRA N.JPG') },
  { id: 11, usn: '1JT22AI012', name: 'Diya K Bhat',         photo: p('Diya proffessional - DIYA K BHAT.jpg') },
  { id: 12, usn: '1JT22AI013', name: 'Eshwar Siddartha',    photo: p('IMG_20230412_133320-min - ESHWAR SIDDARTHA T ESHWAR SIDDARTHA T.jpg') },
  { id: 13, usn: '1JT22AI014', name: 'Harini V',            photo: p('harini - HARINI V HARINI V.jpg') },
  { id: 14, usn: '1JT22AI015', name: 'J Sanjana',           photo: p('IMG_20240928_233133 - J SANJANA J SANJANA.jpg') },
  { id: 15, usn: '1JT22AI016', name: 'Jyothish S',          photo: p('Jyothish S Hebbar.JPG') },
  { id: 16, usn: '1JT22AI017', name: 'K Vihar',             photo: p('IMG-20240929-WA0001 - K Vihar.jpg') },
  { id: 17, usn: '1JT22AI018', name: 'Khushi S Sorathia',   photo: p('IMG_20230917_140846 - KHUSHI S SORATHIA.jpg') },
  { id: 18, usn: '1JT22AI019', name: 'Kiran S Nair',        photo: p('IMG_20240926_152039 - KIRAN S NAIR KIRAN S NAIR.jpg') },
  { id: 19, usn: '1JT22AI020', name: 'Kruthika S',          photo: p('Picsart_24-09-28_14-20-58-624~2 - KRUTHIKA S.jpg') },
  { id: 20, usn: '1JT22AI021', name: 'Kushal S',            photo: p('KUSHAL S.jpeg') },
  { id: 21, usn: '1JT22AI022', name: 'Lavanya G',           photo: p('IMG_20240926_144253 - LAVANYA G LAVANYA G.jpg') },
  { id: 22, usn: '1JT22AI023', name: 'M S J Navaneeth Ch',  photo: p('WhatsApp Image 2024-03-07 at 20.44.27_5d7b02df - M S J NAVANEETH CHARAN M S J NAVANEETH CHARAN.jpg') },
  { id: 23, usn: '1JT22AI024', name: 'Manjesh T A',         photo: p('MANJESH T A.png') },
  { id: 24, usn: '1JT22AI025', name: 'Manjunath D',         photo: p('Manju D.jpeg') },
  { id: 25, usn: '1JT22AI026', name: 'Manoj G',             photo: p('photo_2 - Manoj G.jpg') },
  { id: 26, usn: '1JT22AI027', name: 'Mayur N',             photo: p('IMG-20240708-WA0080(1) - MAYUR N MAYUR N.jpg') },
  { id: 27, usn: '1JT22AI028', name: 'Mayur Simha M',       photo: p('MAYUR SIMHA M.jpg') },
  { id: 28, usn: '1JT22AI029', name: 'Mohith Kumar N',      photo: p('IMG_20220324_084007 - MOHITH KUMAR N.png') },
  { id: 29, usn: '1JT22AI030', name: 'Monisha S P',         photo: p('IMG_20240929_141931 - MONISHA S P MONISHA S P.jpg') },
  { id: 30, usn: '1JT22AI031', name: 'N R Eshwar',          photo: p('Screenshot_20220902-011046_Gallery - N R ESHWAR N R ESHWAR.jpg') },
  { id: 31, usn: '1JT22AI032', name: 'Nitish G S',          photo: p('NITISH G S.jpg') },
  { id: 32, usn: '1JT22AI033', name: 'Poojitha K B',        photo: p('IMG_20240408_192532_530 - pooja katari.jpg') },
  { id: 33, usn: '1JT22AI034', name: 'Prabhava R Bhat',     photo: p('my photo(cropped) - PRABHAVA R BHAT.JPG') },
  { id: 34, usn: '1JT22AI035', name: 'Prajwal V',           photo: p('IMG_7298 - PRAJWAL V PRAJWAL V.jpeg') },
  { id: 35, usn: '1JT22AI036', name: 'Rahul Sai L',         photo: p('Rahul Sai.JPG') },
  { id: 36, usn: '1JT22AI037', name: 'Ramilla Narendra',    photo: undefined },
  { id: 37, usn: '1JT22AI038', name: 'Ranganath C',         photo: p('ranganath - RANGANATH C RANGANATH C.jpeg') },
  { id: 38, usn: '1JT22AI039', name: 'Rithu D',             photo: p('IMG_4426 - RITHU D RITHU D.jpeg') },
  { id: 39, usn: '1JT22AI040', name: 'S Yashaswini',        photo: p('IMG_20240929_151804 - S YASHASWINI S YASHASWINI.jpg') },
  { id: 40, usn: '1JT22AI041', name: 'Sagar S',             photo: p('IMG_3068 - SAGAR S.jpg') },
  { id: 41, usn: '1JT22AI042', name: 'Sai Sharan R S',      photo: p('Photo  - SAI SHARAN R S SAI SHARAN R S.jpg') },
  { id: 42, usn: '1JT22AI043', name: 'Sai Sujan Datta G',   photo: p('MARVEL sujan.jpeg') },
  { id: 43, usn: '1JT22AI044', name: 'Samarth S L',         photo: p('SAMARTH S L.jpg') },
  { id: 44, usn: '1JT22AI045', name: 'Shravan C U',         photo: undefined },
  { id: 45, usn: '1JT22AI046', name: 'Shubhashree Rama',    photo: p('IMG_5973 - SHUBHASHREE RAMACHANDRA BHAT SHUBHASHREE RAMACHANDRA BHAT.JPG') },
  { id: 46, usn: '1JT22AI047', name: 'Sudarshan D J',       photo: p('Passport-JIT22AI2215  - SUDARSHAN D J SUDARSHAN D J.jpg') },
  { id: 47, usn: '1JT22AI048', name: 'Sujith A Donti',      photo: p('WhatsApp Image 2024-09-14 at 16.31.40_6070b647 - SUJITH A DONTI.jpg') },
  { id: 48, usn: '1JT22AI049', name: 'Suman R',             photo: p('IMG_20240926_204144 - SUMAN R SUMAN R.jpg') },
  { id: 49, usn: '1JT22AI050', name: 'Surabhi',             photo: p('SURABHI SURABHI.jpg') },
  { id: 50, usn: '1JT22AI051', name: 'Tejaswi M',           photo: p('IMG_20230311_211837_121 - TEJASWI M TEJASWI M.jpg') },
  { id: 51, usn: '1JT22AI052', name: 'Thanmayi B',          photo: p('IMG_20240929_205114 - THANMAYI B THANMAYI B.jpg') },
  { id: 52, usn: '1JT22AI053', name: 'Usha K',              photo: p('IMG_20240929_143255 - USHA K.jpg') },
  { id: 53, usn: '1JT22AI054', name: 'Vinod Y',             photo: p('Screenshot_2024-08-23-10-00-19-31_99c04817c0de5652397fc8b56c3b3817 - VINOD Y VINOD Y.jpg') },
  { id: 54, usn: '1JT22AI055', name: 'Vishruth S',          photo: p('IMG_2498_Original - VISHRUTH S VISHRUTH S.jpeg') },
  { id: 55, usn: '1JT22AI056', name: 'Vivek Y Patel',       photo: p('WhatsApp Image 2024-09-29 at 12.57.00_289c11a5 - Vivek Patel.jpg') },
  { id: 56, usn: '1JT22AI057', name: 'Vivin Jayanth A M',   photo: p('Vivin - VIVIN JAYANTH A M.jpg') },
  { id: 57, usn: '1JT22AI058', name: 'Vrushank Skanda B',   photo: p('VRUSHANK SKANDA B.jpg') },
  { id: 58, usn: '1JT22AI060', name: 'Yashwanth L',         photo: p('IMG_5385 - YASHWANTH L YASHWANTH L.JPG') },
  { id: 59, usn: '1JT22AI061', name: 'Tejaswini M',         photo: p('tez ph - TEJASWINI M.jpg') },
  { id: 60, usn: '1JT22AI062', name: 'Monisha Bharadwaj',   photo: p('MONISHA BHARADWAJ M H.jpg') },
  { id: 61, usn: '1JT22AI063', name: 'Kushal N S',          photo: p('IMG PASSPORT PHOTO - KUSHAL N S KUSHAL N S.jpg') },
  { id: 62, usn: '1JT22AI064', name: 'Sinchana L',          photo: p('Screenshot_20240927_212807 - SINCHANA L SINCHANA L.jpg') },
  { id: 63, usn: '1JT23AI40',  name: 'Abhishek S',          photo: undefined },
];

export default function Vault() {
  const gridRef = useRef<HTMLDivElement>(null);

  /* Stable falling particle values — computed once per mount */
  const fallingParticles = useMemo(() => {
    const types = ['🌸', '✿', '❀', '🍃', '🍂', '🍃', '🌸', '🍀'] as const;
    return Array.from({ length: 40 }, (_, i) => {
      const type = types[i % types.length];
      const isPink = ['🌸', '✿', '❀'].includes(type);
      return {
        key: i,
        type,
        isPink,
        left:              `${(i * 2.53 + 1.7) % 100}%`,
        animationDelay:    `${(i * 0.51) % 20}s`,
        animationDuration: `${8 + (i * 0.37) % 14}s`,
        fontSize:          `${0.7 + (i * 0.026) % 1}rem`,
        opacity:           Math.random() * 0.5 + 0.15,
      };
    });
  }, []);

  useEffect(() => {
    /* Tag navbar for vault-specific colour overrides */
    const nav = document.querySelector('nav');
    nav?.setAttribute('data-page', 'vault');

    /* ── HEADER ENTRANCE ── */
    gsap.fromTo('.vault-tag',      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.3 });
    gsap.fromTo('.vault-title',    { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.5 });
    gsap.fromTo('.vault-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.7 });
    gsap.fromTo('.vault-divider',  { opacity: 0 },        { opacity: 1,        duration: 0.8, delay: 0.9 });

    /* ── VINE SWAY ── */
    gsap.to('.vine-left, .vine-right', {
      skewX: 2,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    /* ── CARD ENTRANCE — alternating left/right spring bounce ── */
    const allCards = document.querySelectorAll<HTMLElement>('.vault-card');
    console.log('[Vault] students:', students.length, '| cards in DOM:', allCards.length);

    const cleanups: (() => void)[] = [];

    allCards.forEach((card, i) => {
      const col = i % 4;

      gsap.set(card, {
        opacity: 0,
        y: -60,
        rotation: col % 2 === 0 ? -6 : 6,
        scale: 0.88,
      });

      ScrollTrigger.create({
        trigger: card,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 1,
            delay: col * 0.12,
            ease: 'elastic.out(1, 0.5)',
          });
        },
      });
    });

    /* ── GSAP HOVER — spring sway effect ── */
    allCards.forEach(card => {
      const img = card.querySelector('img');

      const onEnter = () => {
        gsap.to(card, {
          y: -14,
          scale: 1.02,
          rotation: 0.5,
          boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 0 30px rgba(109,184,109,0.15)',
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)',
        });
        if (img) {
          gsap.to(img, {
            scale: 1.06,
            filter: 'sepia(0%) saturate(1.1) brightness(1.05)',
            duration: 0.5,
          });
        }
      };

      const onLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          rotation: 0,
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
        });
        if (img) {
          gsap.to(img, {
            scale: 1,
            filter: 'sepia(10%) saturate(0.9) contrast(1.05)',
            duration: 0.5,
          });
        }
      };

      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        card.removeEventListener('mouseenter', onEnter);
        card.removeEventListener('mouseleave', onLeave);
      });
    });

    /* ── PLACEHOLDER PULSE ── */
    const placeholders = document.querySelectorAll('.vault-placeholder');
    if (placeholders.length > 0) {
      gsap.to(placeholders, {
        opacity: 0.6,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: 0.5,
      });
    }

    return () => {
      cleanups.forEach(fn => fn());
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.killTweensOf('*');
      nav?.removeAttribute('data-page');
    };
  }, []);

  return (
    <div className="vault-wrapper">
      {/* Fixed dark background — guarantees coverage over body's beige */}
      <div className="vault-bg" />

      {/* Decorative cherry blossom / sakura tree SVG */}
      <div className="vault-sakura-tree">
        <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          {/* Main trunk */}
          <path d="M400 600 Q398 450 395 300 Q392 180 400 50"
            stroke="rgba(139,90,43,0.4)"
            strokeWidth="18" fill="none"
            strokeLinecap="round"/>
          {/* Left branches */}
          <path d="M396 400 Q320 360 220 340"
            stroke="rgba(139,90,43,0.3)"
            strokeWidth="10" fill="none"
            strokeLinecap="round"/>
          <path d="M394 280 Q300 240 180 210"
            stroke="rgba(139,90,43,0.25)"
            strokeWidth="8" fill="none"
            strokeLinecap="round"/>
          <path d="M393 180 Q310 140 200 120"
            stroke="rgba(139,90,43,0.2)"
            strokeWidth="6" fill="none"
            strokeLinecap="round"/>
          {/* Right branches */}
          <path d="M402 390 Q480 350 580 330"
            stroke="rgba(139,90,43,0.3)"
            strokeWidth="10" fill="none"
            strokeLinecap="round"/>
          <path d="M404 270 Q500 230 620 200"
            stroke="rgba(139,90,43,0.25)"
            strokeWidth="8" fill="none"
            strokeLinecap="round"/>
          <path d="M403 170 Q490 130 600 110"
            stroke="rgba(139,90,43,0.2)"
            strokeWidth="6" fill="none"
            strokeLinecap="round"/>
          {/* Sakura blossom clusters */}
          <circle cx="220" cy="330" r="40"
            fill="rgba(255,182,193,0.12)"/>
          <circle cx="180" cy="200" r="35"
            fill="rgba(255,182,193,0.1)"/>
          <circle cx="200" cy="110" r="30"
            fill="rgba(255,182,193,0.08)"/>
          <circle cx="580" cy="320" r="40"
            fill="rgba(255,182,193,0.12)"/>
          <circle cx="620" cy="190" r="35"
            fill="rgba(255,182,193,0.1)"/>
          <circle cx="600" cy="100" r="30"
            fill="rgba(255,182,193,0.08)"/>
          <circle cx="400" cy="50" r="45"
            fill="rgba(255,182,193,0.15)"/>
        </svg>
      </div>

      {/* Falling particles — sakura petals, green leaves, autumn leaves */}
      {fallingParticles.map(fp => (
        <div
          key={fp.key}
          className={`falling-particle ${fp.isPink ? 'sakura' : 'leaf'}`}
          style={{
            left:              fp.left,
            animationDelay:    fp.animationDelay,
            animationDuration: fp.animationDuration,
            fontSize:          fp.fontSize,
            opacity:           fp.opacity,
          }}
        >
          {fp.type}
        </div>
      ))}

      {/* Vine decorations — left & right borders */}
      <div className="vine-left">
        <svg viewBox="0 0 60 800" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M30 0 Q10 100 30 200 Q50 300 30 400 Q10 500 30 600 Q50 700 30 800"
            stroke="rgba(80,160,80,0.25)"
            strokeWidth="3" fill="none"
            className="vine-path"/>
          <circle cx="10" cy="100" r="6" fill="rgba(255,182,193,0.3)"/>
          <circle cx="50" cy="300" r="5" fill="rgba(100,200,100,0.3)"/>
          <circle cx="15" cy="500" r="7" fill="rgba(255,182,193,0.25)"/>
          <circle cx="45" cy="700" r="5" fill="rgba(100,200,100,0.25)"/>
        </svg>
      </div>
      <div className="vine-right">
        <svg viewBox="0 0 60 800" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M30 0 Q10 100 30 200 Q50 300 30 400 Q10 500 30 600 Q50 700 30 800"
            stroke="rgba(80,160,80,0.25)"
            strokeWidth="3" fill="none"
            className="vine-path"/>
          <circle cx="10" cy="100" r="6" fill="rgba(255,182,193,0.3)"/>
          <circle cx="50" cy="300" r="5" fill="rgba(100,200,100,0.3)"/>
          <circle cx="15" cy="500" r="7" fill="rgba(255,182,193,0.25)"/>
          <circle cx="45" cy="700" r="5" fill="rgba(100,200,100,0.25)"/>
        </svg>
      </div>

      {/* Forest glow orbs */}
      <div className="forest-orb-1" />
      <div className="forest-orb-2" />
      <div className="forest-orb-3" />

      {/* PAGE HEADER */}
      <div className="vault-header">
        <p className="vault-tag">ARCHIVES · BATCH 2022–26</p>
        <h1 className="vault-title">The Vault</h1>
        <p className="vault-subtitle">Every face. Every name. Preserved forever.</p>
        <div className="vault-divider">
          <span className="vault-divider-line" />
          <span className="vault-divider-ornament">❧</span>
          <span className="vault-divider-line" />
        </div>
      </div>

      {/* STUDENT GRID */}
      <div className="vault-grid" ref={gridRef}>
        {/* Tree connector line between two columns */}
        <div className="vault-tree-connector" />

        {students.map(student => (
          <div key={student.id} className="vault-card">
            <span className="vault-card-number">
              {String(student.id).padStart(2, '0')}
            </span>

            <div className="vault-photo-area">
              {student.photo ? (
                <img src={student.photo} alt={student.name} />
              ) : (
                <div className="vault-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              )}
            </div>

            <div className="vault-card-info">
              <p className="vault-card-name">{student.name}</p>
              <p className="vault-card-usn">{student.usn}</p>
            </div>
          </div>
        ))}
      </div>

      {/* BATCH FOOTER */}
      <div className="vault-footer">
        <p><span>63</span> students · BE AI &amp; ML · Batch 2022–26 · JIT Bengaluru</p>
      </div>
    </div>
  );
}
