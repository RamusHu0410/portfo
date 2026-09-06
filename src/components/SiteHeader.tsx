import { NavLink } from 'react-router-dom'
import Linkable from './Linkable'

/* --- Edit the site name and the top navigation here ---------------------- */

/** Also used for the browser tab title. */
export const WORDMARK = 'Ramus Hu'

/** Browser tab titles read `<page> · <TAB_TITLE>`, e.g. `Intro · Ramus Hu Portfolio`. */
export const TAB_TITLE = `${WORDMARK} Portfolio`

const WORDMARK_HREF = '/'

const NAV = [
  { label: 'Intro', href: '/' },
  { label: 'Music', href: '/music' },
  { label: 'STEM', href: '/stem' },
  { label: 'Achievements', href: '/achievements' },
]

/* ------------------------------------------------------------------------- */

export default function SiteHeader() {
  return (
    <header className="relative z-10 border-b border-rule-soft/80">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-6">
        <Linkable
          href={WORDMARK_HREF}
          className="text-[1.075rem] font-semibold tracking-[0.3em] text-ink uppercase"
          linkedClassName="transition-colors hover:text-brass-deep"
        >
          {WORDMARK}
        </Linkable>

        <nav aria-label="Main">
          <ul className="flex items-center gap-7">
            {NAV.map((item) => (
              <li key={item.label}>
                {item.href.startsWith('/') ? (
                  <NavLink to={item.href} end={item.href === '/'} className="navlink">
                    {item.label}
                  </NavLink>
                ) : (
                  <Linkable href={item.href} className="navlink">
                    {item.label}
                  </Linkable>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
