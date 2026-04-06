# EndOfBeginning

React 18 + TypeScript + Vite + React Router v6 + GSAP

Pages: /, /memories, /neural-drift, /pantheon, /vault, /echoes
Shared: Navbar.tsx, ParticleCanvas.tsx
Styles: globals.css with --blue, --beige, --dark, --blue-dark tokens

Rules:
- Never remove ParticleCanvas from any page
- Never change routing structure
- Never touch student data in Vault.tsx
- All GSAP timelines must be killed in useEffect cleanup
- Mobile: background-attachment scroll not fixed