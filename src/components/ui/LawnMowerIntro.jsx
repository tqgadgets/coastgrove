import { useEffect, useRef } from 'react';
import { animate, m, useMotionValue, useTransform } from 'framer-motion';
import './LawnMowerIntro.css';

const INTRO_EASE = [0.45, 0.05, 0.25, 1];

export default function LawnMowerIntro({ onDone }) {
  const overlayRef = useRef(null);
  const mowerRef = useRef(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  const progress = useMotionValue(0);
  const mowerOpacity = useMotionValue(1);
  const containerWidth = useMotionValue(0);
  const mowerWidth = useMotionValue(72);

  const grassClipPath = useTransform(
    progress,
    (value) => `inset(0 0 0 ${value * 100}%)`
  );
  const edgeX = useTransform(
    [progress, containerWidth],
    ([value, width]) => value * width
  );
  const mowerX = useTransform(
    [progress, containerWidth, mowerWidth],
    ([value, width, mWidth]) => value * width - mWidth
  );

  useEffect(() => {
    const overlayEl = overlayRef.current;
    const mowerEl = mowerRef.current;
    if (!overlayEl || !mowerEl) return undefined;

    const measure = () => {
      containerWidth.set(overlayEl.getBoundingClientRect().width);
      mowerWidth.set(mowerEl.getBoundingClientRect().width || 72);
    };

    measure();

    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(measure);
      resizeObserver.observe(overlayEl);
      resizeObserver.observe(mowerEl);
    }

    let finished = false;
    let fadeStarted = false;
    let safetyTimerId = null;
    let progressControl = null;
    let fadeControl = null;

    progress.set(0);
    mowerOpacity.set(1);

    const finishIntro = (early) => {
      if (finished) return;
      finished = true;

      if (safetyTimerId !== null) {
        window.clearTimeout(safetyTimerId);
        safetyTimerId = null;
      }

      progressControl?.stop();
      fadeControl?.stop();

      if (early) {
        progress.set(1);
        mowerOpacity.set(0);
      }

      onDoneRef.current?.({ early });
    };

    const startFadeOut = () => {
      if (fadeStarted || finished) return null;
      fadeStarted = true;
      fadeControl = animate(mowerOpacity, 0, {
        duration: 0.3,
        ease: 'easeOut',
      });
      return fadeControl;
    };

    const unsubscribeProgress = progress.on('change', (latest) => {
      if (latest >= 0.92 && !fadeStarted) {
        startFadeOut();
      }
    });

    progressControl = animate(progress, 1, {
      duration: 2.4,
      ease: INTRO_EASE,
      onComplete: () => {
        if (finished) return;
        const activeFade = startFadeOut() || fadeControl;
        if (activeFade?.then) {
          activeFade.then(() => finishIntro(false));
        } else {
          finishIntro(false);
        }
      },
    });

    safetyTimerId = window.setTimeout(() => {
      finishIntro(true);
    }, 4000);

    const initialScrollY = window.scrollY;
    const handleEarlyInput = () => finishIntro(true);
    const handleScroll = () => {
      if (Math.abs(window.scrollY - initialScrollY) > 10) {
        finishIntro(true);
      }
    };
    const handlePageShow = (event) => {
      if (event.persisted) {
        finishIntro(true);
      }
    };

    window.addEventListener('pointerdown', handleEarlyInput, { passive: true });
    window.addEventListener('keydown', handleEarlyInput, { passive: true });
    window.addEventListener('wheel', handleEarlyInput, { passive: true });
    window.addEventListener('touchstart', handleEarlyInput, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pageshow', handlePageShow, { passive: true });

    return () => {
      finished = true;
      unsubscribeProgress();
      progressControl?.stop();
      fadeControl?.stop();
      if (safetyTimerId !== null) window.clearTimeout(safetyTimerId);
      resizeObserver?.disconnect();
      window.removeEventListener('pointerdown', handleEarlyInput);
      window.removeEventListener('keydown', handleEarlyInput);
      window.removeEventListener('wheel', handleEarlyInput);
      window.removeEventListener('touchstart', handleEarlyInput);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [containerWidth, mowerOpacity, mowerWidth, progress]);

  return (
    <div ref={overlayRef} className="lawn-intro" aria-hidden="true">
      <m.div
        className="lawn-intro__grass"
        style={{ clipPath: grassClipPath }}
      >
        <svg className="lawn-intro__grass-svg" aria-hidden="true">
          <defs>
            <pattern
              id="cg-uncut-grass-pattern"
              width="64"
              height="64"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M4 64 Q1 38 -2 12 Q6 34 10 64 Z M18 64 Q19 32 25 6 Q23 36 24 64 Z M34 64 Q30 40 27 16 Q35 38 40 64 Z M50 64 Q54 34 60 10 Q56 38 56 64 Z"
                fill="#0B3D20"
              />
              <path
                d="M10 64 Q13 34 17 8 Q16 38 16 64 Z M26 64 Q23 30 20 2 Q28 32 32 64 Z M42 64 Q45 36 51 12 Q47 38 48 64 Z M58 64 Q62 40 65 18 Q63 42 64 64 Z"
                fill="#12762F"
                fillOpacity="0.65"
              />
              <path
                d="M-2 64 Q3 42 7 22 Q5 44 4 64 Z M14 64 Q10 42 8 20 Q15 40 19 64 Z M37 64 Q41 32 44 4 Q42 36 43 64 Z M52 64 Q49 42 46 24 Q53 42 57 64 Z"
                fill="#1A5F31"
                fillOpacity="0.7"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cg-uncut-grass-pattern)" />
        </svg>
      </m.div>

      <m.div
        className="lawn-intro__edge"
        style={{ x: edgeX, opacity: mowerOpacity }}
      >
        <svg className="lawn-intro__edge-svg" aria-hidden="true">
          <defs>
            <pattern
              id="cg-cut-edge-pattern"
              width="32"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M32 0 L16 0 Q6 4 2 7 Q12 9 18 12 Q4 17 0 20 Q11 23 19 26 Q5 31 3 34 Q13 37 18 40 Q6 44 1 46 L16 48 L32 48 Z"
                fill="#0E4F26"
              />
              <path
                d="M32 4 L20 6 Q11 10 8 12 Q16 14 22 17 Q9 22 6 24 Q15 27 21 30 Q10 35 8 37 Q17 40 22 43 L32 45 Z"
                fill="#0B3D20"
              />
              <path
                d="M32 10 L22 12 Q16 14 14 16 Q21 18 25 21 L32 23 Z M32 32 L21 34 Q15 36 13 38 Q20 40 24 42 L32 44 Z"
                fill="#12762F"
                fillOpacity="0.7"
              />
            </pattern>
          </defs>
          <rect width="32" height="100%" fill="url(#cg-cut-edge-pattern)" />
        </svg>
      </m.div>

      <m.div
        ref={mowerRef}
        className="lawn-intro__mower-track"
        style={{ x: mowerX, opacity: mowerOpacity }}
      >
        <div className="lawn-intro__mower-bob">
          <svg
            className="lawn-intro__mower-svg"
            viewBox="0 0 112 80"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M40 44 L18 12 L8 12"
              stroke="var(--green-900)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 31 L37 26 L41 47 L16 49 Q11 40 14 31 Z"
              fill="var(--green-700)"
              stroke="var(--green-900)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M52 42 L56 26 Q68 23 80 27 L85 42 Z"
              fill="var(--lime-400)"
              stroke="var(--green-900)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <rect
              x="59"
              y="30"
              width="18"
              height="4"
              rx="2"
              fill="var(--lime-500)"
            />
            <path
              d="M35 42 L94 42 Q103 42 104 51 L104 57 L35 57 Q31 50 35 42 Z"
              fill="var(--lime-400)"
              stroke="var(--green-900)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <rect
              x="88"
              y="47"
              width="10"
              height="5"
              rx="2.5"
              fill="var(--green-700)"
            />
            <circle cx="44" cy="60" r="14" fill="var(--green-900)" />
            <circle cx="44" cy="60" r="5" fill="var(--lime-400)" />
            <circle cx="88" cy="63" r="11" fill="var(--green-900)" />
            <circle cx="88" cy="63" r="4" fill="var(--lime-400)" />
          </svg>
        </div>
      </m.div>
    </div>
  );
}
