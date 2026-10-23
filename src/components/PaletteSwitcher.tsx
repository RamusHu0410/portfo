import { useEffect, useState } from 'react'

/**
 * Dev-only: flips the decoration palette defined in theme.css
 * (`:root[data-palette=…]`). The choice is kept in localStorage so it survives
 * reloads while you compare. Once you have picked one, copy its values into
 * the @theme block (or set `data-palette` on <html> in index.html) and this
 * switcher can be deleted.
 */
const PALETTES = [
  { id: 'brass', label: 'Brass', swatch: '#594d2c' },
  { id: 'graphite', label: 'Graphite', swatch: '#474743' },
  { id: 'slate', label: 'Slate', swatch: '#3e4754' },
  { id: 'sage', label: 'Sage', swatch: '#414c3d' },
  { id: 'stone', label: 'Stone', swatch: '#4d473f' },
] as const

type PaletteId = (typeof PALETTES)[number]['id']

// New key so a palette saved under the old grey default does not stick.
const STORAGE_KEY = 'dev-palette-v2'

export default function PaletteSwitcher() {
  const [palette, setPalette] = useState<PaletteId>(
    () => (localStorage.getItem(STORAGE_KEY) as PaletteId | null) ?? 'brass',
  )

  useEffect(() => {
    const root = document.documentElement
    // Brass is the @theme default, so it needs no attribute.
    if (palette === 'brass') delete root.dataset.palette
    else root.dataset.palette = palette
    localStorage.setItem(STORAGE_KEY, palette)
  }, [palette])

  return (
    <div
      role="radiogroup"
      aria-label="Preview colour palette"
      className="fixed right-3 bottom-3 z-50 flex items-center gap-1.5 rounded-full border border-rule bg-surface/95 px-2.5 py-1.5 text-xs shadow-lg"
    >
      {PALETTES.map((p) => (
        <button
          key={p.id}
          type="button"
          role="radio"
          aria-checked={palette === p.id}
          title={p.label}
          aria-label={p.label}
          onClick={() => setPalette(p.id)}
          className={`h-5 w-5 cursor-pointer rounded-full border-2 ${
            palette === p.id ? 'border-ink' : 'border-transparent'
          }`}
          style={{ backgroundColor: p.swatch }}
        />
      ))}
    </div>
  )
}
