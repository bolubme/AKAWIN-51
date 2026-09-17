import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import { useSeo } from '../../utils/useSeo'
import '../../styles/pages/Contact.css'

// Contact form delivery via Web3Forms (free, no backend).
// Get a free access key at https://web3forms.com — enter the inbox that should
// receive enquiries; the key is emailed instantly. Paste it below. The key
// carries the destination address, so the real email is never exposed here.
const WEB3FORMS_ACCESS_KEY = '4eecb293-c721-41fe-b57a-875e1667fdf9'

function Contact() {
  const { t } = useLanguage()
  useSeo('contact')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  })
  // idle · sending · success · error
  const [status, setStatus] = useState('idle')
  const feedbackRef = useRef(null)

  // Bring the confirmation/error panel into view after submitting (esp. mobile)
  useEffect(() => {
    if ((status === 'success' || status === 'error') && feedbackRef.current) {
      feedbackRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [status])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'New enquiry — AKAKIWN 50 website',
          from_name: 'AKAKIWN 50 Website',
          botcheck: e.target.botcheck?.checked || false,
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone,
          'Interested in': formData.interest,
          Message: formData.message,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', interest: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (e) => {
    if (status !== 'idle') setStatus('idle')
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
            {/* Spam honeypot — hidden from real users, bots tick it */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: 'none' }}
              aria-hidden="true"
            />

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
                {t.residencies.units.map((unit) => (
                  <option key={unit.id} value={unit.id}>{unit.type}</option>
                ))}
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
              disabled={status === 'sending'}
              whileHover={status === 'sending' ? {} : { scale: 1.02 }}
              whileTap={status === 'sending' ? {} : { scale: 0.98 }}
            >
              {status === 'sending' ? (t.contact.sending || 'Sending…') : t.contact.sendMessage}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.button>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  ref={feedbackRef}
                  className="form-feedback form-feedback--success"
                  role="status"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                >
                  <span className="form-feedback-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <div className="form-feedback-text">
                    <p className="form-feedback-title">{t.contact.successTitle}</p>
                    <p className="form-feedback-body">{t.contact.successBody}</p>
                  </div>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  ref={feedbackRef}
                  className="form-feedback form-feedback--error"
                  role="alert"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                >
                  <span className="form-feedback-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 8v5" />
                      <circle cx="12" cy="16.5" r="0.6" fill="currentColor" stroke="none" />
                    </svg>
                  </span>
                  <div className="form-feedback-text">
                    <p className="form-feedback-title">{t.contact.errorTitle}</p>
                    <p className="form-feedback-body">{t.contact.errorBody}</p>
                  </div>
                </motion.div>
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
                  <a href={`tel:${t.nav.phone3.replace(/\s/g, '')}`}>{t.nav.phone3}</a>
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
