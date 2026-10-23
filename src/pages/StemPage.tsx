import CoffeeRing from '../components/CoffeeRing'
import EntryCard from '../components/EntryCard'
import Flourish from '../components/Flourish'
import Footprints from '../components/Footprints'
import HackathonMap from '../components/HackathonMap'
import Ledger, { LedgerRow } from '../components/Ledger'
import NoteList, { Note } from '../components/NoteList'
import Ornament from '../components/Ornament'
import Page from '../components/Page'
import PageNav from '../components/PageNav'
import Panel from '../components/Panel'
import Reveal from '../components/Reveal'
import Ruling from '../components/Ruling'

/**
 * The STEM page. Entries mirror the public repositories on
 * github.com/RamusHu0410 — keep them in step when a project ships.
 *
 * Links: every `href` here can point anywhere. Empty (`href=""`) means the
 * element is not a link at all; it still renders, it just is not clickable.
 *
 * Decoration: <Reveal> fades a block in on scroll (`delay` staggers a grid),
 * <Ornament label="I" /> rules off a section, and <Flourish>,
 * <Ruling> and <CoffeeRing> are pure paper marks. Delete any of them freely.
 */
export default function StemPage() {
  return (
    <Page title="STEM">
      <Reveal as="header" className="drop-paper relative text-center">
        <Panel variant="torn" className="mx-auto max-w-4xl px-6 py-14 sm:px-14 sm:py-16">
        <Flourish className="mx-auto w-32 sm:w-40" />

        <p className="eyebrow mt-5">Wing Two</p>

        <h1 className="display mt-5">STEM</h1>

        <p className="prose-note mx-auto mt-7 max-w-2xl">
          Full-stack developer experienced in <span className="lang-mark">Python</span> and{' '}
          <span className="lang-mark">TypeScript</span>.
        </p>

        <ul className="hero-points mx-auto mt-5 max-w-2xl">
          <li>
            <span className="dash-mark" aria-hidden="true" />
            Leads a prize-winning hackathon team
          </li>
          <li>
            <span className="dash-mark" aria-hidden="true" />
            Has shipped multiple products to the web and the App Store
          </li>
        </ul>
        </Panel>
      </Reveal>

      {/* --- Hackathon map ---------------------------------------------------
          Campuses and events live in components/HackathonMap.tsx (SITES). */}
      <section aria-labelledby="map-heading" className="relative mt-16">
        {/* Footprints walking up the paper beside the map. Wide screens only,
            where there is open paper for them. */}
        <Footprints className="absolute top-24 -left-6 -z-10 hidden w-36 lg:block xl:-left-20 xl:w-44" />
        <h2 id="map-heading" className="eyebrow ribbon mb-10 text-center">
          Hackathon Trail
        </h2>

        <Reveal className="mx-auto max-w-3xl">
          <Panel variant="clipping" className="px-4 pt-7 pb-6 sm:px-8 sm:pt-9 sm:pb-7">
            <HackathonMap />

            <div className="hm-legend mt-5 px-1">
              <span>Lake Huron to Montréal</span>
              <span className="eyebrow ml-auto">Hover or tap a crest</span>
            </div>

            <p className="hm-credit mt-3 px-1">
              Emblems belong to their universities. Map data from{' '}
              <a href="https://www.naturalearthdata.com/">Natural Earth</a>.
            </p>
          </Panel>
        </Reveal>
      </section>

      <Ornament label="I" className="my-16" />

      {/* --- Entries ---------------------------------------------------------- */}
      <section aria-labelledby="entries-heading" className="relative">
        <Ruling variant="grid" className="absolute -top-10 -right-10 -left-10 -z-10 h-[97px]" />
        <CoffeeRing className="absolute top-40 -left-24 -z-10 w-56 sm:-left-32 sm:w-72" />

        <h2 id="entries-heading" className="eyebrow ribbon mb-10 text-center">
          Selected Projects
        </h2>

        {/* Featured: the flagship project, full width above the grid. No image on purpose. */}
        <Reveal className="mb-6">
          <EntryCard
            wide
            title="Hu-Accompany"
            meta="Featured · Jun 2026 — ongoing"
            href="https://github.com/RamusHu0410/hu-accompany"
            tags={[
              { label: 'Python', href: '' },
              { label: 'Flutter', href: '' },
              { label: 'Rust FFI', href: '' },
              { label: 'App Store', href: '' },
            ]}
            action={{ label: 'Source', href: 'https://github.com/RamusHu0410/hu-accompany' }}
          >
            A practice grader for pianists, open source and free on the App Store. It averages
            several good recordings into a reference, then scores your own on pitch, duration and
            dynamics, with a rubato check so expressive playing is not punished. Python backend,
            Flutter client, Rust for the native audio path.
          </EntryCard>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="h-full">
            <EntryCard
              title="Musicology Guesser"
              meta="Aug 2026"
              href="https://musicology-guesser.vercel.app/"
              tags={[
                { label: 'React 19', href: '' },
                { label: 'TypeScript', href: '' },
                { label: 'Spring Boot', href: '' },
              ]}
              action={{ label: 'Source', href: 'https://github.com/RamusHu0410/Musicology-Guesser' }}
              image={{
                src: '/projects/musicology-guesser.jpg',
                alt: 'Musicology Guesser game screen: a handwritten score beside a map of Europe for guessing the region',
              }}
            >
              Guess the composer from an excerpt of the manuscript. Four axes — composer, era,
              region, instrumentation — 500 points each, plus a Field Guide for beginners and a
              collection you unlock as your ear improves. React and Zustand front end, Java 21 and
              Spring Boot behind it, no database.
            </EntryCard>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <EntryCard
              title="CircuitForge"
              meta="2026"
              href="https://github.com/RamusHu0410/CircuitForge"
              tags={[
                { label: 'Python', href: '' },
                { label: 'TypeScript', href: '' },
                { label: 'KiCad', href: '' },
              ]}
              action={{ label: 'Source', href: 'https://github.com/RamusHu0410/CircuitForge' }}
              image={{
                src: '/projects/circuitforge.jpg',
                alt: 'CircuitForge tutorial screen: a push-button LED schematic beside live voltage and current readings',
              }}
            >
              A beginner-friendly companion for KiCad. Describe a circuit in plain English and a
              rule-based engine builds the schematic, checks it with KiCad’s own ERC, and explains
              every value. A built-in lab simulates the circuit in 2D and 3D, with lessons and
              quizzes.
            </EntryCard>
          </Reveal>

          <Reveal className="h-full">
            <EntryCard
              title="Venture Tomorrow"
              meta="Jun 2026"
              href="https://venture-tomorrow.vercel.app"
              tags={[
                { label: 'Next.js', href: '' },
                { label: 'Prisma', href: '' },
                { label: 'Postgres', href: '' },
              ]}
              action={{ label: 'Live site', href: 'https://venture-tomorrow.vercel.app' }}
              image={{
                src: '/projects/venture-tomorrow.jpg',
                alt: 'Venture Tomorrow home page with the headline Building Tomorrow’s Tech Founders',
              }}
            >
              A site for a student venture programme: events, members, and two application forms
              that write straight to Postgres through Prisma. Next.js app router with API routes,
              Framer Motion for the glass-and-grid look.
            </EntryCard>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <EntryCard
              title="Room Portfolio"
              meta="Jul 2026"
              href="https://ramus-room.vercel.app"
              tags={[
                { label: 'Three.js', href: '' },
                { label: 'React Three Fiber', href: '' },
              ]}
              action={{ label: 'Live demo', href: 'https://ramus-room.vercel.app' }}
              image={{
                src: '/projects/room-portfolio.jpg',
                alt: 'A moonlit 3D bedroom with a desk, glowing laptop and piano, labels floating over each clickable object',
              }}
            >
              An earlier portfolio you explore instead of scroll — a 3D room built with Three.js and
              React Three Fiber, where each object opens a part of the story. The reason this
              paper-and-brass version exists.
            </EntryCard>
          </Reveal>
        </div>
      </section>

      <Ornament label="II" className="my-16" />

      {/* --- Ledger + notes ---------------------------------------------------- */}
      <section className="grid gap-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          {/* Type matched to the Notes panel: labels at .825rem/.16em, values at 1.14rem. */}
          <Panel variant="index" className="h-full p-9 [&_.ledger_td]:text-[1.14rem] [&_.ledger_td]:text-ink [&_.ledger_th]:text-[0.825rem] [&_.ledger_th]:tracking-[0.16em]">
            <h2 className="eyebrow">Tech Stack</h2>
            <hr className="rule mt-6 mb-2" />

            <Ledger>
              <LedgerRow
                label="Frontend"
                value="React 19, TypeScript, Next.js, Vite, Tailwind, Zustand"
                href=""
              />
              <LedgerRow
                label="Backend"
                value="Java 21 with Spring Boot, Python, Next.js API routes"
                href=""
              />
              <LedgerRow label="Also" value="Rust FFI, Flutter and Dart, Three.js" href="" />
              <LedgerRow
                label="Data"
                value="Postgres with Prisma, JSON content, no ORM heroics"
                href=""
              />
            </Ledger>
          </Panel>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-2">
          <Panel variant="sticky" className="h-full p-9">
            <h2 className="eyebrow">Notes</h2>
            <hr className="rule mt-6 mb-6" />

            <NoteList>
              <Note label="GitHub" href="https://github.com/RamusHu0410">
                All five repositories are public — read the source, open an issue.
              </Note>
              <Note label="Open to" href="mailto:ramushu0410@gmail.com">
                Hackathons, internships, and anyone building at the seam of music and code.
              </Note>
            </NoteList>
          </Panel>
        </Reveal>
      </section>

      <div className="mt-16">
        <PageNav prev={{ label: 'Music', href: '/music' }} next={{ label: 'Achievements', href: '/achievements' }} />
      </div>
    </Page>
  )
}
