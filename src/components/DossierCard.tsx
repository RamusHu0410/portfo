import type { ReactNode } from 'react'
import Action from './Action'
import Icon, { type IconName } from './Icon'
import Linkable from './Linkable'
import Panel from './Panel'

type DossierCardProps = {
  icon: IconName
  eyebrow: string
  title: string
  /** Makes the whole card clickable. Leave empty for no link. */
  href?: string
  /** The button at the foot of the card. Omit to hide it. */
  action?: { label: string; href: string }
  /** The blurb. */
  children: ReactNode
}

/**
 * The large signpost card, modelled on the Field Guide panel: a centred
 * glyph, a letterspaced label, a line of copy, and one clear way onward.
 */
export default function DossierCard({
  icon,
  eyebrow,
  title,
  href = '',
  action,
  children,
}: DossierCardProps) {
  const clickable = Boolean(href.trim())

  return (
    <Panel
      as="article"
      className={`relative flex h-full flex-col items-center p-9 text-center ${
        clickable ? 'lift' : ''
      }`}
    >
      <Icon name={icon} size={34} className="glyph text-brass" />

      <p className="eyebrow mt-5">{eyebrow}</p>

      <h3 className="mt-2 text-3xl">
        <Linkable
          href={href}
          className="text-ink"
          linkedClassName="stretched transition-colors hover:text-brass-deep"
        >
          {title}
        </Linkable>
      </h3>

      {/* The blurb takes whatever height is left over and sits centred in it,
          so a short line of copy lines up with a taller neighbour's body
          instead of clinging to the title. */}
      <div className="mt-4 flex flex-1 items-center">
        <p className="prose-note max-w-sm">{children}</p>
      </div>

      {action ? (
        <div className="relative z-2 mt-7">
          <Action label={action.label} href={action.href} variant="gold" />
        </div>
      ) : null}
    </Panel>
  )
}
