import type { SVGProps } from 'react'

export type IconName = keyof typeof paths

/** Line-art glyphs, drawn to sit next to the serif type without shouting. */
const paths = {
  book: (
    <>
      <path d="M12 6.5C10.6 5.2 8.6 4.5 6 4.5H3.5v13H6c2.6 0 4.6.7 6 2 1.4-1.3 3.4-2 6-2h2.5v-13H18c-2.6 0-4.6.7-6 2Z" />
      <path d="M12 6.5v13" />
    </>
  ),
  note: (
    <>
      <path d="M9 18V5.5l10-2V16" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </>
  ),
  flask: (
    <>
      <path d="M9.5 3.5h5M10.5 3.5v6L5.2 18.3A2 2 0 0 0 6.9 21.5h10.2a2 2 0 0 0 1.7-3.2L13.5 9.5v-6" />
      <path d="M7.8 14.5h8.4" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15 9-1.8 4.2L9 15l1.8-4.2L15 9Z" />
    </>
  ),
  quill: (
    <>
      <path d="M20.5 3.5a6.4 6.4 0 0 0-9 0L4.5 10.4V19h8.6l6.9-6.9a6.4 6.4 0 0 0 .5-8.6Z" />
      <path d="M16 8 2 22" />
      <path d="M17.5 15h-8" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.8 7 8.2 6 8.2-6" />
    </>
  ),
  /* A handset off the hook, cradled the old way. */
  phone: (
    <>
      <path d="M8.1 3.9 10.4 8l-2 1.9a12 12 0 0 0 5.4 5.4l1.9-2 4.1 2.3-.8 3.3a1.6 1.6 0 0 1-1.8 1.2C11.4 19.3 5 12.9 3.9 6.6a1.6 1.6 0 0 1 1.2-1.8l3-.9Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <path d="M16.9 7.1h.01" />
    </>
  ),
  github: (
    <>
      <path d="M15 21.5v-3.8a4.4 4.4 0 0 0-1-3.3c3 0 4.9-1.7 4.9-5a4.7 4.7 0 0 0-1-3.1 3.6 3.6 0 0 0-.1-2.9s-1.4.2-2.9 1.2a8.3 8.3 0 0 0-4.8 0C8.6 3.6 7.2 3.4 7.2 3.4a3.6 3.6 0 0 0-.1 2.9 4.7 4.7 0 0 0-1 3.1c0 3.3 1.9 5 4.9 5a4.4 4.4 0 0 0-1 3.3v3.8" />
      <path d="M9 18.2c-4.3 1.4-4.8-1.9-6.7-1.9" />
    </>
  ),
  linkedin: (
    <>
      <path d="M15.8 8.6A5.7 5.7 0 0 1 21.5 14.3v6.7h-4.2v-6.7a1.5 1.5 0 0 0-3 0v6.7h-4.2V8.6h4.2Z" />
      <rect x="2.5" y="8.6" width="4.2" height="12.4" rx="0.6" />
      <circle cx="4.6" cy="4.3" r="2.1" />
    </>
  ),
  /* A leaf of paper with its corner turned — a résumé. */
  doc: (
    <>
      <path d="M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8Z" />
      <path d="M14 3.5V8h4.5" />
      <path d="M8.8 12.4h6.4m-6.4 3.4h4.4" />
    </>
  ),
  /* A shield holding its ground, with the chevron still pointing up. */
  shield: (
    <>
      <path d="M12 3.2 19 6v5.1c0 4.1-2.8 7.8-7 9.1-4.2-1.3-7-5-7-9.1V6l7-2.8Z" />
      <path d="m9.4 12.6 2.6-2.6 2.6 2.6" />
    </>
  ),
  /* Two rings holding the same ground — cooperation. */
  rings: (
    <>
      <circle cx="9.3" cy="12" r="5.3" />
      <circle cx="14.7" cy="12" r="5.3" />
    </>
  ),
  /* A struck seal with its ribbon: a promise made and kept. */
  seal: (
    <>
      <circle cx="12" cy="9.2" r="5.6" />
      <path d="m9.7 9.3 1.7 1.7 3.1-3.4" />
      <path d="M8.4 13.9 7.1 21l4.9-2.7 4.9 2.7-1.3-7.1" />
    </>
  ),
  /* One ray in, many out — the open mind. */
  prism: (
    <>
      <path d="M12 4.2 20.3 18.6H3.7Z" />
      <path d="M2 12.6h4.9" />
      <path d="m17.3 12.3 4.7-1.8m-4.4 3.7 4.6 1.8" />
    </>
  ),
  arrowRight: <path d="M4 12h16m-6-6 6 6-6 6" />,
  arrowLeft: <path d="M20 12H4m6-6-6 6 6 6" />,
} as const

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName
  size?: number
}

export default function Icon({ name, size = 20, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  )
}
