import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** Milliseconds to wait after the element enters view. Use to stagger a grid. */
  delay?: number
  className?: string
  as?: ElementType
  id?: string
  'aria-labelledby'?: string
}

/**
 * Fades and lifts its children in the first time they scroll into view.
 * Reveals at once — no animation — if the visitor prefers reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  /* Start out already revealed — no animation at all — when the visitor
     prefers reduced motion, or when the browser cannot observe scrolling. */
  const [visible, setVisible] = useState(
    () =>
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setVisible(true)
        observer.disconnect()
      },
      { threshold: 0.06, rootMargin: '0px 0px -6% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [visible])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
