#!/usr/bin/env python3
"""
Turn a photograph into a two-colour line drawing for the portfolio.

The output is a PNG of black lines on a transparent background. It is used as
a CSS mask, so the actual ink colour comes from the theme at render time —
change --brass in the stylesheet, not here.

    python3 scripts/sketch.py photo.jpg public/portrait.png \
        --crop 120 60 780 780 --sigma 1.1 --phi 18 --eps 0.02

Tune in this order: --crop to frame the subject, --eps for how much line
survives (higher = more line), --phi for how hard the edges snap, --weight for
line thickness, --despeckle to drop leftover grit.

Everything is traced at --supersample times the output width and shrunk at the
end, so the strokes land antialiased rather than as hard stair-stepped pixels.
"""

import argparse

import numpy as np
from PIL import Image, ImageOps
from scipy.ndimage import binary_closing, binary_dilation, gaussian_filter, label


def xdog(gray: np.ndarray, sigma: float, k: float, tau: float, phi: float, eps: float):
    """eXtended Difference of Gaussians — the usual recipe for line art."""
    g1 = gaussian_filter(gray, sigma)
    g2 = gaussian_filter(gray, sigma * k)
    diff = g1 - tau * g2
    soft = np.where(diff >= eps, 1.0, 1.0 + np.tanh(phi * (diff - eps)))
    return np.clip(soft, 0.0, 1.0)


def despeckle(mask: np.ndarray, min_pixels: int) -> np.ndarray:
    """Drop connected blobs smaller than `min_pixels` — sensor grit, stray dots."""
    if min_pixels <= 0:
        return mask
    labelled, count = label(mask)
    if count == 0:
        return mask
    sizes = np.bincount(labelled.ravel())
    sizes[0] = 0  # background
    keep = np.isin(labelled, np.flatnonzero(sizes >= min_pixels))
    return mask & keep


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("source")
    p.add_argument("output")
    p.add_argument("--crop", nargs=4, type=int, metavar=("X", "Y", "W", "H"),
                   help="crop box on the source, before anything else")
    p.add_argument("--size", type=int, default=1200, help="output width in px")
    p.add_argument("--supersample", type=int, default=3,
                   help="trace at N times the output width, then shrink — this is what antialiases the line")
    p.add_argument("--sigma", type=float, default=1.0, help="base blur; larger = coarser line")
    p.add_argument("--k", type=float, default=1.6, help="second blur multiplier")
    p.add_argument("--tau", type=float, default=0.985, help="edge sharpness")
    p.add_argument("--phi", type=float, default=18.0, help="how hard edges snap to black")
    p.add_argument("--eps", type=float, default=0.02, help="threshold; higher keeps more line")
    p.add_argument("--cut", type=float, default=0.5, help="binarisation level, 0..1")
    p.add_argument("--weight", type=int, default=0, help="dilate lines by N px")
    p.add_argument("--close", type=int, default=0, help="close gaps of N px in the line")
    p.add_argument("--despeckle", type=int, default=12, help="drop blobs under N px")
    p.add_argument("--circle", action="store_true", help="fade the output to a circular vignette")
    args = p.parse_args()

    img = Image.open(args.source).convert("RGB")
    if args.crop:
        x, y, w, h = args.crop
        img = img.crop((x, y, x + w, y + h))

    work = args.size * max(1, args.supersample)
    scale = work / img.width
    img = img.resize((work, max(1, round(img.height * scale))), Image.LANCZOS)

    gray = ImageOps.autocontrast(img.convert("L"), cutoff=1)
    arr = np.asarray(gray, dtype=np.float64) / 255.0

    lines = xdog(arr, args.sigma, args.k, args.tau, args.phi, args.eps) < args.cut

    if args.close:
        lines = binary_closing(lines, np.ones((args.close, args.close), bool))
    lines = despeckle(lines, args.despeckle)
    if args.weight:
        lines = binary_dilation(lines, np.ones((args.weight, args.weight), bool))

    alpha = (lines * 255).astype(np.uint8)

    if args.circle:
        h, w = alpha.shape
        yy, xx = np.mgrid[0:h, 0:w]
        r = np.hypot(xx - w / 2, yy - h / 2) / (min(w, h) / 2)
        alpha = (alpha * np.clip((1.02 - r) / 0.14, 0, 1)).astype(np.uint8)

    ink = Image.fromarray(alpha)
    if work != args.size:
        # Shrinking the binary trace is what turns the stair-stepped edge into a
        # soft one: LANCZOS averages the boundary pixels into partial alpha.
        ink = ink.resize((args.size, max(1, round(ink.height * args.size / ink.width))), Image.LANCZOS)

    out = Image.merge("RGBA", [Image.new("L", ink.size, 0)] * 3 + [ink])
    out.save(args.output)

    coverage = lines.mean() * 100
    print(f"wrote {args.output}  {out.width}x{out.height}  ink coverage {coverage:.1f}%")


if __name__ == "__main__":
    main()
