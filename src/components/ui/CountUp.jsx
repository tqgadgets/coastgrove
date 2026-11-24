import { useEffect, useRef } from 'react';
import './CountUp.css';

function parseCountValue(raw) {
  const text = String(raw);
  const match = text.match(/^([^\d.-]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return null;
  }
  const [, prefix, numStr, suffix] = match;
  const decimalPart = numStr.split('.')[1];
  return {
    prefix,
    target: Number(numStr),
    decimals: decimalPart ? decimalPart.length : 0,
    suffix,
  };
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function CountUp({ value, className = '' }) {
  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const textEl = textRef.current;
    const parsed = parseCountValue(value);

    if (!wrapper || !textEl || !parsed) return undefined;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      textEl.textContent = String(value);
      return undefined;
    }

    let hasRun = false;

    const startAnimation = () => {
      if (hasRun) return;
      hasRun = true;

      const duration = 1800;
      const startTime = performance.now();

      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        const current = parsed.target * eased;
        const formatted =
          parsed.decimals > 0
            ? current.toFixed(parsed.decimals)
            : String(Math.round(current));

        if (progress < 1) {
          textEl.textContent = `${parsed.prefix}${formatted}${parsed.suffix}`;
          rafRef.current = window.requestAnimationFrame(tick);
        } else {
          textEl.textContent = String(value);
          rafRef.current = null;
        }
      };

      textEl.textContent = `${parsed.prefix}${
        parsed.decimals > 0 ? (0).toFixed(parsed.decimals) : '0'
      }${parsed.suffix}`;
      rafRef.current = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.disconnect();
            startAnimation();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(wrapper);

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      textEl.textContent = String(value);
    };
  }, [value]);

  const strValue = String(value);

  return (
    <span
      ref={wrapperRef}
      className={`cg-countup${className ? ` ${className}` : ''}`}
      aria-label={strValue}
      style={{ minWidth: `${strValue.length}ch` }}
    >
      <span ref={textRef} aria-hidden="true">
        {strValue}
      </span>
    </span>
  );
}
