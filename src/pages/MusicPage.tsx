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
          A placeholder introduction to the music side of things. Two sentences at most — what you
          play, what you write, and what the entries below are.
        </p>
      </Reveal>

      {/* --- Statement ------------------------------------------------------- */}
      <Reveal className="mt-14">
        <FeatureCard icon="quill" dropcap action={{ label: 'A link for this card', href: '' }}>
          A short pull quote or statement of intent goes here — the one sentence you would want
          someone to read if they read nothing else on this page.
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
          <Reveal className="h-full">
            <EntryCard
              title="First placeholder entry"
              meta="Year"
              href=""
              tags={[
                { label: 'Tag', href: '' },
                { label: 'Tag', href: '' },
              ]}
              action={{ label: 'Listen', href: '' }}
            >
              A couple of lines describing this piece, recording, or performance. Replace with your
              own.
            </EntryCard>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <EntryCard
              title="Second placeholder entry"
              meta="Year"
              href=""
              tags={[
                { label: 'Tag', href: '' },
                { label: 'Tag', href: '' },
              ]}
              action={{ label: 'Listen', href: '' }}
            >
              A couple of lines describing this piece, recording, or performance. Replace with your
              own.
            </EntryCard>
          </Reveal>

          <Reveal className="h-full">
            <EntryCard
              title="Third placeholder entry"
              meta="Year"
              href=""
              tags={[{ label: 'Tag', href: '' }]}
              action={{ label: 'Score', href: '' }}
            >
              A couple of lines describing this piece, recording, or performance. Replace with your
              own.
            </EntryCard>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <EntryCard
              title="Fourth placeholder entry"
              meta="Year"
              href=""
              tags={[{ label: 'Tag', href: '' }]}
              action={{ label: 'Programme note', href: '' }}
            >
              A couple of lines describing this piece, recording, or performance. Replace with your
              own.
            </EntryCard>
          </Reveal>
        </div>
      </section>

      <Ornament label="II" className="my-16" />

      {/* --- Ledger + notes ---------------------------------------------------- */}
      <section className="grid gap-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <Panel className="h-full p-9">
            <h2 className="eyebrow">At a Glance</h2>
            <hr className="rule mt-6 mb-2" />

            <Ledger>
              <LedgerRow label="Instruments" value="Placeholder — instrument, instrument" href="" />
              <LedgerRow label="Repertoire" value="Placeholder — period, period, period" href="" />
              <LedgerRow label="Writing" value="Placeholder — arranging, transcription" href="" />
              <LedgerRow label="Ensembles" value="Placeholder — group, group" href="" />
            </Ledger>
          </Panel>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-2">
          <Panel className="h-full p-9">
            <h2 className="eyebrow">Notes</h2>
            <hr className="rule mt-6 mb-6" />

            <NoteList>
              <Note label="Note one" href="">
                A short placeholder line.
              </Note>
              <Note label="Note two" href="">
                A short placeholder line.
              </Note>
              <Note label="Note three" href="">
                A short placeholder line.
              </Note>
            </NoteList>
          </Panel>
        </Reveal>
      </section>

      <div className="mt-16">
        <PageNav prev={{ label: 'Intro', href: '/' }} next={{ label: 'STEM', href: '/stem' }} />
      </div>
    </Page>
  )
}
