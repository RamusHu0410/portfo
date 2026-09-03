import type { ReactNode } from 'react'
import Linkable from './Linkable'

type LedgerProps = {
  children: ReactNode
  /**
   * Lets long labels wrap onto several lines and pins the value to the right.
   * Use it when the labels are phrases rather than short keys.
   */
  wrap?: boolean
}

/** The two-column table of the README's tech-stack block. */
export default function Ledger({ children, wrap = false }: LedgerProps) {
  return (
    <table className={wrap ? 'ledger ledger-wrap' : 'ledger'}>
      <tbody>{children}</tbody>
    </table>
  )
}

type LedgerRowProps = {
  label: string
  value: string
  /** Links the value. Leave empty for plain text. */
  href?: string
}

export function LedgerRow({ label, value, href = '' }: LedgerRowProps) {
  return (
    <tr>
      <th scope="row">{label}</th>
      <td>
        <Linkable
          href={href}
          linkedClassName="text-brass-deep underline decoration-brass-soft underline-offset-4 transition-colors hover:text-brass"
        >
          {value}
        </Linkable>
      </td>
    </tr>
  )
}
