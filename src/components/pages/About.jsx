import { useLanguage } from '../../i18n/LanguageContext'
import { buildSrcSet } from '../../utils/responsiveImage'
import { useSeo } from '../../utils/useSeo'
import '../../styles/pages/About.css'

function About() {
  const { t } = useLanguage()
  useSeo('about')

  return (
    <div className="about-page">
      {/* Story Section - Text Left, Image Right */}
      <section className="about-slider-section">
        <div className="about-slider-inner">
          {/* Left: intro + disciplines */}
          <div className="about-slider-text">
            <p className="about-story-intro">{t.about.storyP1}</p>

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
              src="/media/NewImg/ABOUT.webp"
              srcSet={buildSrcSet('/media/NewImg/ABOUT.webp')}
              sizes="(max-width: 768px) 100vw, 50vw"
              alt="AKAKIWN 50 by Domisense Residential Constructions"
              className="about-slider-image"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
