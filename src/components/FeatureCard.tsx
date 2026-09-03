import type { ReactNode } from 'react'
import Action from './Action'
import Icon, { type IconName } from './Icon'
import Panel from './Panel'

type FeatureCardProps = {
  icon: IconName
  /** Opens the statement with a brass initial. Ranges it left, as print does. */
  dropcap?: boolean
  /** The button under the quote. Omit to hide it. */
  action?: { label: string; href: string }
  /** The statement itself. */
  children: ReactNode
}

/** The centred statement panel, straight out of the Field Guide screen. */
export default function FeatureCard({
  icon,
  dropcap = false,
  action,
  children,
}: FeatureCardProps) {
  return (
    <Panel className="flex flex-col items-center px-8 py-14 text-center">
      <Icon name={icon} size={44} className="glyph-float text-brass" />
      <p
        className={`mt-8 max-w-3xl text-2xl leading-relaxed text-ink-soft sm:text-3xl sm:leading-[1.5] ${
          dropcap ? 'dropcap dropcap-quote text-left' : ''
        }`}
      >
        {children}
      </p>
      {action ? (
        <div className="mt-9">
          <Action label={action.label} href={action.href} variant="gold" />
        </div>
      ) : null}
    </Panel>
  )
}
