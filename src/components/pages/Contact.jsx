import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import '../../styles/pages/Contact.css'

function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: '', email: '', phone: '', interest: '', message: '' })
  }

  const handleChange = (e) => {
    if (submitted) setSubmitted(false)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
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
    <div className="page contact-page" style={{ padding: 0 }}>
      {/* Page heading (intro image removed) */}
      <div className="contact-heading">
        <h1 className="contact-heading-title">{(t.contact.pageHeroTitle || 'Get in Touch.').replace(/\n/g, ' ')}</h1>
      </div>

      {/* Main Content */}
      <motion.div
        className="contact-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="contact-content">
          {/* Form */}
          <motion.form 
            className="contact-form"
            variants={itemVariants}
            onSubmit={handleSubmit}
          >
            <div className="form-group full-width">
              <label htmlFor="name">{t.contact.fullName}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t.contact.namePlaceholder}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">{t.contact.emailLabel}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.contact.emailPlaceholder}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">{t.contact.phoneLabel}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t.contact.phonePlaceholder}
                />
              </div>
            </div>
            
            <div className="form-group full-width">
              <label htmlFor="interest">{t.contact.interestLabel}</label>
              <select
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                required
              >
                <option value="">{t.contact.selectOption}</option>
                <option value="studio">{t.contact.optionStudio}</option>
                <option value="1bed">{t.contact.option1Bed}</option>
                <option value="2bed">{t.contact.option2Bed}</option>
                <option value="penthouse">{t.contact.optionPenthouse}</option>
                <option value="general">{t.contact.optionGeneral}</option>
              </select>
            </div>
            
            <div className="form-group full-width">
              <label htmlFor="message">{t.contact.messageLabel}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t.contact.messagePlaceholder}
                rows={5}
              ></textarea>
            </div>
            
            <motion.button
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.contact.sendMessage}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.button>

            <AnimatePresence>
              {submitted && (
                <motion.p
                  className="form-success"
                  role="status"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  {t.contact.successMessage || 'Thank you — your message has been sent. We will be in touch shortly.'}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>

          {/* Contact Info */}
          <motion.div className="contact-info" variants={itemVariants}>
            <div className="info-card">
              <div className="info-details">
                <div className="info-item">
                  <strong>{t.contact.phoneTitle}</strong>
                  <a href={`tel:${t.nav.phone.replace(/\s/g, '')}`}>{t.nav.phone}</a>
                  <a href={`tel:${t.nav.phone2.replace(/\s/g, '')}`}>{t.nav.phone2}</a>
                </div>

                <div className="info-item">
                  <strong>{t.contact.emailTitle}</strong>
                  <a href={`mailto:${t.contact.emailValue}`}>{t.contact.emailValue}</a>
                </div>
              </div>

              {/* Back to Home */}
              <Link to="/" className="back-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                <span>{t.contact.backToHome}</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Contact
