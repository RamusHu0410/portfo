import Icon, { type IconName } from './Icon'
import Linkable from './Linkable'

type ActionProps = {
  label: string
  /** Leave empty and the button still renders, it just is not clickable. */
  href: string
  variant?: 'gold' | 'ghost' | 'plate'
  icon?: IconName
  className?: string
  /** Makes this a real <button> instead of a link. Ignored when `href` is set. */
  onClick?: () => void
}

/** A call to action, in one of three weights. */
export default function Action({
  label,
  href,
  variant = 'gold',
  icon,
  className = '',
  onClick,
}: ActionProps) {
  const base = variant === 'plate' ? 'btn-plate' : `btn btn-${variant}`
  const content = (
    <>
      {label}
      {icon ? <Icon name={icon} size={17} /> : null}
    </>
  )

  if (onClick && !href.trim()) {
    return (
      <button type="button" onClick={onClick} className={`${base} ${className}`}>
        {content}
      </button>
    )
  }

  return (
    <Linkable
      href={href}
      className={`${base} ${href.trim() ? '' : 'cursor-default'} ${className}`}
      as="span"
    >
      {content}
    </Linkable>
  )
}
