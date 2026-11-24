import {
  Children,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { m, useReducedMotion } from 'framer-motion';
import './reveals.css';

export const MOTION_EASE = [0.22, 1, 0.36, 1];
export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -8% 0px',
};
export const STAGGER_VIEWPORT_CONFIG = {
  once: true,
  amount: 'some',
  margin: '0px 0px -8% 0px',
};

const MAX_DELAY = 0.5;
const SAFETY_TIMEOUT_MS = 2000;

const StaggerContext = createContext(false);

function clampDelay(delay = 0) {
  const numeric = Number(delay) || 0;
  return Math.min(Math.max(numeric, 0), MAX_DELAY);
}

function withDelay(transition, delay) {
  return delay > 0 ? { ...transition, delay } : transition;
}

function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const update = () => setIsSmall(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return isSmall;
}

function useSafetyReveal(ref, disabled) {
  const [armed, setArmed] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [forcedVisible, setForcedVisible] = useState(false);

  const arm = useCallback(() => {
    setArmed(true);
  }, []);

  const markRevealed = useCallback(() => {
    setRevealed(true);
  }, []);

  useEffect(() => {
    if (disabled || revealed || armed) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    const checkPosition = () => {
      const rect = node.getBoundingClientRect();
      if (rect.top <= window.innerHeight) {
        setArmed(true);
        return true;
      }
      return false;
    };

    if (checkPosition()) return undefined;

    let observer;
    if (typeof window.IntersectionObserver === 'function') {
      observer = new window.IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight) {
              setArmed(true);
              observer?.disconnect();
              break;
            }
          }
        },
        { threshold: 0 },
      );
      observer.observe(node);
    }

    const onScroll = () => {
      if (checkPosition()) {
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [ref, disabled, revealed, armed]);

  useEffect(() => {
    if (disabled || revealed || !armed) return undefined;
    const timer = window.setTimeout(() => {
      setForcedVisible(true);
    }, SAFETY_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [disabled, revealed, armed]);

  return { forcedVisible, arm, markRevealed };
}

function MotionReveal({
  variants,
  className = '',
  style,
  onAnimationComplete,
  children,
}) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const inStagger = useContext(StaggerContext);
  const elementRef = useRef(null);
  const { forcedVisible, arm, markRevealed } = useSafetyReveal(
    elementRef,
    prefersReducedMotion || inStagger,
  );

  if (prefersReducedMotion) {
    return (
      <div className={`cg-motion-reveal${className ? ` ${className}` : ''}`} style={style}>
        {children}
      </div>
    );
  }

  const classes = `cg-motion-reveal${className ? ` ${className}` : ''}`;

  if (inStagger) {
    return (
      <m.div
        className={classes}
        style={style}
        variants={variants}
        onAnimationComplete={onAnimationComplete}
      >
        {children}
      </m.div>
    );
  }

  return (
    <m.div
      ref={elementRef}
      className={classes}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      animate={forcedVisible ? 'visible' : undefined}
      viewport={VIEWPORT_CONFIG}
      onViewportEnter={arm}
      onAnimationStart={(definition) => {
        if (definition === 'visible') markRevealed();
      }}
      onAnimationComplete={(definition) => {
        if (definition === 'visible') markRevealed();
        onAnimationComplete?.(definition);
      }}
    >
      {children}
    </m.div>
  );
}

export function SlideLeft({ className = '', delay = 0, children }) {
  const isSmall = useIsSmallScreen();
  const safeDelay = clampDelay(delay);

  const variants = {
    hidden: { opacity: 0, x: isSmall ? -24 : -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: withDelay({ duration: 0.8, ease: MOTION_EASE }, safeDelay),
    },
  };

  return (
    <MotionReveal className={className} variants={variants}>
      {children}
    </MotionReveal>
  );
}

export function SlideRight({ className = '', delay = 0, children }) {
  const isSmall = useIsSmallScreen();
  const safeDelay = clampDelay(delay);

  const variants = {
    hidden: { opacity: 0, x: isSmall ? 24 : 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: withDelay({ duration: 0.8, ease: MOTION_EASE }, safeDelay),
    },
  };

  return (
    <MotionReveal className={className} variants={variants}>
      {children}
    </MotionReveal>
  );
}

export function FlipUp({ className = '', delay = 0, children }) {
  const isSmall = useIsSmallScreen();
  const safeDelay = clampDelay(delay);

  const variants = isSmall
    ? {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: withDelay({ duration: 0.8, ease: MOTION_EASE }, safeDelay),
        },
      }
    : {
        hidden: {
          opacity: 0,
          y: 40,
          rotateX: 28,
          transformPerspective: 900,
        },
        visible: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          transformPerspective: 900,
          transition: withDelay({ duration: 0.8, ease: MOTION_EASE }, safeDelay),
        },
      };

  return (
    <MotionReveal
      className={className}
      variants={variants}
      style={isSmall ? undefined : { transformOrigin: 'bottom center' }}
    >
      {children}
    </MotionReveal>
  );
}

export function Wipe({ className = '', delay = 0, duration = 1, children }) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const inStagger = useContext(StaggerContext);
  const elementRef = useRef(null);
  const { forcedVisible, arm, markRevealed } = useSafetyReveal(
    elementRef,
    prefersReducedMotion || inStagger,
  );
  const [clipCleared, setClipCleared] = useState(false);
  const safeDelay = clampDelay(delay);

  useEffect(() => {
    if (!forcedVisible) return undefined;
    const timer = window.setTimeout(() => {
      setClipCleared(true);
    }, duration * 1000 + 50);
    return () => window.clearTimeout(timer);
  }, [forcedVisible, duration]);

  if (prefersReducedMotion) {
    return (
      <div className={`cg-motion-reveal${className ? ` ${className}` : ''}`}>
        {children}
      </div>
    );
  }

  const variants = {
    hidden: { clipPath: 'inset(0 100% 0 0 round 20px)' },
    visible: {
      clipPath: clipCleared ? 'none' : 'inset(0 0% 0 0 round 20px)',
      transition: clipCleared
        ? { duration: 0 }
        : withDelay({ duration, ease: MOTION_EASE }, safeDelay),
    },
  };

  return (
    <m.div
      ref={inStagger ? undefined : elementRef}
      className={`cg-motion-reveal${className ? ` ${className}` : ''}`}
      variants={variants}
      initial={inStagger ? undefined : 'hidden'}
      whileInView={inStagger ? undefined : 'visible'}
      animate={!inStagger && forcedVisible ? 'visible' : undefined}
      viewport={inStagger ? undefined : VIEWPORT_CONFIG}
      onViewportEnter={inStagger ? undefined : arm}
      onAnimationStart={(definition) => {
        if (definition === 'visible') markRevealed();
      }}
      onAnimationComplete={(definition) => {
        if (definition === 'visible') {
          markRevealed();
          setClipCleared(true);
        }
      }}
    >
      {children}
    </m.div>
  );
}

export function ZoomOut({
  className = '',
  delay = 0,
  scale = 1.15,
  duration = 1.4,
  children,
}) {
  const safeDelay = clampDelay(delay);

  const variants = {
    hidden: { opacity: 0, scale },
    visible: {
      opacity: 1,
      scale: 1,
      transition: withDelay({ duration, ease: MOTION_EASE }, safeDelay),
    },
  };

  return (
    <MotionReveal
      className={className}
      variants={variants}
      style={{ transformOrigin: 'center' }}
    >
      {children}
    </MotionReveal>
  );
}

export function Pop({ className = '', delay = 0, children }) {
  const safeDelay = clampDelay(delay);

  const variants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: withDelay(
        { type: 'spring', stiffness: 220, damping: 16 },
        safeDelay,
      ),
    },
  };

  return (
    <MotionReveal
      className={className}
      variants={variants}
      style={{ transformOrigin: 'center' }}
    >
      {children}
    </MotionReveal>
  );
}

export function TiltIn({ className = '', delay = 0, rotate = -8, children }) {
  const isSmall = useIsSmallScreen();
  const safeDelay = clampDelay(delay);

  const variants = {
    hidden: {
      opacity: 0,
      y: isSmall ? -24 : -40,
      rotate,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: withDelay(
        { type: 'spring', stiffness: 120, damping: 14 },
        safeDelay,
      ),
    },
  };

  return (
    <MotionReveal
      className={className}
      variants={variants}
      style={{ transformOrigin: 'center' }}
    >
      {children}
    </MotionReveal>
  );
}

export function FadeUp({ className = '', delay = 0, children }) {
  const isSmall = useIsSmallScreen();
  const safeDelay = clampDelay(delay);

  const variants = {
    hidden: { opacity: 0, y: isSmall ? 24 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: withDelay({ duration: 0.7, ease: MOTION_EASE }, safeDelay),
    },
  };

  return (
    <MotionReveal className={className} variants={variants}>
      {children}
    </MotionReveal>
  );
}

export function SpringUp({ className = '', delay = 0, children }) {
  const isSmall = useIsSmallScreen();
  const safeDelay = clampDelay(delay);

  const variants = {
    hidden: { opacity: 0, y: isSmall ? 24 : 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: withDelay(
        { type: 'spring', stiffness: 110, damping: 16 },
        safeDelay,
      ),
    },
  };

  return (
    <MotionReveal className={className} variants={variants}>
      {children}
    </MotionReveal>
  );
}

export function ResponsiveSlide({
  direction = 'left',
  className = '',
  delay = 0,
  children,
}) {
  const isSmall = useIsSmallScreen();

  if (isSmall) {
    return (
      <FlipUp className={className} delay={delay}>
        {children}
      </FlipUp>
    );
  }

  return direction === 'left' ? (
    <SlideLeft className={className} delay={delay}>
      {children}
    </SlideLeft>
  ) : (
    <SlideRight className={className} delay={delay}>
      {children}
    </SlideRight>
  );
}

const MOTION_HEADINGS = {
  h1: m.h1,
  h2: m.h2,
  h3: m.h3,
  h4: m.h4,
  h5: m.h5,
  h6: m.h6,
};

export function WordsBlur({
  as = 'h2',
  text,
  className = '',
  delay = 0,
  trigger = 'view',
  ready = true,
  children,
}) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const inStagger = useContext(StaggerContext);
  const elementRef = useRef(null);
  const isMountMode = trigger === 'mount';
  const { forcedVisible, arm, markRevealed } = useSafetyReveal(
    elementRef,
    prefersReducedMotion || inStagger || isMountMode,
  );
  const [mountRevealed, setMountRevealed] = useState(false);
  const [mountForcedVisible, setMountForcedVisible] = useState(false);
  const isSmall = useIsSmallScreen();

  useEffect(() => {
    if (!isMountMode || prefersReducedMotion || mountRevealed) return undefined;
    const timer = window.setTimeout(() => {
      setMountForcedVisible(true);
    }, SAFETY_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [isMountMode, prefersReducedMotion, mountRevealed]);

  const rawText = String(text ?? children ?? '');
  const lines = rawText
    .split('\n')
    .map((line) => line.trim().split(/\s+/).filter(Boolean))
    .filter((lineWords) => lineWords.length > 0);
  const words = lines.flat();
  const headingText = words.join(' ');
  const HeadingTag = as;
  const MotionHeading = MOTION_HEADINGS[as] || m.h2;

  if (prefersReducedMotion) {
    return (
      <HeadingTag className={className}>
        {lines.map((lineWords, lineIndex) => (
          <span key={`line-${lineIndex}`}>
            {lineWords.join(' ')}
            {lineIndex < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </HeadingTag>
    );
  }

  const safeDelay = isMountMode
    ? Math.max(0, Number(delay) || 0)
    : clampDelay(delay);

  if (words.length >= 10) {
    const fallbackVariants = {
      hidden: { opacity: 0, y: isSmall ? 24 : 28 },
      visible: {
        opacity: 1,
        y: 0,
        transition: withDelay({ duration: 0.7, ease: MOTION_EASE }, safeDelay),
      },
    };

    return (
      <MotionHeading
        ref={inStagger || isMountMode ? undefined : elementRef}
        className={className}
        variants={fallbackVariants}
        initial={inStagger ? undefined : 'hidden'}
        whileInView={inStagger || isMountMode ? undefined : 'visible'}
        animate={
          isMountMode
            ? ready || mountForcedVisible
              ? 'visible'
              : 'hidden'
            : !inStagger && forcedVisible
              ? 'visible'
              : undefined
        }
        viewport={inStagger || isMountMode ? undefined : VIEWPORT_CONFIG}
        onViewportEnter={inStagger || isMountMode ? undefined : arm}
        onAnimationStart={(definition) => {
          if (definition === 'visible') {
            markRevealed();
            if (isMountMode) setMountRevealed(true);
          }
        }}
        onAnimationComplete={(definition) => {
          if (definition === 'visible') {
            markRevealed();
            if (isMountMode) setMountRevealed(true);
          }
        }}
      >
        {headingText}
      </MotionHeading>
    );
  }

  const wordStagger = isMountMode
    ? 0.07
    : words.length > 1
      ? Math.min(0.07, Math.max(0.02, (MAX_DELAY - safeDelay) / (words.length - 1)))
      : 0.07;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: wordStagger,
        delayChildren: safeDelay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 16,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: MOTION_EASE },
    },
  };

  return (
    <MotionHeading
      ref={inStagger || isMountMode ? undefined : elementRef}
      className={className}
      aria-label={headingText}
      variants={containerVariants}
      initial={inStagger ? undefined : 'hidden'}
      whileInView={inStagger || isMountMode ? undefined : 'visible'}
      animate={
        isMountMode
          ? ready || mountForcedVisible
            ? 'visible'
            : 'hidden'
          : !inStagger && forcedVisible
            ? 'visible'
            : undefined
      }
      viewport={inStagger || isMountMode ? undefined : VIEWPORT_CONFIG}
      onViewportEnter={inStagger || isMountMode ? undefined : arm}
      onAnimationStart={(definition) => {
        if (definition === 'visible') {
          markRevealed();
          if (isMountMode) setMountRevealed(true);
        }
      }}
      onAnimationComplete={(definition) => {
        if (definition === 'visible') {
          markRevealed();
          if (isMountMode) setMountRevealed(true);
        }
      }}
    >
      <span aria-hidden="true">
        {lines.map((lineWords, lineIndex) => (
          <span key={`line-${lineIndex}`}>
            {lineWords.map((word, wordIndex) => (
              <span key={`${lineIndex}-${word}-${wordIndex}`}>
                <m.span className="cg-words-blur__word" variants={wordVariants}>
                  {word}
                </m.span>
                {wordIndex < lineWords.length - 1 ? ' ' : ''}
              </span>
            ))}
            {lineIndex < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </span>
    </MotionHeading>
  );
}

export function Stagger({
  className = '',
  stagger = 0.1,
  delay = 0,
  maxTotalDelay = MAX_DELAY,
  children,
}) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const elementRef = useRef(null);
  const { forcedVisible, arm, markRevealed } = useSafetyReveal(
    elementRef,
    prefersReducedMotion,
  );

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const count = Children.count(children);
  const safeDelay = clampDelay(delay);
  const budget = Math.max(0, Math.min(maxTotalDelay, MAX_DELAY) - safeDelay);
  const effectiveStagger =
    count > 1 ? Math.min(stagger, budget / (count - 1)) : stagger;

  const variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: effectiveStagger,
        delayChildren: safeDelay,
      },
    },
  };

  return (
    <StaggerContext.Provider value={true}>
      <m.div
        ref={elementRef}
        className={className}
        variants={variants}
        initial="hidden"
        whileInView="visible"
        animate={forcedVisible ? 'visible' : undefined}
        viewport={STAGGER_VIEWPORT_CONFIG}
        onViewportEnter={arm}
        onAnimationStart={(definition) => {
          if (definition === 'visible') markRevealed();
        }}
        onAnimationComplete={(definition) => {
          if (definition === 'visible') markRevealed();
        }}
      >
        {children}
      </m.div>
    </StaggerContext.Provider>
  );
}

export function DrawLine({ className = '', delay = 0 }) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const elementRef = useRef(null);
  const { forcedVisible, arm, markRevealed } = useSafetyReveal(
    elementRef,
    prefersReducedMotion,
  );
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 900px)');
    const update = () => setIsDesktop(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div
        className={`cg-draw-line${className ? ` ${className}` : ''}`}
        aria-hidden="true"
      />
    );
  }

  const safeDelay = clampDelay(delay);
  const variants = isDesktop
    ? {
        hidden: { scaleX: 0 },
        visible: {
          scaleX: 1,
          transition: withDelay({ duration: 1.2, ease: MOTION_EASE }, safeDelay),
        },
      }
    : {
        hidden: { scaleY: 0 },
        visible: {
          scaleY: 1,
          transition: withDelay({ duration: 1.2, ease: MOTION_EASE }, safeDelay),
        },
      };

  return (
    <m.div
      ref={elementRef}
      className={`cg-draw-line${className ? ` ${className}` : ''}`}
      aria-hidden="true"
      variants={variants}
      initial="hidden"
      whileInView="visible"
      animate={forcedVisible ? 'visible' : undefined}
      viewport={VIEWPORT_CONFIG}
      onViewportEnter={arm}
      onAnimationStart={(definition) => {
        if (definition === 'visible') markRevealed();
      }}
      onAnimationComplete={(definition) => {
        if (definition === 'visible') markRevealed();
      }}
    />
  );
}
