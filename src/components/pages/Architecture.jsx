import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
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
    { label: t.architecture.structuralLabel || 'Structural Engineer', value: t.architecture.structuralValue || 'Domisense Engineering' },
    { label: t.architecture.mechanicalLabel || 'Mechanical Engineer', value: t.architecture.mechanicalValue || 'Domisense Engineering' },
    { label: t.architecture.developerLabel || 'Developer', value: t.architecture.developerValue || 'Domisense' },
    { label: t.architecture.completionLabel || 'Year of Completion', value: t.architecture.completionValue || '2026' },
    { label: t.architecture.typeLabel || 'Type', value: t.architecture.typeValue || 'Residential' },
  ]

  const heroTitle = (t.architecture.pageHeroTitle || 'Architecture & Design.').replace(/\n/g, ' ')

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

        {/* Hover arrows to move through the other views */}
        <button className="hero-view-nav hero-view-prev" onClick={prevView} aria-label="Previous view">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button className="hero-view-nav hero-view-next" onClick={nextView} aria-label="Next view">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div className="hero-view-dots">
          {heroViews.map((_, i) => (
            <button
              key={i}
              className={`hero-view-dot ${i === heroIndex ? 'active' : ''}`}
              onClick={() => setHeroIndex(i)}
              aria-label={`View ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Info Section — horizontal project info + text, no image */}
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

        <motion.div className="arch-info-text" variants={itemVariants}>
          {(t.architecture.infoParagraphs || []).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </motion.div>
      </motion.section>

      {/* Single borderless gallery — external views only, video integrated */}
      <section className="arch-gallery">
        <motion.div className="ag-cell area-a" style={{ gridArea: 'a' }} {...cellIn(0)}>
          <img src={viewFront} alt="Front elevation" loading="lazy" />
        </motion.div>
        <motion.div className="ag-cell area-v" style={{ gridArea: 'v' }} {...cellIn(1)}>
          <video autoPlay muted loop playsInline src="/media/Video3_002.mp4" />
        </motion.div>
        <motion.div className="ag-cell area-b" style={{ gridArea: 'b' }} {...cellIn(2)}>
          <img src={viewCorner} alt="Corner view" loading="lazy" />
        </motion.div>
        <motion.div className="ag-cell area-c" style={{ gridArea: 'c' }} {...cellIn(3)}>
          <img src={viewVilla} alt="Garden and pool" loading="lazy" />
        </motion.div>
        <motion.div className="ag-cell area-d" style={{ gridArea: 'd' }} {...cellIn(4)}>
          <img src={viewRooftop} alt="Rooftop terrace" loading="lazy" />
        </motion.div>
        <motion.div className="ag-cell area-e" style={{ gridArea: 'e' }} {...cellIn(5)}>
          <img src={viewBalcony} alt="Balcony view" loading="lazy" />
        </motion.div>
      </section>

      {/* CTA removed */}
    </div>
  )
}

// Shared scroll-in animation for gallery cells
const cellIn = (i) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.7, delay: (i % 3) * 0.08 },
})

export default Architecture
