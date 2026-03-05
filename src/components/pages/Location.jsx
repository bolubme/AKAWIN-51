import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import '../../styles/pages/Location.css'

// Import background image
import heroImage from '../../media/optimized/shapes_(10).jpg'

function Location() {
  const { t } = useLanguage()
  const locationDetails = t.location.details
  const nearbyAmenities = t.location.amenities

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

  return (
    <div className="page location-page" style={{ padding: 0 }}>
      {/* Hero Section */}
      <section className="location-hero">
        <div className="hero-background">
          <img src={heroImage} alt="AKAKIWN 50 Location" />
          <div className="hero-overlay"></div>
        </div>
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="hero-title">{t.location.pageHeroTitle || 'Prime\nLocation.'}</h1>
        </motion.div>
        
        {/* Hero Bottom Prompts */}
        <motion.div 
          className="hero-prompts"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="hero-prompt">
            <span className="prompt-title">{t.location.heroPrompt1 || 'Explore below'}</span>
            <span className="prompt-sub">{t.location.heroPrompt1Sub || 'Scroll down to learn more'}</span>
          </div>
          <Link to="/contact" className="hero-prompt">
            <span className="prompt-title">{t.location.heroPrompt2 || 'Got a question?'}</span>
            <span className="prompt-sub">{t.location.heroPrompt2Sub || 'To the contact page'}</span>
          </Link>
        </motion.div>
      </section>

      {/* Main Content */}
      <motion.div 
        className="location-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Map and Stats Row */}
        <motion.div className="location-map-row" variants={itemVariants}>
          {/* Map */}
          <div className="map-visual">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1272!2d23.8075038!3d38.0327341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1991e2d80d259%3A0x4245cbfcca89ffbd!2sAkakion%2050%2C%20Marousi%20151%2025%2C%20Greece!5e1!2m2!1sen!2s!4v1707500000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AKAKIWN 50 Location - Akakion 50, Marousi, Greece"
            ></iframe>
          </div>

          {/* Quick Stats - Right side */}
          <div className="location-stats">
            {locationDetails.map((item) => (
              <div key={item.label} className="stat-item">
                <span className="stat-value">{item.value}</span>
                <span className="stat-label">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Nearby Amenities - Below Map */}
        <motion.div className="amenities-section" variants={itemVariants}>
          <h4 className="amenities-title">{t.location.amenitiesTitle}</h4>
          <div className="amenities-grid">
            {nearbyAmenities.map((amenity, index) => (
              <motion.div 
                key={amenity.name}
                className="amenity-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.08 }}
              >
                <div className="amenity-info">
                  <span className="amenity-name">{amenity.name}</span>
                  <span className="amenity-type">{amenity.type}</span>
                </div>
                <span className="amenity-distance">{amenity.distance}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div variants={itemVariants}>
          <Link to="/" className="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>{t.location.backToHome || 'Back to Home'}</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Location
