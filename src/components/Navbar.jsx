import { useState, useEffect, useRef, memo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import '../styles/Navbar.css'

const navLinks = [
  { key: 'home', path: '/' },
  { key: 'architecture', path: '/architecture' },
  { key: 'residencies', path: '/residencies' },
  { key: 'about', path: '/about' },
  { key: 'location', path: '/location' },
  { key: 'contact', path: '/contact' },
]

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const { lang, setLang, t } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()

  // Pages with dark hero backgrounds where navbar should stay white initially
  const darkHeroPages = ['/', '/architecture', '/residencies']
  const isLightPage = !darkHeroPages.includes(location.pathname)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  const handleNavClick = (path) => {
    setIsMenuOpen(false)
    navigate(path)
  }

  const backdropVariants = {
    closed: { opacity: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
    open: { opacity: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }
  }

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    open: {
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const linkContainerVariants = {
    closed: {
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1
      }
    },
    open: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.3
      }
    }
  }

  const linkVariants = {
    closed: {
      opacity: 0,
      x: -30,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const footerVariants = {
    closed: { opacity: 0, y: 20 },
    open: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.5, duration: 0.4 }
    }
  }

  return (
    <>
      <motion.nav 
        className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''} ${isLightPage ? 'light-page' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <Link to="/" className="logo" aria-label="AKAKIWN 50 by Domisense">
          <span className="logo-mark" role="img" aria-label="AKAKIWN 50 by Domisense"></span>
        </Link>

        <div className="lang-toggle">
          <button
            className={`lang-btn ${lang === 'EN' ? 'active' : ''}`}
            onClick={() => setLang('EN')}
          >EN</button>
          <span className="lang-divider">|</span>
          <button
            className={`lang-btn ${lang === 'GR' ? 'active' : ''}`}
            onClick={() => setLang('GR')}
          >GR</button>
        </div>

        <button 
          className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="menu-icon">
            <span></span>
            <span></span>
          </div>
          <span className="menu-text">{isMenuOpen ? t.nav.close : t.nav.menu}</span>
        </button>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="menu-backdrop"
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.aside
              className="menu-sidebar"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.nav
                className="menu-links"
                variants={linkContainerVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.key}
                    className="menu-link-wrapper"
                    variants={linkVariants}
                  >
                    <button
                      className={`menu-link ${hoveredLink && hoveredLink !== link.key ? 'faded' : ''} ${location.pathname === link.path ? 'active' : ''}`}
                      onClick={() => handleNavClick(link.path)}
                      onMouseEnter={() => setHoveredLink(link.key)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      {t.nav[link.key]}
                    </button>
                  </motion.div>
                ))}
              </motion.nav>

              <motion.div
                className="menu-footer"
                variants={footerVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="menu-contact-col">
                  <p className="contact-label">{t.nav.emailLabel}</p>
                  <a href={`mailto:${t.nav.email}`} className="contact-value">
                    {t.nav.email}
                  </a>
                  <div className="menu-socials">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <rect x="2" y="2" width="20" height="20" rx="5"/>
                        <circle cx="12" cy="12" r="4"/>
                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="menu-contact-col">
                  <p className="contact-label">{t.nav.telLabel}</p>
                  <a href={`tel:${t.nav.phone.replace(/\s/g, '')}`} className="contact-value">
                    {t.nav.phone}
                  </a>
                </div>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default memo(Navbar)
