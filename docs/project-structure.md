# Project Structure

## File Tree

```
EndOfBeging/
├── docs/                          ← Documentation (you are here)
│   ├── README.md
│   ├── project-structure.md
│   ├── pages.md
│   ├── students.md
│   ├── content-guide.md
│   └── components.md
│
├── public/                        ← Static public assets
│
├── src/
│   ├── assets/
│   │   └── ainexus.jpeg           ← AI Nexus club logo
│   │
│   ├── components/
│   │   ├── Navbar.tsx             ← Shared navigation bar
│   │   ├── Navbar.css
│   │   └── ParticleCanvas.tsx     ← Animated particle background
│   │
│   ├── pages/
│   │   ├── Home.tsx               ← Landing page (/)
│   │   ├── Home.css
│   │   ├── Chronicles.tsx         ← Timeline (/chronicles)
│   │   ├── Chronicles.css
│   │   ├── Pantheon.tsx           ← Student directory (/pantheon)
│   │   ├── Pantheon.css
│   │   ├── Vault.tsx              ← Student photo grid (/vault)
│   │   ├── Vault.css
│   │   ├── Echoes.tsx             ← Messages wall (/echoes)
│   │   ├── Echoes.css
│   │   ├── Horizon.tsx            ← Future & credits (/horizon)
│   │   └── Horizon.css
│   │
│   ├── styles/
│   │   └── globals.css            ← Design tokens, shared styles
│   │
│   ├── App.tsx                    ← Router setup
│   └── main.tsx                   ← React entry point
│
├── index.html                     ← Vite HTML entry
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Architecture Decisions

### Routing
React Router v6 with `BrowserRouter`. Each page is a separate route and component. No lazy loading yet — can be added before deployment for performance.

```
/             → Home.tsx
/chronicles   → Chronicles.tsx
/pantheon     → Pantheon.tsx
/vault        → Vault.tsx
/echoes       → Echoes.tsx
/horizon      → Horizon.tsx
```

### Styling Strategy
- `globals.css` — CSS custom properties (`--blue`, `--beige`, `--dark`, etc.), shared utility classes (`.glass-card`, `.orb`, `.page-hero`, `.page-title`, etc.)
- Per-page `.css` files — all page-specific styles, scoped by class names
- No CSS frameworks (Tailwind/Bootstrap) — full control over the aesthetic

### Animation Strategy
- **GSAP** for all animations: entrance, scroll-triggered, parallax
- `ScrollTrigger` plugin registered globally in each page that uses it
- `ParticleCanvas.tsx` — a reusable canvas component rendering floating particles + connecting lines, mounted on every page

### Asset Handling
- `ainexus.jpeg` imported directly in components via Vite's static asset handling
- All future student photos should be placed in `src/assets/students/` and imported in `Vault.tsx`
