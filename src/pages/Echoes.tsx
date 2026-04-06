import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/flip';
import ParticleCanvas from '../components/ParticleCanvas';
import './Echoes.css';

type NoteType = 'Junior' | 'Senior' | 'Professor';

interface Note {
  id: number;
  from: string;
  role: NoteType;
  message: string;
  color: string;
}

const notes: Note[] = [
  { id: 1, from: 'A Junior',    role: 'Junior',    message: 'You all set the bar impossibly high. We hope to meet it someday. Thank you for showing us what passion looks like.', color: '#d4e8f7' },
  { id: 2, from: '[Name]',      role: 'Senior',    message: '"Add your last words here." — the message you want to leave behind.',                                                color: '#f7f0d4' },
  { id: 3, from: 'Prof. [Name]',role: 'Professor', message: 'It has been a privilege to watch you grow from curious students to confident engineers. Go make us proud.',         color: '#d4f7e0' },
  { id: 4, from: 'A Junior',    role: 'Junior',    message: 'The way you handled the hackathons with such grace and grit — we were always watching and learning.',               color: '#d4e8f7' },
  { id: 5, from: '[Name]',      role: 'Senior',    message: '"Add your last words here."',                                                                                       color: '#f7f0d4' },
  { id: 6, from: 'Prof. [Name]',role: 'Professor', message: 'Every semester you surprised me. Thank you for that. The classroom was never dull.',                                color: '#d4f7e0' },
  { id: 7, from: '[Name]',      role: 'Senior',    message: '"Add your last words here."',                                                                                       color: '#f7f0d4' },
  { id: 8, from: 'A Junior',    role: 'Junior',    message: 'Senior batch of 2022–26 — you leave behind big shoes and bigger hearts.',                                           color: '#d4e8f7' },
];

const roleColor: Record<NoteType, string> = {
  Junior:    '#7aaed4',
  Senior:    '#c4a46b',
  Professor: '#6bad8a',
};

interface FormData { name: string; role: NoteType; message: string; }

export default function Echoes() {
  const [filter, setFilter]     = useState<'All' | NoteType>('All');
  const [fabOpen, setFabOpen]   = useState(false);
  const [form, setForm]         = useState<FormData>({ name: '', role: 'Junior', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const visible = filter === 'All' ? notes : notes.filter(n => n.role === filter);

  const fabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.fromTo('.pg-tag',   { opacity: 0, y: 16 }, { opacity: 1,   y: 0, duration: 0.6, delay: 0.3 });
    gsap.fromTo('.pg-title', { opacity: 0, y: 30 }, { opacity: 1,   y: 0, duration: 0.9, delay: 0.5 });
    gsap.fromTo('.pg-desc',  { opacity: 0, y: 16 }, { opacity: 0.7, y: 0, duration: 0.8, delay: 0.7 });

    gsap.fromTo('.note-card',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: '.notes-grid', start: 'top 82%' } }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setFabOpen(false); setSubmitted(false); setForm({ name: '', role: 'Junior', message: '' }); }, 2500);
  };

  const openFab = () => {
    // Flip: capture FAB state, then expand modal from that position
    if (fabRef.current) {
      const state = Flip.getState(fabRef.current);
      setFabOpen(true);
      requestAnimationFrame(() => {
        const modal = document.querySelector('.modal-card') as HTMLElement | null;
        if (!modal) return;
        Flip.from(state, { targets: modal, duration: 0.55, ease: 'power3.inOut', absolute: true, scale: true });
      });
    } else {
      setFabOpen(true);
    }
  };

  return (
    <>
      <div className="page-bg page-bg-echoes" />
      <ParticleCanvas />
      <div className="orb orb-1" /> <div className="orb orb-2" />

      <div className="page-hero">
        <p className="page-tag pg-tag">Chapter 04</p>
        <h1 className="page-title pg-title">Echoes</h1>
        <p className="page-subtitle pg-desc">Words left behind — from juniors, professors, and the seniors themselves.</p>
      </div>

      {/* Filter */}
      <div className="echoes-controls" style={{ position:'relative', zIndex:1 }}>
        {(['All', 'Junior', 'Senior', 'Professor'] as const).map(f => (
          <button key={f} className={`pill ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      {/* Wall */}
      <section className="notes-section" style={{ position:'relative', zIndex:1 }}>
        <div className="notes-grid">
          {visible.map(note => (
            <div className="note-card" key={note.id} style={{ background: note.color }}>
              <div className="note-role" style={{ color: roleColor[note.role] }}>{note.role}</div>
              <p className="note-message">"{note.message}"</p>
              <div className="note-from">— {note.from}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAB */}
      <button className="fab" ref={fabRef} onClick={openFab} aria-label="Leave a note">
        + Leave a Note
      </button>

      {/* Form Modal */}
      {fabOpen && (
        <div className="modal-overlay" onClick={() => setFabOpen(false)}>
          <div className="modal-card glass-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setFabOpen(false)}>✕</button>
            {submitted ? (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <h3>Note left.</h3>
                <p>Your echo will live here forever.</p>
              </div>
            ) : (
              <>
                <h2 className="form-title">Leave a Note</h2>
                <p className="form-sub">Your words become part of this story.</p>
                <form className="echo-form" onSubmit={handleSubmit}>
                  <input
                    className="form-input"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(p => ({...p, name: e.target.value}))}
                    required
                  />
                  <select
                    className="form-input"
                    value={form.role}
                    onChange={e => setForm(p => ({...p, role: e.target.value as NoteType}))}
                  >
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="Professor">Professor</option>
                  </select>
                  <textarea
                    className="form-input"
                    placeholder="Your message…"
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(p => ({...p, message: e.target.value}))}
                    required
                  />
                  <button className="form-submit" type="submit">Send it ✦</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
