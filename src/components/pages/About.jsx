import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import '../../styles/pages/About.css'

// Slider images only
const sliderImages = [
  '/media/shapes_6.png',
  '/media/shapes_7.png',
  '/media/shapes_8.png',
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
      {/* Image Slider Section - Text Left, Image Right (starts straight at the About) */}
      <section className="about-slider-section">
        <motion.div
          className="about-story-logo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src="/media/domisense-logo.png" alt="Domisense — Residential Constructions" />
        </motion.div>
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

      {/* Disciplines — Architecture · Construction · Development */}
      <section className="about-disciplines-section">
        <motion.div
          className="about-disciplines-inner"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="about-disciplines-grid">
            {t.about.disciplines.map((d, index) => (
              <motion.div
                key={d.title}
                className="discipline-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="discipline-number">{d.number}</span>
                <h3 className="discipline-title">{d.title}</h3>
                <p className="discipline-desc">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Team Section — organised by discipline */}
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

          <div className="about-team-disciplines">
            {t.about.teamGroups.map((group, gi) => (
              <motion.div
                key={group.group}
                className="team-discipline"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: gi * 0.1 }}
              >
                <h3 className="team-discipline-name">{group.group}</h3>
                <div className="team-discipline-roles">
                  {group.roles.map((role) => (
                    <div key={role.role} className="team-role-row">
                      <span className="team-role-label">{role.role}</span>
                      <div className="team-role-names">
                        {role.names.map((name) => (
                          <span key={name} className="team-role-name">{name}</span>
                        ))}
                      </div>
                    </div>
                  ))}
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
