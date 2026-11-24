import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Quote, Star } from 'lucide-react';
import Card from './Card.jsx';
import './ReviewsCarousel.css';

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export default function ReviewsCarousel({ reviews = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [manualTick, setManualTick] = useState(0);

  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  const timerRef = useRef(null);
  const rafRef = useRef(null);

  const total = reviews.length;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyPreference = (matches) => {
      setReducedMotion(matches);
      if (matches) {
        setIsPlaying(false);
      }
    };

    applyPreference(mediaQuery.matches);

    const handleChange = (event) => {
      applyPreference(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      setIsTabHidden(document.visibilityState === 'hidden');
    };

    handleVisibility();
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const scrollToCard = useCallback(
    (index) => {
      const track = trackRef.current;
      if (!track || !track.children.length) return;
      const target = track.children[index];
      if (!target) return;

      track.scrollTo({
        left: target.offsetLeft,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    },
    [reducedMotion]
  );

  const getNearestIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.children.length) return 0;

    const currentScroll = track.scrollLeft;
    let nearestIdx = 0;
    let smallestDiff = Infinity;

    for (let i = 0; i < track.children.length; i += 1) {
      const diff = Math.abs(track.children[i].offsetLeft - currentScroll);
      if (diff < smallestDiff) {
        smallestDiff = diff;
        nearestIdx = i;
      }
    }

    return nearestIdx;
  }, []);

  const stepCard = useCallback(
    (direction, isManual = false) => {
      const track = trackRef.current;
      if (!track || total === 0) return;

      const currentIdx = getNearestIndex();
      let nextIdx;

      if (direction > 0) {
        const atEnd =
          currentIdx >= total - 1 ||
          track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
        nextIdx = atEnd ? 0 : currentIdx + 1;
      } else {
        nextIdx = currentIdx <= 0 ? total - 1 : currentIdx - 1;
      }

      scrollToCard(nextIdx);
      if (isManual) {
        setManualTick((prev) => prev + 1);
      }
    },
    [getNearestIndex, scrollToCard, total]
  );

  const canAutoplay =
    isPlaying &&
    !reducedMotion &&
    !isHovered &&
    !isFocused &&
    !isDragging &&
    !isTabHidden &&
    total > 1;

  useEffect(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (!canAutoplay) return undefined;

    timerRef.current = window.setTimeout(() => {
      stepCard(1, false);
    }, 5000);

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [canAutoplay, activeIndex, manualTick, stepCard]);

  function handleTrackScroll() {
    if (rafRef.current !== null) return;

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      const nearest = getNearestIndex();
      setActiveIndex((prev) => (prev !== nearest ? nearest : prev));
    });
  }

  function handleDotClick(index) {
    scrollToCard(index);
    setManualTick((prev) => prev + 1);
  }

  function handleTrackKeyDown(event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      stepCard(-1, true);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      stepCard(1, true);
    }
  }

  function handleFocusCapture() {
    setIsFocused(true);
  }

  function handleBlurCapture(event) {
    if (!carouselRef.current?.contains(event.relatedTarget)) {
      setIsFocused(false);
    }
  }

  function handlePointerDown(event) {
    if (event.pointerType !== 'mouse') {
      setIsDragging(true);
    }
    setManualTick((prev) => prev + 1);
  }

  function handlePointerEnd() {
    setIsDragging(false);
  }

  return (
    <div
      ref={carouselRef}
      className="reviews-carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
    >
      <div
        ref={trackRef}
        className="reviews-carousel__track"
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer reviews"
        aria-live={canAutoplay ? 'off' : 'polite'}
        tabIndex={0}
        onScroll={handleTrackScroll}
        onKeyDown={handleTrackKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => {
          setIsDragging(false);
          setManualTick((prev) => prev + 1);
        }}
        onTouchCancel={() => setIsDragging(false)}
      >
        {reviews.map((review, index) => (
          <Card
            key={review.id}
            className="reviews-carousel__slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`Review ${index + 1} of ${total}`}
          >
            <div className="reviews-carousel__top">
              <div className="reviews-carousel__header">
                <span className="reviews-carousel__quote-badge" aria-hidden="true">
                  <Quote size={18} strokeWidth={2} />
                </span>
                <div
                  className="reviews-carousel__stars"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {Array.from({ length: review.rating }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={16}
                      fill="var(--lime-500)"
                      stroke="var(--green-700)"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              <p className="reviews-carousel__text">{review.text}</p>
            </div>

            <div className="reviews-carousel__author">
              <span className="reviews-carousel__avatar" aria-hidden="true">
                {getInitials(review.name)}
              </span>
              <div className="reviews-carousel__meta">
                <span className="reviews-carousel__name">{review.name}</span>
                <span className="reviews-carousel__sub">
                  {review.city} - {review.service}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="reviews-carousel__controls">
        <div className="reviews-carousel__nav">
          <button
            type="button"
            className="reviews-carousel__btn"
            aria-label="Previous review"
            onClick={() => stepCard(-1, true)}
          >
            <ChevronLeft size={20} strokeWidth={2} aria-hidden="true" />
          </button>

          <button
            type="button"
            className="reviews-carousel__btn"
            aria-label="Next review"
            onClick={() => stepCard(1, true)}
          >
            <ChevronRight size={20} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <div className="reviews-carousel__dots" role="group" aria-label="Review slides">
          {reviews.map((review, index) => (
            <button
              key={review.id}
              type="button"
              className="reviews-carousel__dot-btn"
              aria-label={`Go to review ${index + 1}`}
              aria-current={activeIndex === index ? 'true' : undefined}
              onClick={() => handleDotClick(index)}
            >
              <span className="reviews-carousel__dot" aria-hidden="true" />
            </button>
          ))}
        </div>

        <button
          type="button"
          className="reviews-carousel__btn"
          aria-label={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
          aria-pressed={!isPlaying}
          onClick={() => setIsPlaying((prev) => !prev)}
        >
          {isPlaying ? (
            <Pause size={18} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Play size={18} strokeWidth={2} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
