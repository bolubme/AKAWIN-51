import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import '../../styles/pages/About.css'

const heroImage = '/media/shapes_3.png'

// Slider images only
const sliderImages = [
  '/media/shapes_6.png',
  '/media/shapes_7.png',
  '/media/shapes_8.png',
]

// Team member images
const teamImages = [
  '/media/shapes_9.png',
  '/media/shapes_10.png',
  '/media/shapes_11.png',
]

function About() {
  const { t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <img src={heroImage} alt="About Domisense" className="about-hero-img" />
        <div className="about-hero-overlay"></div>
        <motion.div 
          className="about-hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="about-hero-title">
            {t.about.heroTitle.split('\n').map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </h1>
        </motion.div>
        <motion.div 
          className="about-hero-prompts"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="about-hero-prompt">
            <strong>{t.about.heroPrompt1}</strong>
            <span>{t.about.heroPrompt1Sub}</span>
          </div>
          <Link to="/contact" className="about-hero-prompt">
            <strong>{t.about.heroPrompt2}</strong>
            <span>{t.about.heroPrompt2Sub}</span>
          </Link>
        </motion.div>
      </section>

      {/* Image Slider Section - Text Left, Image Right */}
      <section className="about-slider-section">
        <div className="about-slider-inner">
          {/* Left: Text content */}
          <div className="about-slider-text">
            <span className="about-slider-label">{t.about.storyTitle}</span>
            <h2 className="about-slider-headline">
              {t.about.sliderHeadline}
            </h2>
            <p className="about-slider-paragraph">
              {t.about.storyP1}
            </p>
            <p className="about-slider-paragraph">
              {t.about.storyP2}
            </p>
            <p className="about-slider-paragraph">
              {t.about.sliderPara1}
            </p>
            <p className="about-slider-paragraph">
              {t.about.sliderPara2}
            </p>
          </div>

          {/* Right: Image with navigation */}
          <div className="about-slider-image-container">
            <AnimatePresence initial={false}>
              <motion.img
                key={currentSlide}
                src={sliderImages[currentSlide]}
                alt="About slide"
                className="about-slider-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
            <button className="slider-nav-btn slider-prev" onClick={prevSlide} aria-label="Previous slide">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="slider-nav-btn slider-next" onClick={nextSlide} aria-label="Next slide">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            {/* Pagination dots inside image */}
            <div className="about-slider-dots">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Image Section */}
      <section className="about-fullwidth-image">
        <img src="/media/optimized/V1.jpg" alt="Our Vision" loading="lazy" />
      </section>

      {/* Philosophy Section */}
      <section className="about-philosophy-section">
        <motion.div 
          className="about-philosophy-inner"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="about-philosophy-title">
            <h2>{t.about.philosophyTitle}</h2>
          </div>
          <div className="about-philosophy-content">
            <p>{t.about.philosophyPara1}</p>
            <p>{t.about.philosophyPara2}</p>
            <p>{t.about.philosophyPara3}</p>
            <p>{t.about.philosophyPara4}</p>
          </div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="about-team-section">
        <motion.div 
          className="about-team-inner"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="about-team-header">
            <h2 className="about-team-title">{t.about.teamTitle}</h2>
            <div className="about-team-underline"></div>
          </div>

          <div className="about-team-grid">
            {t.about.team.map((member, index) => (
              <motion.div 
                key={member.name}
                className="team-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="team-card-image">
                  <img src={teamImages[index]} alt={member.name} loading="lazy" />
                </div>
                <div className="team-card-info">
                  <h3 className="team-card-name">{member.name}</h3>
                  <span className="team-card-role">{member.role}</span>
                  <a href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@domisense.com`} className="team-card-email">
                    {member.name.toLowerCase().replace(' ', '.')}@domisense.com
                  </a>
                  <p className="team-card-bio">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

    </div>
  )
}

export default About
