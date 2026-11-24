import ArrowButton from '../components/ui/ArrowButton.jsx';
import Badge from '../components/ui/Badge.jsx';
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import {
  FadeUp,
  Pop,
  SlideRight,
  Stagger,
  Wipe,
  WordsBlur,
} from '../components/ui/motion/reveals.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { pageBanners, projects, seo } from '../data/site.js';
import './HomePage.css';
import './Pages.css';

export default function ProjectsPage() {
  usePageMeta(seo.projects);
  const banner = pageBanners.projects;

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

      <section id="featured-projects" className="section-overflow-clip">
        <div className="container">
          <div className="projects-full-list">
            {projects.map((project, index) => (
              <Card key={project.id} className="project-full-card">
                <Wipe duration={1.2} delay={index * 0.1}>
                  <BeforeAfterSlider
                    beforeLabel={`PHOTO: Before, ${project.title}`}
                    afterLabel={`PHOTO: After, ${project.title}`}
                    beforeSrc={project.beforeSrc}
                    beforeAlt={project.beforeAlt}
                    afterSrc={project.afterSrc}
                    afterAlt={project.afterAlt}
                    title={project.title}
                  />
                </Wipe>

                <SlideRight className="project-full-card__details">
                  <div>
                    <h2>{project.title}</h2>
                    <div className="project-full-card__meta">
                      <span>{project.city}</span>
                      <span aria-hidden="true">·</span>
                      <span>Timeline: {project.timeline}</span>
                      <span aria-hidden="true">·</span>
                      <span>Size: {project.size}</span>
                    </div>
                  </div>

                  <Stagger className="project-full-card__badges">
                    {project.services.map((serviceName) => (
                      <Pop key={serviceName}>
                        <Badge>{serviceName}</Badge>
                      </Pop>
                    ))}
                  </Stagger>

                  <p className="project-full-card__desc">{project.description}</p>
                </SlideRight>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="projects-cta">
        <div className="container">
          <Pop>
            <Card className="closing-cta-card">
              <div>
                <h2>Have a Yard Ready for a Refresh?</h2>
                <p>Tell us about your space and get a clear written quote.</p>
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
