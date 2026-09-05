import Action from '../components/Action'
import CoffeeRing from '../components/CoffeeRing'
import Corner from '../components/Corner'
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
 * <Ornament label="I" /> rules off a section, and <Flourish>, <Corner> and
 * <CoffeeRing> are pure paper marks. Delete any of them freely.
 */
export default function IntroPage() {
  return (
    <Page title="Intro">
      {/* --- Hero ---------------------------------------------------------- */}
      <Reveal as="section" className="relative text-center">
        <Corner
          at="tr"
          className="absolute -top-6 -right-1 w-24 opacity-70 sm:-top-8 sm:-right-8 sm:w-32"
        />
        <Corner
          at="tl"
          className="absolute -top-6 -left-1 w-24 opacity-70 sm:-top-8 sm:-left-8 sm:w-32"
        />

        <Flourish className="mx-auto w-32 sm:w-40" />

        {/*<p className="eyebrow mt-5">Bur Oak SS, Junoir Student</p>*/}

        <h1 className="display mt-6">Ramus Hu</h1>

        <p className="mt-5 text-xl text-brass-deep sm:text-2xl">
          ARCT musician, experienced full-stack developer
        </p>

        <p className="prose-note mx-auto mt-8 max-w-2xl">
          An ambitious high school student with a strong foundation in software engineering, AI
          development, music, and collaborative leadership. Committed to excellence in musical
          performance and technical innovation, while actively seeking opportunities and constructs
          impactful projects connecting the two fields to apply my skills to real-world.
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
      </Reveal>

      <Ornament label="I" className="my-16" />

      {/* --- About + field notes -------------------------------------------- */}
      <section aria-labelledby="about-heading" className="relative grid gap-6 lg:grid-cols-5">
        <CoffeeRing className="absolute -top-16 -left-24 -z-10 w-56 sm:-left-32 sm:w-72" />

        <Reveal className="lg:col-span-3">
          <Panel className="h-full p-9">
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
          <Panel className="h-full p-9">
            <p className="eyebrow">Achievements</p>

            <hr className="rule my-6" />

            <Ledger wrap>
              <LedgerRow label="UW Fryer Contest — Group V, #179" value="2025" href="" />
              <LedgerRow label="UW Galois Contest — Group V, #165" value="2026" href="" />
              <LedgerRow label="Accompanist Guild Hackathon team leader" value="2026" href="" />
              <LedgerRow label="Full ARCT diploma" value="2026" href="" />
              <LedgerRow label="Bur Oak Music MVP award" value="2025, 2026" href="" />
            </Ledger>
          </Panel>
        </Reveal>
      </section>

      <Ornament label="II" className="my-16" />

      {/* --- The two wings — the cross-links to the other pages -------------- */}
      <section aria-labelledby="wings-heading">
        <h2 id="wings-heading" className="eyebrow mb-8 text-center">
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
        <Panel className="flex flex-col items-center px-8 py-12 text-center">
          <p className="eyebrow">Connect Ramus</p>

          <h2 id="contact-heading" className="mt-3 text-3xl">
            Ramus is looking forward to answer your inquiries
          </h2>

          <p className="prose-note mt-4 max-w-xl">
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
          prev={{ label: 'STEM', href: '/stem' }}
          next={{ label: 'Music', href: '/music' }}
        />
      </div>
    </Page>
  )
}
