import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import aiNexus from '../assets/ainexus.jpeg';
import './Navbar.css';

const links = [
  { to: '/',               label: 'Home'              },
  { to: '/echoes-of-time', label: 'Echoes of Time'    },
  { to: '/constellation',  label: 'The Constellation' },
  { to: '/vault',          label: 'Vault'             },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`navbar${scrolled ? ' scrolled' : ''}`}
    >
      <NavLink to="/" className="nav-brand">
        <img src={aiNexus} alt="AI Nexus" className="nav-ainexus" />
        <div className="nav-divider" />
        <span className="nav-brand-text">End of Beginning</span>
      </NavLink>

      <ul className="nav-links">
        {links.map(l => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
