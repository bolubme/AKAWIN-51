import { useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { SEO } from '../i18n/seo'

const SITE = 'https://www.akakion50.gr'

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Give a page its own title / description / canonical / social tags, in the active
// language. Dependency-free: it updates the existing <head> tags (created at build
// time in index.html) so each route is distinct for Google. Call once per page:
//   useSeo('residencies')
export function useSeo(pageKey) {
  const { lang } = useLanguage()

  useEffect(() => {
    const data = (SEO[lang] && SEO[lang][pageKey]) || SEO.EN[pageKey]
    if (!data) return

    const url = SITE + (data.path || (typeof window !== 'undefined' ? window.location.pathname : ''))

    if (data.title) document.title = data.title
    upsertMeta('name', 'description', data.description)
    upsertMeta('property', 'og:title', data.title)
    upsertMeta('property', 'og:description', data.description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('name', 'twitter:title', data.title)
    upsertMeta('name', 'twitter:description', data.description)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }, [lang, pageKey])
}
