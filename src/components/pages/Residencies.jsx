import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import '../../styles/pages/Residencies.css'

// Import images for each unit type (multiple images per unit for the slider)
import img1 from '../../media/optimized/shapes_(3).jpg'
import img2 from '../../media/optimized/shapes_(6).jpg'
import img3 from '../../media/optimized/shapes_(7).jpg'
import img4 from '../../media/optimized/shapes_(8).jpg'
import img5 from '../../media/optimized/shapes_(9).jpg'
import img6 from '../../media/optimized/shapes_(10).jpg'
import img7 from '../../media/optimized/shapes_(11).jpg'

// Hero image — zoomed-in balcony view
import heroImage from '../../media/optimized/shapes_(6).jpg'

// Unit gallery images — max 4 per unit, one row
const unitGalleries = {
  'one-bed-gf': [img1, img2, img3],
  'three-bed': [img4, img5, img6],
  'three-bed-mez': [img2, img4, img7],
  'penthouse': [img5, img3, img1, img6],
}

// Pictogram icons for unit characteristics
const BedIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M2 17v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5M2 17h20M2 17v3M22 17v3M6 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
  </svg>
)
const BathIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M4 12V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3zM6 19l-1 2M19 19l1 2M8 6h.01" />
  </svg>
)
const AreaIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M4 4h16v16H4zM4 9h3M17 4v3M20 15h-3M7 20v-3" />
  </svg>
)

const LevelIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
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
  const unitTypes = t.residencies.units
  const [selectedUnit, setSelectedUnit] = useState(unitTypes[0])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Lightbox state (operates on the current unit's images)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Get images for the currently selected unit
  const currentImages = unitGalleries[selectedUnit.id] || [img1]

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
    setSelectedUnit(unit)
    setCurrentImageIndex(0)
  }

  return (
    <div className="page residencies-page">
      {/* Hero Section — zoomed-in balcony view */}
      <section className="residencies-hero">
        <div className="hero-background">
          <img src={heroImage} alt="AKAKIWN 50 Residencies" />
          <div className="hero-overlay"></div>
        </div>
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="hero-title">{t.residencies.pageHeroTitle || 'The\nResidencies.'}</h1>
        </motion.div>
      </section>

      {/* Unit Selector Tabs */}
      <div className="residencies-unit-tabs">
        {unitTypes.map((unit) => (
          <button
            key={unit.id}
            className={`residencies-tab ${selectedUnit.id === unit.id ? 'active' : ''}`}
            onClick={() => handleUnitChange(unit)}
          >
            {unit.tab || unit.type}
          </button>
        ))}
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
                  <span className="pictogram-value">{selectedUnit.bedrooms}</span>
                  <span className="pictogram-label">{t.residencies.bedroomsLabel}</span>
                </div>
                <div className="pictogram">
                  <BathIcon />
                  <span className="pictogram-value">{selectedUnit.bathrooms}</span>
                  <span className="pictogram-label">{t.residencies.bathroomsLabel}</span>
                </div>
                <div className="pictogram">
                  <AreaIcon />
                  <span className="pictogram-value">{selectedUnit.size}</span>
                  <span className="pictogram-label">{t.residencies.sizeLabel}</span>
                </div>
                <div className="pictogram">
                  <LevelIcon />
                  <span className="pictogram-value">{selectedUnit.level}</span>
                  <span className="pictogram-label">{t.residencies.levelLabel}</span>
                </div>
              </div>

              <div className="residencies-description">
                <p>{selectedUnit.description}</p>

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
              <img
                src={currentImages[currentImageIndex]}
                alt={`${selectedUnit.type} view ${currentImageIndex + 1}`}
              />
            </motion.div>
          </AnimatePresence>

          <button className="gallery-nav gallery-prev" onClick={prevImage}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="gallery-nav gallery-next" onClick={nextImage}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="gallery-counter">
            {currentImageIndex + 1} / {currentImages.length}
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
              <img src={src} alt={`${selectedUnit.type} detail ${index + 1}`} loading="lazy" />
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
              <img src={currentImages[lightboxIndex]} alt={`${selectedUnit.type} detail ${lightboxIndex + 1}`} />
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
          <p className="cta-text">{t.residencies.ctaText || 'Ready to find your perfect residence?'}</p>
          <Link to="/contact" className="cta-button">
            {t.residencies.ctaButton || 'Schedule a Viewing'}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </motion.section>
    </div>
  )
}

export default Residencies
