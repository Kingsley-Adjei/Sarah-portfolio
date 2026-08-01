import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface LenisProviderProps {
  children: ReactNode;
}

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

// Lenis drives window.scrollTo itself on every animation frame, so a raw
// window.scrollTo() call gets silently overwritten on the next frame.
// Route all "jump to top" calls (e.g. on page/view change) through here.
export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }
}

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisInstance = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateFn = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisInstance = null;
      gsap.ticker.remove(updateFn);
    };
  }, []);

  return <>{children}</>;
}
