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
  /** A still pasted onto the card, e.g. a frame from a recording. */
  image?: { src: string; alt: string; /** Overlay a play mark (for recordings). */ play?: boolean }
  /** Featured layout: on wider screens the image sits beside the text. */
  wide?: boolean
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
  image,
  wide = false,
  children,
}: EntryCardProps) {
  const clickable = Boolean(href.trim())
  const sideBySide = wide && Boolean(image)

  return (
    <Panel
      variant="sticky"
      as="article"
      className={`group relative flex h-full flex-col p-7 pt-8 ${
        sideBySide ? 'md:flex-row md:items-center md:gap-10 md:p-9' : ''
      } ${clickable ? 'lift' : ''}`}
    >
      {image ? (
        /* A print pasted onto the note: white border, a slight tilt that
           straightens on hover, and a play mark when the card is a link. */
        <figure
          className={`relative mb-6 -rotate-1 rounded-sm bg-white p-1.5 shadow-md transition-transform duration-300 group-hover:rotate-0 ${
            sideBySide ? 'md:mb-0 md:w-[55%] md:shrink-0' : ''
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            width={1280}
            height={720}
            className="aspect-video w-full rounded-[2px] object-cover sepia-[.25]"
          />
          {clickable && image.play ? (
            <span
              className="absolute inset-0 grid place-items-center opacity-80 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm">
                <Icon name="play" size={24} fill="currentColor" />
              </span>
            </span>
          ) : null}
        </figure>
      ) : null}

      <div className={`flex flex-1 flex-col ${sideBySide ? 'md:self-stretch md:justify-center' : ''}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-2xl text-brass-deep">
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
          /* The spacer grows to pin the link to the foot of the card, so
             cards of different heights in one row still line up. */
          <span className={`block min-h-6 ${sideBySide ? '' : 'flex-1'}`} aria-hidden="true" />
        ) : null}

        {action ? (
          <div className="relative z-2 flex items-center pt-4">
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
      </div>
    </Panel>
  )
}
