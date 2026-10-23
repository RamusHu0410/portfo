import { useEffect } from 'react'

/** Everything that should leave an ink blot where it is pressed. */
const PRESSABLE = '.btn, .btn-plate, .btn-wing, .trait'

const DROPS = 10
const LEAVES = 10
/** Printer's flowers; one floats up from each press. */
const FLEURONS = ['❦', '❧', '✦', '❀']

/** A span with a class and optional custom properties for its flight path. */
function piece(className: string, vars: Record<string, string> = {}) {
  const el = document.createElement('span')
  el.className = className
  for (const [key, value] of Object.entries(vars)) el.style.setProperty(key, value)
  return el
}

/**
 * The flourish that pops out of the press: a stamped brass ring, a spark,
 * ink flicked off a nib, and gold leaf that flutters down. It lives on the
 * body, above everything, so it can spill past the button's edges.
 */
function burst(x: number, y: number) {
  const root = piece('burst')
  root.setAttribute('aria-hidden', 'true')
  root.style.left = `${x}px`
  root.style.top = `${y}px`

  const fleuron = piece('burst-fleuron', {
    '--tilt': `${(Math.random() - 0.5) * 30}deg`,
  })
  fleuron.textContent = FLEURONS[Math.floor(Math.random() * FLEURONS.length)]

  root.append(
    piece('burst-ring'),
    piece('burst-ring burst-ring-late'),
    piece('burst-spark'),
    fleuron,
  )

  // Ink flicks out evenly around the press, each a little off the grid.
  const turn = Math.random() * 360
  for (let i = 0; i < DROPS; i++) {
    const angle = turn + (360 / DROPS) * i + (Math.random() - 0.5) * 24
    const reach = 38 + Math.random() * 30
    const rad = (angle * Math.PI) / 180
    root.append(
      piece('burst-drop', {
        '--dx': `${Math.cos(rad) * reach}px`,
        '--dy': `${Math.sin(rad) * reach}px`,
        '--angle': `${angle}deg`,
        '--size': `${4.5 + Math.random() * 3.5}px`,
      }),
    )
  }

  // Gold leaf is thrown up and outward, then drifts down turning over.
  for (let i = 0; i < LEAVES; i++) {
    const side = i % 2 === 0 ? -1 : 1
    root.append(
      piece('burst-leaf', {
        '--dx': `${side * (12 + Math.random() * 48)}px`,
        '--dy': `${-(30 + Math.random() * 36)}px`,
        '--fall': `${30 + Math.random() * 30}px`,
        '--spin': `${side * (180 + Math.random() * 360)}deg`,
        '--delay': `${Math.random() * 90}ms`,
      }),
    )
  }

  document.body.append(root)
  window.setTimeout(() => root.remove(), 1400)
}

/**
 * Pressing a button drops a little ink where the pointer landed, and the blot
 * spreads and fades into the face. One document listener serves every button,
 * so nothing needs wiring per component. Skipped when motion is reduced.
 */
export default function InkPress() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')

    function onPointerDown(event: PointerEvent) {
      if (reduce.matches || event.button !== 0) return
      const host = (event.target as Element | null)?.closest<HTMLElement>(PRESSABLE)
      if (!host) return

      const rect = host.getBoundingClientRect()
      const size = Math.hypot(rect.width, rect.height) * 2

      // The clip takes the button's rounded shape, so the blot never spills.
      const clip = document.createElement('span')
      clip.className = 'ink-clip'
      clip.setAttribute('aria-hidden', 'true')

      const drop = document.createElement('span')
      drop.className = 'ink-drop'
      drop.style.width = `${size}px`
      drop.style.height = `${size}px`
      drop.style.left = `${event.clientX - rect.left - size / 2}px`
      drop.style.top = `${event.clientY - rect.top - size / 2}px`

      clip.append(drop)
      host.append(clip)

      const remove = () => clip.remove()
      drop.addEventListener('animationend', remove, { once: true })
      window.setTimeout(remove, 1200) // in case the animation never runs

      burst(event.clientX, event.clientY)
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  return null
}
