import Icon, { type IconName } from './Icon'
import Linkable from './Linkable'

type WingActionProps = {
  /** The line-art mark in the seal, drawn in the same hand as the page glyphs. */
  icon: IconName
  label: string
  /** Small line under the label. Leave out for a single-line button. */
  note?: string
  /** Leave empty and the button still renders, it just is not clickable. */
  href: string
  variant?: 'gold' | 'ghost'
  className?: string
}

/**
 * The paired hero buttons — a stamped line-art seal, a label, a whispered
 * subtitle, and an arrow that steps forward on hover. Used for the two wings
 * on the Intro.
 */
export default function WingAction({
  icon,
  label,
  note,
  href,
  variant = 'gold',
  className = '',
}: WingActionProps) {
  return (
    <Linkable
      href={href}
      className={`btn-wing btn-wing-${variant} ${href.trim() ? '' : 'cursor-default'} ${className}`}
      as="span"
    >
      <span className="btn-wing-seal">
        <Icon name={icon} size={20} />
      </span>

      <span className="btn-wing-text">
        <span className="btn-wing-label">{label}</span>
        {note ? <span className="btn-wing-note">{note}</span> : null}
      </span>

      <Icon name="arrowRight" size={18} className="btn-wing-arrow" />
    </Linkable>
  )
}
