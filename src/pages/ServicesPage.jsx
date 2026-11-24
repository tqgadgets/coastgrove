import ServiceIcon from '../components/ServiceIcon.jsx';
import ArrowButton from '../components/ui/ArrowButton.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import {
  FadeUp,
  Pop,
  ResponsiveSlide,
  Stagger,
  WordsBlur,
} from '../components/ui/motion/reveals.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { pageBanners, processSteps, seo, services } from '../data/site.js';
import './HomePage.css';
import './Pages.css';

export default function ServicesPage() {
  usePageMeta(seo.services);
  const banner = pageBanners.services;

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

      <section id="all-services" className="section-overflow-clip">
        <div className="container">
          <div className="services-full-grid">
            {services.map((service, index) => (
              <ResponsiveSlide
                key={service.id}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={Math.min(index * 0.08, 0.5)}
              >
                <Card className="service-detail-card">
                  <span className="service-card__icon">
                    <ServiceIcon name={service.icon} />
                  </span>
                  <h2>{service.title}</h2>
                  <p className="service-card__desc">{service.description}</p>
                  <ul className="service-detail-card__bullets">
                    {service.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </Card>
              </ResponsiveSlide>
            ))}
          </div>
        </div>
      </section>

      <section id="services-process">
        <div className="container">
          <div className="section-header">
            <FadeUp>
              <Badge>How It Works</Badge>
            </FadeUp>
            <WordsBlur as="h2" text="From Consultation to Final Walkthrough" />
          </div>

          <Stagger className="process-grid">
            {processSteps.map((step, index) => (
              <Pop key={step.step}>
                <Card className="process-card">
                  <Pop delay={Math.min(index * 0.1 + 0.1, 0.5)}>
                    <span className="process-card__step">{step.step}</span>
                  </Pop>
                  <h3>{step.title}</h3>
                  <p className="process-card__desc">{step.description}</p>
                </Card>
              </Pop>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="services-cta">
        <div className="container">
          <Pop>
            <Card className="closing-cta-card">
              <div>
                <h2>Ready to Plan Your Yard?</h2>
                <p>Schedule a free walk-through with our Newport Beach landscape team.</p>
              </div>
              <div className="cta-pair">
                <Button variant="primary" to="/contact">
                  Get a Free Quote
                </Button>
                <ArrowButton to="/contact" ariaLabel="Get a Free Quote" />
              </div>
            </Card>
          </Pop>
        </div>
      </section>
    </>
  );
}
