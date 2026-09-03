import type { ElementType, ReactNode } from 'react'

type PanelProps = {
  children: ReactNode
  className?: string
  /** The four corner marks. On by default — it is the house style. */
  brackets?: boolean
  as?: ElementType
  id?: string
}

/**
 * A sheet of paper in a case file: hairline border, warm surface, and the
 * four L-shaped corner marks drawn by `.brackets` in `styles/theme.css`.
 */
export default function Panel({
  children,
  className = '',
  brackets = true,
  as: Tag = 'div',
  id,
}: PanelProps) {
  return (
    <Tag id={id} className={`panel ${brackets ? 'brackets' : ''} ${className}`}>
      {children}
    </Tag>
  )
}
