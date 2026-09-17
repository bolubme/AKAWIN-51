import { Fragment, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../i18n/LanguageContext'
import { buildSrcSet } from '../../utils/responsiveImage'
import { useSeo } from '../../utils/useSeo'
import '../../styles/pages/Architecture.css'

// External render views served straight from /public (full quality, no optimization)
const EXTERNAL = '/media/NewImg/260719_views/EXTERNAL'
const viewFront = `${EXTERNAL}/V1.webp`
const viewCorner = `${EXTERNAL}/V2.webp`
const viewVilla = `${EXTERNAL}/V3B.webp`
const viewRooftop = `${EXTERNAL}/V4.webp`
const viewBalcony = `${EXTERNAL}/V1.webp`
const viewDusk = `${EXTERNAL}/generated-image-1.webp`

// Hero cycles through the external render views
const heroViews = [viewFront, viewCorner, viewVilla, viewRooftop, viewDusk]

function Architecture() {
  const { t } = useLanguage()
  useSeo('architecture')
  const [heroIndex, setHeroIndex] = useState(0)

  const nextView = () => setHeroIndex((p) => (p + 1) % heroViews.length)
  const prevView = () => setHeroIndex((p) => (p - 1 + heroViews.length) % heroViews.length)

  // Auto-advance the hero; timer resets whenever the slide changes (incl. manual nav)
  useEffect(() => {
    const id = setTimeout(() => setHeroIndex((p) => (p + 1) % heroViews.length), 5000)
    return () => clearTimeout(id)
  }, [heroIndex])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  }

  // Project info categories — order per client markup:
  // Type, Area, Location, Year of Completion, Architectural Office, Developer
  const projectInfo = [
    { label: t.architecture.typeLabel || 'Type', value: t.architecture.typeValue || 'Residential' },
    { label: t.architecture.areaLabel || 'Area', value: t.architecture.areaValue || '680 m²' },
    { label: t.architecture.locationLabel || 'Location', value: t.architecture.locationValue || 'Polydroso, Marousi' },
    { label: t.architecture.completionLabel || 'Year of Completion', value: t.architecture.completionValue || '2028' },
    {
      label: t.architecture.officeLabel || 'Architectural Office',
      value: t.architecture.officeValue || 'Domisense Studio',
      preserveLabelCase: true,
    },
    {
      label: t.architecture.developerLabel || 'Developer',
      value: t.architecture.developerValue || 'Domisense Residential Constructions',
      preserveLabelCase: true,
    },
  ]

  const heroTitle = (t.architecture.pageHeroTitle || 'Architecture & Design.').replace(/\n/g, ' ')

  // Editorial: image + text row, then a full-bleed image pair, then image + text again
  const infoParagraphs = t.architecture.infoParagraphs || []
  // Split the paragraphs across the two editorial blocks; a dynamic midpoint keeps
  // any number of paragraphs balanced (EN has 6 → 3/3, GR has 7 → 4/3).
  const infoMid = Math.ceil(infoParagraphs.length / 2)
  const editorialRows = [
    { image: viewCorner, alt: 'Corner view of AKAKIWN 50', paragraphs: infoParagraphs.slice(0, infoMid) },
    { image: viewBalcony, alt: 'Balcony view', paragraphs: infoParagraphs.slice(infoMid) },
  ].filter((row) => row.paragraphs.length > 0)
  const editorialDuo = [
    { image: viewVilla, alt: 'Garden and pool residence' },
    { image: viewRooftop, alt: 'Rooftop terrace' },
  ]

  return (
    <div className="page architecture-page" style={{ padding: 0 }}>
      {/* Hero Section — external render views with hover navigation */}
      <section className="arch-hero">
        <div className="hero-background">
          {heroViews.map((src, i) => (
            <img
              key={i}
              src={src}
              srcSet={buildSrcSet(src)}
              sizes="100vw"
              alt={`AKAKIWN 50 exterior view ${i + 1}`}
              className={i === heroIndex ? 'is-active' : ''}
              decoding="async"
              fetchpriority={i === 0 ? 'high' : 'low'}
            />
          ))}
        </div>
        <div className="hero-overlay"></div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="hero-title">{heroTitle}</h1>
        </motion.div>

        {/* Prev/next arrows + counter. Desktop: arrows centred, counter right.
            Mobile: this wrapper becomes one aligned row (arrows left, counter right). */}
        <div className="hero-nav-row">
          <div className="hero-view-controls">
            <button className="hero-view-nav hero-view-prev" onClick={prevView} aria-label="Previous view">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="hero-view-nav hero-view-next" onClick={nextView} aria-label="Next view">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="hero-view-counter" aria-label={`View ${heroIndex + 1} of ${heroViews.length}`}>
            <span className="current">{String(heroIndex + 1).padStart(4, '0')}</span>
            <span className="sep">/</span>
            <span className="total">{String(heroViews.length).padStart(4, '0')}</span>
          </div>
        </div>
      </section>

      {/* Info Section — horizontal project info strip */}
      <motion.section
        className="arch-info"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div className="arch-info-grid" variants={itemVariants}>
          {projectInfo.map((item) => (
            <div key={item.label} className="info-item">
              <span
                className={
                  item.preserveLabelCase
                    ? 'info-label info-label--preserve-case'
                    : 'info-label'
                }
              >
                {item.label}
              </span>
              <span className="info-value">{item.value}</span>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* Editorial rows — large image left, narrow text column right,
          with a full-bleed image pair between them */}
      <section className="arch-editorial">
        {editorialRows.map((row, i) => (
          <Fragment key={i}>
            <motion.div
              className={`arch-editorial-row${i === 1 ? ' arch-editorial-row--flip' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="arch-editorial-image">
                <img src={row.image} srcSet={buildSrcSet(row.image)} sizes="(max-width: 900px) 100vw, 60vw" alt={row.alt} loading="lazy" decoding="async" />
              </div>
              <div className="arch-editorial-text">
                {row.paragraphs.map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>
            </motion.div>

            {i === 0 && (
              <motion.div
                className="arch-editorial-duo"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8 }}
              >
                {editorialDuo.map((img, j) => (
                  <img key={j} src={img.image} srcSet={buildSrcSet(img.image)} sizes="(max-width: 768px) 100vw, 50vw" alt={img.alt} loading="lazy" decoding="async" />
                ))}
              </motion.div>
            )}
          </Fragment>
        ))}
      </section>
    </div>
  )
}

export default Architecture
