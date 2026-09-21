import { useState, useEffect, useRef, memo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import { buildSrcSet } from '../../utils/responsiveImage'
import { useSeo } from '../../utils/useSeo'
import '../../styles/pages/Home.css'

const EXT = '/media/NewImg/260719_views/EXTERNAL'
const asset = (p) => encodeURI(p)
const isVideo = (src) => /\.mp4($|\?)/i.test(src)

// Desktop hero rotation — all videos first, then the exterior stills.
const slidesDesktop = [
  { id: 1, src: asset(`${EXT}/V3B-VID.mp4`) },
  { id: 2, src: '/media/Video3_002.mp4' },
  { id: 3, src: asset(`${EXT}/Video-Project-12.mp4`) },
  { id: 4, src: asset(`${EXT}/Video-Project-13.mp4`) },
  { id: 5, src: `${EXT}/V1.webp` },
  { id: 6, src: `${EXT}/V2.webp` },
  { id: 7, src: `${EXT}/V4.webp` },
]

// Mobile hero rotation — high-quality stills load first (instant on slow 4G);
// a single lightweight video (the smallest of the set) sits last in the rotation
// so it only downloads once the user/auto-advance actually reaches it. No bank of
// heavy videos competing for bandwidth on a phone.
const slidesMobile = [
  { id: 5, src: `${EXT}/V1.webp` },
  { id: 6, src: `${EXT}/V2.webp` },
  { id: 7, src: `${EXT}/V4.webp` },
  { id: 1, src: asset(`${EXT}/V3B-VID.mp4`) },
]

// A matching full-res still to show instantly while a video buffers (no blank/white gap).
const POSTER = {
  [`${EXT}/V3B-VID.mp4`]: `${EXT}/V3B.webp`,
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
    <img src={src} srcSet={buildSrcSet(src)} sizes="100vw" alt="AKAKIWN 50" decoding="async" onLoad={onReady} onError={onReady} style={fill} />
  )
}


function Home() {
  const { t } = useLanguage()
  useSeo('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const containerRef = useRef(null)
  const heroRef = useRef(null)

  // Choose the hero set once per mount: phones get the light stills-first rotation,
  // everything else gets the full video rotation.
  const slidesRef = useRef(
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
      ? slidesMobile
      : slidesDesktop
  )
  const slides = slidesRef.current

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
  const FADE_DURATION = 1000  // auto-advance crossfade (ms) — cinematic but not sluggish
  const MANUAL_FADE = 400     // taps/swipes get a much snappier fade so they feel instant
  const READY_FALLBACK = 450  // if incoming media never reports ready, start the fade anyway

  // Two-slot ("ping-pong") crossfade. Two persistent layers; only the hidden slot
  // ever loads a new video, so the visible video is never remounted or reloaded —
  // nothing goes blank between slides, so there's no flash.
  const [slots, setSlots] = useState([slides[0].src, null]) // media src per slot
  const [top, setTop] = useState(0)            // slot currently fully visible
  const [pending, setPending] = useState(null) // { slot, ready } — the slot fading in
  const [manualTick, setManualTick] = useState(0) // bumps on every manual nav to reset auto-advance
  const topRef = useRef(0)
  const pendingRef = useRef(null)
  const indexRef = useRef(0)
  const queuedRef = useRef(null)   // most-recent target requested during a running crossfade
  const readyTimerRef = useRef(null)

  // Kick off a crossfade to `target`. Only ever called when idle (pending === null).
  // `dur` lets manual taps use a snappier fade than the cinematic auto-advance.
  const startTransition = (target, dur = FADE_DURATION) => {
    const other = topRef.current === 0 ? 1 : 0
    setSlots((s) => {
      const n = [...s]
      n[other] = slides[target].src
      return n
    })
    const p = { slot: other, ready: false, dur }
    pendingRef.current = p
    setPending(p)
    indexRef.current = target
    // Safety net: never wait forever on a stalled video/image. Manual moves get a
    // tighter fallback so a tap can't sit doing nothing while a video decodes.
    clearTimeout(readyTimerRef.current)
    const fallback = dur === FADE_DURATION ? 900 : READY_FALLBACK
    readyTimerRef.current = setTimeout(() => handleSlotReady(other), fallback)
  }

  // Request a move. If a crossfade is already running we don't drop the tap —
  // we remember the latest target and chain the index, so rapid taps land on the
  // correct net slide instead of freezing or getting swallowed.
  const advanceTo = (target, dur = FADE_DURATION) => {
    if (pendingRef.current) {
      queuedRef.current = { target, dur }
      indexRef.current = target   // chain, so a further tap continues from here
      return
    }
    startTransition(target, dur)
  }

  const goNext = () => { setManualTick((n) => n + 1); advanceTo((indexRef.current + 1) % slides.length, MANUAL_FADE) }
  const goPrev = () => { setManualTick((n) => n + 1); advanceTo((indexRef.current - 1 + slides.length) % slides.length, MANUAL_FADE) }

  const handleSlotReady = (slot) => {
    setPending((p) => (p && p.slot === slot && !p.ready ? { ...p, ready: true } : p))
  }

  // Once the incoming slot has faded in on top, promote it to the visible slot,
  // then immediately service any move queued during the fade.
  useEffect(() => {
    if (pending && pending.ready) {
      const t = setTimeout(() => {
        topRef.current = pending.slot
        setTop(pending.slot)
        pendingRef.current = null
        setPending(null)
        if (queuedRef.current !== null) {
          const q = queuedRef.current
          queuedRef.current = null
          startTransition(q.target, q.dur)
        }
      }, pending.dur) // matches the opacity transition
      return () => clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending])

  // Clear the ready-fallback timer on unmount.
  useEffect(() => () => clearTimeout(readyTimerRef.current), [])

  // Auto-advance — the countdown restarts when a slide settles on top and whenever
  // the user navigates manually (so it never fires right after a tap/swipe).
  useEffect(() => {
    const t = setTimeout(() => {
      advanceTo((indexRef.current + 1) % slides.length)
    }, SLIDE_DURATION)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [top, manualTick])

  // Lightweight preload of the *next* still image only (videos are left to the
  // browser). Keeps "Next" from appearing to do nothing while a still downloads,
  // without preloading every heavy asset on the site.
  useEffect(() => {
    const next = slides[(indexRef.current + 1) % slides.length].src
    if (!isVideo(next)) {
      const img = new Image()
      // Preload the same responsive candidate the <img> will actually use, so a
      // phone warms the 1280px file rather than the full-size original.
      const ss = buildSrcSet(next)
      if (ss) {
        img.sizes = '100vw'
        img.srcset = ss
      }
      img.src = next
    }
  }, [top])

  // Mobile swipe: horizontal drags move slides; vertical drags stay page scroll.
  const touchRef = useRef(null)
  const onTouchStart = (e) => {
    const tch = e.changedTouches[0]
    touchRef.current = { x: tch.clientX, y: tch.clientY }
  }
  const onTouchEnd = (e) => {
    if (!touchRef.current) return
    const tch = e.changedTouches[0]
    const dx = tch.clientX - touchRef.current.x
    const dy = tch.clientY - touchRef.current.y
    touchRef.current = null
    // Intentional, mostly-horizontal swipe only — leaves vertical scrolling alone.
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) goNext()
      else goPrev()
    }
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
        <div className="hero-container" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {/* Two persistent slots — the visible one is never remounted, so the
              video never reloads or flashes when slides change. */}
          {[0, 1].map((slot) => {
            const src = slots[slot]
            if (!src) return null
            const isPending = pending && pending.slot === slot
            let zIndex = slot === top ? 2 : 1
            let opacity = 1
            let fadeMs = FADE_DURATION
            if (isPending) {
              zIndex = 3
              opacity = pending.ready ? 1 : 0
              fadeMs = pending.dur
            }
            return (
              <div
                key={slot}
                className="hero-background hero-slide"
                style={{ zIndex, opacity, transition: `opacity ${fadeMs}ms ease-in-out` }}
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
                <div className="hero-logo-lockup">
                  <h1 className="hero-wordmark" role="img" aria-label="AKAKIWN 50"></h1>
                  <span className="hero-tagline">By Domisense Residential Constructions</span>
                </div>
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
