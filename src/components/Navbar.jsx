import { useState, useEffect, useRef, memo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import '../styles/Navbar.css'

const menuImage = '/media/shapes_11.png'

// Lazy load menu image
const LazyMenuImage = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef()

  useEffect(() => {
    const img = new Image()
    img.src = menuImage
    img.onload = () => {
      setIsLoaded(true)
      if (imgRef.current) {
        imgRef.current.src = menuImage
      }
    }
  }, [])

  return (
    <img 
      ref={imgRef}
      alt="AKAKIWN 50 Interior"
      style={{ opacity: isLoaded ? 1 : 0 }}
    />
  )
}

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
  const darkHeroPages = ['/', '/about', '/architecture', '/location', '/residencies', '/contact']
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

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.4,
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
        <Link to="/" className="logo">
          AKAKIWN <span>50</span>
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
          <motion.div 
            className="fullscreen-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="menu-content">
              <div className="menu-left">
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
                  <div className="menu-contact">
                    <p className="contact-label">{t.nav.getInTouch}</p>
                    <a href="tel:+302100000000" className="contact-phone">{t.nav.phone}</a>
                    <a href={`mailto:${t.nav.email}`} className="contact-email">
                      {t.nav.email}
                    </a>
                  </div>
                  <button className="menu-cta" onClick={() => handleNavClick('/contact')}>
                    {t.nav.scheduleVisit}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </motion.div>
              </div>

              <div className="menu-right">
                <motion.div 
                  className="menu-image"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <LazyMenuImage />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default memo(Navbar)
