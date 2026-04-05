# Pages Reference

All six pages of the EndOfBeginning website.

---

## 1. Home — The Landing
**Route:** `/`  
**File:** `src/pages/Home.tsx`

### Purpose
The emotional hook. First impression. Sets the entire tone of the site.

### Sections
| Section | Description |
|---|---|
| Hero | Full-viewport — "EndOfBeginning" title with gradient animation, badge, subtitle, year |
| Manifesto | The philosophical statement about transition, not goodbye |
| Six Chapters | Card grid linking to all 5 other pages |
| Footer | College · Branch · Batch · tagline |

### Animations
- Title letters animate in one-by-one with bounce + rotation (GSAP)
- Gradient text cycles continuously (`@keyframes gradientShift`)
- Ambient glowing orbs drifting in background
- Particle network (canvas)
- Manifesto lines wipe in from below on scroll (`ScrollTrigger`)
- Chapter cards stagger-fade in on scroll
- Hero title parallax on scroll

### Placeholders still needed
- Nothing — all real content is in place

---

## 2. The Chronicles — Timeline
**Route:** `/chronicles`  
**File:** `src/pages/Chronicles.tsx`

### Purpose
Tell the story of four years through a visual timeline.

### Layout
Vertical alternating timeline — odd items on the left, even items on the right, connected by an animated spine line that fills as you scroll.

### Timeline Items (7 milestones)
| Date | Event |
|---|---|
| August 2022 | Day One — Orientation |
| 2022 Sem 1 | First Code, First Bug |
| 2023 | Hackathon Era Begins |
| 2023 Fests | Chaos, Music & the Canteen |
| 2024 3rd Year | Internship Season |
| 2025 | The Project Marathon |
| April 2026 | The Farewell — EndOfBeginning |

### Interactive Features
- **Flashback button** on each card — toggles a photo placeholder open/closed with smooth height animation

### Placeholders still needed
- Photos for each milestone (replace `photo-ph` divs with `<img>` tags)
- Hackathon names, internship companies, project titles in the body text

---

## 3. The Pantheon — Student Directory
**Route:** `/pantheon`  
**File:** `src/pages/Pantheon.tsx`

### Purpose
Individual recognition for every student.

### Layout
Searchable, filterable card grid. Click any card to open a modal with full details.

### Card Info
- Name
- Branch
- Quote
- Next destination (Placement / Higher Studies / Startup)

### Modal Info
- Photo
- Name + Branch
- Quote
- Signature move
- Next chapter (company / university / startup name)

### Filter Options
`All` · `Placement` · `Higher Studies` · `Startup`

### Placeholders still needed
- All 6 placeholder students need real data (name, quote, move, next)
- Expand to all 63 students once Vault photos are done (or keep as highlights)

---

## 4. The Vault — Student Gallery
**Route:** `/vault`  
**File:** `src/pages/Vault.tsx`

### Purpose
The complete batch photo gallery — every student in one place.

### Layout
4-column grid (responsive: 3 → 2 → 1 on smaller screens).

### Card Anatomy
```
┌─────────────────┐
│  [01]           │  ← card number
│                 │
│    [person      │
│     icon]       │  ← photo placeholder / actual photo
│                 │
├─────────────────┤
│  Student Name   │  ← Playfair Display
│  1JT22AI001     │  ← USN in small caps
└─────────────────┘
```

### Scroll Animation
Cards animate in **row by row** (4 at a time) as the user scrolls — each row has a staggered entrance (opacity + translateY + scale).

### Hover Effects
- Card lifts + slight scale
- Blue glow shadow
- Shimmer sweep across the card
- Person icon scales up

### Current Student Count
**63 students** — all USNs and names populated. See [students.md](students.md) for the full list.

### Next Step
Replace the person icon placeholders with actual student photos. See [content-guide.md](content-guide.md) for instructions.

---

## 5. Echoes — Messages & Tributes
**Route:** `/echoes`  
**File:** `src/pages/Echoes.tsx`

### Purpose
A community wall of words — juniors, seniors, and professors.

### Layout
Sticky-note style cards in a grid. Each note has a tinted background and a subtle pin at the top.

### Note Types & Colors
| Type | Color |
|---|---|
| Junior | Light blue `#d4e8f7` |
| Senior | Warm yellow `#f7f0d4` |
| Professor | Mint green `#d4f7e0` |

### Filter
`All` · `Junior` · `Senior` · `Professor`

### FAB (Floating Action Button)
Fixed bottom-right — **"+ Leave a Note"** button.  
Opens a glass-morphism modal form with:
- Name input
- Role select (Junior / Senior / Professor)
- Message textarea
- Submit shows a success state

> **Note:** Form submissions are front-end only currently. To persist notes, integrate a backend (Supabase, Firebase, or Formspree).

### Placeholders still needed
- Real notes from juniors and professors
- Senior "last words" for all 63 students

---

## 6. The Horizon — Future & Credits
**Route:** `/horizon`  
**File:** `src/pages/Horizon.tsx`

### Purpose
The final chapter. Where they go, what they leave behind, and the credits roll.

### Sections

#### World Map
Placeholder div with animated pulse-dot markers.  
**To upgrade:** integrate [Leaflet.js](https://leafletjs.com/) with real coordinates.

#### Where We're Going
Table showing: Name · City · Country · Next Chapter  
Currently 6 placeholder rows — expand with real destinations.

#### What We Leave Behind
Legacy items — hackathon wins, papers, startups, scholarships.  
All placeholders — fill in real achievements.

#### Cinematic Credits
- Film-style title card for "EndOfBeginning"
- Credit rows: Concept · Design · Photography · Video · Content · Coordination
- Closing tagline: *"The beginning was always the destination."*

### Placeholders still needed
- Real destinations for all students
- Legacy achievements (hackathon names, paper titles, startup names)
- Credit names (who designed, filmed, coordinated the farewell)
