import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import AmenityIcons from '../AmenityIcons'
import '../../styles/pages/Residencies.css'

// Import images for each unit type (multiple images per unit for the slider)
import img1 from '../../media/optimized/shapes_(3).jpg'
import img2 from '../../media/optimized/shapes_(6).jpg'
import img3 from '../../media/optimized/shapes_(7).jpg'
import img4 from '../../media/optimized/shapes_(8).jpg'
import img5 from '../../media/optimized/shapes_(9).jpg'
import img6 from '../../media/optimized/shapes_(10).jpg'
import img7 from '../../media/optimized/shapes_(11).jpg'

// Hero image
import heroImage from '../../media/optimized/shapes_(9).jpg'

// Unit gallery images - each unit has multiple images to flip through
const unitGalleries = {
  'one-bed-gf': [img1, img2, img3],
  'three-bed': [img4, img5, img6],
  'three-bed-mez': [img2, img4, img7],
  'penthouse': [img5, img3, img1, img6],
}

function Residencies() {
  const { t } = useLanguage()
  const unitTypes = t.residencies.units
  const [selectedUnit, setSelectedUnit] = useState(unitTypes[0])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Get images for the currently selected unit
  const currentImages = unitGalleries[selectedUnit.id] || [img1]
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length)
  }
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length)
  }
  
  // Reset image index when unit changes
  const handleUnitChange = (unit) => {
    setSelectedUnit(unit)
    setCurrentImageIndex(0)
  }

  return (
    <div className="page residencies-page">
      {/* Hero Section */}
      <section className="residencies-hero">
        <div className="hero-background">
          <img src={heroImage} alt="AKAKIWN 50 Residencies" />
          <div className="hero-overlay"></div>
        </div>
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="hero-title">{t.residencies.pageHeroTitle || 'The\nResidencies.'}</h1>
        </motion.div>
        
        <motion.div 
          className="hero-prompts"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="hero-prompt">
            <span className="prompt-title">{t.residencies.heroPrompt1 || 'Explore below'}</span>
            <span className="prompt-sub">{t.residencies.heroPrompt1Sub || 'Scroll down to learn more'}</span>
          </div>
          <Link to="/contact" className="hero-prompt">
            <span className="prompt-title">{t.residencies.heroPrompt2 || 'Got a question?'}</span>
            <span className="prompt-sub">{t.residencies.heroPrompt2Sub || 'To the contact page'}</span>
          </Link>
        </motion.div>
      </section>

      {/* Intro Section */}
      <motion.section 
        className="residencies-intro"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="intro-label">{t.residencies.label}</span>
        <h2 className="intro-headline">{t.residencies.title}</h2>
        <p className="intro-text">{t.residencies.description}</p>
      </motion.section>

      {/* Unit Selector Tabs */}
      <div className="residencies-unit-tabs">
        {unitTypes.map((unit) => (
          <button
            key={unit.id}
            className={`residencies-tab ${selectedUnit.id === unit.id ? 'active' : ''}`}
            onClick={() => handleUnitChange(unit)}
          >
            {unit.type}
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
              <h1 className="residencies-title">{selectedUnit.type}</h1>
              
              <div className="residencies-meta">
                <span>{t.residencies.bedroomsLabel} {selectedUnit.bedrooms}</span>
                <span className="meta-divider">|</span>
                <span>{t.residencies.bathroomsLabel} {selectedUnit.bathrooms}</span>
                <span className="meta-divider">|</span>
                <span>{selectedUnit.size}</span>
              </div>

              <div className="residencies-description">
                <p>{t.residencies.description}</p>
                
                <p className="residencies-features-intro">
                  {t.residencies.featuresIntro || 'Each residence is designed with attention to every detail, offering the highest standard of modern living with premium finishes throughout.'}
                </p>

                <div className="residencies-features-list">
                  {selectedUnit.features.map((feature) => (
                    <p key={feature}>• {feature}</p>
                  ))}
                </div>

                <p className="residencies-closing">
                  {t.residencies.closingText || 'Our residences reflect a commitment to quality craftsmanship, sustainable materials, and timeless design — creating spaces that inspire connection with both the environment and community.'}
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
          
          {/* Navigation Arrows */}
          <button className="gallery-nav gallery-prev" onClick={prevImage}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button className="gallery-nav gallery-next" onClick={nextImage}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>

          {/* Image Counter */}
          <div className="gallery-counter">
            {currentImageIndex + 1} / {currentImages.length}
          </div>
        </div>
      </div>

      {/* Amenities Section */}
      <motion.section 
        className="residencies-amenities"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="amenities-title">{t.residencies.amenitiesTitle}</h3>
        <div className="amenities-grid">
          {t.residencies.amenities.map((amenity, index) => (
            <motion.div 
              key={amenity.id}
              className="amenity-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
            >
              <div className="amenity-icon">
                <AmenityIcons type={amenity.id} />
              </div>
              <span className="amenity-label">{amenity.title}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
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
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </motion.section>
    </div>
  )
}

export default Residencies
