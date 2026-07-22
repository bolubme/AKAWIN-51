import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import '../../styles/pages/About.css'

function About() {
  const { t } = useLanguage()

  return (
    <div className="about-page">
      {/* Story Section - Text Left, Image Right */}
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

          {/* Right: Single image (full quality, unoptimized from /public) */}
          <div className="about-slider-image-container">
            <img
              src="/media/NewImg/ABOUT.jpg"
              alt="AKAKIWN 50 by Domisense"
              className="about-slider-image"
            />
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

    </div>
  )
}

export default About
