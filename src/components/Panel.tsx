import type { ElementType, ReactNode } from 'react'

/**
 * What the content is written on. Each is drawn in `styles/theme.css`.
 *
 *   sheet     plain bracketed sheet (the original panel)
 *   sticky    sticky note, taped at the top
 *   index     index card, pinned with a brass tack
 *   torn      a page torn out of a book — wrap it in `.drop-paper` for its shadow
 *   clipping  a press clipping, taped at both top corners
 *   envelope  an envelope with its flap down; a `.coin` inside becomes the wax seal
 *   postcard  airmail border, stamp and postmark
 *   ticket    a concert ticket with notched sides — wrap it in `.drop-paper` for its shadow
 */
export type PanelVariant =
  | 'sheet'
  | 'sticky'
  | 'index'
  | 'torn'
  | 'clipping'
  | 'envelope'
  | 'postcard'
  | 'ticket'

type PanelProps = {
  children: ReactNode
  className?: string
  variant?: PanelVariant
  /** The four corner marks. On by default for `sheet` only, the others draw their own detail. */
  brackets?: boolean
  as?: ElementType
  id?: string
}

/** A holder for a block of content: a piece of paper set on the page. */
export default function Panel({
  children,
  className = '',
  variant = 'sheet',
  brackets = variant === 'sheet',
  as: Tag = 'div',
  id,
}: PanelProps) {
  return (
    <Tag
      id={id}
      className={`panel holder-${variant} ${brackets ? 'brackets' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}
