import { useRef, useState } from 'react';
import { ChevronsLeftRight } from 'lucide-react';
import PlaceholderImage from './PlaceholderImage.jsx';
import './BeforeAfterSlider.css';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function BeforeAfterSlider({
  beforeLabel,
  afterLabel,
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  ratio = '4/3',
  title,
  eager = false,
}) {
  const [position, setPosition] = useState(50);
  const draggingRef = useRef(false);

  function updateFromClientX(container, clientX) {
    const rect = container.getBoundingClientRect();
    if (!rect.width) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(clamp(next, 0, 100));
  }

  function handlePointerDown(event) {
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.currentTarget, event.clientX);
  }

  function handlePointerMove(event) {
    if (!draggingRef.current) return;
    updateFromClientX(event.currentTarget, event.clientX);
  }

  function handlePointerEnd(event) {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function handleKeyDown(event) {
    const step = event.shiftKey ? 10 : 5;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setPosition((prev) => clamp(prev - step, 0, 100));
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      setPosition((prev) => clamp(prev + step, 0, 100));
    } else if (event.key === 'Home') {
      event.preventDefault();
      setPosition(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setPosition(100);
    }
  }

  const rounded = Math.round(position);
  const insetRight = 100 - position;
  const showBeforeLabel = position > 12;
  const showAfterLabel = position < 88;
  const imageLoading = eager ? 'eager' : undefined;

  return (
    <div
      className="ba-slider"
      style={{ aspectRatio: ratio }}
      draggable={false}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
    >
      <div className="ba-slider__layer">
        <PlaceholderImage
          label={afterLabel}
          src={afterSrc}
          alt={afterAlt}
          ratio={ratio}
          tone="after"
          loading={imageLoading}
        />
      </div>

      <div
        className="ba-slider__layer"
        style={{ clipPath: `inset(0 ${insetRight}% 0 0)` }}
      >
        <PlaceholderImage
          label={beforeLabel}
          src={beforeSrc}
          alt={beforeAlt}
          ratio={ratio}
          tone="before"
          loading={imageLoading}
        />
      </div>

      {showBeforeLabel && (
        <span className="ba-slider__label ba-slider__label--before" aria-hidden="true">
          BEFORE
        </span>
      )}

      {showAfterLabel && (
        <span className="ba-slider__label ba-slider__label--after" aria-hidden="true">
          AFTER
        </span>
      )}

      <div className="ba-slider__divider" style={{ left: `${position}%` }}>
        <button
          type="button"
          className="ba-slider__handle"
          role="slider"
          tabIndex={0}
          aria-label={`Before and after comparison for ${title}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={rounded}
          aria-valuetext={`${rounded}% before`}
          onKeyDown={handleKeyDown}
        >
          <ChevronsLeftRight size={20} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
