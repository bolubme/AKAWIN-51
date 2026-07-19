import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import '../styles/Footer.css'

function Footer() {
  const { t } = useLanguage()
  const location = useLocation()

  // Hide the footer on the home page (hero-only layout)
  if (location.pathname === '/') return null

  return (
    <footer className="footer">
      <Link to="/" className="footer-logo" aria-label="AKAKIWN 50 by Domisense">
        <svg
          className="footer-logo-mark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="210 246 175 194"
          fill="#152433"
          aria-hidden="true"
        >
          <path d="M267.41,439.46v-30.1c36.89,0,66.9-30.01,66.9-66.9s-30.01-66.9-66.9-66.9v-30.1c53.48,0,97,43.51,97,97s-43.51,97-97,97Z" />
          <rect x="210.3" y="246.8" width="30.1" height="191.32" />
          <rect x="355.41" y="409.8" width="29.21" height="29.21" />
        </svg>
      </Link>

      <div className="footer-reach">
        <a href={`mailto:${t.nav.email}`}>{t.nav.email}</a>
        <a
          href="https://www.instagram.com/akakiwn50"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <a href={`tel:${t.nav.phone.replace(/\s/g, '')}`}>{t.nav.phone}</a>
        <a href={`tel:${t.nav.phone2.replace(/\s/g, '')}`}>{t.nav.phone2}</a>
      </div>

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

      <p className="copyright">{t.footer.copyright}</p>
    </footer>
  )
}

export default Footer
