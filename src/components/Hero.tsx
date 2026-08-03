import { useEffect, useRef } from 'react';
import Image from '@/components/ui/Image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface HeroProps {
  onContactClick: () => void;
  onGetInTouchClick: () => void;
}

export default function Hero({ onContactClick, onGetInTouchClick }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Staggered fade-up for text elements on load
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2 }
      )
        .fromTo(
          imageContainerRef.current,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 1.4 },
          '-=0.8'
        )
        .fromTo(
          textContainerRef.current?.children || [],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.2 },
          '-=0.8'
        );

      // 2. Parallax scale and position shift scroll-trigger
      if (imageRef.current && heroRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 12,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 3. Hover magnetic scale for buttons
      const buttons = gsap.utils.toArray('.cta-btn');
      buttons.forEach((btn: any) => {
        btn.addEventListener('mouseenter', () => {
          gsap.to(btn, { scale: 1.04, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen pt-28 md:pt-36 pb-20 px-6 md:px-12 flex flex-col justify-between overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* Title Header */}
      <div className="max-w-7xl mx-auto w-full text-center z-10 my-4">
        <h1
          ref={headingRef}
          className="font-serif tracking-widest text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal text-white uppercase leading-[1.1]"
        >
          SARAH ADJEI &mdash; FILMMAKER & VISUAL DIRECTOR
        </h1>
        <h2 className="text-sm sm:text-lg uppercase tracking-[0.35em] text-neutral-400 mt-4 font-mono">
          FRAMING STORIES THAT LINGER &bull; ACCRA, GHANA
        </h2>
      </div>

      {/* Parallax Image Banner */}
      <div ref={imageContainerRef} className="max-w-7xl mx-auto w-full my-8 md:my-12 z-10">
        <div className="relative w-full h-[320px] sm:h-[450px] md:h-[580px] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
          <Image
            ref={imageRef as any}
            src="/images/hero-set.webp"
            alt="Sarah Adjei operating anamorphic cinema camera on set in Accra, Ghana — Award-Winning Filmmaker & Visual Director"
            fill
            priority
            className="object-cover object-center grayscale contrast-[1.1] brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Details Row */}
      <div
        ref={textContainerRef}
        className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center md:items-end justify-between gap-6 z-10"
      >
        <div className="text-center md:text-left">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif tracking-wider uppercase text-neutral-200">
            NARRATIVE CINEMA & COMMERCIAL DIRECTING
          </h2>
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-neutral-400 mt-2">
            DIRECTOR &bull; SCREENWRITER &bull; PRODUCER
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onGetInTouchClick}
            className="cta-btn px-6 py-3 text-xs uppercase tracking-[0.25em] bg-white text-black font-semibold rounded-none hover:bg-neutral-200 transition-all duration-300 shadow-lg cursor-pointer"
          >
            Get in touch
          </button>
          <button
            onClick={onContactClick}
            className="cta-btn px-6 py-3 text-xs uppercase tracking-[0.25em] bg-transparent text-white border border-white/40 font-medium hover:border-white hover:bg-white/5 transition-all duration-300 cursor-pointer"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
