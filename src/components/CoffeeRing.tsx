/**
 * The faint ring a cup leaves on paper. Pure decoration — position it with
 * `className` and keep it behind everything.
 */
export default function CoffeeRing({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className={`pointer-events-none text-[#a98d54] ${className}`}
      aria-hidden="true"
    >
      <circle
        cx="100"
        cy="100"
        r="90"
        stroke="currentColor"
        strokeWidth="5"
        strokeOpacity="0.16"
        strokeDasharray="400 34"
        strokeDashoffset="40"
        strokeLinecap="round"
      />
      <circle
        cx="100"
        cy="100"
        r="84"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.12"
        strokeDasharray="330 100"
        strokeDashoffset="200"
        strokeLinecap="round"
      />
    </svg>
  )
}
