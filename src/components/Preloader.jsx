import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import '../styles/Preloader.css'

const REVEAL = 1900 // left-to-right wipe of the logo (ms)
const HOLD_AFTER_REVEAL = 800 // pause once fully revealed
const LOGO_FADE = 600 // fade the logo out before the panel moves

function Preloader({ onDone }) {
  const [logoVisible, setLogoVisible] = useState(true)
  const [slideUp, setSlideUp] = useState(false)

  useEffect(() => {
    // Lock scroll while the preloader is on screen
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const fadeTimer = setTimeout(() => setLogoVisible(false), REVEAL + HOLD_AFTER_REVEAL)
    const slideTimer = setTimeout(() => setSlideUp(true), REVEAL + HOLD_AFTER_REVEAL + LOGO_FADE)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(slideTimer)
      document.body.style.overflow = prevOverflow
    }
  }, [])

  return (
    <motion.div
      className="preloader"
      initial={{ y: '0%' }}
      animate={{ y: slideUp ? '-100%' : '0%' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (slideUp) onDone()
      }}
    >
      <motion.span
        className="preloader-logo"
        aria-label="AKAKIWN 50 by Domisense"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{
          clipPath: 'inset(0 0% 0 0)',
          opacity: logoVisible ? 1 : 0,
        }}
        transition={{
          clipPath: { duration: REVEAL / 1000, ease: [0.65, 0, 0.35, 1] },
          opacity: { duration: LOGO_FADE / 1000, ease: 'easeInOut' },
        }}
      />
    </motion.div>
  )
}

export default Preloader
