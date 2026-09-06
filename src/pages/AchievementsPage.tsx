import { useState } from 'react'
import { ACHIEVEMENTS, resetAchievements, useUnlocked } from '../achievements'
import type { Achievement } from '../achievements'
import Action from '../components/Action'
import Flourish from '../components/Flourish'
import Icon from '../components/Icon'
import Ornament from '../components/Ornament'
import Page from '../components/Page'
import PageNav from '../components/PageNav'
import Panel from '../components/Panel'
import Reveal from '../components/Reveal'

/** One card in the case. Locked cards keep both the glyph and the how-to sealed. */
function AchievementCard({ achievement, unlocked }: { achievement: Achievement; unlocked: boolean }) {
  return (
    <Panel className="flex h-full items-start gap-5 p-7">
      <span aria-hidden="true" className="relative shrink-0">
        <span
          className={`flex size-14 items-center justify-center rounded-full border ${
            unlocked
              ? 'border-brass-soft bg-brass-pale text-brass-deep'
              : 'border-rule border-dashed bg-surface-sunk/30 text-ink-faint'
          }`}
        >
          {unlocked ? (
            <Icon name={achievement.icon} size={26} />
          ) : (
            <span className="text-2xl leading-none">?</span>
          )}
        </span>

        {unlocked && (
          <span className="absolute -right-1 -bottom-1 flex size-6 items-center justify-center rounded-full border border-brass-soft bg-brass text-parchment-light">
            <Icon name="check" size={13} strokeWidth={2.6} />
          </span>
        )}
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="text-xl">{achievement.name}</h3>

        {/* The completion mark: a struck tick, so an earned card reads as done
            at a glance rather than only by its glyph. */}
        <p
          className={`eyebrow mt-2 flex items-center gap-1.5 text-[0.7rem] ${
            unlocked ? 'text-brass-deep' : ''
          }`}
        >
          {unlocked && <Icon name="check" size={13} strokeWidth={2.4} />}
          {unlocked ? 'Completed' : 'Locked'}
        </p>

        <p className="prose-note mt-3">
          {unlocked ? (
            achievement.how
          ) : (
            <span className="text-ink-faint italic">Still sealed. Find it yourself.</span>
          )}
        </p>
      </div>
    </Panel>
  )
}

/**
 * Clearing is irreversible, so it asks once before it does it. Nothing to clear
 * means nothing is shown — an empty case needs no button.
 */
function ClearAchievements({ earned }: { earned: number }) {
  const [asking, setAsking] = useState(false)

  if (earned === 0) return null

  return (
    <Panel className="mt-12 flex flex-col items-center gap-4 px-8 py-8 text-center">
      <h2 className="eyebrow">Clear achievements</h2>

      <p className="prose-note max-w-md">
        Locks all {earned} of them again and forgets this visit, so the case can be found from the
        start. This cannot be undone.
      </p>

      {asking ? (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Action
            label="Yes, clear them"
            href=""
            variant="gold"
            onClick={() => {
              resetAchievements()
              setAsking(false)
            }}
          />
          <Action label="Keep them" href="" variant="ghost" onClick={() => setAsking(false)} />
        </div>
      ) : (
        <Action label="Clear achievements" href="" variant="ghost" onClick={() => setAsking(true)} />
      )}
    </Panel>
  )
}

/** The achievements case: what has been found, and what is still hidden. */
export default function AchievementsPage() {
  const unlocked = useUnlocked()
  const earned = ACHIEVEMENTS.filter((a) => unlocked.includes(a.id)).length

  return (
    <Page title="Achievements">
      <Reveal as="header" className="text-center">
        <Flourish className="mx-auto w-32 sm:w-40" />

        <p className="eyebrow mt-5">The Case</p>

        <h1 className="display mt-5">Achievements</h1>

        <p className="prose-note mx-auto mt-7 max-w-2xl">
          Small things found while wandering the file. {earned} of {ACHIEVEMENTS.length} unlocked.
        </p>
      </Reveal>

      <Ornament label="I" className="my-16" />

      <section aria-label="Achievements" className="grid gap-6 md:grid-cols-2">
        {ACHIEVEMENTS.map((achievement, index) => (
          <Reveal key={achievement.id} delay={index % 2 === 0 ? 0 : 120} className="h-full">
            <AchievementCard achievement={achievement} unlocked={unlocked.includes(achievement.id)} />
          </Reveal>
        ))}
      </section>

      <ClearAchievements earned={earned} />

      <div className="mt-16">
        <PageNav prev={{ label: 'STEM', href: '/stem' }} next={{ label: 'Intro', href: '/' }} />
      </div>
    </Page>
  )
}
