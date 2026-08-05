import { useState, useEffect, useRef, memo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import '../../styles/pages/Home.css'

const EXT = '/media/NewImg/260719_views/EXTERNAL'
const asset = (p) => encodeURI(p)
const isVideo = (src) => /\.mp4($|\?)/i.test(src)

// Hero rotation — all videos first, then the exterior stills
const slides = [
  { id: 1, src: asset(`${EXT}/V3B-VID.mp4`) },
  { id: 2, src: '/media/Video3_002.mp4' },
  { id: 3, src: asset(`${EXT}/Video-Project-12.mp4`) },
  { id: 4, src: asset(`${EXT}/Video-Project-13.mp4`) },
  { id: 5, src: `${EXT}/V1.png` },
  { id: 6, src: `${EXT}/V2.png` },
  { id: 7, src: `${EXT}/V4.png` },
]

// A matching full-res still to show instantly while a video buffers (no blank/white gap).
const POSTER = {
  [`${EXT}/V3B-VID.mp4`]: `${EXT}/V3B.png`,
}

// Renders a slide's media and calls onReady once the first frame is available.
function SlideMedia({ src, onReady }) {
  const fill = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }
  return isVideo(src) ? (
    <video
      src={src}
      poster={POSTER[src]}
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
    <img src={src} alt="AKAKIWN 50" decoding="async" onLoad={onReady} onError={onReady} style={fill} />
  )
}


function Home() {
  const { t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const containerRef = useRef(null)
  const heroRef = useRef(null)

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

  const SLIDE_DURATION = 6000
  const FADE_DURATION = 2000 // crossfade length (ms) — kept in sync with the CSS transition

  // Two-slot ("ping-pong") crossfade. Two persistent layers; only the hidden slot
  // ever loads a new video, so the visible video is never remounted or reloaded —
  // nothing goes blank between slides, so there's no flash.
  const [slots, setSlots] = useState([slides[0].src, null]) // media src per slot
  const [top, setTop] = useState(0)            // slot currently fully visible
  const [pending, setPending] = useState(null) // { slot, ready } — the slot fading in
  const topRef = useRef(0)
  const pendingRef = useRef(null)
  const indexRef = useRef(0)

  const advanceTo = (target) => {
    if (pendingRef.current) return             // ignore while a crossfade is running
    const other = topRef.current === 0 ? 1 : 0
    setSlots((s) => {
      const n = [...s]
      n[other] = slides[target].src
      return n
    })
    const p = { slot: other, ready: false }
    pendingRef.current = p
    setPending(p)
    indexRef.current = target
  }

  const goNext = () => advanceTo((indexRef.current + 1) % slides.length)
  const goPrev = () => advanceTo((indexRef.current - 1 + slides.length) % slides.length)

  const handleSlotReady = (slot) => {
    setPending((p) => (p && p.slot === slot && !p.ready ? { ...p, ready: true } : p))
  }

  // Once the incoming slot has faded in on top, promote it to the visible slot.
  useEffect(() => {
    if (pending && pending.ready) {
      const t = setTimeout(() => {
        topRef.current = pending.slot
        setTop(pending.slot)
        pendingRef.current = null
        setPending(null)
      }, FADE_DURATION) // matches the opacity transition
      return () => clearTimeout(t)
    }
  }, [pending])

  // Auto-advance — the countdown restarts each time a slide settles on top.
  useEffect(() => {
    const t = setTimeout(() => {
      advanceTo((indexRef.current + 1) % slides.length)
    }, SLIDE_DURATION)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [top])

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
          {/* Two persistent slots — the visible one is never remounted, so the
              video never reloads or flashes when slides change. */}
          {[0, 1].map((slot) => {
            const src = slots[slot]
            if (!src) return null
            const isPending = pending && pending.slot === slot
            let zIndex = slot === top ? 2 : 1
            let opacity = 1
            if (isPending) {
              zIndex = 3
              opacity = pending.ready ? 1 : 0
            }
            return (
              <div
                key={slot}
                className="hero-background hero-slide"
                style={{ zIndex, opacity, transition: `opacity ${FADE_DURATION}ms ease-in-out` }}
              >
                <SlideMedia key={src} src={src} onReady={() => handleSlotReady(slot)} />
              </div>
            )
          })}
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
                  {t.home.heroDescription || 'A residential building in the heart of Marousi. Designed to Inspire. Built to Last.'}
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
