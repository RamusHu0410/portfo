"""Builds src/mapData.ts, the geography behind <HackathonMap>.

Source: Natural Earth 1:10m (public domain), from
https://github.com/nvkelso/natural-earth-vector/tree/master/geojson

    python3 scripts/build_map_data.py /path/to/geojson/dir

Shapes are clipped to the map frame (plus a margin, so no clipped edge is
ever visible) and simplified with Douglas–Peucker in projected units. The
simplification is what gives the shores their angular, surveyed look; raise
TOLERANCE for fewer, longer edges.
"""

import json
import math
import sys
from pathlib import Path

# Keep in step with LON_MIN… in src/components/HackathonMap.tsx.
LON_MIN, LON_MAX, LAT_MIN, LAT_MAX = -82.5, -72.9, 42.2, 46.2
MARGIN = 0.25
SQUEEZE = math.cos(math.radians(44.5))
TOLERANCE = 0.012  # degrees of latitude; about 1.2 map units

BOX = (LON_MIN - MARGIN, LAT_MIN - MARGIN, LON_MAX + MARGIN, LAT_MAX + MARGIN)

LAKES = {
    'Lake Huron', 'Georgian Bay', 'North Channel', 'Lake Erie', 'Lake Ontario',
    'Lake Saint Clair', 'Lake Simcoe', 'Lake Nipissing', 'Lake Champlain',
    'Oneida Lake', 'Big Rideau Lake', 'Rice Lake', 'Lake Scugog', 'Lake Muskoka',
    'Lake Rosseau', 'Lac Memphremagog',
}

# River name → stroke width class (1 major … 3 minor).
RIVERS = {
    'St. Lawrence': 1, 'Ottawa': 1, 'Niagara': 2, 'St. Clair': 2, 'Detroit': 2,
    'Grand': 3, 'Thames': 3, 'Rideau': 3, 'Richelieu': 3, 'Trent': 3,
}

# Natural Earth stops the St. Lawrence at Cornwall and the Ottawa at
# Pointe-Fortune (below there they are mapped as neither river nor lake),
# so their last reaches past Montréal are traced by hand.
EXTRA_RIVERS = [
    ('St. Lawrence', 1, [
        (-74.713, 44.999), (-74.5, 45.07), (-74.3, 45.17), (-74.13, 45.25), (-73.95, 45.33),
        (-73.8, 45.38), (-73.68, 45.42), (-73.52, 45.47), (-73.5, 45.56), (-73.45, 45.66),
        (-73.3, 45.8), (-73.12, 46.04), (-72.85, 46.2), (-72.6, 46.32),
    ]),
    ('Ottawa', 1, [(-74.38, 45.56), (-74.1, 45.47), (-73.95, 45.42), (-73.85, 45.39)]),
]

PROVINCE_LINES = {'Québec - Ontario', 'New York - Vermont'}


def rings(geom):
    t, c = geom['type'], geom['coordinates']
    if t == 'Polygon':
        return [c[0]]  # outer ring only; islands are too small to matter here
    if t == 'MultiPolygon':
        return [p[0] for p in c]
    if t == 'LineString':
        return [c]
    if t == 'MultiLineString':
        return c
    return []


def clip_polygon(pts):
    """Sutherland–Hodgman against BOX."""
    x0, y0, x1, y1 = BOX
    edges = [
        (lambda p: p[0] >= x0, lambda a, b: (x0, a[1] + (b[1] - a[1]) * (x0 - a[0]) / (b[0] - a[0]))),
        (lambda p: p[0] <= x1, lambda a, b: (x1, a[1] + (b[1] - a[1]) * (x1 - a[0]) / (b[0] - a[0]))),
        (lambda p: p[1] >= y0, lambda a, b: (a[0] + (b[0] - a[0]) * (y0 - a[1]) / (b[1] - a[1]), y0)),
        (lambda p: p[1] <= y1, lambda a, b: (a[0] + (b[0] - a[0]) * (y1 - a[1]) / (b[1] - a[1]), y1)),
    ]
    out = [tuple(p[:2]) for p in pts]
    for inside, cross in edges:
        if not out:
            break
        src, out = out, []
        for i, cur in enumerate(src):
            prev = src[i - 1]
            if inside(cur):
                if not inside(prev):
                    out.append(cross(prev, cur))
                out.append(cur)
            elif inside(prev):
                out.append(cross(prev, cur))
    return out


def clip_line(pts):
    """Splits a line into the runs that fall inside BOX."""
    x0, y0, x1, y1 = BOX
    runs, cur = [], []
    for p in pts:
        if x0 <= p[0] <= x1 and y0 <= p[1] <= y1:
            cur.append(tuple(p[:2]))
        elif cur:
            cur.append(tuple(p[:2]))  # one point past the edge, so it reaches the frame
            runs.append(cur)
            cur = []
    if cur:
        runs.append(cur)
    return [r for r in runs if len(r) > 1]


def simplify(pts, closed):
    """Douglas–Peucker in projected space."""
    proj = [(x * SQUEEZE, y) for x, y in pts]

    def dp(lo, hi, keep):
        ax, ay = proj[lo]
        bx, by = proj[hi]
        dx, dy = bx - ax, by - ay
        norm = math.hypot(dx, dy) or 1e-12
        best, idx = 0.0, -1
        for i in range(lo + 1, hi):
            px, py = proj[i]
            d = abs(dy * (px - ax) - dx * (py - ay)) / norm if (dx or dy) else math.hypot(px - ax, py - ay)
            if d > best:
                best, idx = d, i
        if best > TOLERANCE:
            dp(lo, idx, keep)
            keep.add(idx)
            dp(idx, hi, keep)

    if len(pts) < 3:
        return pts
    if closed:
        # Split the ring at its farthest point from the start, then simplify both halves.
        far = max(range(len(pts)), key=lambda i: math.dist(proj[0], proj[i]))
        keep = {0, far, len(pts) - 1}
        dp(0, far, keep)
        dp(far, len(pts) - 1, keep)
    else:
        keep = {0, len(pts) - 1}
        dp(0, len(pts) - 1, keep)
    return [pts[i] for i in sorted(keep)]


def fmt(pts):
    return '[' + ','.join(f'[{x:.3f},{y:.3f}]' for x, y in pts) + ']'


def main(src: Path):
    load = lambda name: json.loads((src / f'{name}.geojson').read_text())['features']
    lakes, rivers, borders = [], [], []

    for f in load('ne_10m_lakes') + load('ne_10m_lakes_north_america'):
        if f['properties'].get('name') in LAKES:
            for ring in rings(f['geometry']):
                clipped = clip_polygon(ring)
                if len(clipped) >= 3:
                    s = simplify(clipped, closed=True)
                    if len(s) >= 3:
                        lakes.append((f['properties']['name'], s))

    for f in load('ne_10m_rivers_lake_centerlines') + load('ne_10m_rivers_north_america'):
        name = (f['properties'].get('name') or '').replace(' River', '')
        if name in RIVERS and f['properties'].get('featurecla') == 'River':
            for line in rings(f['geometry']):
                for run in clip_line(line):
                    rivers.append((name, RIVERS[name], simplify(run, closed=False)))
    rivers += [(n, k, pts) for n, k, pts in EXTRA_RIVERS]

    for f in load('ne_10m_admin_0_boundary_lines_land'):
        p = f['properties']
        if {'Canada', 'United States of America'} == {p.get('ADM0_LEFT'), p.get('ADM0_RIGHT')}:
            for line in rings(f['geometry']):
                for run in clip_line(line):
                    borders.append(('Canada - United States', 'national', simplify(run, closed=False)))

    for f in load('ne_10m_admin_1_states_provinces_lines'):
        name = f['properties'].get('NAME')
        if name in PROVINCE_LINES:
            for line in rings(f['geometry']):
                for run in clip_line(line):
                    borders.append((name, 'provincial', simplify(run, closed=False)))

    out = [
        '/* Generated by scripts/build_map_data.py from Natural Earth 1:10m',
        '   (public domain). Do not edit by hand; rerun the script. */',
        '',
        'export type LonLat = [number, number]',
        '',
        f'export const FRAME = {{ lonMin: {LON_MIN}, lonMax: {LON_MAX}, latMin: {LAT_MIN}, latMax: {LAT_MAX} }}',
        '',
        'export const LAKES: { name: string; ring: LonLat[] }[] = [',
        *[f'  {{ name: {json.dumps(n)}, ring: {fmt(r)} }},' for n, r in lakes],
        ']',
        '',
        'export const RIVERS: { name: string; rank: 1 | 2 | 3; path: LonLat[] }[] = [',
        *[f'  {{ name: {json.dumps(n)}, rank: {k}, path: {fmt(r)} }},' for n, k, r in rivers],
        ']',
        '',
        "export const BORDERS: { name: string; kind: 'national' | 'provincial'; path: LonLat[] }[] = [",
        *[f'  {{ name: {json.dumps(n)}, kind: {json.dumps(k).replace(chr(34), chr(39))}, path: {fmt(r)} }},' for n, k, r in borders],
        ']',
        '',
    ]
    dest = Path(__file__).resolve().parent.parent / 'src' / 'mapData.ts'
    dest.write_text('\n'.join(out))
    print(f'{dest}: {len(lakes)} lakes, {len(rivers)} rivers, {len(borders)} borders,',
          sum(len(r) for _, r in lakes), 'lake points')


if __name__ == '__main__':
    main(Path(sys.argv[1] if len(sys.argv) > 1 else '/tmp/ne'))
