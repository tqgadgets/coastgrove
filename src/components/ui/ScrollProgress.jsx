import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import './ScrollProgress.css';

function getScrollProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return 0;
  return Math.min(1, Math.max(0, window.scrollY / maxScroll));
}

export default function ScrollProgress() {
  const [mounted, setMounted] = useState(false);
  const { pathname, hash } = useLocation();
  const barRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return undefined;

    const updateBar = () => {
      rafRef.current = null;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${getScrollProgress().toFixed(4)})`;
      }
    };

    const scheduleUpdate = () => {
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(updateBar);
      }
    };

    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${getScrollProgress().toFixed(4)})`;
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [mounted, pathname, hash]);

  if (!mounted) return null;

  return createPortal(
    <div className="scroll-progress" aria-hidden="true">
      <div ref={barRef} className="scroll-progress__bar" />
    </div>,
    document.body
  );
}
