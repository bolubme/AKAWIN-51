import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import { buildSrcSet } from '../../utils/responsiveImage'
import { useSeo } from '../../utils/useSeo'
import '../../styles/pages/Residencies.css'

// Full-quality source images served straight from /public (no optimization).
const VIEWS = '/media/NewImg/260719_views'
const asset = (p) => encodeURI(p)
const isVideo = (src) => /\.mp4($|\?)/i.test(src)

// Hero cycles through interior views + walkthrough video
const heroViews = [
  asset(`${VIEWS}/3-BED-PENTHOUSE/v1vid.mp4`),
  asset(`${VIEWS}/3-BED/shapes-11.webp`),
  asset(`${VIEWS}/3-BED/shapes-5.webp`),
  asset(`${VIEWS}/2-BED-DUPLEX/mez-4.webp`),
]

// Unit gallery images — one folder per unit type. The floor plan (LV-*) leads.
const unitGalleries = {
  'one-bed-gf': [
    asset(`${VIEWS}/1-BED/LV-0.webp`),
    asset(`${VIEWS}/1-BED/v1.webp`),
    asset(`${VIEWS}/1-BED/v2.webp`),
  ],
  'three-bed': [
    asset(`${VIEWS}/3-BED/LV-3.webp`),
    asset(`${VIEWS}/3-BED/int-1.webp`),
    asset(`${VIEWS}/3-BED/shapes-6.webp`),
    asset(`${VIEWS}/3-BED/shapes-11.webp`),
  ],
  'three-bed-mez': [
    asset(`${VIEWS}/2-BED-DUPLEX/LV-4.webp`),
    asset(`${VIEWS}/2-BED-DUPLEX/LV-5.webp`),
    asset(`${VIEWS}/2-BED-DUPLEX/mez-1.webp`),
    asset(`${VIEWS}/2-BED-DUPLEX/mez-2.webp`),
  ],
  'penthouse': [
    asset(`${VIEWS}/3-BED-PENTHOUSE/LV-4.webp`),
    asset(`${VIEWS}/3-BED-PENTHOUSE/LV-5.webp`),
    asset(`${VIEWS}/3-BED-PENTHOUSE/v1.webp`),
    asset(`${VIEWS}/3-BED-PENTHOUSE/v3.webp`),
    asset(`${VIEWS}/3-BED-PENTHOUSE/v4.webp`),
  ],
}

const BedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M2 17v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5M2 17h20M2 17v3M22 17v3M6 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
  </svg>
)
const BathIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M4 12V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3zM6 19l-1 2M19 19l1 2M8 6h.01" />
  </svg>
)
const AreaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M4 4h16v16H4zM4 9h3M17 4v3M20 15h-3M7 20v-3" />
  </svg>
)
const LevelIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M4 20V4h16v16H4z" />
    <path d="M7 8h10M7 12h10M7 16h10" />
  </svg>
)

// Small amenity icons shown within each unit (3 per unit)
const amenityIcons = [
  <svg key="0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 21V9l9-6 9 6v12M9 21v-6h6v6" /></svg>,
  <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 20V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14M4 20h16M9 20v-6h6v6" /></svg>,
]

function Residencies() {
  const { t } = useLanguage()
  useSeo('residencies')
  const unitTypes = t.residencies.units
  // Track the selected unit by its language-independent id and derive the unit
  // object from the live translations, so the title/description/specs always
  // follow the current language instead of retaining the language that was
  // active when it was first selected.
  const [selectedId, setSelectedId] = useState(unitTypes[0].id)
  const selectedUnit = unitTypes.find((u) => u.id === selectedId) || unitTypes[0]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Hero view carousel
  const [heroIndex, setHeroIndex] = useState(0)
  const nextView = () => setHeroIndex((p) => (p + 1) % heroViews.length)
  const prevView = () => setHeroIndex((p) => (p - 1 + heroViews.length) % heroViews.length)

  // Auto-advance the hero; timer resets whenever the slide changes (incl. manual nav)
  useEffect(() => {
    const id = setTimeout(() => setHeroIndex((p) => (p + 1) % heroViews.length), 5000)
    return () => clearTimeout(id)
  }, [heroIndex])

  // Lightbox state (operates on the current unit's images)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Get images for the currently selected unit
  const currentImages = unitGalleries[selectedUnit.id] || heroViews

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }
  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = 'auto'
  }
  const lightboxPrev = () => setLightboxIndex((p) => (p - 1 + currentImages.length) % currentImages.length)
  const lightboxNext = () => setLightboxIndex((p) => (p + 1) % currentImages.length)

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % currentImages.length)
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length)

  // Reset image index when unit changes
  const handleUnitChange = (unit) => {
    setSelectedId(unit.id)
    setCurrentImageIndex(0)
  }

  const selectedIndex = unitTypes.findIndex((u) => u.id === selectedUnit.id)

  // Mobile selector arrows — step to the previous / next residence (wraps around).
  const goToUnitIndex = (idx) => {
    const n = unitTypes.length
    handleUnitChange(unitTypes[((idx % n) + n) % n])
  }
  const prevUnit = () => goToUnitIndex(selectedIndex - 1)
  const nextUnit = () => goToUnitIndex(selectedIndex + 1)

  // --- Mobile residence carousel (swipe) ---
  // The selector below is a horizontal scroll-snap carousel on mobile. It drives
  // the SAME selectedId state as the desktop grid, so swiping, tapping and the
  // arrows all stay in sync with the residence content and gallery.
  const selectorRef = useRef(null)
  const suppressScrollSelect = useRef(false)

  // When the user swipes and a card settles nearest the centre, select that unit.
  const handleSelectorScroll = () => {
    if (suppressScrollSelect.current) return
    const el = selectorRef.current
    if (!el) return
    clearTimeout(el._snapTimer)
    el._snapTimer = setTimeout(() => {
      const cRect = el.getBoundingClientRect()
      const centre = cRect.left + cRect.width / 2
      let nearestId = null
      let best = Infinity
      for (const child of el.children) {
        const r = child.getBoundingClientRect()
        const d = Math.abs(r.left + r.width / 2 - centre)
        if (d < best) { best = d; nearestId = child.dataset.unitId }
      }
      if (nearestId && nearestId !== selectedId) {
        setSelectedId(nearestId)
        setCurrentImageIndex(0)
      }
    }, 90)
  }

  // Keep the active card centred when the selection changes via tap or arrows
  // (skipped when it is already centred, so natural swipe-snaps aren't fought).
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(max-width: 768px)').matches) return
    const el = selectorRef.current
    if (!el) return
    const active = el.querySelector(`[data-unit-id="${selectedId}"]`)
    if (!active) return
    const cRect = el.getBoundingClientRect()
    const aRect = active.getBoundingClientRect()
    const delta = (aRect.left + aRect.width / 2) - (cRect.left + cRect.width / 2)
    if (Math.abs(delta) < 6) return
    suppressScrollSelect.current = true
    el.scrollTo({ left: el.scrollLeft + delta, behavior: 'smooth' })
    clearTimeout(el._suppressTimer)
    el._suppressTimer = setTimeout(() => { suppressScrollSelect.current = false }, 450)
  }, [selectedId])

  return (
    <div className="page residencies-page">
      {/* Hero Section — views with hover navigation */}
      <section className="residencies-hero">
        <div className="hero-background">
          {heroViews.map((src, i) =>
            isVideo(src) ? (
              <video
                key={i}
                src={src}
                poster={asset(`${VIEWS}/3-BED-PENTHOUSE/v1.webp`)}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className={i === heroIndex ? 'is-active' : ''}
              />
            ) : (
              <img
                key={i}
                src={src}
                srcSet={buildSrcSet(src)}
                sizes="100vw"
                alt={`AKAKIWN 50 Residencies view ${i + 1}`}
                className={i === heroIndex ? 'is-active' : ''}
                decoding="async"
                fetchpriority={i === 0 ? 'high' : 'low'}
              />
            )
          )}
        </div>
        <div className="hero-overlay"></div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="hero-title">{(t.residencies.pageHeroTitle || 'The Residencies.').replace(/\n/g, ' ')}</h1>
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

      {/* Unit Selector — desktop: static strip · mobile: centred item flanked by
          prev/next arrows (swipe still works). The row wrapper is inert on desktop
          (display:contents) so the desktop strip is unchanged. */}
      <div className="residencies-unit-tabs">
        <div className="residencies-selector-row">
          <button
            type="button"
            className="selector-arrow selector-arrow-prev"
            onClick={prevUnit}
            aria-label="Previous residence"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div
            className="residencies-unit-tabs-grid"
            ref={selectorRef}
            onScroll={handleSelectorScroll}
          >
            {unitTypes.map((unit) => (
              <button
                key={unit.id}
                type="button"
                data-unit-id={unit.id}
                className={`residencies-tab ${selectedUnit.id === unit.id ? 'active' : ''}`}
                onClick={() => handleUnitChange(unit)}
              >
                <span className="residencies-tab-label">{unit.tab || unit.type}</span>
                <span className="residencies-tab-value">{unit.size}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="selector-arrow selector-arrow-next"
            onClick={nextUnit}
            aria-label="Next residence"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="residencies-split">
        {/* Left Side - Text Content */}
        <motion.div
          className="residencies-text"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedUnit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="residencies-title">{selectedUnit.type}</h2>

              <div className="residencies-pictograms">
                <div className="pictogram">
                  <BedIcon />
                  <span className="pictogram-label">{t.residencies.bedroomsLabel}</span>
                  <span className="pictogram-value">{selectedUnit.bedrooms}</span>
                </div>
                <div className="pictogram">
                  <BathIcon />
                  <span className="pictogram-label">{t.residencies.bathroomsLabel}</span>
                  <span className="pictogram-value">{selectedUnit.bathrooms}</span>
                </div>
                <div className="pictogram">
                  <AreaIcon />
                  <span className="pictogram-label">{t.residencies.sizeLabel}</span>
                  <span className="pictogram-value">{selectedUnit.size}</span>
                </div>
                <div className="pictogram">
                  <LevelIcon />
                  <span className="pictogram-label">{t.residencies.levelLabel}</span>
                  <span className="pictogram-value">{selectedUnit.level}</span>
                </div>
              </div>

              <div className="residencies-description">
                {selectedUnit.description.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}

                {/* Amenities moved into each unit — 3 with icons */}
                <div className="residencies-amenities-inline">
                  {selectedUnit.features.slice(0, 3).map((feature, i) => (
                    <div key={feature} className="unit-amenity">
                      <span className="unit-amenity-icon">{amenityIcons[i]}</span>
                      <span className="unit-amenity-label">{feature}</span>
                    </div>
                  ))}
                </div>

                <p className="residencies-closing">
                  {t.residencies.finishesNote}
                </p>
              </div>

              <Link to="/contact" className="residencies-inquiry">
                {t.residencies.inquire}
              </Link>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Right Side - Image Slider */}
        <div className="residencies-gallery">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedUnit.id}-${currentImageIndex}`}
              className="gallery-image-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {isVideo(currentImages[currentImageIndex]) ? (
                <video
                  src={currentImages[currentImageIndex]}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={currentImages[currentImageIndex]}
                  srcSet={buildSrcSet(currentImages[currentImageIndex])}
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  alt={`${selectedUnit.type} view ${currentImageIndex + 1}`}
                  decoding="async"
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Prev / next — same design/placement as the hero slide controls */}
          <div className="gallery-view-controls">
            <button className="gallery-nav gallery-prev" onClick={prevImage} aria-label="Previous image">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="gallery-nav gallery-next" onClick={nextImage} aria-label="Next image">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="gallery-counter" aria-label={`Image ${currentImageIndex + 1} of ${currentImages.length}`}>
            <span className="current">{String(currentImageIndex + 1).padStart(4, '0')}</span>
            <span className="sep">/</span>
            <span className="total">{String(currentImages.length).padStart(4, '0')}</span>
          </div>
        </div>
      </div>

      {/* Single-row photo gallery for the selected unit (max 4), click to zoom */}
      <motion.section
        className="residencies-gallery-menu"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="gallery-menu-grid">
          {currentImages.map((src, index) => (
            <motion.button
              key={`${selectedUnit.id}-${index}`}
              className="gallery-menu-item"
              onClick={() => openLightbox(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              aria-label={`Open image ${index + 1}`}
            >
              {isVideo(src) ? (
                <video src={src} muted loop playsInline autoPlay />
              ) : (
                <img src={src} srcSet={buildSrcSet(src)} sizes="(max-width: 768px) 45vw, 22vw" alt={`${selectedUnit.type} detail ${index + 1}`} loading="lazy" decoding="async" />
              )}
              <span className="gallery-menu-zoom">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
                </svg>
              </span>
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="residencies-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); lightboxPrev() }} aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {isVideo(currentImages[lightboxIndex]) ? (
                <video src={currentImages[lightboxIndex]} controls autoPlay muted loop playsInline />
              ) : (
                <img src={currentImages[lightboxIndex]} alt={`${selectedUnit.type} detail ${lightboxIndex + 1}`} />
              )}
            </motion.div>
            <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); lightboxNext() }} aria-label="Next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section — sits outside the footer */}
      <motion.section
        className="residencies-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="cta-content">
          <h2 className="cta-text">{t.residencies.ctaText || 'Ready to find your perfect residence?'}</h2>
          <Link to="/contact" className="cta-button">
            {t.residencies.ctaButton || 'Schedule a Viewing'}
          </Link>
        </div>
      </motion.section>
    </div>
  )
}

export default Residencies
