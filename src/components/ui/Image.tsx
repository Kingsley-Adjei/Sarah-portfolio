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
  '/images/hero-set.webp': 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80',
  '/images/sarah-portrait.webp': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
  '/images/screenplay.webp': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
  '/images/performance.webp': 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
  '/images/cine-lens.webp': 'https://images.unsplash.com/photo-1512790182412-b19e6d61b397?auto=format&fit=crop&w=1200&q=80',
  '/images/bts-slate.webp': 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=1200&q=80',
  '/images/explore-directing.webp': 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80',
  '/images/explore-screenwriting.webp': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
  '/images/explore-performance.webp': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
  '/images/explore-production.webp': 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80',
  '/images/explore-bts.webp': 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
  '/images/about-hero.webp': 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80',
  '/images/about-portrait.webp': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
  '/images/about-crew.webp': 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80',
  '/images/about-banner.webp': 'https://images.unsplash.com/photo-1512790182412-b19e6d61b397?auto=format&fit=crop&w=1200&q=80',
  '/images/screenwriting-1.webp': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
  '/images/screenwriting-2.webp': 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=80',
  '/images/screenwriting-3.webp': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  '/images/screenwriting-4.webp': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
  '/images/production-1.webp': 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80',
  '/images/production-2.webp': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
  '/images/production-3.webp': 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1200&q=80',
  '/images/production-4.webp': 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80',
  '/images/production-5.webp': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
  '/images/bts-1.webp': 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
  '/images/bts-2.webp': 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=1200&q=80',
  '/images/bts-3.webp': 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
  '/images/bts-4.webp': 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
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
