import type { ElementType, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type LinkableProps = {
  /** Where this element points. Leave empty (`''`) and it renders as plain, non-clickable markup. */
  href?: string
  className?: string
  children: ReactNode
  /** Tag used when there is no link. Defaults to `<span>`. */
  as?: ElementType
  /** Extra class applied only when a link is present (e.g. a hover lift). */
  linkedClassName?: string
  title?: string
  'aria-label'?: string
}

/** `true` for anything that should leave the site in a new tab. */
function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href)
}

/**
 * The one place that decides how a link is rendered.
 *
 *   ''              -> not a link, just markup
 *   '/music'        -> in-app navigation (React Router)
 *   '#section'      -> same-page anchor
 *   'mailto:…'      -> mail client
 *   'https://…'     -> new tab
 *
 * Every linkable thing on this site goes through here, so setting an `href`
 * in `src/data/content.ts` is all it takes to wire something up.
 */
export default function Linkable({
  href,
  className = '',
  children,
  as: Fallback = 'span',
  linkedClassName = '',
  ...rest
}: LinkableProps) {
  const target = href?.trim() ?? ''
  const linked = [className, linkedClassName].filter(Boolean).join(' ')

  if (!target) {
    return (
      <Fallback className={className} {...rest}>
        {children}
      </Fallback>
    )
  }

  if (target.startsWith('/')) {
    return (
      <Link to={target} className={linked} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <a
      href={target}
      className={linked}
      {...(isExternal(target) ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  )
}
