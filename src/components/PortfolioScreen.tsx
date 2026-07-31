import { useEffect, useRef, useState } from 'react';
import Image from '@/components/ui/Image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';

interface PortfolioScreenProps {
  onContactClick: () => void;
}

export default function PortfolioScreen({ onContactClick }: PortfolioScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Reveal headings on scroll down and up
      gsap.fromTo(
        '.reveal-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.reveal-header',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Stagger items inside each category grid on scroll down and up
      const grids = gsap.utils.toArray('.category-grid');
      grids.forEach((grid: any) => {
        gsap.fromTo(
          grid.children,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const directingGrid = [
    { src: '/images/hero-set.png', alt: 'Directing camera setup', span: 'col-span-2' },
    { src: '/images/sarah-portrait.png', alt: 'Director monitor log', span: 'col-span-1' },
    { src: '/images/bts-slate.png', alt: 'Directing monitor feed', span: 'col-span-1' },
    { src: '/images/performance.png', alt: 'Director with head set', span: 'col-span-1' },
    { src: '/images/cine-lens.png', alt: 'Cine view finder details', span: 'col-span-1' },
    { src: '/images/hero-set.png', alt: 'Set lights monitor', span: 'col-span-2' },
  ];

  const writingGrid = [
    { src: '/images/screenplay.png', alt: 'Typewriter Chapter Two script', span: 'col-span-1' },
    { src: '/images/screenplay.png', alt: 'Hand writing detail', span: 'col-span-1' },
    { src: '/images/screenplay.png', alt: 'Notebook with draft notes', span: 'col-span-1' },
    { src: '/images/screenplay.png', alt: 'Laptop screen dialogue typing', span: 'col-span-2' },
    { src: '/images/screenplay.png', alt: 'Close-up of screenplay text', span: 'col-span-1' },
  ];

  const actingGrid = [
    { src: '/images/performance.png', alt: 'Emotional close up performance', span: 'col-span-1' },
    { src: '/images/performance.png', alt: 'Behind cage window scene', span: 'col-span-2' },
    { src: '/images/sarah-portrait.png', alt: 'Actress dressing room prep', span: 'col-span-1' },
    { src: '/images/performance.png', alt: 'Violent blue-purple scene lighting', span: 'col-span-2' },
  ];

  const productionGrid = [
    { src: '/images/bts-slate.png', alt: 'Production clapperboard slate log', span: 'col-span-2' },
    { src: '/images/hero-set.png', alt: 'Production crew on street', span: 'col-span-1' },
    { src: '/images/cine-lens.png', alt: 'Cine lens barrel macro details', span: 'col-span-1' },
    { src: '/images/hero-set.png', alt: 'Filming set sunrise silhouette', span: 'col-span-2' },
  ];

  const btsGrid = [
    { src: '/images/bts-slate.png', alt: 'BTS Clapperboard details close up', span: 'col-span-1' },
    { src: '/images/hero-set.png', alt: 'BTS Camera rigging setup', span: 'col-span-2' },
    { src: '/images/sarah-portrait.png', alt: 'BTS Director framing actor', span: 'col-span-2' },
    { src: '/images/performance.png', alt: 'BTS Lighting set configuration', span: 'col-span-1' },
  ];

  return (
    <div ref={containerRef} className="bg-[#080808] text-white min-h-screen pt-24 pb-20 px-6 md:px-12">
      {/* 1. Header Hero Area */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-24 reveal-header">
        <div className="lg:col-span-8 space-y-4">
          <h1 className="text-4xl sm:text-7xl font-serif tracking-widest text-white uppercase leading-[1.05]">
            PORTFOLIO
          </h1>
          <p className="text-xl sm:text-3xl font-serif italic text-neutral-400">
            Directed by Sarah Adjei
          </p>
          <p className="max-w-xl text-neutral-400 text-sm sm:text-base leading-relaxed font-light mt-4">
            A curated collection of cinematic works spanning directing, screenwriting, performance, and behind-the-scenes photography.
          </p>
        </div>

        {/* Blurred Portrait Right */}
        <div className="lg:col-span-4 relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 grayscale blur-[1px] brightness-[0.7]">
          <Image
            src="/images/sarah-portrait.png"
            alt="Sarah Portrait"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* 2. Portfolio Categories */}
      <section className="max-w-7xl mx-auto space-y-24 border-t border-white/10 pt-16">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-[0.4em] text-neutral-400 font-semibold">
            CATEGORIES
          </h2>
          <div className="w-16 h-[1px] bg-white/20 mx-auto mt-4" />
        </div>

        {/* Directing Category */}
        <div className="space-y-8">
          <h3 className="text-lg uppercase tracking-[0.25em] font-serif text-white border-b border-white/5 pb-3">
            Directing
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 category-grid">
            {directingGrid.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(item.src)}
                className={`relative aspect-[16/10] overflow-hidden border border-white/10 rounded-sm cursor-pointer group ${item.span}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Writing Category */}
        <div className="space-y-8">
          <h3 className="text-lg uppercase tracking-[0.25em] font-serif text-white border-b border-white/5 pb-3">
            Writing
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 category-grid">
            {writingGrid.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(item.src)}
                className={`relative aspect-[16/10] overflow-hidden border border-white/10 rounded-sm cursor-pointer group ${item.span}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Acting Category */}
        <div className="space-y-8">
          <h3 className="text-lg uppercase tracking-[0.25em] font-serif text-white border-b border-white/5 pb-3">
            Acting
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 category-grid">
            {actingGrid.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(item.src)}
                className={`relative aspect-[16/10] overflow-hidden border border-white/10 rounded-sm cursor-pointer group ${item.span}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Production Category */}
        <div className="space-y-8">
          <h3 className="text-lg uppercase tracking-[0.25em] font-serif text-white border-b border-white/5 pb-3">
            Production
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 category-grid">
            {productionGrid.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(item.src)}
                className={`relative aspect-[16/10] overflow-hidden border border-white/10 rounded-sm cursor-pointer group ${item.span}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Behind The Scenes Category */}
        <div className="space-y-8">
          <h3 className="text-lg uppercase tracking-[0.25em] font-serif text-white border-b border-white/5 pb-3">
            Behind The Scenes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 category-grid">
            {btsGrid.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(item.src)}
                className={`relative aspect-[16/10] overflow-hidden border border-white/10 rounded-sm cursor-pointer group ${item.span}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Bottom CTA Section */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-white/10 mt-24">
        {/* Let's Create Title */}
        <div className="lg:col-span-5">
          <h3 className="font-serif tracking-widest text-4xl sm:text-5xl text-white uppercase leading-none">
            LET&apos;S CREATE <br />
            SOMETHING <br />
            BEAUTIFUL <br />
            TOGETHER
          </h3>
        </div>

        {/* Info Right */}
        <div className="lg:col-span-7 space-y-6">
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
            Every memorable film begins with a shared vision. Whether you have an early-stage screenplay that needs a distinctive visual direction, a brand narrative waiting to be brought to life, or a commercial project seeking a sharp creative touch—I am always eager to collaborate with passionate storytellers, production companies, and agencies worldwide. Let&apos;s connect and turn your ideas into compelling visual cinema.
          </p>
          <button
            onClick={onContactClick}
            className="px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.25em] font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Get in touch
          </button>
        </div>
      </section>

      {/* Image Lightbox Overlay */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-neutral-400 hover:text-white p-2 cursor-pointer"
          >
            <X size={28} />
          </button>
          <div className="relative max-w-5xl w-full aspect-[16/10] border border-white/10 rounded-sm overflow-hidden">
            <Image
              src={selectedImage}
              alt="Lightbox View"
              fill
              className="object-cover grayscale contrast-125"
            />
          </div>
        </div>
      )}
    </div>
  );
}
