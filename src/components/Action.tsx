import Icon, { type IconName } from './Icon'
import Linkable from './Linkable'

type ActionProps = {
  label: string
  /** Leave empty and the button still renders, it just is not clickable. */
  href: string
  variant?: 'gold' | 'ghost' | 'plate'
  icon?: IconName
  className?: string
}

/** A call to action, in one of three weights. */
export default function Action({
  label,
  href,
  variant = 'gold',
  icon,
  className = '',
}: ActionProps) {
  const base = variant === 'plate' ? 'btn-plate' : `btn btn-${variant}`

  return (
    <Linkable
      href={href}
      className={`${base} ${href.trim() ? '' : 'cursor-default'} ${className}`}
      as="span"
    >
      {label}
      {icon ? <Icon name={icon} size={17} /> : null}
    </Linkable>
  )
}
