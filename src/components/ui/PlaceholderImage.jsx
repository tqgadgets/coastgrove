import { useEffect, useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import './PlaceholderImage.css';

function parseRatioDimensions(ratio) {
  const parts = String(ratio).split('/').map(Number);
  if (parts.length === 2 && parts[0] > 0 && parts[1] > 0) {
    return {
      width: Math.round(parts[0] * 200),
      height: Math.round(parts[1] * 200),
    };
  }
  return { width: 800, height: 600 };
}

export default function PlaceholderImage({
  label,
  ratio = '4/3',
  shape = 'rect',
  tone = 'after',
  src,
  alt,
  priority = false,
  loading,
  className = '',
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const classes = `cg-placeholder cg-placeholder--${shape} cg-placeholder--${tone}${
    className ? ` ${className}` : ''
  }`;

  const showImage = Boolean(src) && !hasError;
  const { width, height } = parseRatioDimensions(ratio);
  const resolvedAlt = alt !== undefined ? alt : label;
  const resolvedLoading = loading ?? (priority ? 'eager' : 'lazy');

  if (showImage) {
    return (
      <div className={classes} style={{ aspectRatio: ratio }}>
        <img
          src={src}
          alt={resolvedAlt}
          width={width}
          height={height}
          loading={resolvedLoading}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
          draggable={false}
          onError={() => setHasError(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={classes}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={label}
    >
      <span className="cg-placeholder__icon" aria-hidden="true">
        <ImageIcon size={24} strokeWidth={1.75} />
      </span>
      <span className="cg-placeholder__label">{label}</span>
    </div>
  );
}
