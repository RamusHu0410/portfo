import { useState } from 'react'
import CoffeeRing from '../components/CoffeeRing'
import Corner from '../components/Corner'
import EntryCard from '../components/EntryCard'
import FeatureCard from '../components/FeatureCard'
import Flourish from '../components/Flourish'
import Ledger, { LedgerRow } from '../components/Ledger'
import Ornament from '../components/Ornament'
import Page from '../components/Page'
import PageNav from '../components/PageNav'
import Panel from '../components/Panel'
import Portrait from '../components/Portrait'
import Reveal from '../components/Reveal'
import Ruling from '../components/Ruling'

/**
 * The Music page. Everything you see is placeholder — edit the text below.
 *
 * Links: every `href` here can point anywhere. Empty (`href=""`) means the
 * element is not a link at all; it still renders, it just is not clickable.
 *
 * Decoration: <Reveal> fades a block in on scroll (`delay` staggers a grid),
 * <Ornament label="I" /> rules off a section, and <Flourish>, <Portrait>,
 * <Corner>, <Ruling> and <CoffeeRing> are pure paper marks. Delete any freely.
 */
export default function MusicPage() {
  const [ramusodyClicks, setRamusodyClicks] = useState(0)

  return (
    <Page title="Music">
      <Reveal as="header" className="relative text-center">
        <Portrait
          src="/portrait.png"
          alt="Line drawing of Ramus Hu at a grand piano, from a photograph"
          className="absolute -top-4 -left-2 w-32 sm:-top-10 sm:-left-10 sm:w-48"
        />

        <Corner
          at="tr"
          className="absolute -top-6 -right-1 w-24 opacity-70 sm:-top-8 sm:-right-8 sm:w-32"
        />

        <Flourish className="mx-auto w-32 sm:w-40" />

        <p className="eyebrow mt-5">Wing One</p>

        <h1 className="display mt-5">Music</h1>

        <p className="prose-note mx-auto mt-7 max-w-2xl">
          An experienced collaborative artist who had accompanist exams, auditions and performances.
        </p>
      </Reveal>

      {/* --- Statement ------------------------------------------------------- */}
      <Reveal className="mt-14">
        <FeatureCard
          icon="quill"
          dropcap
          size="md"
          cite="Ms. Lee, choir director — Music Award Ceremony, 2026"
          action={{
            label: 'Spring Ramusody!!!',
            href: '',
            onClick: () => setRamusodyClicks((clicks) => clicks + 1),
          }}
          actionAside={
            <span
              aria-live="polite"
              className="rounded-full border border-rule px-3.5 py-1 text-[0.8rem] tracking-[0.14em] text-ink-faint uppercase"
            >
              {ramusodyClicks === 1 ? '×' : '×'} {ramusodyClicks}
            </span>
          }
        >
          After Ramus was part of 10 out of 16 front-of-curtain auditions, we — the teachers —
          decided that our concert should be called Spring Ramusody instead of Spring Rhapsody.
        </FeatureCard>
      </Reveal>

      <Ornament label="I" className="my-16" />

      {/* --- Entries ---------------------------------------------------------- */}
      <section aria-labelledby="entries-heading" className="relative">
        <Ruling variant="staff" className="absolute -top-8 -right-10 -left-10 -z-10 h-[73px]" />
        <CoffeeRing className="absolute top-40 -right-24 -z-10 w-56 sm:-right-32 sm:w-72" />

        <h2 id="entries-heading" className="eyebrow mb-8 text-center">
          Selected Work
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal delay={120} className="h-full">
            <EntryCard
              title="Selection of Chopin Piano Concerto 1 in E minor, Op. 11"
              meta="mar 2026"
              href="https://www.instagram.com/p/DVXSPL2iE-6/"
              action={{ label: 'Listen', href: 'https://www.instagram.com/p/DVXSPL2iE-6/' }}
            >
              Recording of Chopin most beautiful Melody on his 216th anniversary.
            </EntryCard>
          </Reveal>

          <Reveal className="h-full">
            <EntryCard
              title="Chopin — Polonaise in A-flat major, Op. 53"
              meta="Dec 2025"
              href="https://youtu.be/3vIi7mJCrao"
              action={{ label: 'Listen', href: 'https://youtu.be/3vIi7mJCrao' }}
            >
              Maestro!! Heroic Polonaise at 2025 Winter Concert.
            </EntryCard>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <EntryCard
              title="Chopin — Ballade No. 3 in A-flat major, Op. 47"
              meta="Jun Dec 2025"
              href="https://youtu.be/Gtq1ZB71_vI"
              action={{ label: 'Listen', href: 'https://youtu.be/Gtq1ZB71_vI' }}
            >
              Found inspiration after an exhausting concert.
            </EntryCard>
          </Reveal>

          <Reveal className="h-full">
            <EntryCard
              title="Chopin — Étude Op. 10 No. 12, “Revolutionary”"
              meta="Sep 2025"
              href="https://youtu.be/OgJFlb6_IMY"
              action={{ label: 'Listen', href: 'https://youtu.be/OgJFlb6_IMY' }}
            >
              Inspired after the 2025 V-day Military Parade
            </EntryCard>
          </Reveal>
        </div>
      </section>

      {/* --- Accompanist / contact --------------------------------------------- */}
      <Reveal className="mt-16">
        <Panel className="p-9">
          <h2 className="eyebrow">Accompanist Available</h2>
          <hr className="rule mt-6 mb-2" />

          <Ledger>
            <LedgerRow label="Email" value="ramushu0410@gmail.com" href="mailto:ramushu0410@gmail.com" />
            <LedgerRow label="Phone" value="+1 (942) 380-5268" href="tel:+19423805268" />
            <LedgerRow
              label="Instagram"
              value="@ramushu0410"
              href="https://www.instagram.com/ramushu0410"
            />
          </Ledger>
        </Panel>
      </Reveal>

      <div className="mt-16">
        <PageNav prev={{ label: 'Intro', href: '/' }} next={{ label: 'STEM', href: '/stem' }} />
      </div>
    </Page>
  )
}
