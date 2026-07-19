import { useState, useEffect, useRef, memo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import '../../styles/pages/Home.css'

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
              <h1 className="hero-logo-mark" role="img" aria-label="AKAKIWN 50 by Domisense"></h1>
              <div className="hero-divider"></div>
              <p className="hero-description">
                {t.home.heroDescription || 'A landmark residential project in the heart of Marousi, where modern architecture meets the warmth of Mediterranean living.'}
              </p>
            </motion.div>

            {/* Bottom Controls */}
            <div className="hero-bottom-controls">
              {/* Slide Counter removed */}

              {/* Progress bar removed */}

              {/* Scroll Indicator - Right */}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default memo(Home)
