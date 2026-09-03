type OrnamentProps = {
  /** Put a mark in the middle of the rule — a numeral, a word, anything short. */
  label?: string
  className?: string
}

/** A hairline rule broken by a small brass lozenge, or by a label. */
export default function Ornament({ label, className = '' }: OrnamentProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-rule" />

      {label ? (
        <span className="eyebrow shrink-0 px-1">{label}</span>
      ) : (
        <svg width="34" height="10" viewBox="0 0 34 10" className="shrink-0 text-brass-soft">
          <path d="M17 1 21 5l-4 4-4-4 4-4Z" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="5" cy="5" r="1" fill="currentColor" />
          <circle cx="29" cy="5" r="1" fill="currentColor" />
        </svg>
      )}

      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-rule" />
    </div>
  )
}
