import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import '../styles/Footer.css'

const footerLinks = [
  { key: 'home', path: '/' },
  { key: 'architecture', path: '/architecture' },
  { key: 'location', path: '/location' },
  { key: 'residencies', path: '/residencies' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' },
]

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      {/* Background 50 watermark */}
      <div className="footer-watermark">50</div>
      
      <motion.div 
        className="footer-content"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="footer-logo">
          AKAKIWN <span>50</span>
        </div>
        <p className="footer-subtitle">{t.footer.subtitle}</p>
        
        <div className="footer-links">
          {footerLinks.map((link) => (
            <Link 
              key={link.key}
              to={link.path}
            >
              {t.nav[link.key]}
            </Link>
          ))}
        </div>

        <div className="footer-contact">
          <a href="mailto:info@akakiwn50.com" className="footer-contact-item">
            info@akakiwn50.com
          </a>
          <span className="footer-contact-divider">|</span>
          <a href="tel:+302101234567" className="footer-contact-item">
            +30 210 123 4567
          </a>
        </div>

        <p className="copyright">
          {t.footer.copyright}
        </p>
      </motion.div>
    </footer>
  )
}

export default Footer
