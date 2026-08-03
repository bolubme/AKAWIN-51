import { useState, useEffect, useRef, memo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import '../../styles/pages/Home.css'

const EXT = '/media/NewImg/260719_views/EXTERNAL'
const asset = (p) => encodeURI(p)
const isVideo = (src) => /\.mp4($|\?)/i.test(src)

// Hero rotation — videos with exterior stills interleaved between them
const slides = [
  { id: 1, src: asset(`${EXT}/V3B VID.mp4`) },
  { id: 2, src: `${EXT}/V1.png` },
  { id: 3, src: '/media/Video3_002.mp4' },
  { id: 4, src: `${EXT}/V2.png` },
  { id: 5, src: asset(`${EXT}/Video Project 12.mp4`) },
  { id: 6, src: `${EXT}/V4.png` },
  { id: 7, src: asset(`${EXT}/Video Project 13.mp4`) },
]

// Renders a slide's media and calls onReady once the first frame is available.
function SlideMedia({ slide, onReady }) {
  const fill = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }
  return isVideo(slide.src) ? (
    <video
      src={slide.src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onLoadedData={onReady}
      onError={onReady}
      style={fill}
    />
  ) : (
    <img src={slide.src} alt="AKAKIWN 50" onLoad={onReady} onError={onReady} style={fill} />
  )
}


function Home() {
  const { t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [prevIndex, setPrevIndex] = useState(null) // kept visible underneath until the new slide loads
  const [slideLoaded, setSlideLoaded] = useState(false)
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

  // Auto-advance — but the swap only happens once the current slide has actually
  // loaded, so a still-downloading video/image is never shown blank.
  const SLIDE_DURATION = 6000

  const changeSlide = (index) => {
    if (index === currentSlide) return
    setPrevIndex(currentSlide)
    setSlideLoaded(false)
    setCurrentSlide(index)
  }

  const goNext = () => changeSlide((currentSlide + 1) % slides.length)
  const goPrev = () => changeSlide((currentSlide - 1 + slides.length) % slides.length)
  const handleSlideLoaded = () => setSlideLoaded(true)

  // Start the countdown for the next slide only after this one is visible.
  useEffect(() => {
    if (!slideLoaded) return
    const t = setTimeout(() => {
      setPrevIndex(currentSlide)
      setSlideLoaded(false)
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, SLIDE_DURATION)
    return () => clearTimeout(t)
  }, [slideLoaded, currentSlide])

  // Once the new slide has faded in on top, drop the previous one.
  useEffect(() => {
    if (slideLoaded && prevIndex !== null) {
      const t = setTimeout(() => setPrevIndex(null), 1000)
      return () => clearTimeout(t)
    }
  }, [slideLoaded, prevIndex])

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
          {/* Background slider — previous slide stays fully opaque underneath
              until the new one has loaded, so the background never shows. */}
          {prevIndex !== null && (
            <div className="hero-background hero-slide" style={{ zIndex: 1 }}>
              <SlideMedia key={`prev-${prevIndex}`} slide={slides[prevIndex]} />
            </div>
          )}
          <div
            className="hero-background hero-slide"
            style={{
              zIndex: 2,
              opacity: slideLoaded ? 1 : 0,
              transition: 'opacity 1s ease',
            }}
          >
            <SlideMedia key={`cur-${currentSlide}`} slide={slides[currentSlide]} onReady={handleSlideLoaded} />
          </div>
          <div className="hero-overlay"></div>

          {/* Hero Content — text left, slide arrows right, balanced on one line */}
          <div className="hero-content">
            <div className="hero-bottom-row">
              {/* Main Content - Bottom Left */}
              <motion.div
                className="hero-main-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h1 className="hero-logo-mark" role="img" aria-label="AKAKIWN 50 by Domisense"></h1>
                <div className="hero-divider"></div>
                <p className="hero-description">
                  {t.home.heroDescription || 'A landmark residential project in the heart of Marousi, where modern architecture meets the warmth of Mediterranean living.'}
                </p>
              </motion.div>

              {/* Prev / next slide arrows — bottom right, aligned with the text */}
              <div className="hero-view-controls">
                <button className="hero-view-nav hero-view-prev" onClick={goPrev} aria-label="Previous slide">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button className="hero-view-nav hero-view-next" onClick={goNext} aria-label="Next slide">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default memo(Home)
