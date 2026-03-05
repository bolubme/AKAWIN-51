import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import '../../styles/sections/Home.css'

function Home() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <section id="home" className="home-section">
      <motion.div 
        ref={ref}
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.p className="section-label" variants={itemVariants}>
          Premium Living Experience
        </motion.p>
        
        <motion.h1 className="hero-title" variants={itemVariants}>
          <span className="title-line">AKAKIWN</span>
          <span className="title-accent">50</span>
        </motion.h1>
        
        <motion.p className="hero-subtitle" variants={itemVariants}>
          by Domisense
        </motion.p>
        
        <motion.p className="hero-tagline" variants={itemVariants}>
          "Where architectural excellence meets refined living — a sanctuary 
          designed for those who appreciate the extraordinary."
        </motion.p>

        <motion.div 
          className="hero-cta"
          variants={itemVariants}
        >
          <a href="#contact" className="btn-primary">
            Schedule a Visit
          </a>
          <a href="#architecture" className="btn-secondary">
            Explore
          </a>
        </motion.div>
      </motion.div>

      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </motion.div>

      {/* Decorative elements */}
      <div className="hero-decoration">
        <motion.div 
          className="decoration-circle"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.03 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.div 
          className="decoration-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />
      </div>
    </section>
  )
}

export default Home
