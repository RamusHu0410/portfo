import { useEffect, useSyncExternalStore } from 'react'
import type { IconName } from './components/Icon'

/* --- Add achievements here ------------------------------------------------ */

export type AchievementId = 'welcome' | 'notFound'

export type Achievement = {
  id: AchievementId
  name: string
  icon: IconName
  /** How it was earned. Only shown once the achievement is unlocked. */
  how: string
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'welcome',
    name: 'Welcome',
    icon: 'seal',
    how: 'You opened the website. The file is now yours.',
  },
  {
    id: 'notFound',
    name: 'Page Not Found',
    icon: 'compass',
    how: 'You wandered off the map and landed on a page that does not exist.',
  },
]

/* ------------------------------------------------------------------------- */

const STORAGE_KEY = 'portfo.achievements'

const KNOWN_IDS = new Set<string>(ACHIEVEMENTS.map((a) => a.id))

function read(): AchievementId[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((id): id is AchievementId => typeof id === 'string' && KNOWN_IDS.has(id))
  } catch {
    return []
  }
}

/* A single in-memory copy of the unlocked set, so every component that reads it
   re-renders together the moment something is unlocked. */
let unlocked: AchievementId[] = read()
const listeners = new Set<() => void>()

/* Separate from `listeners`: these fire only on a *fresh* unlock, so the toast
   pops once when it is earned and never again on a re-render. */
const unlockListeners = new Set<(id: AchievementId) => void>()

/* React flushes child effects before parent ones, so a page can unlock itself
   before the toast component has subscribed — which is exactly what happens
   when you load a 404 URL directly. Anything earned with nobody listening
   waits here and is delivered as soon as someone subscribes. */
let pending: AchievementId[] = []

/** Called each time an achievement is newly earned. Returns an unsubscribe. */
export function onUnlock(listener: (id: AchievementId) => void) {
  unlockListeners.add(listener)

  if (pending.length > 0) {
    const queued = pending
    pending = []
    for (const id of queued) listener(id)
  }

  return () => unlockListeners.delete(listener)
}

export function getAchievement(id: AchievementId) {
  return ACHIEVEMENTS.find((a) => a.id === id)
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return unlocked
}

/** Mark an achievement earned. Does nothing if it was already unlocked. */
export function unlock(id: AchievementId) {
  if (unlocked.includes(id)) return

  unlocked = [...unlocked, id]

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked))
  } catch {
    /* Private browsing, full disk — the achievement still holds for this visit. */
  }

  for (const listener of listeners) listener()

  if (unlockListeners.size === 0) {
    pending.push(id)
  } else {
    for (const listener of unlockListeners) listener(id)
  }
}

/** The ids unlocked so far, kept in sync across the whole page. */
export function useUnlocked() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

/** Unlock on mount — drop this into any page that awards an achievement. */
export function useUnlockOnMount(id: AchievementId) {
  useEffect(() => {
    unlock(id)
  }, [id])
}

/** Clear every achievement (used by the reset button on the Achievements page). */
export function resetAchievements() {
  unlocked = []
  pending = []
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* Nothing to clear. */
  }
  for (const listener of listeners) listener()
}
