import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import '../../styles/sections/Residencies.css'

const amenities = [
  { icon: '◇', title: 'Private Terraces', description: 'Expansive outdoor spaces with panoramic views' },
  { icon: '○', title: 'Wellness Center', description: 'State-of-the-art fitness & spa facilities' },
  { icon: '□', title: 'Concierge Service', description: '24/7 dedicated personal assistance' },
  { icon: '△', title: 'Rooftop Lounge', description: 'Exclusive entertaining & relaxation space' },
  { icon: '◎', title: 'Smart Home', description: 'Integrated technology throughout' },
  { icon: '⬡', title: 'Private Parking', description: 'Secure underground with EV charging' },
  { icon: '✧', title: 'Garden Courtyard', description: 'Tranquil landscaped common areas' },
  { icon: '◈', title: 'Business Center', description: 'Professional meeting & work spaces' },
]

const unitTypes = [
  { type: 'Studio', size: '45-55 m²', price: 'From $350K' },
  { type: '1 Bedroom', size: '65-80 m²', price: 'From $450K' },
  { type: '2 Bedroom', size: '95-120 m²', price: 'From $650K' },
  { type: 'Penthouse', size: '180-250 m²', price: 'From $1.2M' },
]

function Residencies() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <section id="residencies" className="residencies-section">
      <motion.div 
        ref={ref}
        className="residencies-content"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.p className="section-label" variants={itemVariants}>
          Residencies & Amenities
        </motion.p>
        
        <motion.h2 className="section-title" variants={itemVariants}>
          Curated Living Spaces
        </motion.h2>
        
        <motion.p className="section-text" variants={itemVariants}>
          Every residence is thoughtfully designed to provide the perfect balance 
          of privacy, luxury, and community.
        </motion.p>

        {/* Unit Types */}
        <motion.div 
          className="unit-types"
          variants={containerVariants}
        >
          {unitTypes.map((unit) => (
            <motion.div 
              key={unit.type}
              className="unit-card"
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
              }}
            >
              <h4>{unit.type}</h4>
              <p className="unit-size">{unit.size}</p>
              <p className="unit-price">{unit.price}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Amenities Grid */}
        <motion.h3 className="amenities-heading" variants={itemVariants}>
          Premium Amenities
        </motion.h3>
        
        <motion.div 
          className="amenities-grid"
          variants={containerVariants}
        >
          {amenities.map((amenity, index) => (
            <motion.div 
              key={amenity.title}
              className="amenity-card"
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="amenity-icon"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                }}
              >
                {amenity.icon}
              </motion.div>
              <h4>{amenity.title}</h4>
              <p>{amenity.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Residencies
