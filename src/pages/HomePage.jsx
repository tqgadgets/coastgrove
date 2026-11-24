import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight, Star } from 'lucide-react';
import QuoteForm from '../components/QuoteForm.jsx';
import ServiceIcon from '../components/ServiceIcon.jsx';
import ArrowButton from '../components/ui/ArrowButton.jsx';
import Badge from '../components/ui/Badge.jsx';
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import CountUp from '../components/ui/CountUp.jsx';
import LawnMowerIntro from '../components/ui/LawnMowerIntro.jsx';
import MarqueeBand from '../components/ui/MarqueeBand.jsx';
import PlaceholderImage from '../components/ui/PlaceholderImage.jsx';
import ReviewsCarousel from '../components/ui/ReviewsCarousel.jsx';
import {
  DrawLine,
  FadeUp,
  FlipUp,
  Pop,
  SlideLeft,
  SpringUp,
  Stagger,
  TiltIn,
  WordsBlur,
  ZoomOut,
} from '../components/ui/motion/reveals.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import {
  homeContent,
  images,
  processSteps,
  projects,
  reviews,
  reviewsSummary,
  seo,
  services,
  stats,
} from '../data/site.js';
import './HomePage.css';

const HERO_EASE = [0.22, 1, 0.36, 1];
const INTRO_STORAGE_KEY = 'cg_intro_seen';
let introSeenMemory = false;

function hasSeenIntro() {
  if (introSeenMemory) return true;
  try {
    return window.sessionStorage.getItem(INTRO_STORAGE_KEY) === '1';
  } catch {
    return introSeenMemory;
  }
}

function markIntroSeen() {
  introSeenMemory = true;
  try {
    window.sessionStorage.setItem(INTRO_STORAGE_KEY, '1');
  } catch {
    // Module variable records intro state when sessionStorage is unavailable.
  }
}

export default function HomePage() {
  usePageMeta(seo.home);
  const previewServices = services.slice(0, 6);

  const location = useLocation();
  const heroRef = useRef(null);
  const introDecisionRef = useRef(null);
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [introState, setIntroState] = useState('pending'); // 'pending' | 'playing' | 'done'
  const [forceVisible, setForceVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const introPlaying = introState === 'playing';

  useEffect(() => {
    if (introDecisionRef.current === null) {
      const reduced =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const hasHash = Boolean(window.location.hash);
      const isHomeRoute = location.pathname === '/';
      const isTabHidden = document.visibilityState === 'hidden';
      const navEntry = performance.getEntriesByType?.('navigation')?.[0];
      const isBackForward = navEntry && navEntry.type === 'back_forward';

      const shouldPlay =
        isHomeRoute &&
        !hasSeenIntro() &&
        !reduced &&
        !hasHash &&
        !isTabHidden &&
        !isBackForward;

      introDecisionRef.current = shouldPlay;
      if (shouldPlay) {
        markIntroSeen();
      }
    }

    setIntroState(introDecisionRef.current ? 'playing' : 'done');
  }, [location.pathname]);

  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        markIntroSeen();
        introDecisionRef.current = false;
        setIntroState('done');
      }
    };
    window.addEventListener('pageshow', handlePageShow, { passive: true });
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  useEffect(() => {
    if (introState === 'pending') return undefined;
    const timeoutMs = introPlaying ? 3200 : 2500;
    const timer = window.setTimeout(() => {
      setForceVisible(true);
    }, timeoutMs);
    return () => window.clearTimeout(timer);
  }, [introState, introPlaying]);

  useEffect(() => {
    if (!introPlaying) return undefined;
    const safetyTimer = window.setTimeout(() => {
      setIntroState('done');
      setForceVisible(true);
    }, 4000);
    return () => window.clearTimeout(safetyTimer);
  }, [introPlaying]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const update = () => setIsSmallScreen(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  const handleIntroDone = useCallback(({ early }) => {
    setIntroState('done');
    if (early) {
      setForceVisible(true);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const archY = useTransform(scrollYProgress, [0, 1], [0, isSmallScreen ? 20 : 40]);
  const circleY = useTransform(scrollYProgress, [0, 1], [0, isSmallScreen ? 45 : 90]);
  const accentY = useTransform(scrollYProgress, [0, 1], [0, isSmallScreen ? 10 : 20]);

  const immediate = prefersReducedMotion || forceVisible;
  const introDelayOffset = introPlaying ? 0.7 : 0;
  const waitForMount = introState === 'pending' && !prefersReducedMotion;

  const heroContainerVariants = {
    hidden: {},
    visible: {
      transition: immediate
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: 0.1, delayChildren: 0.6 + introDelayOffset },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: immediate
        ? { duration: 0 }
        : { duration: 0.7, ease: HERO_EASE },
    },
  };

  return (
    <>
      <section id="hero" ref={heroRef} className="hero">
        <m.div
          className="container"
          variants={heroContainerVariants}
          initial={prefersReducedMotion ? false : 'hidden'}
          animate={waitForMount ? 'hidden' : 'visible'}
        >
            <div className="hero__grid">
              <div className="hero__content">
                <m.div variants={heroItemVariants}>
                  <Badge>{homeContent.hero.badge}</Badge>
                </m.div>

                <WordsBlur
                  as="h1"
                  className="hero__title"
                  text={'Greener Lawns,\nHappier Homes'}
                  trigger="mount"
                  ready={!waitForMount}
                  delay={immediate ? 0 : 0.1 + introDelayOffset}
                />

                <m.p className="hero__desc" variants={heroItemVariants}>
                  {homeContent.hero.description}
                </m.p>

                <m.div className="cta-actions" variants={heroItemVariants}>
                  <div className="cta-pair">
                    <Button variant="primary" to="/contact">
                      {homeContent.hero.primaryCta}
                    </Button>
                    <ArrowButton to="/contact" ariaLabel={homeContent.hero.primaryCta} />
                  </div>
                  <Button variant="outline" to="/projects">
                    {homeContent.hero.secondaryCta}
                    <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
                  </Button>
                </m.div>
              </div>

              <div className="hero__media">
                <m.div
                  initial={
                    prefersReducedMotion
                      ? false
                      : {
                          opacity: 0,
                          scale: 0.92,
                        }
                  }
                  animate={
                    waitForMount
                      ? {
                          opacity: 0,
                          scale: 0.92,
                        }
                      : {
                          opacity: 1,
                          scale: 1,
                        }
                  }
                  transition={
                    immediate
                      ? { duration: 0 }
                      : {
                          duration: 1.1,
                          ease: HERO_EASE,
                          delay: 0.3 + introDelayOffset,
                        }
                  }
                  style={{ transformOrigin: 'center' }}
                >
                  <m.div
                    className="hero__parallax"
                    style={prefersReducedMotion ? undefined : { y: archY }}
                  >
                    <div className="hero-float hero-float--a">
                      <div className="hero-photo-ring hero-photo-ring--arch">
                        <PlaceholderImage
                          label={homeContent.hero.heroPhotoLabel}
                          src={images.heroMain.src}
                          alt={images.heroMain.alt}
                          ratio="4/5"
                          shape="arch"
                          priority
                        />
                      </div>
                    </div>
                  </m.div>
                </m.div>

                <div className="hero__photo-circle">
                  <m.div
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.6 }}
                    animate={
                      waitForMount
                        ? { opacity: 0, scale: 0.6 }
                        : { opacity: 1, scale: 1 }
                    }
                    transition={
                      immediate
                        ? { duration: 0 }
                        : {
                            type: 'spring',
                            stiffness: 140,
                            damping: 14,
                            delay: 0.75 + introDelayOffset,
                          }
                    }
                    style={{ transformOrigin: 'center' }}
                  >
                    <m.div
                      className="hero__parallax"
                      style={prefersReducedMotion ? undefined : { y: circleY }}
                    >
                      <div className="hero-float hero-float--b">
                        <div className="hero-photo-ring hero-photo-ring--circle">
                          <PlaceholderImage
                            label={homeContent.hero.detailPhotoLabel}
                            src={images.heroDetail.src}
                            alt={images.heroDetail.alt}
                            ratio="1/1"
                            shape="circle"
                            priority
                          />
                        </div>
                      </div>
                    </m.div>
                  </m.div>
                </div>

                <div className="hero__photo-accent">
                  <m.div
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.6 }}
                    animate={
                      waitForMount
                        ? { opacity: 0, scale: 0.6 }
                        : { opacity: 1, scale: 1 }
                    }
                    transition={
                      immediate
                        ? { duration: 0 }
                        : {
                            type: 'spring',
                            stiffness: 140,
                            damping: 14,
                            delay: 1.0 + introDelayOffset,
                          }
                    }
                    style={{ transformOrigin: 'center' }}
                  >
                    <m.div
                      className="hero__parallax"
                      style={prefersReducedMotion ? undefined : { y: accentY }}
                    >
                      <div className="hero-float hero-float--c">
                        <div className="hero-photo-ring hero-photo-ring--circle">
                          <PlaceholderImage
                            label="PHOTO: Garden accent, 1:1"
                            src={images.heroAccent.src}
                            alt={images.heroAccent.alt}
                            ratio="1/1"
                            shape="circle"
                          />
                        </div>
                      </div>
                    </m.div>
                  </m.div>
                </div>
              </div>
            </div>

            <m.div className="hero__stats" variants={heroItemVariants}>
              {stats.map((stat) => (
                <div key={stat.label} className="hero__stat">
                  <span className="hero__stat-value">
                    <CountUp value={stat.value} />
                  </span>
                  <span className="hero__stat-label">{stat.label}</span>
                </div>
              ))}
            </m.div>
          </m.div>

          <svg
            className="hero__curve"
            viewBox="0 0 1440 64"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0,0 Q720,64 1440,0 L1440,64 L0,64 Z" fill="var(--bg)" />
          </svg>

          {introPlaying && <LawnMowerIntro onDone={handleIntroDone} />}
        </section>

      <MarqueeBand items={services.map((s) => s.title)} />

      <section id="about-teaser" className="about-teaser-section">
        <div className="container about-teaser__grid">
          <SlideLeft className="about-teaser__content">
            <FadeUp>
              <Badge>{homeContent.about.badge}</Badge>
            </FadeUp>
            <WordsBlur as="h2" text={homeContent.about.title} />
            <p className="about-teaser__desc">{homeContent.about.description}</p>
            <div className="cta-pair">
              <Button variant="outline" to="/about">
                {homeContent.about.cta}
              </Button>
              <ArrowButton to="/about" ariaLabel={homeContent.about.cta} />
            </div>
          </SlideLeft>

          <div className="about-teaser__collage">
            <TiltIn rotate={-10} delay={0}>
              <div className="collage-item--1">
                <PlaceholderImage
                  label="PHOTO: Stone patio build, 4:3"
                  src={images.about1.src}
                  alt={images.about1.alt}
                  ratio="4/3"
                />
              </div>
            </TiltIn>
            <TiltIn rotate={8} delay={0.15} className="collage-slot--2">
              <div className="collage-item--2">
                <PlaceholderImage
                  label="PHOTO: Olive tree & agave, 1:1"
                  src={images.about2.src}
                  alt={images.about2.alt}
                  ratio="1/1"
                />
              </div>
            </TiltIn>
            <TiltIn rotate={-6} delay={0.3} className="collage-slot--3">
              <div className="collage-item--3">
                <PlaceholderImage
                  label="PHOTO: Evening path lights, 16:9"
                  src={images.about3.src}
                  alt={images.about3.alt}
                  ratio="16/9"
                />
              </div>
            </TiltIn>
          </div>
        </div>
      </section>

      <section id="services-preview">
        <div className="container">
          <div className="section-header">
            <FadeUp>
              <Badge>{homeContent.services.badge}</Badge>
            </FadeUp>
            <WordsBlur as="h2" text={homeContent.services.title} />
          </div>

          <Stagger className="services-grid">
            {previewServices.map((service) => (
              <FlipUp key={service.id}>
                <Card className="service-card">
                  <span className="service-card__icon">
                    <ServiceIcon name={service.icon} />
                  </span>
                  <h3>{service.title}</h3>
                  <p className="service-card__desc">{service.description}</p>
                </Card>
              </FlipUp>
            ))}
          </Stagger>

          <FadeUp className="section-footer-action">
            <Button variant="outline" to="/services">
              {homeContent.services.cta}
              <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
            </Button>
          </FadeUp>
        </div>
      </section>

      <section id="projects-teaser">
        <div className="container">
          <div className="section-header">
            <FadeUp>
              <Badge>{homeContent.projects.badge}</Badge>
            </FadeUp>
            <WordsBlur as="h2" text={homeContent.projects.title} />
          </div>

          <div className="projects-teaser__list">
            {projects.map((project, index) => (
              <Card key={project.id} className="project-teaser-card">
                <BeforeAfterSlider
                  beforeLabel={`PHOTO: Before, ${project.title}`}
                  afterLabel={`PHOTO: After, ${project.title}`}
                  beforeSrc={project.beforeSrc}
                  beforeAlt={project.beforeAlt}
                  afterSrc={project.afterSrc}
                  afterAlt={project.afterAlt}
                  title={project.title}
                  eager
                />

                <FadeUp delay={index * 0.15}>
                  <div className="project-teaser-card__footer">
                    <div>
                      <h3>{project.title}</h3>
                      <p className="project-teaser-card__city">{project.city}</p>
                    </div>
                    <Button variant="outline" to="/projects">
                      {homeContent.projects.cta}
                      <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
                    </Button>
                  </div>
                </FadeUp>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews">
        <div className="container">
          <div className="section-header">
            <FadeUp>
              <Badge>{homeContent.reviews.badge}</Badge>
            </FadeUp>
            <WordsBlur as="h2" text={homeContent.reviews.title} />
            <Pop delay={0.15}>
              <div className="reviews-summary">
                <span className="reviews-summary__stars" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={16} fill="currentColor" strokeWidth={1.5} />
                  ))}
                </span>
                <span>{reviewsSummary}</span>
              </div>
            </Pop>
          </div>

          <div className="zoom-clip-wrap">
            <ZoomOut scale={1.06}>
              <ReviewsCarousel reviews={reviews} />
            </ZoomOut>
          </div>
        </div>
      </section>

      <section id="process">
        <div className="container">
          <div className="section-header">
            <FadeUp>
              <Badge>{homeContent.process.badge}</Badge>
            </FadeUp>
            <WordsBlur as="h2" text={homeContent.process.title} />
          </div>

          <div className="process-track">
            <DrawLine className="process-draw-line" />
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
        </div>
      </section>

      <section id="quote" className="quote-section">
        <div className="quote-section__bg" aria-hidden="true">
          <ZoomOut duration={1.6} className="quote-section__bg-zoom">
            <PlaceholderImage
              label={homeContent.quote.backgroundLabel}
              src={images.quoteBg.src}
              alt={images.quoteBg.alt}
              ratio="16/9"
            />
          </ZoomOut>
        </div>
        <div className="container quote-section__grid">
          <div className="quote-section__copy">
            <WordsBlur
              as="h2"
              className="quote-section__title"
              text={homeContent.quote.title}
            />
            <FadeUp delay={0.1}>
              <p className="quote-section__desc">{homeContent.quote.description}</p>
            </FadeUp>
          </div>
          <SpringUp delay={0.15}>
            <QuoteForm idPrefix="home-quote" />
          </SpringUp>
        </div>
      </section>
    </>
  );
}
