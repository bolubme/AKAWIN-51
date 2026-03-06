import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import '../../styles/pages/Architecture.css'

// Import images
import heroImage from '../../media/optimized/shapes_(6).jpg'
import image1 from '../../media/optimized/shapes_(3).jpg'
import image2 from '../../media/optimized/shapes_(7).jpg'
import image3 from '../../media/optimized/shapes_(8).jpg'
import image4 from '../../media/optimized/shapes_(9).jpg'
import image5 from '../../media/optimized/shapes_(10).jpg'
import image6 from '../../media/optimized/V1.jpg'

function Architecture() {
  const { t } = useLanguage()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  const galleryImages = [
    { src: image1, alt: 'Exterior view' },
    { src: image2, alt: 'Interior detail' },
    { src: image3, alt: 'Living space' },
  ]

  const galleryImages2 = [
    { src: image4, alt: 'Natural light' },
    { src: image5, alt: 'Modern design' },
    { src: image6, alt: 'Architectural detail' },
  ]

  // All index images combined
  const allIndexImages = [...galleryImages, ...galleryImages2, ...galleryImages, ...galleryImages2, ...galleryImages, ...galleryImages2, ...galleryImages, ...galleryImages2]

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = 'auto'
  }

  const prevImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? allIndexImages.length - 1 : prev - 1))
  }

  const nextImage = () => {
    setLightboxIndex((prev) => (prev === allIndexImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="page architecture-page" style={{ padding: 0 }}>
      {/* Hero Section */}
      <section className="arch-hero">
        <div className="hero-background">
          <img src={heroImage} alt="AKAKIWN 50 Architecture" />
        </div>
        <div className="hero-overlay"></div>
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="hero-title">{t.architecture.pageHeroTitle || 'Architecture\n& Design.'}</h1>
        </motion.div>
        <motion.div 
          className="hero-prompts"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="hero-prompt">
            <strong>{t.architecture.heroPrompt1 || 'Explore below'}</strong>
            <span>{t.architecture.heroPrompt1Sub || 'Scroll down to learn more'}</span>
          </div>
          <Link to="/contact" className="hero-prompt">
            <strong>{t.architecture.heroPrompt2 || 'Got a question?'}</strong>
            <span>{t.architecture.heroPrompt2Sub || 'To the contact page'}</span>
          </Link>
        </motion.div>
      </section>

      {/* Info Section */}
      <motion.section 
        className="arch-info"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="info-sidebar" variants={itemVariants}>
          <div className="info-item">
            <span className="info-label">{t.architecture.locationLabel || 'LOCATION'}</span>
            <span className="info-value">{t.architecture.locationValue || 'Marousi, Athens'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">{t.architecture.architectLabel || 'ARCHITECT'}</span>
            <span className="info-value">{t.architecture.architectValue || 'Domisense Studio'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">{t.architecture.categoryLabel || 'CATEGORY'}</span>
            <span className="info-value">{t.architecture.categoryValue || 'Residential'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">{t.architecture.yearLabel || 'YEAR'}</span>
            <span className="info-value">{t.architecture.yearValue || '2025'}</span>
          </div>
        </motion.div>

        <motion.div className="info-content" variants={itemVariants}>
          <p>{t.architecture.infoParagraph1 || "Situated on Akakion Street in the heart of Marousi — one of Athens' most prestigious northern suburbs — AKAKIWN 50 represents a new standard in residential architecture. The building's design philosophy embraces the harmony between nature and contemporary living."}</p>
          <p>{t.architecture.infoParagraph2 || "The design, inspired by the Mediterranean climate and lifestyle, uses natural materials as a canvas, allowing each residence to tell its own story and inspiring residents to imagine their own dream spaces."}</p>
        </motion.div>

        <motion.div className="info-image" variants={itemVariants}>
          <img src={image4} alt="Architectural detail" loading="lazy" />
          <p className="image-caption">{t.architecture.imageCaption1 || "The building's facade balances privacy with openness, creating a dialogue between interior and exterior spaces."}</p>
        </motion.div>
      </motion.section>

      {/* First Gallery */}
      <motion.section 
        className="arch-gallery"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="gallery-grid three-col">
          {galleryImages.map((img, index) => (
            <motion.div 
              key={index}
              className="gallery-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Content Section 1 */}
      <motion.section 
        className="arch-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="content-image" variants={itemVariants}>
          <img src={image5} alt="Design detail" loading="lazy" />
          <p className="image-caption">{t.architecture.imageCaption2 || "To complement the urban environment, we introduced tactile warmth and softness through the use of natural materials and carefully selected colors."}</p>
        </motion.div>

        <motion.div className="content-text" variants={itemVariants}>
          <p>{t.architecture.contentParagraph1 || "Drawing inspiration from the grandeur of the surrounding landscape — marked by the nearby Olympic complex and urban forest — a tactile warmth was introduced to the raw and spacious environment through carefully selected materials, creating an inviting atmosphere."}</p>
          <p>{t.architecture.contentParagraph2 || "Still, the clean surfaces of the space, inspired by the city's modern architecture, serve as a neutral backdrop that lets each home tell its own story, inspiring personal dreams, and aspirations."}</p>
          <p className="indent">{t.architecture.contentParagraph3 || "More than a building, this curated space not only showcases quality craftsmanship but also accommodates the evolving needs of modern living, making it a dynamic platform for residents' future growth."}</p>
        </motion.div>
      </motion.section>

      {/* Full Width Video Strip */}
      <motion.section 
        className="arch-fullwidth"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          preload="metadata"
          src="/media/Video3_002.mp4"
        />
      </motion.section>

      {/* Content Section 2 */}
      <motion.section 
        className="arch-content reverse"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="content-text" variants={itemVariants}>
          <p>{t.architecture.contentParagraph4 || "With a focus on symmetry and clean, bold expressions, the space presents a thoughtful reinterpretation of contemporary residential design, transforming the traditional notion of high-rise living into a dynamic and innovative element."}</p>
          <p>{t.architecture.contentParagraph5 || "By reworking form and function, the design adds a new layer of accessibility and engagement, blending powerful presence with a more contemporary and approachable aesthetic that caters to the needs of both residents and visitors."}</p>
          <p className="indent">{t.architecture.contentParagraph6 || "The overall layout encourages exploration, with the integrated amenities revealing themselves progressively as one moves through the building. A central courtyard doubles as a gathering space, enhancing the flow and creating a sense of openness."}</p>
        </motion.div>

        <motion.div className="content-image" variants={itemVariants}>
          <img src={image6} alt="Interior view" loading="lazy" />
          <p className="image-caption">{t.architecture.imageCaption3 || "Vast vertical surfaces and natural light dominate the environment, creating a striking yet harmonious atmosphere."}</p>
        </motion.div>
      </motion.section>

      {/* Second Gallery */}
      <motion.section 
        className="arch-gallery"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="gallery-grid three-col">
          {galleryImages2.map((img, index) => (
            <motion.div 
              key={index}
              className="gallery-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Thumbnail Grid - INDEX */}
      <motion.section 
        className="arch-thumbnails"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="index-title">INDEX</h2>
        <div className="thumbnail-grid">
          {allIndexImages.map((img, index) => (
            <motion.div 
              key={index}
              className="thumbnail-item"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.02 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => openLightbox(index)}
            >
              <div className="thumb-image">
                <img src={img.src} alt={img.alt} loading="lazy" />
              </div>
              <span className="thumbnail-number">{String(index + 1).padStart(2, '0')}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            
            <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            
            <motion.div 
              className="lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={allIndexImages[lightboxIndex].src} alt={allIndexImages[lightboxIndex].alt} />
            </motion.div>
            
            <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <motion.div 
        className="page-cta"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/location" className="next-link">
          <span className="next-label">{t.architecture.nextLabel}</span>
          <span className="next-title">{t.architecture.nextTitle}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </motion.div>
    </div>
  )
}

export default Architecture
