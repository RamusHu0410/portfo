/* --- Hackathon map campuses ------------------------------------------------
   Drawn by <HackathonMap> on the STEM page, over southern Ontario and the
   Montréal plain (82.5°W to 72.9°W, 42.2°N to 46.2°N; see FRAME in
   src/mapData.ts). That takes in Western (London) and McGill (Montréal);
   a campus outside it would sit off the map.

   To add one: append it with its real lon/lat and drop its emblem in
   public/logos/. The crest itself marks the spot. If it lands on a
   neighbour or in a lake, give it a small `nudge` (map units, about 1 px
   at full width) to shift it nearby.
   -------------------------------------------------------------------------- */

export type Site = {
  id: string
  /** Full name, shown in the card and read by screen readers. */
  name: string
  city: string
  lon: number
  lat: number
  /** The hackathon attended here. */
  hackathon: string
  /** The university's emblem, under public/. */
  logo: string
  /** Placing or prize, if any, shown under the event in the card. */
  result?: string
  /** Moves the crest off its true spot when campuses crowd. */
  nudge?: [number, number]
}

export const SITES: Site[] = [
  {
    id: 'uottawa',
    name: 'University of Ottawa',
    city: 'Ottawa',
    lon: -75.683,
    lat: 45.423,
    hackathon: 'Hack the Hill III',
    logo: '/logos/uottawa.png',
  },
  {
    id: 'uwaterloo',
    name: 'University of Waterloo',
    city: 'Waterloo',
    lon: -80.544,
    lat: 43.472,
    hackathon: 'Hack the North 2026',
    logo: '/logos/uwaterloo.svg',
  },
  {
    id: 'yorku',
    name: 'York University',
    city: 'Toronto',
    lon: -79.503,
    lat: 43.773,
    hackathon: 'MathHack III',
    logo: '/logos/yorku.svg',
    nudge: [-33, -19],
  },
  {
    id: 'uoft',
    name: 'University of Toronto',
    city: 'Toronto',
    lon: -79.395,
    lat: 43.663,
    hackathon: 'Hack-or-Treat',
    logo: '/logos/uoft.svg',
    // Lifted north off the shoreline so the crest sits on land, not in the lake.
    nudge: [6, -18],
  },
  {
    // Online, so it sits at home base in Markham.
    id: 'ignitionhack',
    name: 'Virtual hackathon',
    city: 'Markham, home base',
    lon: -79.337,
    lat: 43.857,
    hackathon: 'IgnitionHack V7',
    result: 'Third place',
    logo: '/logos/virtual.svg',
    nudge: [32, -25],
  },
]
