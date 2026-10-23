/**
 * A few faint shoe prints walked across the paper, as if someone crossed the
 * desk on the way to the map. Pure decoration, like <CoffeeRing>: position
 * it with `className` and keep it behind everything.
 *
 * The prints follow a gentle S-curve, left and right feet alternating, and
 * fade as the walker moves away.
 */

/** One sole, pointing up: a toe pad and a heel, with a little tread in each. */
function Sole() {
  return (
    <>
      <path d="M0-15C5.6-15 7.4-9.6 7-4.2 6.6 1 4.2 3.4 0 3.4-4.2 3.4-6.4 1-6.8-4.2-7.2-9.6-5.6-15 0-15Z" />
      <path d="M0 6.4C4 6.4 5.4 9.4 5 12.4 4.6 15 2.6 16.4 0 16.4-2.6 16.4-4.6 15-5 12.4-5.4 9.4-4 6.4 0 6.4Z" />
    </>
  )
}

// Positions along the walk (x, y) and the heading in degrees (0 = up).
const STEPS: { x: number; y: number; r: number }[] = [
  { x: 52, y: 372, r: -8 },
  { x: 78, y: 330, r: -2 },
  { x: 58, y: 286, r: 6 },
  { x: 86, y: 244, r: 12 },
  { x: 70, y: 198, r: 16 },
  { x: 100, y: 160, r: 14 },
  { x: 88, y: 114, r: 6 },
  { x: 116, y: 74, r: -2 },
  { x: 98, y: 30, r: -8 },
]

export default function Footprints({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 400"
      className={`pointer-events-none text-[#968667] ${className}`}
      aria-hidden="true"
    >
      {STEPS.map(({ x, y, r }, i) => {
        const left = i % 2 === 0
        // Nearest prints are the clearest; they fade toward the top.
        const opacity = 0.3 - i * 0.02
        return (
          <g
            key={i}
            fill="currentColor"
            fillOpacity={opacity}
            transform={`translate(${x} ${y}) rotate(${r}) scale(${left ? -1 : 1} 1)`}
          >
            <Sole />
          </g>
        )
      })}
    </svg>
  )
}
