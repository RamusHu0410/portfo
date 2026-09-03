import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { TAB_TITLE } from './SiteHeader'

type PageProps = {
  /** Browser tab title for this page. */
  title: string
  children: ReactNode
}

/** Shared page shell: sets the document title, holds the column width. */
export default function Page({ title, children }: PageProps) {
  useEffect(() => {
    document.title = `${title} · ${TAB_TITLE}`
  }, [title])

  return (
    <main className="page-enter relative z-10 mx-auto max-w-5xl px-6 pt-16 pb-4">{children}</main>
  )
}
