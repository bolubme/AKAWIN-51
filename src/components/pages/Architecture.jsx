import { Fragment, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../i18n/LanguageContext'
import '../../styles/pages/Architecture.css'

// External render views only (no interiors, no repeated views)
import viewFront from '../../media/optimized/V1.jpg'
import viewCorner from '../../media/optimized/shapes_(9).jpg'
import viewVilla from '../../media/optimized/shapes_(7).jpg'
import viewRooftop from '../../media/optimized/shapes_(8).jpg'
import viewBalcony from '../../media/optimized/shapes_(6).jpg'

// Hero cycles through the external render views
const heroViews = [viewFront, viewCorner, viewVilla, viewRooftop, viewBalcony]

function Architecture() {
  const { t } = useLanguage()
  const [heroIndex, setHeroIndex] = useState(0)

  const nextView = () => setHeroIndex((p) => (p + 1) % heroViews.length)
  const prevView = () => setHeroIndex((p) => (p - 1 + heroViews.length) % heroViews.length)

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

  // Project info categories (kept as originals) rendered horizontally
  const projectInfo = [
    { label: t.architecture.officeLabel || 'Architectural Office', value: t.architecture.officeValue || 'Domisense Studio' },
    { label: t.architecture.locationLabel || 'Location', value: t.architecture.locationValue || 'Marousi, Athens' },
    { label: t.architecture.areaLabel || 'Area', value: t.architecture.areaValue || '3,200 m²' },
    { label: t.architecture.developerLabel || 'Developer', value: t.architecture.developerValue || 'Domisense' },
    { label: t.architecture.completionLabel || 'Year of Completion', value: t.architecture.completionValue || '2026' },
    { label: t.architecture.typeLabel || 'Type', value: t.architecture.typeValue || 'Residential' },
  ]

  const heroTitle = (t.architecture.pageHeroTitle || 'Architecture & Design.').replace(/\n/g, ' ')

  // Editorial: image + text row, then a full-bleed image pair, then image + text again
  const infoParagraphs = t.architecture.infoParagraphs || []
  const editorialRows = [
    { image: viewCorner, alt: 'Corner view of AKAKIWN 50', paragraphs: infoParagraphs.slice(0, 3) },
    { image: viewBalcony, alt: 'Balcony view', paragraphs: infoParagraphs.slice(3, 6) },
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
              alt={`AKAKIWN 50 exterior view ${i + 1}`}
              className={i === heroIndex ? 'is-active' : ''}
            />
          ))}
        </div>
        <div className="hero-overlay"></div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="hero-title">{heroTitle}</h1>
        </motion.div>

        {/* Prev / next arrows — centred on the title line, always visible */}
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
              <span className="info-label">{item.label}</span>
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
                <img src={row.image} alt={row.alt} loading="lazy" />
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
                  <img key={j} src={img.image} alt={img.alt} loading="lazy" />
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
