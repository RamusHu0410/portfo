import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { SITES, type Site } from '../hackathons'
import { BORDERS, FRAME, LAKES, RIVERS, type LonLat } from '../mapData'

/* ==========================================================================
   A map of southern Ontario and the Montréal plain, from Lake Huron east
   to the St. Lawrence below Montréal, with each campus whose hackathon
   Ramus has been to marked by its crest. Campuses live in src/hackathons.ts;
   the shores, rivers and borders in src/mapData.ts (Natural Earth, built by
   scripts/build_map_data.py).

   The frame leaves room west of London for Western and east of Montréal
   for McGill.
   ========================================================================== */

/* --- Projection ----------------------------------------------------------
   Equirectangular, with longitude squeezed by cos(44.5°) so shapes keep
   their proportions at this latitude. One degree of latitude = 100 units. */

const { lonMin: LON_MIN, lonMax: LON_MAX, latMin: LAT_MIN, latMax: LAT_MAX } = FRAME
const K = 100
const SQUEEZE = Math.cos((44.5 * Math.PI) / 180)

const W = Math.round((LON_MAX - LON_MIN) * SQUEEZE * K)
const H = Math.round((LAT_MAX - LAT_MIN) * K)

function project([lon, lat]: LonLat): [number, number] {
  return [(lon - LON_MIN) * SQUEEZE * K, (LAT_MAX - lat) * K]
}

/** A straight-edged path through the points, so shores and borders read
    as an engraved survey chart: every turn a crisp corner. */
function angular(points: LonLat[], closed = true) {
  const f = (v: number) => v.toFixed(1)
  const d = points
    .map(project)
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${f(x)},${f(y)}`)
    .join('')
  return closed ? `${d}Z` : d
}

const LAKE_PATHS = LAKES.map(({ ring }) => angular(ring))

/** River stroke widths by rank, major to minor. */
const RIVER_WIDTH = { 1: 3.2, 2: 2.2, 3: 1.2 } as const

type Label = { text: string; at: LonLat; kind: 'region' | 'water' }

const LABELS: Label[] = [
  { text: 'Ontario', at: [-78.3, 45.25], kind: 'region' },
  { text: 'Québec', at: [-74.2, 46.0], kind: 'region' },
  { text: 'New York', at: [-75.6, 43.4], kind: 'region' },
  { text: 'Lake Ontario', at: [-77.9, 43.62], kind: 'water' },
  { text: 'Lake Erie', at: [-80.95, 42.45], kind: 'water' },
  { text: 'Lake\nHuron', at: [-81.95, 44.45], kind: 'water' },
  { text: 'Georgian\nBay', at: [-80.7, 45.15], kind: 'water' },
]

/** Cities with no crest of their own, for bearings. */
const CITIES: { name: string; at: LonLat; side: 'left' | 'right' }[] = [
  { name: 'Montréal', at: [-73.57, 45.5], side: 'left' },
  { name: 'Kingston', at: [-76.48, 44.23], side: 'right' },
]

/* ======================================================================== */

export default function HackathonMap({ sites = SITES }: { sites?: Site[] }) {
  const [open, setOpen] = useState<string | null>(null)
  const root = useRef<HTMLDivElement>(null)

  // A tapped card closes when you tap elsewhere or press Escape.
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(null)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const placed = sites.map((site) => {
    const [x, y] = project([site.lon, site.lat])
    const [dx, dy] = site.nudge ?? [0, 0]
    return { ...site, x, y, px: x + dx, py: y + dy }
  })

  return (
    <div ref={root} className="hack-map">
      <svg
        className="hack-map-art"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Map of southern Ontario and the Montréal plain, from Lake Huron and Waterloo east through Toronto and Ottawa to Montréal"
      >
        <defs>
          {/* Engraved water: fine horizontal lines, as on an old chart. */}
          <pattern id="hm-water" width="6" height="4" patternUnits="userSpaceOnUse">
            <rect width="6" height="4" className="hm-water-fill" />
            <path d="M0 2h6" className="hm-water-line" />
          </pattern>
          <clipPath id="hm-frame">
            <rect width={W} height={H} />
          </clipPath>
        </defs>

        <g clipPath="url(#hm-frame)">
          {RIVERS.map(({ path, rank }, i) => (
            <path key={i} d={angular(path, false)} className="hm-river" style={{ strokeWidth: RIVER_WIDTH[rank] }} />
          ))}

          {/* Water in three passes: a soft ring outside each shore, then the
              shoreline at double width, then the fills over it. The fills hide
              the inner half of every shoreline, so where two lakes meet (Huron
              and Georgian Bay) no seam shows. */}
          {LAKE_PATHS.map((d, i) => (
            <path key={`r${i}`} d={d} className="hm-shore-ring" />
          ))}
          {LAKE_PATHS.map((d, i) => (
            <path key={`s${i}`} d={d} className="hm-shore" />
          ))}
          {LAKE_PATHS.map((d, i) => (
            <path key={`f${i}`} d={d} className="hm-lake" fill="url(#hm-water)" />
          ))}

          {BORDERS.map(({ path, kind }, i) => (
            <path key={i} d={angular(path, false)} className={`hm-border hm-border-${kind}`} />
          ))}

          {LABELS.map(({ text, at, kind }) => {
            const [x, y] = project(at)
            const lines = text.split('\n')
            return (
              <text key={text} x={x} y={y} className={`hm-label hm-label-${kind}`}>
                {lines.map((line, i) => (
                  <tspan key={line} x={x} dy={i === 0 ? 0 : '1.25em'}>
                    {line}
                  </tspan>
                ))}
              </text>
            )
          })}

          {CITIES.map(({ name, at, side }) => {
            const [x, y] = project(at)
            return (
              <g key={name} className="hm-city">
                <circle cx={x} cy={y} r={2.4} />
                <text
                  x={side === 'right' ? x + 6 : x - 6}
                  y={y + 3.5}
                  textAnchor={side === 'right' ? 'start' : 'end'}
                >
                  {name}
                </text>
              </g>
            )
          })}

        </g>

        {/* Compass rose and scale, lower right over New York. */}
        <g transform={`translate(${W - 58} ${H - 92})`}>
          <circle r="20" className="hm-rose-ring" />
          <path d="M0-28 4.5-4.5 0 0-4.5-4.5Z" className="hm-rose-n" />
          <path d="M0 28 4.5 4.5 0 0-4.5 4.5Z M-28 0-4.5-4.5 0 0-4.5 4.5Z M28 0 4.5-4.5 0 0 4.5 4.5Z" className="hm-rose-arm" />
          <text y="-34" className="hm-label hm-label-region">
            N
          </text>
        </g>
        {/* 100 km is 0.9° of latitude, or 1.26° of longitude here. */}
        <g className="hm-scale" transform={`translate(${W - 148} ${H - 34})`}>
          <path d="M0 0h90M0-4v8M45-3v6M90-4v8" />
          <text x="45" y="18" className="hm-label hm-label-water">
            100 km
          </text>
        </g>
      </svg>

      {/* The crests sit over the drawing as real buttons, positioned in %. */}
      {placed.map((s, i) => {
        const tipId = `hm-tip-${s.id}`
        const left = (s.px / W) * 100
        const top = (s.py / H) * 100
        const side = top < 30 ? 'below' : 'above'
        const align = left > 78 ? 'end' : left < 22 ? 'start' : 'center'

        return (
          <div
            key={s.id}
            className="hm-site"
            data-open={open === s.id || undefined}
            data-side={side}
            data-align={align}
            style={{ left: `${left}%`, top: `${top}%`, '--i': i } as CSSProperties}
          >
            <button
              type="button"
              className="hm-pin coin"
              aria-describedby={tipId}
              aria-expanded={open === s.id}
              onClick={() => setOpen((cur) => (cur === s.id ? null : s.id))}
            >
              <img src={s.logo} alt="" className="hm-crest" draggable={false} />
              <span className="sr-only">{s.name}</span>
            </button>

            <div id={tipId} role="tooltip" className="hm-tip">
              <p className="hm-tip-uni">{s.name}</p>
              <p className="hm-tip-event">{s.hackathon}</p>
              {s.result && <p className="hm-tip-result">{s.result}</p>}
              <p className="hm-tip-city">{s.city}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
