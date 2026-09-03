import { Children, cloneElement, isValidElement, type ReactNode } from 'react'
import Linkable from './Linkable'

/** Stacked tan cards, in the manner of the EVIDENCE clues. */
export default function NoteList({ children }: { children: ReactNode }) {
  return (
    <ul className="flex flex-col gap-3">
      {Children.map(children, (child, i) =>
        isValidElement<NoteProps>(child) ? cloneElement(child, { index: i + 1 }) : child,
      )}
    </ul>
  )
}

type NoteProps = {
  label: string
  /** Links the label. Leave empty for plain text. */
  href?: string
  /** Numbered by `NoteList`; you do not set this. */
  index?: number
  children: ReactNode
}

export function Note({ label, href = '', index, children }: NoteProps) {
  return (
    <li className="card-sunk">
      <div className="flex items-baseline justify-between gap-4">
        <Linkable
          href={href}
          className="text-[0.825rem] tracking-[0.16em] text-ink-soft uppercase"
          linkedClassName="transition-colors hover:text-brass-deep"
        >
          {label}
        </Linkable>
        {index ? <span className="text-[0.825rem] text-ink-faint">#{index}</span> : null}
      </div>
      <p className="mt-1.5 text-[1.14rem] text-ink">{children}</p>
    </li>
  )
}
