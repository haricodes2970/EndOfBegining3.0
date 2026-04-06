import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/flip';
import ParticleCanvas from '../components/ParticleCanvas';
import './Pantheon.css';

interface Student {
  id: number;
  name: string;
  branch: string;
  quote: string;
  move: string;
  next: 'Higher Studies' | 'Placement' | 'Startup';
  nextDetail: string;
}

const students: Student[] = [
  { id: 1,  name: '[Student Name]', branch: 'BE AI & ML',  quote: '"Add their quote here"',          move: 'Their signature move',      next: 'Placement',      nextDetail: '[Company Name]'   },
  { id: 2,  name: '[Student Name]', branch: 'BE AI & ML',  quote: '"Add their quote here"',          move: 'Their signature move',      next: 'Higher Studies', nextDetail: '[University Name]'},
  { id: 3,  name: '[Student Name]', branch: 'BE AI & ML',  quote: '"Add their quote here"',          move: 'Their signature move',      next: 'Startup',        nextDetail: '[Startup Name]'   },
  { id: 4,  name: '[Student Name]', branch: 'BE AI & ML',  quote: '"Add their quote here"',          move: 'Their signature move',      next: 'Placement',      nextDetail: '[Company Name]'   },
  { id: 5,  name: '[Student Name]', branch: 'BE AI & ML',  quote: '"Add their quote here"',          move: 'Their signature move',      next: 'Higher Studies', nextDetail: '[University Name]'},
  { id: 6,  name: '[Student Name]', branch: 'BE AI & ML',  quote: '"Add their quote here"',          move: 'Their signature move',      next: 'Placement',      nextDetail: '[Company Name]'   },
];

const nextColor: Record<Student['next'], string> = {
  'Placement':      '#7aaed4',
  'Higher Studies': '#9bc4a8',
  'Startup':        '#d4a97a',
};

export default function Pantheon() {
  const [search, setSearch]       = useState('');
  const [filter, setFilter]       = useState<string>('All');
  const [selected, setSelected]   = useState<Student | null>(null);
  const cardRefs = useRef<Map<number, HTMLElement>>(new Map());

  const filters = ['All', 'Placement', 'Higher Studies', 'Startup'];

  const visible = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || s.next === filter;
    return matchSearch && matchFilter;
  });

  useEffect(() => {
    gsap.fromTo('.pg-tag',   { opacity: 0, y: 16 }, { opacity: 1,   y: 0, duration: 0.6, delay: 0.3 });
    gsap.fromTo('.pg-title', { opacity: 0, y: 30 }, { opacity: 1,   y: 0, duration: 0.9, delay: 0.5 });
    gsap.fromTo('.pg-desc',  { opacity: 0, y: 16 }, { opacity: 0.7, y: 0, duration: 0.8, delay: 0.7 });

    gsap.fromTo('.student-card',
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.students-grid', start: 'top 82%' } }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  // Flip-powered modal open
  const openCard = (s: Student) => {
    const cardEl = cardRefs.current.get(s.id);
    if (!cardEl) { setSelected(s); return; }
    const state = Flip.getState(cardEl);
    setSelected(s);
    // After modal renders, animate from card position
    requestAnimationFrame(() => {
      const modal = document.querySelector('.modal-card') as HTMLElement | null;
      if (!modal) return;
      Flip.from(state, { targets: modal, duration: 0.5, ease: 'power2.inOut', absolute: true });
    });
  };

  const closeCard = () => setSelected(null);

  return (
    <>
      <div className="page-bg page-bg-pantheon" />
      <ParticleCanvas />
      <div className="orb orb-1" /> <div className="orb orb-2" />

      <div className="page-hero">
        <p className="page-tag pg-tag">Chapter 02</p>
        <h1 className="page-title pg-title">The Pantheon</h1>
        <p className="page-subtitle pg-desc">Faces, stories, and futures. Every soul who made this batch legendary.</p>
      </div>

      {/* Search + filter */}
      <div className="pantheon-controls" style={{ position:'relative', zIndex:1 }}>
        <input
          className="search-input"
          type="text"
          placeholder="Search by name…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="filter-pills">
          {filters.map(f => (
            <button
              key={f}
              className={`pill ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >{f}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="students-section" style={{ position:'relative', zIndex:1 }}>
        <div className="students-grid">
          {visible.map(s => (
            <div
              className="student-card glass-card"
              key={s.id}
              ref={el => { if (el) cardRefs.current.set(s.id, el); }}
              onClick={() => openCard(s)}
            >
              <div className="student-photo">
                <div className="photo-init">{s.name.charAt(1).toUpperCase()}</div>
              </div>
              <div className="student-name">{s.name}</div>
              <div className="student-branch">{s.branch}</div>
              <div className="student-quote">{s.quote}</div>
              <div className="student-next" style={{ color: nextColor[s.next] }}>
                ✦ {s.next}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div className="modal-overlay" onClick={closeCard}>
          <div className="modal-card glass-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeCard}>✕</button>
            <div className="modal-photo">
              <div className="photo-init lg">{selected.name.charAt(1).toUpperCase()}</div>
            </div>
            <h2 className="modal-name">{selected.name}</h2>
            <p className="modal-branch">{selected.branch}</p>
            <blockquote className="modal-quote">{selected.quote}</blockquote>
            <div className="modal-row">
              <div className="modal-label">Signature Move</div>
              <div className="modal-val">{selected.move}</div>
            </div>
            <div className="modal-row">
              <div className="modal-label">Next Chapter</div>
              <div className="modal-val" style={{ color: nextColor[selected.next] }}>
                {selected.next} — {selected.nextDetail}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
