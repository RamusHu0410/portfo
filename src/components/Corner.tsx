type CornerProps = {
  /** Which corner the piece curls out of. Default `tr`. */
  at?: 'tl' | 'tr' | 'bl' | 'br'
  className?: string
}

/** Mirror/flip the top-right drawing into whichever corner was asked for. */
const FLIP = {
  tr: '',
  tl: 'translate(100 0) scale(-1 1)',
  br: 'translate(0 100) scale(1 -1)',
  bl: 'translate(100 100) scale(-1 -1)',
} as const

/**
 * A corner filigree — the hairline scroll a printer sets in the corner of a
 * title page. Drawn in the same weights as the rules and brackets elsewhere,
 * so it sits with the type rather than shouting over it.
 *
 * Pure decoration. Position and size it with `className`.
 */
export default function Corner({ at = 'tr', className = '' }: CornerProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      className={`ornament-in sway pointer-events-none text-brass-soft ${className}`}
      aria-hidden="true"
    >
      {/* The outer group is the one `.sway` animates — it has no transform of
          its own, so the mirroring below survives. */}
      <g>
        <g transform={FLIP[at]}>
          {/* The two hairlines that turn the corner, one inside the other. */}
          <path d="M96 62V16a6 6 0 0 0-6-6H44" strokeWidth="0.9" />
          <path d="M88 58V22a3 3 0 0 0-3-3H50" strokeWidth="0.6" strokeOpacity="0.75" />

          {/* Curls closing each open end. */}
          <path d="M50 19c-7 0-11 4.5-9.5 9 1 3 5 3.5 6.5 1s-.5-5.5-3.5-5" strokeWidth="0.7" />
          <path d="M88 58c0 7 4.5 11 9 9.5 3-1 3.5-5 1-6.5s-5.5.5-5 3.5" strokeWidth="0.7" />

          {/* A leaf on the outside of the turn, and the punctuation dots. */}
          <path d="M96 16c-8-1.5-13.5-6-14-12 8 .5 13.5 5 14 12Z" strokeWidth="0.7" />
          <circle cx="96" cy="68" r="1.3" fill="currentColor" stroke="none" />
          <circle cx="38" cy="10" r="1.3" fill="currentColor" stroke="none" />
          <circle cx="30" cy="10" r="0.8" fill="currentColor" stroke="none" opacity="0.7" />
        </g>
      </g>
    </svg>
  )
}
