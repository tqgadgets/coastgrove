import { Clock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import QuoteForm from '../components/QuoteForm.jsx';
import Badge from '../components/ui/Badge.jsx';
import Card from '../components/ui/Card.jsx';
import {
  FadeUp,
  Pop,
  SlideLeft,
  SlideRight,
  Stagger,
  WordsBlur,
} from '../components/ui/motion/reveals.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { business, faqs, pageBanners, seo, serviceAreas } from '../data/site.js';
import './Pages.css';

export default function ContactPage() {
  usePageMeta(seo.contact);
  const banner = pageBanners.contact;

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

      <section id="contact-main" className="section-overflow-clip">
        <div className="container contact-grid">
          <SlideLeft>
            <QuoteForm idPrefix="contact-quote" headingAs="h2" />
          </SlideLeft>

          <SlideRight>
            <Card className="contact-info-card">
              <h2>Contact Details</h2>
              <ul className="contact-info-list">
                <li className="contact-info-item">
                  <Phone size={20} className="contact-info-item__icon" aria-hidden="true" />
                  <div>
                    <span className="contact-info-item__label">Phone</span>
                    <a href={business.phoneHref} className="contact-info-item__value">
                      {business.phone}
                    </a>
                  </div>
                </li>

                <li className="contact-info-item">
                  <Mail size={20} className="contact-info-item__icon" aria-hidden="true" />
                  <div>
                    <span className="contact-info-item__label">Email</span>
                    <a
                      href={`mailto:${business.email}`}
                      className="contact-info-item__value"
                    >
                      {business.email}
                    </a>
                  </div>
                </li>

                <li className="contact-info-item">
                  <MapPin size={20} className="contact-info-item__icon" aria-hidden="true" />
                  <div>
                    <span className="contact-info-item__label">Address</span>
                    <span className="contact-info-item__value">{business.address}</span>
                  </div>
                </li>

                <li className="contact-info-item">
                  <Clock size={20} className="contact-info-item__icon" aria-hidden="true" />
                  <div>
                    <span className="contact-info-item__label">Hours</span>
                    <span className="contact-info-item__value">{business.hours}</span>
                  </div>
                </li>

                <li className="contact-info-item">
                  <ShieldCheck
                    size={20}
                    className="contact-info-item__icon"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="contact-info-item__label">License</span>
                    <span className="contact-info-item__value">{business.license}</span>
                  </div>
                </li>
              </ul>
            </Card>
          </SlideRight>
        </div>
      </section>

      <section id="where-we-work">
        <div className="container">
          <div className="section-header">
            <FadeUp>
              <Badge>Service Areas</Badge>
            </FadeUp>
            <WordsBlur as="h2" text="Where We Work" />
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

      <section id="faq">
        <div className="container">
          <div className="section-header">
            <FadeUp>
              <Badge>FAQ</Badge>
            </FadeUp>
            <WordsBlur as="h2" text="Common Questions" />
          </div>

          <Stagger stagger={0.06} maxTotalDelay={0.4} className="faq-list">
            {faqs.map((item) => (
              <FadeUp key={item.question}>
                <Card className="faq-card">
                  <details className="faq-details">
                    <summary className="faq-details__summary">{item.question}</summary>
                    <p className="faq-details__answer">{item.answer}</p>
                  </details>
                </Card>
              </FadeUp>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
