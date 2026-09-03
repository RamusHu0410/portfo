# Portfolio

Three pages — Intro, Music, STEM — in the parchment-and-brass style of
[Musicology Guesser](https://github.com/RamusHu0410/Musicology-Guesser).
All text and images are placeholders.

## Run it

- Need **Node 20+**
- `npm install`
- `npm run dev` — http://localhost:5173
- `npm run build` — type-check + bundle into `dist/`
- `npm run preview` — serve the build
- `npm run lint`

## Where to edit

- **Text and links live in the page that shows them** → [`src/pages/`](src/pages/)
- Header name + top nav → [`SiteHeader.tsx`](src/components/SiteHeader.tsx)
- Footer note + links → [`SiteFooter.tsx`](src/components/SiteFooter.tsx)
- Colours, type scale, decorations → [`src/styles/theme.css`](src/styles/theme.css)
- Reusable pieces → [`src/components/`](src/components/)

## Links

- Every linkable element takes an `href` prop, written inline in the page
- Default is **no link** — it still renders in full, just isn't clickable
- `''` → not a link
- `'/music'` → another page here, no reload
- `'#section-id'` → jump on the same page
- `'mailto:you@example.com'` → mail client
- `'https://example.com'` → external, new tab
- One component decides all of it: [`Linkable.tsx`](src/components/Linkable.tsx)

## Pages

- `/` Intro — hero, about + field notes, two wing cards, contact
- `/music` Music — feature quote, entry grid, ledger, notes
- `/stem` STEM — same shape, own content
- `*` Not found
- Cross-linked in three places: header nav, the two wing cards, and the `<PageNav>` pair at the foot of every page

## Style

- `.panel` + `.brackets` — paper sheet with four L-shaped corner marks
- `.eyebrow` — letterspaced brass label above a heading
- `.card-sunk` — inset tan card
- `.ledger` — two-column table
- `.rule`, `<Ornament />` — hairline dividers; `<Ornament label="II" />` sets a numeral in the rule
- `.btn-gold`, `.btn-ghost`, `.btn-plate` — three button weights
- `.dropcap` — brass initial on a paragraph
- `.margin-rule` — faint red notebook margin down the left edge

## Decoration and motion

- `<Reveal>` — fades and lifts a block in the first time it scrolls into view; `delay={120}` staggers a grid
- `<Flourish />` — the engraved printer's sprig above each page title; size it with `className`
- `<Corner at="tr" />` — the hairline filigree that turns the top corners of each page header; `at` picks the corner (`tl` / `tr` / `bl` / `br`), `className` places and sizes it
- `<Ruling variant="staff" />` — the ruling printed on the paper behind a section: a stave on Music, graph paper on STEM. Stave rules every 18px (`h-[73px]` = five lines), grid squares are 24px
- `<Portrait />` — the line-drawn portrait medallion in the Music header. The PNG is used as a CSS *mask*, so the ink colour comes from the theme (`bg-brass`), not the file
- Regenerate the portrait from a photo with `python3 scripts/sketch.py <photo> public/portrait.png --crop X Y W H …` — see the docstring for which knob does what
- `<CoffeeRing />` — the faint ring a cup leaves; put it behind a section with `-z-10`
- Hovering a linked panel pulls its corner brackets in and draws them longer, like a lens focusing
- Gold buttons catch a slow gleam on hover; arrows step in the direction they point (`.nudge`)
- The large glyph on each wing page drifts gently (`.glyph-float`); corner filigrees breathe (`.sway`); card glyphs lift on hover (`.glyph`)
- Each page settles in when routed to (`.page-enter`)
- All of it is off under `prefers-reduced-motion` — `<Reveal>` shows its content at once instead
- Type: **EB Garamond**, old-style figures, loaded in `index.html`
- Type scale lives in the `--text-*` tokens in `theme.css` — change them to resize everything at once
- Icons: inline SVG in [`Icon.tsx`](src/components/Icon.tsx); add to `paths` and the name works everywhere

## Tech stack

| | |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4, React Router |
| Content | Written inline in the pages. No CMS, no database. |
| Hosting | Not deployed yet. Any static host. |

- `vercel.json` already rewrites unknown paths to `index.html`
- On other hosts, set the same SPA fallback or `/music` 404s on refresh
