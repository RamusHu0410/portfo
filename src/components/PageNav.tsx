import Icon from './Icon'
import Linkable from './Linkable'

type Step = { label: string; href: string }

/**
 * The previous/next pair at the foot of every page — this is what keeps the
 * three wings connected in a loop. Each page passes its own two steps.
 */
export default function PageNav({ prev, next }: { prev: Step; next: Step }) {
  return (
    <nav aria-label="Between pages" className="grid gap-4 sm:grid-cols-2">
      <Linkable
        href={prev.href}
        className="btn-plate nudge nudge-back flex items-center justify-center gap-3 sm:justify-start"
      >
        <Icon name="arrowLeft" size={16} />
        <span>{prev.label}</span>
      </Linkable>

      <Linkable
        href={next.href}
        className="btn-plate nudge flex items-center justify-center gap-3 sm:justify-end"
      >
        <span>{next.label}</span>
        <Icon name="arrowRight" size={16} />
      </Linkable>
    </nav>
  )
}
