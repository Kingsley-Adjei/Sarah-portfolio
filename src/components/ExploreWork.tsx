import { useRef, useEffect } from 'react';
import Image from '@/components/ui/Image';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ExploreWorkProps {
  onViewPortfolioClick: () => void;
}

export default function ExploreWork({ onViewPortfolioClick }: ExploreWorkProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate section header
      gsap.fromTo(
        '.explore-header > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      if (cardsRef.current) {
        const cards = Array.from(cardsRef.current.children);
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // Parallax scroll on images
      const images = gsap.utils.toArray('.explore-img-inner');
      images.forEach((img: any) => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const categories = [
    {
      id: 'directing',
      title: 'DIRECTING',
      description:
        'Commanding the set with a visual style that bridges evocative, high-contrast cinematography and intense character development. Crafting rich worlds that push creative boundaries.',
      image: '/images/hero-set.png',
    },
    {
      id: 'screenwriting',
      title: 'SCREENWRITING',
      description:
        'Developing sharp, nuanced screenplays and narrative treatments. Giving voice to complex characters, rich subtext, and culturally profound human journeys.',
      image: '/images/screenplay.png',
    },
    {
      id: 'performance',
      title: 'PERFORMANCE',
      description:
        'Embodying raw emotion and deep psychological complexity on screen. Bringing authenticity, physical vulnerability, and a commanding presence to every frame.',
      image: '/images/performance.png',
    },
  ];

  return (
    <section
      id="filmblog"
      ref={sectionRef}
      className="py-24 md:py-36 px-6 md:px-12 bg-[#080808] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 explore-header">
          <h2 className="text-3xl sm:text-5xl font-serif tracking-widest text-white uppercase">
            Explore My Work
          </h2>
          <div className="w-16 h-[2px] bg-white/30 mt-4" />
        </div>

        {/* Categories Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {categories.map((item) => (
            <div
              key={item.id}
              onClick={onViewPortfolioClick}
              className="group cursor-pointer flex flex-col justify-between space-y-6 p-6 rounded-sm border border-white/10 hover:border-white/30 transition-all duration-500 bg-[#121212]/50 hover:bg-[#161616] hover:scale-[1.01]"
            >
              <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-white/5">
                <div className="absolute inset-0 w-full h-[120%] -top-[10%] explore-img-inner">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-serif uppercase tracking-wider text-white group-hover:text-neutral-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 flex items-center text-xs uppercase tracking-[0.2em] text-neutral-400 group-hover:text-white transition-colors">
                <span>View Discipline</span>
                <ArrowRight className="ml-2 w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Link to Full Portfolio */}
        <div className="mt-16 text-left">
          <button
            onClick={onViewPortfolioClick}
            className="inline-flex items-center text-xs uppercase tracking-[0.25em] font-medium text-white hover:text-neutral-400 transition-colors py-2 group cursor-pointer"
          >
            <span>View Full Portfolio Archive</span>
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
