import type { ReactNode } from 'react'
import Action from './Action'
import Icon, { type IconName } from './Icon'
import Panel from './Panel'

type FeatureCardProps = {
  icon: IconName
  /** Opens the statement with a brass initial. Ranges it left, as print does. */
  dropcap?: boolean
  /** Type size of the statement. Use 'md' when the quote runs long. */
  size?: 'lg' | 'md'
  /** Attribution under the quote, set small in brass. Omit to hide it. */
  cite?: ReactNode
  /** The button under the quote. Omit to hide it. */
  action?: { label: string; href: string; onClick?: () => void }
  /** Sits to the right of the button — a counter, a tally, a small note. */
  actionAside?: ReactNode
  /**
   * A short strip instead of a tall card: the glyph sits beside the quote,
   * and the attribution and button share one line beneath it.
   */
  compact?: boolean
  /** The statement itself. */
  children: ReactNode
}

const SIZES = {
  lg: 'text-2xl leading-relaxed sm:text-3xl sm:leading-[1.5]',
  md: 'text-xl leading-relaxed sm:text-2xl sm:leading-[1.55]',
} as const

/** The large quote sinks its initial into two lines; the smaller one raises it. */
const DROPCAPS = {
  lg: 'dropcap-quote',
  md: 'dropcap-raised',
} as const

/** The centred statement panel, straight out of the Field Guide screen. */
export default function FeatureCard({
  icon,
  dropcap = false,
  size = 'lg',
  cite,
  action,
  actionAside,
  compact = false,
  children,
}: FeatureCardProps) {
  if (compact) {
    return (
      // A concert ticket: the stub carries the glyph, the body carries the quote.
      // `.drop-paper` gives it a shadow, since the ticket's notches are a mask.
      // Capped and centred, so the ticket reads as a ticket rather than a banner.
      <div className="drop-paper mx-auto max-w-3xl">
      <Panel variant="ticket" className="flex flex-col overflow-hidden sm:flex-row">
        <div className="ticket-stub flex shrink-0 items-center justify-center px-6 py-3 sm:w-20 sm:px-3 sm:py-5">
          <span className="coin glyph-float size-11">
            <Icon name={icon} size={22} />
          </span>
        </div>

        <div className="min-w-0 flex-1 px-6 py-5 sm:px-8">
          <p className="text-lg leading-relaxed text-pretty text-ink-soft">{children}</p>

          {cite || action ? (
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3">
              {cite ? (
                <p className="text-[0.75rem] tracking-[0.16em] text-ink-faint uppercase">{cite}</p>
              ) : null}
              {action ? (
                <div className="flex items-center gap-3 sm:ml-auto">
                  <Action
                    label={action.label}
                    href={action.href}
                    onClick={action.onClick}
                    variant="gold"
                  />
                  {actionAside}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </Panel>
      </div>
    )
  }

  return (
    <Panel variant="clipping" className="flex flex-col items-center px-8 py-14 text-center">
      <span className="coin glyph-float size-20">
        <Icon name={icon} size={40} />
      </span>
      <p
        className={`mt-8 max-w-3xl indent-[1em] text-left text-pretty text-ink-soft ${SIZES[size]} ${
          dropcap ? `dropcap ${DROPCAPS[size]}` : ''
        }`}
      >
        {children}
      </p>
      {cite ? (
        <p className="mt-6 max-w-3xl text-[0.8125rem] tracking-[0.18em] text-ink-faint uppercase">
          {cite}
        </p>
      ) : null}
      {action ? (
        <div className="mt-9 flex items-center gap-4">
          <Action
            label={action.label}
            href={action.href}
            onClick={action.onClick}
            variant="gold"
          />
          {actionAside}
        </div>
      ) : null}
    </Panel>
  )
}
