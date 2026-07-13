import { useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import '../styles/Footer.css'

function Footer() {
  const { t } = useLanguage()
  const location = useLocation()

  // Hide the footer on the home page (hero-only layout)
  if (location.pathname === '/') return null

  return (
    <footer className="footer">
      <div className="footer-row">
        <div className="footer-brand">
          <img
            className="footer-mark"
            src="/media/domisense-mark.png"
            alt="Domisense"
          />
          <div className="footer-brand-text">
            <div className="footer-logo">
              AKAKIWN <span>50</span>
            </div>
            <p className="footer-subtitle">{t.footer.subtitle}</p>
          </div>
        </div>

        <div className="footer-reach">
          <a href={`mailto:${t.nav.email}`}>{t.nav.email}</a>
          <a href={`tel:${t.nav.phone.replace(/\s/g, '')}`}>{t.nav.phone}</a>
          <a
            className="footer-ig"
            href="https://www.instagram.com/akakiwn50"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span>Instagram</span>
          </a>
        </div>
      </div>

      {/* Large statement scrolling across the bottom */}
      <div className="footer-marquee" aria-label={t.footer.statement}>
        <div className="footer-marquee-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span className="footer-marquee-item" key={i} aria-hidden={i > 0}>
              {t.footer.statement}
              <span className="footer-marquee-gap">&nbsp;&nbsp;&nbsp;</span>
            </span>
          ))}
        </div>
      </div>

      {t.footer.disclaimer && (
        <p className="footer-disclaimer">{t.footer.disclaimer}</p>
      )}

      <div className="footer-baseline">
        <p className="copyright">{t.footer.copyright}</p>
        <p className="footer-credit">Polydroso · Athens</p>
      </div>
    </footer>
  )
}

export default Footer
