import type { CSSProperties } from 'react'

/**
 * A few motes of paper dust drifting slowly up through the light. Fixed behind
 * the page, never in the way of a click, and hidden when motion is reduced.
 */
const MOTES = Array.from({ length: 14 }, (_, i) => {
  // Spread deterministically, so the layout is the same on every visit.
  const left = (i * 37 + 11) % 100
  const size = 2 + ((i * 7) % 4)
  const duration = 26 + ((i * 11) % 18)
  const delay = -((i * 13) % duration)
  const drift = ((i * 23) % 60) - 30
  return { left, size, duration, delay, drift }
})

export default function Dust() {
  return (
    <div className="dust" aria-hidden="true">
      {MOTES.map((m, i) => (
        <span
          key={i}
          className="mote"
          style={
            {
              left: `${m.left}%`,
              width: `${m.size}px`,
              height: `${m.size}px`,
              animationDuration: `${m.duration}s`,
              animationDelay: `${m.delay}s`,
              '--drift': `${m.drift}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
