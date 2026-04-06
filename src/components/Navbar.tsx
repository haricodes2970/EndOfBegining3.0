import { NavLink } from 'react-router-dom';
import logo from '../assets/ainexus.jpeg';
import './Navbar.css';

const links = [
  { to: '/',           label: 'Home'       },
  { to: '/memories',   label: 'Memories'   },
  { to: '/pantheon',   label: 'Pantheon'   },
  { to: '/vault',      label: 'Vault'      },
  { to: '/echoes',     label: 'Echoes'     },
];

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-logo">
        <img src={logo} alt="AI Nexus" />
        End<span>Of</span>Beginning
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
