import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import '../../styles/sections/Contact.css'

const contactInfo = [
  { 
    icon: '◈', 
    label: 'Visit Us', 
    value: 'Akakion 50, Marousi\n151 25, Athens, Greece' 
  },
  { 
    icon: '◇', 
    label: 'Email', 
    value: 'inquiries@akakiwn51.com' 
  },
  { 
    icon: '○', 
    label: 'Phone', 
    value: '+30 210 000 0000' 
  },
  { 
    icon: '□', 
    label: 'Sales Office Hours', 
    value: 'Mon - Sat: 9AM - 7PM' 
  },
]

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', phone: '', message: '' })
    
    setTimeout(() => setIsSubmitted(false), 5000)
  }

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
    <section id="contact" className="contact-section">
      <motion.div 
        ref={ref}
        className="contact-content"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.p className="section-label" variants={itemVariants}>
          Get in Touch
        </motion.p>
        
        <motion.h2 className="section-title" variants={itemVariants}>
          Begin Your Journey
        </motion.h2>

        <div className="contact-grid">
          <motion.div 
            className="contact-info"
            variants={containerVariants}
          >
            <motion.h3 variants={itemVariants}>
              We'd love to hear from you
            </motion.h3>
            
            <div className="contact-details">
              {contactInfo.map((item) => (
                <motion.div 
                  key={item.label}
                  className="contact-item"
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                >
                  <span className="contact-icon">{item.icon}</span>
                  <div>
                    <h4>{item.label}</h4>
                    <p style={{ whiteSpace: 'pre-line' }}>{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.form 
            className="contact-form"
            variants={containerVariants}
            onSubmit={handleSubmit}
          >
            <motion.div className="form-group" variants={itemVariants}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <span className="input-line"></span>
            </motion.div>

            <motion.div className="form-group" variants={itemVariants}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="input-line"></span>
            </motion.div>

            <motion.div className="form-group" variants={itemVariants}>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
              <span className="input-line"></span>
            </motion.div>

            <motion.div className="form-group" variants={itemVariants}>
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <span className="input-line"></span>
            </motion.div>

            <motion.button 
              type="submit"
              className={`submit-btn ${isSubmitting ? 'submitting' : ''} ${isSubmitted ? 'submitted' : ''}`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="btn-loading">
                  <span className="loading-dot"></span>
                  <span className="loading-dot"></span>
                  <span className="loading-dot"></span>
                </span>
              ) : isSubmitted ? (
                'Thank You!'
              ) : (
                'Send Inquiry'
              )}
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
