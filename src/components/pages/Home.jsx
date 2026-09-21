import { useState, useEffect, useRef, memo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '../../i18n/LanguageContext'
import { useSeo } from '../../utils/useSeo'
import '../../styles/pages/Home.css'

// Single full-screen hero video (web-optimized 1080p export of the 4K master).
// A poster (first frame) paints instantly while the video loads — no blank/flash.
const HERO_VIDEO = '/media/intro2-web.mp4'
const HERO_POSTER = '/media/intro2-poster.webp'

function Home() {
  const { t } = useLanguage()
  useSeo('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const videoRef = useRef(null)

  // Mobile autoplay: React doesn't always reflect the `muted` prop to the DOM
  // property, and iOS/Android only autoplay a video they consider muted +
  // inline. Force both via the element and kick off play() (retry once ready).
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.playsInline = true
    const tryPlay = () => {
      const p = v.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }
    tryPlay()
    v.addEventListener('canplay', tryPlay, { once: true })
    v.addEventListener('loadeddata', tryPlay, { once: true })
    return () => {
      v.removeEventListener('canplay', tryPlay)
      v.removeEventListener('loadeddata', tryPlay)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Hero scales/rounds slightly as the page scrolls away
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.88])
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, 40])
  const heroRadius = useTransform(scrollYProgress, [0, 0.15], [0, 20])

  // Toggle the fixed brand text once the user scrolls past the hero
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
          {/* Single looping hero video — same on desktop and mobile */}
          <video
            ref={videoRef}
            className="hero-video"
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="hero-overlay"></div>

          {/* Hero Content — bottom-left lockup + description */}
          <div className="hero-content">
            <motion.div
              className="hero-main-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="hero-logo-lockup">
                <h1 className="hero-wordmark" role="img" aria-label="AKAKIWN 50"></h1>
                <span className="hero-tagline">By Domisense Residential Constructions</span>
              </div>
              <div className="hero-divider"></div>
              <p className="hero-description">
                {t.home.heroDescription ||
                  'A residential building in the heart of Marousi. Designed to Inspire. Built to Last.'}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default memo(Home)
