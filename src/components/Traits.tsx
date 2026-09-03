import {
  Children,
  isValidElement,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react'
import Icon, { type IconName } from './Icon'

type TraitProps = {
  /** The line-art mark stamped on the keyword's brass square. */
  icon: IconName
  /** The keyword — until it is pointed at, this is all anyone sees. */
  label: string
  /** The note it keeps to itself, written out below the rail on hover. */
  children: ReactNode
}

/**
 * One keyword. Declared inside <Traits>, which does all the drawing, so a
 * <Trait> on its own renders nothing.
 */
export function Trait(_props: TraitProps) {
  return null
}

/**
 * A rail of keywords over one shared note. Pointing at a keyword — or tabbing
 * to it, or tapping it — stamps its square in brass and writes its note out
 * underneath; leaving the rail closes it again.
 */
export default function Traits({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const traits = Children.toArray(children).filter(
    (child): child is ReactElement<TraitProps> => isValidElement<TraitProps>(child),
  )

  const [open, setOpen] = useState<number | null>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const noteId = useId()

  const shown = open === null ? null : traits[open]

  return (
    <div className={className}>
      <div
        ref={railRef}
        className="trait-rail"
        onMouseLeave={() => {
          // A keyboard user may have tabbed in here; do not close on them.
          if (railRef.current?.contains(document.activeElement)) return
          setOpen(null)
        }}
      >
        {traits.map((trait, i) => (
          <button
            key={trait.props.label}
            type="button"
            className="trait"
            aria-expanded={open === i}
            aria-controls={noteId}
            onMouseEnter={() => setOpen(i)}
            onFocus={() => setOpen(i)}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="trait-plate">
              <Icon name={trait.props.icon} size={16} />
            </span>
            <span className="trait-label">{trait.props.label}</span>
          </button>
        ))}
      </div>

      <div id={noteId} className="trait-note mt-5" aria-live="polite">
        {shown ? (
          // Keyed on the open keyword so each note fades in as it arrives.
          <p key={open} className="trait-note-in">
            <span className="point-lead">{shown.props.label}</span> {shown.props.children}
          </p>
        ) : (
          <p className="trait-note-idle">Hover a keyword</p>
        )}
      </div>
    </div>
  )
}
