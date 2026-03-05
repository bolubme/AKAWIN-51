import { useState, useEffect, useRef, memo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import '../../styles/pages/Home.css'

// All editorial images — preloaded on mount
const editorialImages = [
  '/media/optimized/shapes_(8).jpg',
  '/media/optimized/shapes_(9).jpg',
  '/media/optimized/shapes_(10).jpg',
  '/media/optimized/shapes_(11).jpg',
  '/media/optimized/shapes_(6).jpg',
  '/media/optimized/shapes_(3).jpg',
  '/media/optimized/shapes_(7).jpg',
  '/media/optimized/V1.jpg',
]

const slides = [
  {
    id: 1,
    video: '/media/Video3_002.mp4',
  },
  {
    id: 2,
    video: '/media/generated-video.mp4',
  },
]


function Home() {
  const { t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideDirection, setSlideDirection] = useState('right')
  const [isScrolled, setIsScrolled] = useState(false)
  const containerRef = useRef(null)
  const heroRef = useRef(null)

  // Directions kept for reference
  const directions = ['right', 'bottom', 'left', 'top']

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Transform values based on scroll
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.88])
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, 40])
  const heroRadius = useTransform(scrollYProgress, [0, 0.15], [0, 20])

  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 100)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Preload all editorial images on mount so they're cached before scroll
  useEffect(() => {
    editorialImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  // CSS-based reveal: single observer adds .visible class, CSS handles animation on GPU
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Auto-advance slides with timer
  const [slideProgress, setSlideProgress] = useState(0)
  const slideIntervalRef = useRef(null)
  const SLIDE_DURATION = 6000 // 6 seconds per slide

  useEffect(() => {
    // Reset progress and start timer for current slide
    setSlideProgress(0)
    const startTime = Date.now()
    
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min((elapsed / SLIDE_DURATION) * 100, 100)
      setSlideProgress(progress)
    }, 50)

    slideIntervalRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, SLIDE_DURATION)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(slideIntervalRef.current)
    }
  }, [currentSlide])

  const goToSlide = (index) => {
    if (index !== currentSlide) {
      setSlideDirection(index > currentSlide ? 'right' : 'left')
      setCurrentSlide(index)
    }
  }

  // Crossfade variants for smooth video transitions
  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 1.05,
    },
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 1,
    },
  }

  return (
    <div className={`page home-page ${isScrolled ? 'scrolled' : ''}`} ref={containerRef}>
      {/* Fixed Brand Text Background */}
      <div className="brand-fixed">
        <h1 className="brand-text-fixed">
          <span className="brand-main">AKAKIWN</span>
          <span className="brand-accent">50</span>
        </h1>
      </div>

      {/* Hero Section with Scroll Animation */}
      <motion.div 
        className="hero-wrapper"
        ref={heroRef}
        style={{
          scale: heroScale,
          y: heroY,
          borderRadius: heroRadius,
        }}
      >
        <div className="hero-container">
          {/* Background Video Slider */}
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={currentSlide}
              className="hero-background"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ 
                duration: 1.2, 
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <video 
                src={slides[currentSlide].video} 
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div className="hero-overlay"></div>
            </motion.div>
          </AnimatePresence>

          {/* Hero Content - New Layout */}
          <div className="hero-content">
            {/* Main Content - Bottom Left */}
            <motion.div 
              className="hero-main-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="hero-by-label">BY DOMISENSE</span>
              <h1 className="hero-title-large">
                <span className="title-main">AKAKIWN</span>
                <span className="title-number">50</span>
              </h1>
              <div className="hero-divider"></div>
              <p className="hero-description">
                {t.home.heroDescription || 'A landmark residential project in the heart of Marousi, where modern architecture meets the warmth of Mediterranean living.'}
              </p>
            </motion.div>

            {/* Bottom Controls */}
            <div className="hero-bottom-controls">
              {/* Slide Counter - Left */}
              <motion.div 
                className="slide-counter-new"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span className="counter-current">{String(currentSlide + 1).padStart(2, '0')}</span>
                <span className="counter-divider">——</span>
                <span className="counter-total">{String(slides.length).padStart(2, '0')}</span>
              </motion.div>

              {/* Progress Bar - Center */}
              <motion.div 
                className="slide-progress-bar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div 
                  className="progress-fill" 
                  style={{ width: `${slideProgress}%` }}
                ></div>
              </motion.div>

              {/* Scroll Indicator - Right */}
              <motion.div 
                className="scroll-indicator-new"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <span>SCROLL</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Editorial Section */}
      <section className="editorial-section">

        {/* 01 — Opening Statement */}
        <div className="editorial-intro reveal">
          <span className="editorial-label">{t.home.editorialLabel}</span>
          <h2 className="editorial-headline">
            {t.home.editorialHeadline1}<br />{t.home.editorialHeadline2}
          </h2>
          <p className="editorial-subtext">
            {t.home.editorialSubtext}
          </p>
        </div>

        {/* 02 — Full-width Hero Image */}
        <div className="editorial-full-image reveal">
          <div className="full-image-wrapper">
            <img src="/media/optimized/shapes_(8).jpg" alt="Penthouse Collection" decoding="async" />
          </div>
          <div className="full-image-caption">
            <span className="caption-number">01</span>
            <div className="caption-text">
              <h3>{t.home.penthouseTitle}</h3>
              <p>{t.home.penthouseDesc}</p>
            </div>
          </div>
        </div>

        {/* Explore the Project Section */}
        <div className="explore-project reveal">
          <div className="explore-header">
            <span className="explore-label">{t.home.exploreLabel}</span>
            <h2 className="explore-title">{t.home.exploreTitle}</h2>
            <p className="explore-subtitle">{t.home.exploreSubtitle}</p>
          </div>
          <div className="explore-grid">
            <Link to="/residencies" className="explore-card reveal-child">
              <div className="explore-card-image">
                <img src="/media/optimized/shapes_(8).jpg" alt="The Residences" />
              </div>
              <div className="explore-card-content">
                <span className="explore-card-number">01</span>
                <h3 className="explore-card-title">{t.home.exploreResidenciesTitle}</h3>
                <p className="explore-card-desc">{t.home.exploreResidenciesDesc}</p>
                <div className="explore-card-tags">
                  <span className="explore-tag">APARTMENTS</span>
                  <span className="explore-tag">PENTHOUSES</span>
                </div>
              </div>
            </Link>
            <Link to="/architecture" className="explore-card reveal-child delay-1">
              <div className="explore-card-image">
                <img src="/media/optimized/shapes_(9).jpg" alt="The Architecture" />
              </div>
              <div className="explore-card-content">
                <span className="explore-card-number">02</span>
                <h3 className="explore-card-title">{t.home.exploreArchTitle}</h3>
                <p className="explore-card-desc">{t.home.exploreArchDesc}</p>
                <div className="explore-card-tags">
                  <span className="explore-tag">DESIGN</span>
                  <span className="explore-tag">MATERIALS</span>
                </div>
              </div>
            </Link>
            <Link to="/location" className="explore-card reveal-child delay-2">
              <div className="explore-card-image">
                <img src="/media/optimized/shapes_(10).jpg" alt="The Location" />
              </div>
              <div className="explore-card-content">
                <span className="explore-card-number">03</span>
                <h3 className="explore-card-title">{t.home.exploreLocationTitle}</h3>
                <p className="explore-card-desc">{t.home.exploreLocationDesc}</p>
                <div className="explore-card-tags">
                  <span className="explore-tag">MAROUSI</span>
                  <span className="explore-tag">ATHENS</span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Building Exterior Image */}
        <div className="building-showcase reveal">
          <div className="showcase-image">
            <img src="/media/optimized/shapes_(9).jpg" alt="AKAKIWN 50 Exterior" decoding="async" />
          </div>
          <p className="showcase-caption">MAROUSI, ATHENS — EXTERIOR PERSPECTIVE</p>
        </div>

        {/* Featured Spaces Section */}
        <div className="featured-spaces reveal">
          <h2 className="featured-title">LIVING SPACES</h2>
          <div className="featured-grid">
            <Link to="/residencies" className="featured-card reveal-child">
              <span className="featured-side-text">DISCOVER</span>
              <div className="featured-card-image">
                <img src="/media/optimized/shapes_(8).jpg" alt="Garden Suites" />
                <div className="featured-overlay">
                  <span className="featured-view">VIEW</span>
                </div>
              </div>
              <div className="featured-card-content">
                <h3 className="featured-card-title">GARDEN SUITES</h3>
                <p className="featured-card-desc">Ground floor residences with private gardens, seamlessly blending indoor comfort with outdoor Mediterranean living — a sanctuary of tranquility in the heart of Marousi.</p>
                <div className="featured-card-meta">
                  <span>GROUND FLOOR</span>
                  <span>|</span>
                  <span>PRIVATE GARDEN</span>
                  <span>|</span>
                  <span>65-80 M²</span>
                </div>
              </div>
            </Link>
            <Link to="/residencies" className="featured-card reveal-child delay-1">
              <div className="featured-card-image">
                <img src="/media/optimized/shapes_(10).jpg" alt="Penthouse Collection" />
                <div className="featured-overlay">
                  <span className="featured-view">VIEW</span>
                </div>
              </div>
              <div className="featured-card-content">
                <h3 className="featured-card-title">PENTHOUSE COLLECTION</h3>
                <p className="featured-card-desc">Sky-high residences with panoramic views across Athens, featuring private pools, expansive terraces, and the pinnacle of contemporary luxury living.</p>
                <div className="featured-card-meta">
                  <span>TOP FLOOR</span>
                  <span>|</span>
                  <span>PRIVATE POOL</span>
                  <span>|</span>
                  <span>180-250 M²</span>
                </div>
              </div>
              <span className="featured-side-text right">DISCOVER</span>
            </Link>
          </div>
        </div>

        {/* 03 — Text + Image Side by Side */}
        <div className="editorial-split reveal">
          <div className="split-text reveal-child">
            <span className="editorial-label">{t.home.designLabel}</span>
            <h2 className="split-headline">
              {t.home.designHeadline1}<br />{t.home.designHeadline2}
            </h2>
            <p className="split-body">
              {t.home.designBody}
            </p>
            <Link to="/residencies" className="editorial-link">
              {t.home.exploreResidencies}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
          <div className="split-image reveal-child delay-1">
            <img src="/media/optimized/shapes_(9).jpg" alt="Sky Residences" decoding="async" />
          </div>
        </div>

        {/* 04 — Two Column Images */}
        <div className="editorial-duo reveal">
          <div className="duo-left reveal-child">
            <img src="/media/optimized/shapes_(10).jpg" alt="Garden Suites" decoding="async" />
            <div className="duo-caption">
              <span className="caption-number">02</span>
              <p>{t.home.gardenSuites}</p>
            </div>
          </div>
          <div className="duo-right reveal-child delay-1">
            <img src="/media/optimized/shapes_(11).jpg" alt="Building Detail" decoding="async" />
            <div className="duo-caption">
              <span className="caption-number">03</span>
              <p>{t.home.architecturalDetail}</p>
            </div>
          </div>
        </div>

        {/* 05 — Big Quote */}
        <div className="editorial-quote reveal">
          <blockquote>
            {t.home.quote}
          </blockquote>
          <span className="quote-attribution">{t.home.quoteAttribution}</span>
        </div>

        {/* 06 — Image + Text (Reversed) */}
        <div className="editorial-split reversed reveal">
          <div className="split-text reveal-child delay-1">
            <span className="editorial-label">{t.home.locationLabel}</span>
            <h2 className="split-headline">
              {t.home.locationHeadline1}<br />{t.home.locationHeadline2}
            </h2>
            <p className="split-body">
              {t.home.locationBody}
            </p>
            <Link to="/location" className="editorial-link">
              {t.home.viewLocation}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
          <div className="split-image reveal-child">
            <img src="/media/optimized/shapes_(6).jpg" alt="Location View" decoding="async" />
          </div>
        </div>

        {/* 07 — Three Column Images */}
        <div className="editorial-trio reveal">
          <div className="trio-item reveal-child">
            <img src="/media/optimized/shapes_(3).jpg" alt="Interior Detail" decoding="async" />
          </div>
          <div className="trio-item trio-offset reveal-child delay-1">
            <img src="/media/optimized/shapes_(7).jpg" alt="Exterior View" decoding="async" />
          </div>
          <div className="trio-item reveal-child delay-2">
            <img src="/media/optimized/V1.jpg" alt="Aerial View" decoding="async" />
          </div>
        </div>

        {/* 08 — Closing Statement + CTA */}
        <div className="editorial-closing reveal">
          <p className="closing-small">{t.home.closingSmall}</p>
          <h2 className="closing-headline">{t.home.closingHeadline}</h2>
          <div className="closing-ctas">
            <Link to="/residencies" className="cta-primary">
              {t.home.viewResidencies}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/contact" className="cta-secondary">
              {t.home.getInTouch}
            </Link>
          </div>
        </div>

      </section>
    </div>
  )
}

export default memo(Home)
