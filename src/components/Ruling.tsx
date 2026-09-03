type RulingProps = {
  /** `staff` = music rules; `grid` = engineer's graph paper. Default `staff`. */
  variant?: 'staff' | 'grid'
  className?: string
}

/**
 * The ruling printed on the paper underneath a section — a stave on the Music
 * wing, graph paper on the STEM one. Faint enough to read as texture rather
 * than as content, and fading out at both sides so it never looks cropped.
 *
 * Pure decoration. Put it behind a section with `-z-10` and give it a size in
 * `className`. The stave rules every 18px, so `h-[73px]` gives the usual five
 * lines; the grid squares are 24px.
 */
export default function Ruling({ variant = 'staff', className = '' }: RulingProps) {
  return (
    <div
      aria-hidden="true"
      className={`ruling pointer-events-none ${variant === 'grid' ? 'ruling-grid' : 'ruling-staff'} ${className}`}
    />
  )
}
