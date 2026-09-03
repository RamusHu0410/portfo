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
 * The STEM page. Everything you see is placeholder — edit the text below.
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
          A placeholder introduction to the technical side of things. What you build, what you
          study, and what the entries below are.
        </p>
      </Reveal>

      {/* --- Statement ------------------------------------------------------- */}
      <Reveal className="mt-14">
        <FeatureCard icon="compass" action={{ label: 'A link for this card', href: '' }}>
          A short pull quote or statement of intent goes here — how you approach a problem, or what
          kind of work you want more of.
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
              title="First placeholder project"
              meta="Year"
              href=""
              tags={[
                { label: 'Tag', href: '' },
                { label: 'Tag', href: '' },
              ]}
              action={{ label: 'Source', href: '' }}
            >
              A couple of lines on what this project does, what you built, and why it exists.
              Replace with your own.
            </EntryCard>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <EntryCard
              title="Second placeholder project"
              meta="Year"
              href=""
              tags={[
                { label: 'Tag', href: '' },
                { label: 'Tag', href: '' },
              ]}
              action={{ label: 'Live demo', href: '' }}
            >
              A couple of lines on what this project does, what you built, and why it exists.
              Replace with your own.
            </EntryCard>
          </Reveal>

          <Reveal className="h-full">
            <EntryCard
              title="Third placeholder project"
              meta="Year"
              href=""
              tags={[{ label: 'Tag', href: '' }]}
              action={{ label: 'Source', href: '' }}
            >
              A couple of lines on what this project does, what you built, and why it exists.
              Replace with your own.
            </EntryCard>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <EntryCard
              title="Fourth placeholder project"
              meta="Year"
              href=""
              tags={[{ label: 'Tag', href: '' }]}
              action={{ label: 'Write-up', href: '' }}
            >
              A couple of lines on what this project does, what you built, and why it exists.
              Replace with your own.
            </EntryCard>
          </Reveal>
        </div>
      </section>

      <Ornament label="II" className="my-16" />

      {/* --- Ledger + notes ---------------------------------------------------- */}
      <section className="grid gap-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <Panel className="h-full p-9">
            <h2 className="eyebrow">Tech Stack</h2>
            <hr className="rule mt-6 mb-2" />

            <Ledger>
              <LedgerRow
                label="Frontend"
                value="Placeholder — framework, language, tooling"
                href=""
              />
              <LedgerRow label="Backend" value="Placeholder — language, framework" href="" />
              <LedgerRow label="Data" value="Placeholder — store, format" href="" />
              <LedgerRow label="Hosting" value="Placeholder — where it runs" href="" />
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
        <PageNav prev={{ label: 'Music', href: '/music' }} next={{ label: 'Intro', href: '/' }} />
      </div>
    </Page>
  )
}
