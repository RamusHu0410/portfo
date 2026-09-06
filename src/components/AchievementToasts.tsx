import { useEffect, useState } from 'react'
import { getAchievement, onUnlock } from '../achievements'
import type { Achievement } from '../achievements'
import Icon from './Icon'

/** How long a card sits on screen before it slides back out. */
const HOLD_MS = 5200

type Toast = { key: number; achievement: Achievement; leaving: boolean }

let nextKey = 0

/**
 * The Steam-style corner pop-up: slides in from the bottom right the moment an
 * achievement is earned, holds, then slides out. Mounted once, in <App>.
 */
export default function AchievementToasts() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    const stop = onUnlock((id) => {
      const achievement = getAchievement(id)
      if (!achievement) return

      const key = nextKey++
      setToasts((current) => [...current, { key, achievement, leaving: false }])

      /* Two stages so the exit animation has time to play out. */
      timers.push(
        setTimeout(() => {
          setToasts((current) => current.map((t) => (t.key === key ? { ...t, leaving: true } : t)))
        }, HOLD_MS),
        setTimeout(() => {
          setToasts((current) => current.filter((t) => t.key !== key))
        }, HOLD_MS + 500),
      )
    })

    return () => {
      stop()
      for (const timer of timers) clearTimeout(timer)
    }
  }, [])

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col-reverse gap-3 sm:right-6 sm:bottom-6"
    >
      {toasts.map(({ key, achievement, leaving }) => (
        <article
          key={key}
          className={`achievement-toast ${leaving ? 'is-leaving' : ''} flex w-[19rem] items-center gap-4 border border-brass-soft bg-surface px-4 py-3.5`}
        >
          <span
            aria-hidden="true"
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-brass-soft bg-brass-pale text-brass-deep"
          >
            <Icon name={achievement.icon} size={22} />
          </span>

          <div className="min-w-0">
            <p className="eyebrow text-[0.65rem]">Achievement Unlocked</p>
            <p className="mt-1 truncate text-lg leading-tight">{achievement.name}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
