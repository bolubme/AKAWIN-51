import manifest from '../imageManifest.json'

// Build a responsive `srcSet` for an image that has generated width variants
// (see scripts that write src/imageManifest.json). The browser then downloads the
// smallest file that still fully covers the display size — a phone grabs the 1280px
// version instead of the 2560px original, with no visible quality loss, while large
// and retina screens still receive the full-resolution original.
//
// Returns undefined when the image has no variants, so callers can safely spread it
// onto an <img> (an undefined srcSet is simply ignored and the plain src is used).
export function buildSrcSet(src) {
  if (!src) return undefined
  const key = decodeURI(src)
  const entry = manifest[key]
  if (!entry) return undefined
  const base = key.replace(/\.webp$/i, '')
  const parts = entry.variants.map((w) => `${encodeURI(`${base}-${w}`)}.webp ${w}w`)
  parts.push(`${src} ${entry.w}w`) // original, at its true width
  return parts.join(', ')
}
