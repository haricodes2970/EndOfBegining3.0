import { useEffect, useRef, useState } from 'react';
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

export default function Navbar() {
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`navbar${scrolled ? ' scrolled' : ''}`}
    >
      <NavLink to="/" className="nav-brand">
        <img src={aiNexus} alt="AI Nexus" className="nav-ainexus" />
        <div className="nav-divider" />
        <span className="nav-logo-wrap">
          <img
            src={isMobile ? logoStacked : logoHorizontal}
            alt="EndOfBeginning"
            className="nav-logo"
          />
        </span>
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
