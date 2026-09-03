import { useId } from 'react'

/**
 * A printer's flourish — the small engraved sprig set above a title on the
 * first page of a book. Pure decoration; size it with `className`.
 */
export default function Flourish({ className = '' }: { className?: string }) {
  const id = useId()
  const half = `${id}-half`

  return (
    <svg
      viewBox="0 0 120 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      className={`ornament-in text-brass-soft ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* The right-hand half. The left is the same shape, mirrored. */}
        <g id={half}>
          <path d="M67 12h22" />
          <path d="M70 12c6-6 13-7 18-3" />
          <path d="M70 12c6 6 13 7 18 3" />
          <circle cx="95" cy="12" r="1.4" fill="currentColor" stroke="none" />
        </g>
      </defs>

      <path d="M60 6.5 65.5 12 60 17.5 54.5 12Z" />
      <circle cx="60" cy="12" r="1.2" fill="currentColor" stroke="none" />

      <use href={`#${half}`} />
      <use href={`#${half}`} transform="translate(120 0) scale(-1 1)" />
    </svg>
  )
}
