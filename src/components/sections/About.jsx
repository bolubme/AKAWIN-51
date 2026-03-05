import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import '../../styles/sections/About.css'

const stats = [
  { number: 50, suffix: '', label: 'Exclusive Units' },
  { number: 12, suffix: '', label: 'Floors' },
  { number: 98, suffix: '%', label: 'Natural Light' },
  { number: 'A', suffix: '+', label: 'Energy Rating', isText: true },
]

function AnimatedCounter({ value, suffix = '', isText = false }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true })

  useEffect(() => {
    if (inView && !isText) {
      let start = 0
      const duration = 2000
      const increment = value / (duration / 16)
      
      const timer = setInterval(() => {
        start += increment
        if (start >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [inView, value, isText])

  return (
    <span ref={ref} className="stat-number">
      {isText ? value : count}{suffix}
    </span>
  )
}

function About() {
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
    <section id="about" className="about-section">
      <motion.div 
        ref={ref}
        className="about-content"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="about-text-content">
          <motion.p className="section-label" variants={itemVariants}>
            About Domisense
          </motion.p>
          
          <motion.h2 className="section-title" variants={itemVariants}>
            Crafting Exceptional
            <br />
            <span className="title-light">Living Spaces</span>
          </motion.h2>
          
          <motion.div className="about-description" variants={itemVariants}>
            <p>
              Domisense represents a new standard in residential development, 
              where every detail is considered and every space is purposeful.
            </p>
            <p>
              With AKAKIWN 50, we've created more than a building — we've 
              established a community defined by thoughtful design, sustainable 
              practices, and an unwavering commitment to quality.
            </p>
          </motion.div>

          <motion.div className="about-values" variants={itemVariants}>
            <div className="value-item">
              <span className="value-icon">◇</span>
              <div>
                <h4>Design Excellence</h4>
                <p>Award-winning architectural vision</p>
              </div>
            </div>
            <div className="value-item">
              <span className="value-icon">○</span>
              <div>
                <h4>Sustainability</h4>
                <p>LEED Gold certified development</p>
              </div>
            </div>
            <div className="value-item">
              <span className="value-icon">□</span>
              <div>
                <h4>Community</h4>
                <p>Thoughtfully curated experiences</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="about-stats"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="stat-item"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                borderColor: 'rgba(201, 169, 98, 0.5)'
              }}
            >
              <AnimatedCounter 
                value={stat.number} 
                suffix={stat.suffix}
                isText={stat.isText}
              />
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Background elements */}
      <div className="about-decoration">
        <motion.div 
          className="deco-lines"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.05 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </div>
    </section>
  )
}

export default About
