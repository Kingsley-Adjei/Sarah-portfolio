import React, { useState, forwardRef } from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  width?: number | string;
  height?: number | string;
}

const FALLBACK_MAP: Record<string, string> = {
  '/images/hero-set.png': 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80',
  '/images/sarah-portrait.png': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
  '/images/screenplay.png': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
  '/images/performance.png': 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
  '/images/cine-lens.png': 'https://images.unsplash.com/photo-1512790182412-b19e6d61b397?auto=format&fit=crop&w=1200&q=80',
  '/images/bts-slate.png': 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=1200&q=80',
};

const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  {
    src,
    alt,
    fill,
    priority,
    className = '',
    style,
    onError,
    ...props
  },
  ref
) {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError) {
      setHasError(true);
      const fallback = FALLBACK_MAP[src] || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80';
      setCurrentSrc(fallback);
    }
    if (onError) onError(e);
  };

  const combinedClass = `${fill ? 'absolute inset-0 w-full h-full object-cover' : ''} ${className}`.trim();

  return (
    <img
      ref={ref}
      src={currentSrc}
      alt={alt || ''}
      className={combinedClass}
      loading={priority ? 'eager' : 'lazy'}
      onError={handleImageError}
      style={style}
      {...props}
    />
  );
});

export default Image;
