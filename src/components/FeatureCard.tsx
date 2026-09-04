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
  children,
}: FeatureCardProps) {
  return (
    <Panel className="flex flex-col items-center px-8 py-14 text-center">
      <Icon name={icon} size={44} className="glyph-float text-brass" />
      <p
        className={`mt-8 max-w-3xl text-pretty text-ink-soft ${SIZES[size]} ${
          dropcap ? `dropcap ${DROPCAPS[size]} text-left` : ''
        }`}
      >
        {children}
      </p>
      {cite ? (
        <p className="mt-6 max-w-3xl text-[0.8125rem] font-semibold tracking-[0.18em] text-ink-faint uppercase">
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
