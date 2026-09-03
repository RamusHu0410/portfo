type PortraitProps = {
  /** Path to the line-art PNG, e.g. `/portrait.png`. Black lines, transparent ground. */
  src: string
  /** Described for screen readers — the drawing is not decoration. */
  alt: string
  className?: string
}

/**
 * A line-drawn portrait set in a medallion, in the manner of a frontispiece.
 *
 * The PNG is used as a mask rather than an image, so the ink takes its colour
 * from the theme — recolour it by changing `bg-brass` below, not by
 * regenerating the file. Make the file with `scripts/sketch.py`.
 */
export default function Portrait({ src, alt, className = '' }: PortraitProps) {
  const mask = {
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
    maskSize: 'contain',
    WebkitMaskSize: 'contain',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
  } as const

  return (
    /* The outer element carries only the caller's classes, so the page decides
       whether this is positioned or in flow. The inner one is the frame. */
    <div className={`ornament-in aspect-square ${className}`} role="img" aria-label={alt}>
      <div className="relative h-full w-full">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          className="absolute inset-0 text-brass-soft"
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="49" strokeWidth="0.7" />
          <circle cx="50" cy="50" r="45.5" strokeWidth="1.4" />
        </svg>

        <div className="absolute inset-[9%] bg-brass" style={mask} />
      </div>
    </div>
  )
}
