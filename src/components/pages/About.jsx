import { useLanguage } from '../../i18n/LanguageContext'
import '../../styles/pages/About.css'

function About() {
  const { t } = useLanguage()

  return (
    <div className="about-page">
      {/* Story Section - Text Left, Image Right */}
      <section className="about-slider-section">
        <div className="about-slider-inner">
          {/* Left: Our Story heading + disciplines */}
          <div className="about-slider-text">
            <h2 className="about-story-heading">{t.about.storyTitle}</h2>

            <div className="about-story-blocks">
              {t.about.disciplines.map((d) => (
                <div key={d.title} className="about-story-block">
                  <h3 className="about-story-block-title">{d.title}</h3>
                  <p className="about-story-block-desc">{d.desc}</p>
                </div>
              ))}
            </div>
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
    </div>
  )
}

export default About
