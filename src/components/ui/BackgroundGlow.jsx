import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import './BackgroundGlow.css';

function getScrollProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return 0;
  return Math.min(1, Math.max(0, window.scrollY / maxScroll));
}

export default function BackgroundGlow() {
  const [mounted, setMounted] = useState(false);
  const { pathname, hash } = useLocation();

  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);
  const rafRef = useRef(null);
  const currentRef = useRef(0);
  const targetRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return undefined;

    const applyBlobPositions = (progress) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (blob1Ref.current) {
        const x1 = (0.1 + 0.65 * progress) * vw;
        const y1 = (0.05 + 0.65 * progress) * vh;
        blob1Ref.current.style.transform = `translate3d(${x1.toFixed(2)}px, ${y1.toFixed(2)}px, 0)`;
      }

      if (blob2Ref.current) {
        const x2 = (0.8 - 0.75 * progress) * vw;
        const y2 = (0.2 + 0.6 * progress) * vh;
        blob2Ref.current.style.transform = `translate3d(${x2.toFixed(2)}px, ${y2.toFixed(2)}px, 0)`;
      }

      if (blob3Ref.current) {
        const x3 = (0.15 + 0.7 * progress) * vw;
        const y3 = (0.85 - 0.75 * progress) * vh;
        blob3Ref.current.style.transform = `translate3d(${x3.toFixed(2)}px, ${y3.toFixed(2)}px, 0)`;
      }
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = mediaQuery.matches;

    const stopLoop = () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const step = () => {
      if (reduced) {
        stopLoop();
        return;
      }

      const diff = targetRef.current - currentRef.current;
      if (Math.abs(diff) < 0.0005) {
        currentRef.current = targetRef.current;
        applyBlobPositions(currentRef.current);
        rafRef.current = null;
        return;
      }

      currentRef.current += diff * 0.08;
      applyBlobPositions(currentRef.current);
      rafRef.current = window.requestAnimationFrame(step);
    };

    const startLoop = () => {
      if (reduced) {
        applyBlobPositions(0);
        return;
      }
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(step);
      }
    };

    const handleScroll = () => {
      if (reduced) return;
      targetRef.current = getScrollProgress();
      startLoop();
    };

    const handleResize = () => {
      if (reduced) {
        applyBlobPositions(0);
        return;
      }
      targetRef.current = getScrollProgress();
      applyBlobPositions(currentRef.current);
      startLoop();
    };

    const handleMotionChange = (event) => {
      reduced = event.matches;
      stopLoop();
      if (reduced) {
        currentRef.current = 0;
        targetRef.current = 0;
        applyBlobPositions(0);
      } else {
        targetRef.current = getScrollProgress();
        currentRef.current = targetRef.current;
        applyBlobPositions(currentRef.current);
      }
    };

    // Reset target on mount / route change
    stopLoop();
    if (reduced) {
      currentRef.current = 0;
      targetRef.current = 0;
      applyBlobPositions(0);
    } else {
      targetRef.current = getScrollProgress();
      currentRef.current = targetRef.current;
      applyBlobPositions(currentRef.current);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      stopLoop();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, [mounted, pathname, hash]);

  if (!mounted) return null;

  return createPortal(
    <div className="bg-glow" aria-hidden="true">
      <div ref={blob1Ref} className="bg-glow__blob-outer bg-glow__blob-outer--1">
        <div className="bg-glow__blob-inner bg-glow__blob-inner--1" />
      </div>
      <div ref={blob2Ref} className="bg-glow__blob-outer bg-glow__blob-outer--2">
        <div className="bg-glow__blob-inner bg-glow__blob-inner--2" />
      </div>
      <div ref={blob3Ref} className="bg-glow__blob-outer bg-glow__blob-outer--3">
        <div className="bg-glow__blob-inner bg-glow__blob-inner--3" />
      </div>
    </div>,
    document.body
  );
}
