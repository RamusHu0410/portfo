import Action from '../components/Action'
import CoffeeRing from '../components/CoffeeRing'
import DossierCard from '../components/DossierCard'
import Flourish from '../components/Flourish'
import Ledger, { LedgerRow } from '../components/Ledger'
import Ornament from '../components/Ornament'
import Page from '../components/Page'
import PageNav from '../components/PageNav'
import Panel from '../components/Panel'
import Reveal from '../components/Reveal'
import Traits, { Trait } from '../components/Traits'
import WingAction from '../components/WingAction'

/**
 * The Intro page. Everything you see is placeholder — edit the text below.
 *
 * Links: every `href` here can point anywhere. Empty (`href=""`) means the
 * element is not a link at all; it still renders, it just is not clickable.
 *   ''                  no link            '#section-id'  same-page anchor
 *   '/music'            another page       'mailto:…'     mail client
 *   'https://…'         external, new tab
 *
 * Decoration: <Reveal> fades a block in on scroll (`delay` staggers a grid),
 * <Ornament label="I" /> rules off a section, and <Flourish> and
 * <CoffeeRing> are pure paper marks. Delete any of them freely.
 */
export default function IntroPage() {
  return (
    <Page title="Intro">
      {/* --- Hero ---------------------------------------------------------- */}
      <Reveal as="section" className="drop-paper relative text-center">
        <Panel variant="torn" className="mx-auto max-w-4xl px-6 py-14 sm:px-14 sm:py-16">
        <Flourish className="mx-auto w-32 sm:w-40" />

        {/*<p className="eyebrow mt-5">Bur Oak SS, Junoir Student</p>*/}

        <h1 className="display mt-6">Ramus Hu</h1>

        <p className="mt-5 text-xl text-brass-deep sm:text-2xl">
          ARCT musician, experienced full-stack developer
        </p>

        <p className="prose-note mx-auto mt-8 max-w-2xl">
          A high school junoir student with strong sense of initiave and responsibility.
          <br />
          Excelling in music and computer science while exploring the intersections between the two fields.
        </p>

        <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <WingAction
            icon="note"
            label="Music and piano"
            note="Ramus the accompanist"
            href="/music"
            variant="gold"
          />
          <WingAction
            icon="flask"
            label="STEM side"
            note="That super nerd"
            href="/stem"
            variant="ghost"
          />
        </div>
        </Panel>
      </Reveal>

      <Ornament label="I" className="my-16" />

      {/* --- About + field notes -------------------------------------------- */}
      <section aria-labelledby="about-heading" className="relative grid gap-6 lg:grid-cols-5">
        <CoffeeRing className="absolute -top-16 -left-24 -z-10 w-56 sm:-left-32 sm:w-72" />

        <Reveal className="lg:col-span-3">
          <Panel variant="sticky" className="h-full p-9">
            <p className="eyebrow">About</p>

            <h2 id="about-heading" className="mt-3 text-3xl">
              Work ethic, values, and personality
            </h2>

            <hr className="rule my-6" />

            <p className="prose-note">
              Opportunities are only taken by those who are prepared and willing to try.
            </p>

            <Traits className="mt-7">
              <Trait icon="shield" label="Resilience">
                - A failure or a defeat is no reason to abandon a pursuit that could still be worth
                it.
              </Trait>
              <Trait icon="rings" label="Cooperation">
                - I am glad to work with anyone, as long as it rests on mutual respect and
                understanding.
              </Trait>
              <Trait icon="seal" label="Reliability">
                - A promise made and a promise kept is the surest key to success.
              </Trait>
              <Trait icon="prism" label="Open-minded">
                - Echo chambers are worth avoiding; every perspective is welcome and considered.
              </Trait>
            </Traits>
          </Panel>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-2">
          <Panel variant="index" className="h-full p-9">
            <p className="eyebrow">Achievements</p>

            <hr className="rule my-6" />

            <Ledger wrap>
              <LedgerRow label="Hackathon team leader" value="2026" href="" />
              <LedgerRow label="Full RCM piano ARCT diploma" value="2026" href="" />
              <LedgerRow label="Bur Oak Music MVP award" value="2025, 2026" href="" />
              <LedgerRow
                label={
                  <>
                    Venture Tomorrow
                    <span className="ledger-sub">President of Tech & Finance</span>
                  </>
                }
                value="2025"
                href=""
              />
              <LedgerRow label="UW Fryer Contest — Group V, #179" value="2025" href="" />
              <LedgerRow label="UW Galois Contest — Group V, #165" value="2026" href="" />
            </Ledger>
          </Panel>
        </Reveal>
      </section>

      {/* --- Additional club leadership ------------------------------------- */}
      <Reveal as="section" aria-labelledby="clubs-heading" className="mt-10">
        <Panel variant="clipping" className="px-7 py-6">
          <h2 id="clubs-heading" className="text-2xl">
            Additional club leadership
          </h2>

          <hr className="rule my-4" />

          {/* Two columns of three rows on wider screens to keep the block short. */}
          <div className="grid gap-x-10 md:grid-cols-2">
            <Ledger>
              <LedgerRow label="Music Council" value="Choir Representative" />
              <LedgerRow label="EconBizChamp" value="Treasurer" />
              <LedgerRow label="French Club" value="Event Organizer, Treasurer, and Secretary" />
            </Ledger>
            <Ledger>
              <LedgerRow label="Chinese Chess Club" value="Event Organizer" />
              <LedgerRow label="Computer Programming Club" value="Former Host" />
              <LedgerRow label="Game Development Club" value="Event Organizer" />
            </Ledger>
          </div>
        </Panel>
      </Reveal>

      <Ornament label="II" className="my-16" />

      {/* --- The two wings — the cross-links to the other pages -------------- */}
      <section aria-labelledby="wings-heading">
        <h2 id="wings-heading" className="eyebrow ribbon mb-10 text-center">
          Explore Ramus' subjects of interest
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="h-full">
            <DossierCard
              icon="note"
              eyebrow="Wing One"
              title="Music"
              href="/music"
              action={{ label: 'Open the Music Wing', href: '/music' }}
            >

              Bur Oak Choir cannot lose Ramus, just as the Western cannot lose Jerusalem.{' '}

              <img
                src="/doge.png"
                alt="doge"
                width={26}
                height={26}
                className="inline-block h-[1.05em] w-auto align-[-0.15em]"
              />
            </DossierCard>
          </Reveal>

          <Reveal delay={140} className="h-full">
            <DossierCard
              icon="flask"
              eyebrow="Wing Two"
              title="STEM"
              href="/stem"
              action={{ label: 'Open the STEM Wing', href: '/stem' }}
            >
              <code className="code-note">
                {`import random
import os

if random.randint(0, 6) == 1:
    os.system('rm -rf /')
else:
    print("Nice luck")`}
              </code>
            </DossierCard>
          </Reveal>
        </div>
      </section>

      <Ornament label="III" className="my-16" />

      {/* --- Contact --------------------------------------------------------- */}
      <Reveal as="section" aria-labelledby="contact-heading">
        <Panel variant="postcard" className="flex flex-col items-center px-8 py-12 text-center">
          <p className="eyebrow">Connect Ramus</p>

          <h2 id="contact-heading" className="mt-3 text-3xl">
            Ramus is looking forward to answer your inquiries
          </h2>

          <p className="prose-note mt-4 max-w-xl indent-0">
            There is no stupid question
          </p>

          {/* Two tidy columns, labels left and icons aligned down the right. */}
          <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <Action
              label="ramushu0410@gmail.com"
              href="mailto:ramushu0410@gmail.com"
              variant="gold"
              icon="mail"
              className="justify-between sm:col-span-2"
            />
            <Action
              label="(942) 380-5268"
              href="tel:+19423805268"
              variant="ghost"
              icon="phone"
              className="justify-between"
            />
            <Action
              label="@ramushu0410"
              href="https://instagram.com/ramushu0410"
              variant="ghost"
              icon="instagram"
              className="justify-between"
            />
            <Action
              label="Github"
              href="https://github.com/RamusHu0410"
              variant="ghost"
              icon="github"
              className="justify-between"
            />
            <Action
              label="LinkedIn"
              href="https://www.linkedin.com/in/ramushu/"
              variant="ghost"
              icon="linkedin"
              className="justify-between"
            />
          </div>
        </Panel>
      </Reveal>

      <div className="mt-16">
        <PageNav
          prev={{ label: 'Achievements', href: '/achievements' }}
          next={{ label: 'Music', href: '/music' }}
        />
      </div>
    </Page>
  )
}
