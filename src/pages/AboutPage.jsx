import Badge from '../components/ui/Badge.jsx';
import Card from '../components/ui/Card.jsx';
import CountUp from '../components/ui/CountUp.jsx';
import PlaceholderImage from '../components/ui/PlaceholderImage.jsx';
import {
  FadeUp,
  Pop,
  SlideLeft,
  Stagger,
  TiltIn,
  WordsBlur,
  ZoomOut,
} from '../components/ui/motion/reveals.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import {
  aboutPageContent,
  business,
  images,
  pageBanners,
  seo,
  serviceAreas,
  stats,
  values,
} from '../data/site.js';
import './Pages.css';

const VALUE_ROTATES = [-6, 0, 6];

export default function AboutPage() {
  usePageMeta(seo.about);
  const banner = pageBanners.about;

  return (
    <>
      <section className="page-banner">
        <div className="container page-banner__inner">
          <FadeUp>
            <Badge>{banner.badge}</Badge>
          </FadeUp>
          <WordsBlur as="h1" text={banner.title} />
          <FadeUp delay={0.1}>
            <p className="page-banner__lead">{banner.description}</p>
          </FadeUp>
        </div>
      </section>

      <section id="our-story" className="section-overflow-clip">
        <div className="container about-story-grid">
          <SlideLeft className="about-story__copy">
            <FadeUp>
              <Badge>Our Story</Badge>
            </FadeUp>
            <WordsBlur as="h2" text={aboutPageContent.storyTitle} />
            {aboutPageContent.storyParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </SlideLeft>
          <div className="zoom-clip-wrap zoom-clip-wrap--card">
            <ZoomOut>
              <PlaceholderImage
                label={aboutPageContent.storyImageLabel}
                src={images.aboutStory.src}
                alt={images.aboutStory.alt}
                ratio="4/3"
              />
            </ZoomOut>
          </div>
        </div>
      </section>

      <section id="our-values" className="section-overflow-clip">
        <div className="container">
          <div className="section-header">
            <FadeUp>
              <Badge>Our Values</Badge>
            </FadeUp>
            <WordsBlur as="h2" text="How We Approach Every Property" />
          </div>

          <Stagger className="values-grid">
            {values.map((value, index) => (
              <TiltIn key={value.title} rotate={VALUE_ROTATES[index] ?? 0}>
                <Card className="value-card">
                  <h3>{value.title}</h3>
                  <p className="value-card__desc">{value.description}</p>
                </Card>
              </TiltIn>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="about-stats">
        <div className="container">
          <Stagger className="about-stats-grid">
            {stats.map((stat) => (
              <Pop key={stat.label}>
                <Card className="stat-card">
                  <span className="stat-card__value">
                    <CountUp value={stat.value} />
                  </span>
                  <span className="stat-card__label">{stat.label}</span>
                </Card>
              </Pop>
            ))}
          </Stagger>
          <FadeUp delay={0.15}>
            <p className="license-note">{business.licenseNote}</p>
          </FadeUp>
        </div>
      </section>

      <section id="about-areas">
        <div className="container">
          <div className="section-header">
            <FadeUp>
              <Badge>Service Areas</Badge>
            </FadeUp>
            <WordsBlur as="h2" text="Orange County Communities We Serve" />
          </div>

          <Stagger stagger={0.04} maxTotalDelay={0.5} className="areas-list">
            {serviceAreas.map((area) => (
              <Pop key={area}>
                <Badge>{area}</Badge>
              </Pop>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
