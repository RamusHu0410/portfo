import CoffeeRing from '../components/CoffeeRing'
import Corner from '../components/Corner'
import EntryCard from '../components/EntryCard'
import FeatureCard from '../components/FeatureCard'
import Flourish from '../components/Flourish'
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
 * <Ornament label="I" /> rules off a section, and <Flourish>, <Corner>,
 * <Ruling> and <CoffeeRing> are pure paper marks. Delete any of them freely.
 */
export default function StemPage() {
  return (
    <Page title="STEM">
      <Reveal as="header" className="relative text-center">
        <Corner
          at="tr"
          className="absolute -top-6 -right-1 w-24 opacity-70 sm:-top-8 sm:-right-8 sm:w-32"
        />
        <Corner
          at="tl"
          className="absolute -top-6 -left-1 w-24 opacity-70 sm:-top-8 sm:-left-8 sm:w-32"
        />

        <Flourish className="mx-auto w-32 sm:w-40" />

        <p className="eyebrow mt-5">Wing Two</p>

        <h1 className="display mt-5">STEM</h1>

        <p className="prose-note mx-auto mt-7 max-w-2xl">
          A full-stack developer who ships. React and TypeScript on the front, Java and Python
          behind it, and a habit of pointing all of it back at music.
        </p>
      </Reveal>

      {/* --- Statement ------------------------------------------------------- */}
      <Reveal className="mt-14">
        <FeatureCard
          icon="flask"
          size="md"
          cite="Five public repositories and counting"
          action={{ label: 'github.com/RamusHu0410', href: 'https://github.com/RamusHu0410' }}
        >
          I learn a stack by building something real with it — a composer-guessing game, a practice
          grader, a club site, a room you can walk around in. The projects below are all live, and
          all of them started as a problem I actually had.
        </FeatureCard>
      </Reveal>

      <Ornament label="I" className="my-16" />

      {/* --- Entries ---------------------------------------------------------- */}
      <section aria-labelledby="entries-heading" className="relative">
        <Ruling variant="grid" className="absolute -top-10 -right-10 -left-10 -z-10 h-[97px]" />
        <CoffeeRing className="absolute top-40 -left-24 -z-10 w-56 sm:-left-32 sm:w-72" />

        <h2 id="entries-heading" className="eyebrow mb-8 text-center">
          Selected Projects
        </h2>

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
            >
              Guess the composer from an excerpt of the manuscript. Four axes — composer, era,
              region, instrumentation — 500 points each, plus a Field Guide for beginners and a
              collection you unlock as your ear improves. React and Zustand front end, Java 21 and
              Spring Boot behind it, no database.
            </EntryCard>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <EntryCard
              title="hu-accompany"
              meta="Jun 2026 — ongoing"
              href="https://github.com/RamusHu0410/hu-accompany"
              tags={[
                { label: 'Python', href: '' },
                { label: 'Flutter', href: '' },
                { label: 'Rust FFI', href: '' },
              ]}
              action={{ label: 'Source', href: 'https://github.com/RamusHu0410/hu-accompany' }}
            >
              A practice grader for pianists. It averages several good recordings into a reference,
              then scores your own on pitch, duration and dynamics — with a rubato check so
              expressive playing is not punished. Python backend, Flutter client, Rust for the
              native audio path.
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
          <Panel className="h-full p-9 [&_.ledger_td]:text-[1.14rem] [&_.ledger_td]:text-ink [&_.ledger_th]:text-[0.825rem] [&_.ledger_th]:tracking-[0.16em]">
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
          <Panel className="h-full p-9">
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
        <PageNav prev={{ label: 'Music', href: '/music' }} next={{ label: 'Intro', href: '/' }} />
      </div>
    </Page>
  )
}
