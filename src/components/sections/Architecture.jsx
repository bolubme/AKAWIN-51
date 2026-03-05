import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import '../../styles/sections/Architecture.css'

const architectureFeatures = [
  {
    title: 'Facade Design',
    description: 'Floor-to-ceiling glass panels with precision-engineered aluminum frames create a seamless connection between interior and exterior spaces.',
    icon: '◇',
  },
  {
    title: 'Sustainable Materials',
    description: 'Responsibly sourced natural stone, reclaimed wood, and low-emission materials define our commitment to environmental stewardship.',
    icon: '○',
  },
  {
    title: 'Light & Space',
    description: 'Carefully positioned apertures and reflective surfaces maximize natural light, reducing energy consumption while enhancing well-being.',
    icon: '□',
  },
]

function Architecture() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <section id="architecture" className="architecture-section">
      <motion.div 
        ref={ref}
        className="architecture-content"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.p className="section-label" variants={itemVariants}>
          Architecture Design & Vision
        </motion.p>
        
        <motion.h2 className="section-title" variants={itemVariants}>
          Timeless Elegance,
          <br />
          <span className="title-light">Modern Expression</span>
        </motion.h2>
        
        <motion.p className="section-text" variants={itemVariants}>
          Our design philosophy embraces the harmony between nature and architecture, 
          creating spaces that inspire and elevate the human experience.
        </motion.p>

        <motion.div 
          className="architecture-grid"
          variants={containerVariants}
        >
          {architectureFeatures.map((feature, index) => (
            <motion.div 
              key={feature.title}
              className="arch-item"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <div className="arch-icon">{feature.icon}</div>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
              <div className="arch-number">{String(index + 1).padStart(2, '0')}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Background decoration */}
      <div className="arch-decoration">
        <motion.div 
          className="grid-pattern"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.03 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </div>
    </section>
  )
}

export default Architecture
