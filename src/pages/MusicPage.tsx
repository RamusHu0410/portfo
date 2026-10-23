import { useState } from 'react'
import CoffeeRing from '../components/CoffeeRing'
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
 * <Ruling> and <CoffeeRing> are pure paper marks. Delete any freely.
 */
export default function MusicPage() {
  const [ramusodyClicks, setRamusodyClicks] = useState(0)

  return (
    <Page title="Music">
      <Reveal as="header" className="drop-paper relative text-center">
        <Panel variant="torn" className="mx-auto max-w-4xl px-6 pt-44 pb-14 sm:px-14 sm:pt-16 sm:pb-16">
        {/* Inside the note, not behind it: a later positioned sibling paints
            over an earlier one, which is what used to hide the drawing. */}
        <Portrait
          src="/portrait.png"
          alt="Ha no photo for u"
          className="absolute top-6 left-1/2 z-10 w-28 -translate-x-1/2 sm:top-8 sm:left-8 sm:w-40 sm:translate-x-0"
        />
        <Flourish className="mx-auto w-32 sm:w-40" />

        <p className="eyebrow mt-5">Wing One</p>

        <h1 className="display mt-5">Music</h1>

        <p className="prose-note mx-auto mt-7 max-w-2xl">
          An experienced collaborative pianist for exams, auditions and performances.
        </p>

        {/* Same highlight list as the STEM hero, so both wings set their roles alike. */}
        <ul className="hero-points mx-auto mt-5 max-w-2xl">
          <li>
            <span className="dash-mark" aria-hidden="true" />
            First accompanist, Bur Oak Choir
          </li>
          <li>
            <span className="dash-mark" aria-hidden="true" />
            Alternate pianist, Toronto Youth Symphony Orchestra
          </li>
        </ul>
        </Panel>
      </Reveal>

      {/* --- Statement ------------------------------------------------------- */}
      <Reveal className="mt-10">
        <FeatureCard
          icon="quill"
          compact
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
              × {ramusodyClicks}
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

        <h2 id="entries-heading" className="eyebrow ribbon mb-10 text-center">
          Selected Work
        </h2>

        {/* Featured: the one recording with a still, full width, image beside text. */}
        <Reveal className="mb-6">
          <EntryCard
            wide
            title="Chopin — Polonaise in A-flat major, Op. 53"
            meta="Dec 2025"
            href="https://youtu.be/3vIi7mJCrao"
            action={{ label: 'Listen', href: 'https://youtu.be/3vIi7mJCrao' }}
            image={{
              src: '/recordings/polonaise-op53.jpg',
              play: true,
              alt: 'Ramus playing a Steinway grand on a dark stage at the 2025 Winter Concert',
            }}
          >
            Maestro!! The “Heroic” Polonaise at the 2025 Winter Concert.
          </EntryCard>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal className="h-full">
            <EntryCard
              title="Chopin — Piano Concerto No. 1 in E minor, Op. 11 (selection)"
              meta="Mar 2026"
              href="https://www.instagram.com/p/DVXSPL2iE-6/"
              action={{ label: 'Listen', href: 'https://www.instagram.com/p/DVXSPL2iE-6/' }}
            >
              Chopin’s most beautiful melody, recorded on his 216th birthday.
            </EntryCard>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <EntryCard
              title="Chopin — Ballade No. 3 in A-flat major, Op. 47"
              meta="Jun – Dec 2025"
              href="https://youtu.be/Gtq1ZB71_vI"
              action={{ label: 'Listen', href: 'https://youtu.be/Gtq1ZB71_vI' }}
            >
              Found inspiration after an exhausting concert.
            </EntryCard>
          </Reveal>

          <Reveal delay={240} className="h-full">
            <EntryCard
              title="Chopin — Étude Op. 10 No. 12, “Revolutionary”"
              meta="Sep 2025"
              href="https://youtu.be/OgJFlb6_IMY"
              action={{ label: 'Listen', href: 'https://youtu.be/OgJFlb6_IMY' }}
            >
              Inspired by the 2025 V-Day military parade.
            </EntryCard>
          </Reveal>
        </div>
      </section>

      {/* --- Accompanist / contact --------------------------------------------- */}
      <Reveal className="mt-16">
        {/* Same ledger type as the STEM Tech Stack panel: labels .825rem/.16em, values 1.14rem. */}
        <Panel
          variant="index"
          className="p-9 [&_.ledger_td]:text-[1.14rem] [&_.ledger_td]:text-ink [&_.ledger_th]:text-[0.825rem] [&_.ledger_th]:tracking-[0.16em]"
        >
          <h2 className="eyebrow">Accompanist available</h2>
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
