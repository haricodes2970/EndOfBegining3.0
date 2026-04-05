# Content Guide — What Needs to Be Filled In

This file tracks every placeholder across the site and exactly how to replace it.

---

## How to find placeholders

Search the codebase for these strings:
```
[Add
[Name]
placeholder
```

---

## The Vault — Student Photos

### Step 1: Prepare photos
- Recommended size: **400×400px** square, JPG or WebP
- Name each file by USN: `1JT22AI001.jpg`, `1JT22AI002.jpg`, etc.
- Place all files in: `src/assets/students/`

### Step 2: Import and map in Vault.tsx
At the top of `src/pages/Vault.tsx`, import each photo and add a `photo` field:

```ts
import akash from '../assets/students/1JT22AI001.jpg';
// ... repeat for each student

const students = [
  { id: 1, usn: '1JT22AI001', name: 'Akash M Athreyas', photo: akash },
  // ...
];
```

### Step 3: Replace the icon in the card
In `Vault.tsx`, replace the `ph-icon` block:
```tsx
// BEFORE
<div className="ph-icon">
  <svg>...</svg>
</div>

// AFTER
<img src={s.photo} alt={s.name} className="student-photo-img" />
```

Add to `Vault.css`:
```css
.student-photo-img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: top center;
}
```

---

## The Chronicles — Timeline Photos

Each timeline item has a `flashback-photo` section. To add a real photo:

In `Chronicles.tsx`, add a `photo` field to each item in the `items` array:
```ts
{ id: 1, ..., photo: orientationImg }
```

Then in the JSX, replace `<div className="photo-ph">`:
```tsx
<img src={item.photo} alt={item.title} style={{ width:'100%', borderRadius:'10px' }} />
```

---

## The Chronicles — Text Content

Open `src/pages/Chronicles.tsx` and edit the `items` array:

| ID | What to fill in |
|---|---|
| 3 | Hackathon names and wins |
| 5 | Internship companies |
| 6 | Final project titles/themes |

---

## The Pantheon — Student Data

Open `src/pages/Pantheon.tsx` and expand the `students` array with all 63 students.

Each entry needs:
```ts
{
  id: 1,
  name: 'Full Name',
  branch: 'BE AI & ML',
  quote: '"Their actual quote"',
  move: 'Their signature move or nickname',
  next: 'Placement' | 'Higher Studies' | 'Startup',
  nextDetail: 'Company / University / Startup name',
}
```

---

## The Echoes — Real Notes

Open `src/pages/Echoes.tsx` and add real messages to the `notes` array:

```ts
{
  id: 9,
  from: 'Real Name',
  role: 'Junior' | 'Senior' | 'Professor',
  message: 'Their actual message',
  color: '#d4e8f7', // Junior=blue, Senior=yellow, Professor=mint
}
```

---

## The Horizon — Destinations

Open `src/pages/Horizon.tsx` and fill in the `destinations` array:

```ts
{ name: 'Student Name', city: 'Bengaluru', country: 'India', next: 'Placement' }
```

Also fill in the `legacy` array with real batch achievements:
```ts
{ icon: '🏆', text: 'Won Smart India Hackathon 2024 — Project Name' }
```

And the `credits` array for who made the farewell happen:
```ts
{ role: 'Concept & Direction', name: 'Your Name' }
```

---

## Nav & Branding

Everything is already set:
- College: Jyothy Institute of Technology
- Branch: BE AI & ML
- Batch: 2022–26
- Logo: `src/assets/ainexus.jpeg`

---

## Global Placeholders Tracker

| Page | Item | Status |
|---|---|---|
| Home | All text content | ✅ Done |
| Home | Hero badge + year line | ✅ Done |
| Chronicles | 7 milestone texts | ✅ Done (needs real detail) |
| Chronicles | Flashback photos | ⬜ Needs photos |
| Pantheon | Student cards | ⬜ Needs all 63 students |
| Vault | Student photos | ⬜ Needs photos |
| Vault | Student names + USNs | ✅ Done — all 63 |
| Echoes | Note wall content | ⬜ Needs real messages |
| Horizon | Destinations table | ⬜ Needs real data |
| Horizon | Legacy list | ⬜ Needs real achievements |
| Horizon | Credits section | ⬜ Needs real names |
