# Shared Components Reference

---

## Navbar

**File:** `src/components/Navbar.tsx` + `Navbar.css`

Persistent navigation bar fixed to the top of every page.

### Features
- AI Nexus logo (`ainexus.jpeg`) + "EndOfBeginning" wordmark
- Links to all 6 routes
- Active route highlighted with an underline (via React Router's `NavLink`)
- `backdrop-filter: blur(14px)` glass effect
- Hover underline animation on each link

### Usage
Mounted once in `App.tsx` — sits outside `<Routes>` so it persists across all pages.

```tsx
// App.tsx
<BrowserRouter>
  <Navbar />
  <Routes>
    ...
  </Routes>
</BrowserRouter>
```

### Props
None — self-contained.

---

## ParticleCanvas

**File:** `src/components/ParticleCanvas.tsx`

Animated floating particle network rendered on an HTML `<canvas>`.

### Features
- 70 floating dots with random velocity
- Connecting lines drawn between dots closer than 110px
- Bounces off viewport edges
- Resizes with the window
- Fixed position, covers full viewport, `pointer-events: none` (doesn't block clicks)
- `z-index: 0` — sits behind all page content

### Usage
Imported and mounted at the top of every page component:

```tsx
import ParticleCanvas from '../components/ParticleCanvas';

export default function SomePage() {
  return (
    <>
      <ParticleCanvas />
      {/* rest of page */}
    </>
  );
}
```

### Props
None — self-contained.

### Customisation
To change particle count, edit line 17 in `ParticleCanvas.tsx`:
```ts
const particles: Particle[] = Array.from({ length: 70 }, ...
//                                                    ^^^ change this
```

To change connection distance, edit line 42:
```ts
if (d < 110) {
//       ^^^ connection radius in pixels
```

---

## Shared CSS Classes (globals.css)

These classes are available everywhere without importing anything extra.

| Class | What it does |
|---|---|
| `.glass-card` | Semi-transparent blue-tinted card with blur + border + hover lift |
| `.orb` | Base class for ambient glow orbs (position: fixed) |
| `.orb-1` | Top-right drifting orb |
| `.orb-2` | Bottom-left drifting orb |
| `.page-hero` | Standard page header container (padding-top accounts for navbar) |
| `.page-tag` | Small all-caps label above page title |
| `.page-title` | Large gradient Playfair Display heading |
| `.page-subtitle` | Smaller description text below title |

### CSS Custom Properties

```css
--blue:       #A7C7E7   /* borders, backgrounds */
--beige:      #F5F5DC   /* page background */
--dark:       #333333   /* text */
--blue-light: #c8ddf0   /* lighter tint */
--blue-dark:  #7aaed4   /* primary accent */
--beige-dark: #e8e8c8   /* darker beige */
```

---

## Pill Filter Button

Used in Vault, Echoes, and Pantheon pages for category filtering.

```tsx
<button className={`pill ${active ? 'active' : ''}`} onClick={...}>
  Label
</button>
```

Defined in `Pantheon.css` — copy the `.pill` and `.pill.active` styles to any page that needs it.

---

## Page Header Pattern

Every page (except Home) uses the same three elements for its header:

```tsx
<div className="page-hero">
  <p className="page-tag pg-tag">Chapter 0X</p>
  <h1 className="page-title pg-title">Page Name</h1>
  <p className="page-subtitle pg-desc">Short description.</p>
</div>
```

The `pg-tag`, `pg-title`, `pg-desc` classes are animation targets — GSAP fades them in on mount:

```ts
gsap.to('.pg-tag',   { opacity: 1, y: 0, duration: 0.7, delay: 0.3 });
gsap.to('.pg-title', { opacity: 1, y: 0, duration: 0.9, delay: 0.5 });
gsap.to('.pg-desc',  { opacity: 0.7, y: 0, duration: 0.8, delay: 0.7 });
```
