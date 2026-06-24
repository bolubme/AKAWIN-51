import { motion } from 'framer-motion'
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

  // Hero composition: one big image left + two stacked right
  const heroCells = [
    { src: image1, area: 'a', alt: 'Pool villa' },
    { src: image2, area: 'b', alt: 'Terrace view' },
    { src: image3, area: 'c', alt: 'Living space' },
  ]

  // Staggered masonry: tall columns + shorter tiles that cross the row line
  const masonryCells = [
    { src: image4, area: 'a', alt: 'Facade study' },
    { src: image2, area: 'b', alt: 'Interior detail' },
    { src: image5, area: 'c', alt: 'Garden view' },
    { src: image6, area: 'd', alt: 'Timber screen' },
    { src: image1, area: 'e', alt: 'Pool deck' },
    { src: image3, area: 'f', alt: 'Living space' },
    { src: image4, area: 'g', alt: 'Surface texture' },
  ]

  const cellTransition = (i) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.7, delay: i * 0.08 },
  })

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
          <h3 className="project-info-title">{t.architecture.projectInfoTitle || 'Project Info'}</h3>
          <div className="info-item">
            <span className="info-label">{t.architecture.officeLabel || 'Architectural Office'}</span>
            <span className="info-value">{t.architecture.officeValue || 'Domisense Studio'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">{t.architecture.locationLabel || 'Location'}</span>
            <span className="info-value">{t.architecture.locationValue || 'Marousi, Athens'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">{t.architecture.areaLabel || 'Area'}</span>
            <span className="info-value">{t.architecture.areaValue || '3,200 m²'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">{t.architecture.structuralLabel || 'Structural Engineer'}</span>
            <span className="info-value">{t.architecture.structuralValue || 'Domisense Engineering'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">{t.architecture.mechanicalLabel || 'Mechanical Engineer'}</span>
            <span className="info-value">{t.architecture.mechanicalValue || 'Domisense Engineering'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">{t.architecture.developerLabel || 'Developer'}</span>
            <span className="info-value">{t.architecture.developerValue || 'Domisense'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">{t.architecture.completionLabel || 'Year of Completion'}</span>
            <span className="info-value">{t.architecture.completionValue || '2026'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">{t.architecture.typeLabel || 'Type'}</span>
            <span className="info-value">{t.architecture.typeValue || 'Residential'}</span>
          </div>
        </motion.div>

        <motion.div className="info-content" variants={itemVariants}>
          <p>{t.architecture.infoParagraph1 || "Situated on Akakion Street in the heart of Marousi — one of Athens' most prestigious northern suburbs — AKAKIWN 50 represents a new standard in residential architecture. The building's design philosophy embraces the harmony between nature and contemporary living."}</p>
          <p>{t.architecture.infoParagraph2 || "The design, inspired by the Mediterranean climate and lifestyle, uses natural materials as a canvas, allowing each residence to tell its own story and inspiring residents to imagine their own dream spaces."}</p>
        </motion.div>

        <motion.div className="info-image" variants={itemVariants}>
          <img src={image4} alt="Architectural detail" />
          <p className="image-caption">{t.architecture.imageCaption1 || "The building's facade balances privacy with openness, creating a dialogue between interior and exterior spaces."}</p>
        </motion.div>
      </motion.section>

      {/* First Gallery - hero block: big image left + two stacked right */}
      <section className="arch-grid arch-grid-hero">
        {heroCells.map((c, i) => (
          <motion.div
            key={i}
            className="ag-cell"
            style={{ gridArea: c.area }}
            {...cellTransition(i)}
          >
            <img src={c.src} alt={c.alt} loading="lazy" />
          </motion.div>
        ))}
      </section>

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
          src="/media/Video3_002.mp4"
        />
      </motion.section>

      {/* Second Gallery - staggered masonry grid */}
      <section className="arch-grid arch-grid-masonry">
        {masonryCells.map((c, i) => (
          <motion.div
            key={i}
            className="ag-cell"
            style={{ gridArea: c.area }}
            {...cellTransition(i)}
          >
            <img src={c.src} alt={c.alt} loading="lazy" />
          </motion.div>
        ))}
      </section>

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
