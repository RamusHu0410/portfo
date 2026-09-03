import type { ReactNode } from 'react'
import Icon from './Icon'
import Linkable from './Linkable'
import Panel from './Panel'

/** A small letterspaced chip. `href` empty = not a link. */
export type Tag = { label: string; href: string }

type EntryCardProps = {
  title: string
  /** Right-aligned line beside the title: a year, a venue, a status. */
  meta: string
  /** Makes the whole card clickable. Leave empty for no link. */
  href?: string
  tags?: Tag[]
  /** A link inside the card, below a hairline. Omit to hide the row. */
  action?: { label: string; href: string }
  /** The blurb. */
  children: ReactNode
}

/** One item in a grid — a piece, a recording, a project. */
export default function EntryCard({
  title,
  meta,
  href = '',
  tags = [],
  action,
  children,
}: EntryCardProps) {
  const clickable = Boolean(href.trim())

  return (
    <Panel
      as="article"
      className={`relative flex h-full flex-col p-7 pt-8 ${clickable ? 'lift' : ''}`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-2xl font-semibold text-brass-deep">
          <Linkable href={href} linkedClassName="stretched transition-colors hover:text-brass">
            {title}
          </Linkable>
        </h3>
        <span className="eyebrow eyebrow-muted shrink-0">{meta}</span>
      </div>

      <p className="prose-note mt-3 text-[1.24rem]">{children}</p>

      {tags.length > 0 ? (
        <ul className="relative z-2 mt-5 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <li key={`${tag.label}-${i}`}>
              <Linkable
                href={tag.href}
                className="inline-block rounded-full border border-rule px-3.5 py-1 text-[0.8rem] tracking-[0.14em] text-ink-faint uppercase"
                linkedClassName="transition-colors hover:border-brass-soft hover:text-brass-deep"
              >
                {tag.label}
              </Linkable>
            </li>
          ))}
        </ul>
      ) : null}

      {action ? (
        <div className="relative z-2 mt-6 flex items-center pt-4">
          <span className="absolute inset-x-0 top-0 h-px bg-rule-soft" aria-hidden="true" />
          <Linkable
            href={action.href}
            className="inline-flex items-center gap-2 text-base tracking-[0.12em] text-brass uppercase"
            linkedClassName="nudge transition-colors hover:text-brass-deep"
          >
            {action.label}
            <Icon name="arrowRight" size={15} />
          </Linkable>
        </div>
      ) : null}
    </Panel>
  )
}
