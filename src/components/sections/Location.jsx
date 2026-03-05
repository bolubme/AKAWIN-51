import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import '../../styles/sections/Location.css'

const locationDetails = [
  { label: 'Athens City Center', value: '25 min by Metro' },
  { label: 'Marousi Metro Station', value: '650 Meters' },
  { label: 'Athens Intl. Airport', value: '30 min by Train' },
  { label: 'Surrounding Area', value: 'Olympic Complex, Parks & Shopping' },
]

const nearbyPlaces = [
  { name: 'Alsos Syggrou Park', distance: '1.8 km', type: 'park' },
  { name: 'Marousi Metro', distance: '650 m', type: 'transit' },
  { name: 'The Mall Athens', distance: '1.5 km', type: 'shopping' },
  { name: 'Kifisias Avenue', distance: '400 m', type: 'business' },
]

function Location() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

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
    <section id="location" className="location-section">
      <motion.div 
        ref={ref}
        className="location-content"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.p className="section-label" variants={itemVariants}>
          Prime Location
        </motion.p>
        
        <motion.h2 className="section-title" variants={itemVariants}>
          Perfectly Positioned
        </motion.h2>
        
        <motion.p className="section-text" variants={itemVariants}>
          Situated in the heart of Marousi — one of Athens' most prestigious 
          northern suburbs — with direct metro access, world-class shopping, 
          and the iconic 2004 Olympic complex nearby.
        </motion.p>

        <div className="location-grid">
          <motion.div 
            className="location-map"
            variants={itemVariants}
          >
            <div className="map-container">
              <div className="map-placeholder">
                <motion.div 
                  className="map-pin"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor"/>
                    <circle cx="12" cy="9" r="2.5" fill="white"/>
                  </svg>
                </motion.div>
                <div className="map-label">Akakion 50, Marousi</div>
              </div>

              {/* Nearby places indicators */}
              <div className="nearby-markers">
                {nearbyPlaces.map((place, index) => (
                  <motion.div 
                    key={place.name}
                    className={`nearby-marker marker-${index + 1}`}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <span className="marker-dot"></span>
                    <span className="marker-label">{place.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="location-details"
            variants={containerVariants}
          >
            {locationDetails.map((detail, index) => (
              <motion.div 
                key={detail.label}
                className="location-item"
                variants={itemVariants}
              >
                <span className="location-number">{String(index + 1).padStart(2, '0')}</span>
                <div className="location-info">
                  <h4>{detail.label}</h4>
                  <p>{detail.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Location
