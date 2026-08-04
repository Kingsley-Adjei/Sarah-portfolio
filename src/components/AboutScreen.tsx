import { useEffect, useRef } from 'react';
import Image from '@/components/ui/Image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface AboutScreenProps {
  onContactClick: () => void;
}

export default function AboutScreen({ onContactClick }: AboutScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerTextRef = useRef<HTMLHeadingElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fade in header text
      gsap.fromTo(
        headerTextRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      );

      // Header background parallax
      if (parallaxBgRef.current) {
        gsap.to(parallaxBgRef.current, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Staggered reveal of sections
      const revealElements = gsap.utils.toArray('.scroll-reveal');
      revealElements.forEach((el: any) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });

      // Parallax images
      const parallaxImages = gsap.utils.toArray('.parallax-img');
      parallaxImages.forEach((img: any) => {
        gsap.to(img, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#080808] text-white min-h-screen pt-20">
      {/* 1. Header Banner */}
      <section className="relative h-[40vh] sm:h-[50vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div ref={parallaxBgRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image
            src="/images/about-hero.webp"
            alt="Sarah Adjei Cinema Set Background — Accra Ghana Film Production"
            fill
            priority
            className="object-cover grayscale contrast-125 brightness-[0.4]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent pointer-events-none" />
        <h1
          ref={headerTextRef}
          className="relative z-10 font-serif tracking-[0.25em] text-4xl sm:text-6xl md:text-7xl font-normal text-white uppercase text-center"
        >
          KNOW SARAH
        </h1>
      </section>

      {/* 2. Biography Split Section */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-reveal">
        {/* Left Side Info */}
        <div className="lg:col-span-6 space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-medium">Hello,</p>
          <h2 className="text-3xl sm:text-5xl font-serif tracking-widest text-white uppercase leading-[1.15]">
            I&apos;m Sarah Adjei
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-light">
            Sarah Adjei is a filmmaker, screenwriter, and actress dedicated to carving out raw, visually arresting narratives. Navigating the intersection of delicate human emotion and bold storytelling, she brings a distinctive, moody aesthetic to both independent cinema and commercial screens. Whether directing behind the lens, drafting scripts, or performing, her creative mission remains unyielding: telling stories that linger.
          </p>
        </div>

        {/* Right Side Portrait Image */}
        <div className="lg:col-span-6 relative w-full aspect-[4/5] overflow-hidden border border-white/10 rounded-sm shadow-2xl">
          <div className="absolute inset-0 w-full h-[115%] -top-[7.5%] parallax-img">
            <Image
              src="/images/about-portrait.webp"
              alt="Sarah Adjei (Abyna Koblyn) — Director & Screenwriter Portrait in Accra, Ghana"
              fill
              className="object-cover grayscale contrast-125 brightness-[0.9]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/40 via-transparent to-transparent" />
        </div>
      </section>

      {/* 3. Quote & Camera Crew Split Section */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center border-t border-white/5 scroll-reveal">
        {/* Left Side Crew Image */}
        <div className="lg:col-span-6 order-2 lg:order-1 relative w-full aspect-[16/10] overflow-hidden border border-white/10 rounded-sm shadow-2xl">
          <div className="absolute inset-0 w-full h-[115%] -top-[7.5%] parallax-img">
            <Image
              src="/images/about-crew.webp"
              alt="Sarah Adjei Film Crew & Anamorphic Camera Operators On Set in Accra"
              fill
              className="object-cover grayscale contrast-125 brightness-[0.85]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/40 via-transparent to-transparent" />
        </div>

        {/* Right Side Philosophy Quote */}
        <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 lg:pl-6">
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-light italic">
            &ldquo;For me, cinema is a medium of raw vulnerability. Every frame is an opportunity to explore the complex, unspoken layers of human relationships and culture. I treat writing as building the soul of a project, directing as shaping its heartbeat, and acting as living its truth. It&apos;s about creating art that challenges, resonates, and moves the audience long after the credits roll.&rdquo;
          </p>
        </div>
      </section>

      {/* 4. Bottom HIT ME UP Collaboration Banner */}
      <section className="relative py-24 md:py-36 px-6 md:px-12 border-t border-white/10 overflow-hidden scroll-reveal">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/about-banner.webp"
            alt="Cinematic Lens Rigging — Directorial Collaboration with Sarah Adjei"
            fill
            className="object-cover grayscale contrast-125 brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-[#080808]/90" />
        </div>


        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text Left */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-light">
              Have a story that needs a voice, a script that needs direction, or a production that demands a sharp creative eye? Let&apos;s collaborate and build something unforgettable. Drop a message or reach out through any of the channels below to discuss screenplays, casting, or directing roles.
            </p>
            <button
              onClick={onContactClick}
              className="px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.25em] font-semibold hover:bg-neutral-200 transition-colors shadow-xl cursor-pointer"
            >
              Get in touch
            </button>
          </div>

          {/* Title Right */}
          <div className="lg:col-span-5 text-left lg:text-right">
            <h3 className="font-serif tracking-widest text-4xl sm:text-6xl md:text-7xl text-white uppercase">
              HIT ME UP
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
}
