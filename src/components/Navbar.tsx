import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logoHorizontal from '../assets/logo-horizontal.jpeg';
import logoStacked from '../assets/logo-stacked.jpeg';
import aiNexus from '../assets/ainexus.jpeg';
import './Navbar.css';

const links = [
  { to: '/',             label: 'Home'        },
  { to: '/memories',     label: 'Memories'    },
  { to: '/neural-drift', label: 'Neural Drift'},
  { to: '/pantheon',     label: 'Pantheon'    },
  { to: '/vault',        label: 'Vault'       },
  { to: '/echoes',       label: 'Echoes'      },
];

const accentMap: Record<string, string> = {
  '/':         'var(--accent-home)',
  '/memories': 'var(--accent-memories)',
  '/pantheon': 'var(--accent-pantheon)',
  '/vault':    'var(--accent-vault)',
  '/echoes':   'var(--accent-echoes)',
};

export default function Navbar() {
  const { pathname } = useLocation();
  const accent = accentMap[pathname] ?? 'var(--blue-dark)';
  const pageMap: Record<string, string> = {
    '/':             'home',
    '/memories':     'memories',
    '/neural-drift': 'chronicles',
    '/pantheon':     'pantheon',
    '/vault':        'vault',
    '/echoes':       'echoes',
  };
  const currentPage = pageMap[pathname] ?? '';
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <nav
      className="navbar"
      data-page={currentPage}
      style={{ '--nav-accent': accent } as React.CSSProperties}
    >
      <NavLink to="/" className="nav-brand" onClick={() => setMenuOpen(false)}>
        <img src={aiNexus} alt="AI Nexus Club" className="nav-ainexus" />
        <div className="nav-divider" />
        <img src={isMobile ? logoStacked : logoHorizontal} alt="EndOfBeginning" className="nav-logo" />
      </NavLink>
      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
        {links.map(l => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
