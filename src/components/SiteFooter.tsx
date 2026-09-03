import Linkable from './Linkable'

/* --- Edit the footer here ------------------------------------------------ */

const NOTE = 'VIBED BY RAMUS HU. © 2024 ALL RIGHTS RESERVED.'

const LINKS = [
  { label: 'Email', href: 'mailto:ramushu0410@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/RamusHu0410' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ramushu/' },
  /* { label: 'Résumé', href: '' } */
]

/* ------------------------------------------------------------------------- */

export default function SiteFooter() {
  return (
    <footer className="relative z-10 mt-24 border-t border-rule-soft/80">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-10">
        <p className="max-w-md text-sm text-ink-faint italic">{NOTE}</p>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {LINKS.map((link) => (
            <li key={link.label}>
              <Linkable
                href={link.href}
                className="text-xs tracking-[0.18em] text-ink-faint uppercase"
                linkedClassName="ink-underline transition-colors hover:text-brass-deep"
              >
                {link.label}
              </Linkable>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
