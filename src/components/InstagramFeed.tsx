import React from 'react';
import Image from '@/components/ui/Image';

const column1 = [
  { src: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=800&auto=format&fit=crop', alt: 'Cinema Lens Shot' },
  { src: '/images/sarah-portrait.png', alt: 'Sarah Directing' },
  { src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop', alt: 'Film Set Lighting' },
  { src: '/images/screenplay.png', alt: 'Screenplay Desk' },
];

const column2 = [
  { src: '/images/hero-set.png', alt: 'Set Monitor Feed' },
  { src: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop', alt: 'Neo Noir Scene' },
  { src: '/images/performance.png', alt: 'Performance Close Up' },
  { src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop', alt: 'Anamorphic Rig' },
];

const column3 = [
  { src: '/images/cine-lens.png', alt: 'Cine Lens Details' },
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop', alt: 'Lead Role Frame' },
  { src: '/images/bts-slate.png', alt: 'Clapperboard Slate' },
  { src: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop', alt: 'Midnight Cinema' },
];

const column4 = [
  { src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop', alt: 'Vintage Script Note' },
  { src: '/images/sarah-portrait.png', alt: 'Director Viewfinder' },
  { src: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop', alt: 'Golden Hour Rig' },
  { src: '/images/hero-set.png', alt: 'Sunset Silhouette Shoot' },
];

export default function InstagramFeed() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#080808] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Title Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.35em] text-neutral-400 font-semibold block">
              SOCIAL ARCHIVE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif tracking-widest text-white uppercase leading-tight">
              Follow My <br /> Journey
            </h2>
          </div>
          
          <p className="text-sm text-neutral-400 font-light leading-relaxed">
            Behind the scenes stills, production logs, screenplay notes, and daily directorial moments from set.
          </p>

          <p className="text-xs uppercase tracking-[0.25em] text-white font-mono">
            @Abynakoblyn
          </p>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.25em] font-semibold hover:bg-neutral-200 transition-colors shadow-lg cursor-pointer"
          >
            Visit Instagram
          </a>
        </div>

        {/* Skewed Vertical Marquee Grid Viewport */}
        <div className="lg:col-span-8 relative h-[520px] sm:h-[620px] rounded-3xl overflow-hidden border border-white/10 bg-neutral-950/80 shadow-2xl">
          {/* Top & Bottom Vignette Mask Gradients */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#080808] via-[#080808]/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent z-20 pointer-events-none" />

          {/* Angled Skewed Container Layer */}
          <div className="absolute inset-0 flex items-center justify-center -m-16 transform -rotate-[9deg] scale-[1.25]">
            <div className="grid grid-cols-4 gap-4 sm:gap-6 w-full h-[150%]">
              
              {/* Column 1: Upward Slow */}
              <div className="marquee-column relative overflow-hidden h-full">
                <div className="flex flex-col gap-4 animate-marquee-v-up-slow">
                  {[...column1, ...column1].map((item, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-white/10 group cursor-pointer flex-shrink-0 bg-neutral-900"
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover grayscale contrast-125 group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white font-mono px-2 py-1 bg-black/70 border border-white/20">
                          @Abynakoblyn
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Downward Slow */}
              <div className="marquee-column relative overflow-hidden h-full">
                <div className="flex flex-col gap-4 animate-marquee-v-down-slow">
                  {[...column2, ...column2].map((item, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-white/10 group cursor-pointer flex-shrink-0 bg-neutral-900"
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover grayscale contrast-125 group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white font-mono px-2 py-1 bg-black/70 border border-white/20">
                          @Abynakoblyn
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Upward Fast */}
              <div className="marquee-column relative overflow-hidden h-full">
                <div className="flex flex-col gap-4 animate-marquee-v-up-fast">
                  {[...column3, ...column3].map((item, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-white/10 group cursor-pointer flex-shrink-0 bg-neutral-900"
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover grayscale contrast-125 group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white font-mono px-2 py-1 bg-black/70 border border-white/20">
                          @Abynakoblyn
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 4: Downward Fast */}
              <div className="marquee-column relative overflow-hidden h-full">
                <div className="flex flex-col gap-4 animate-marquee-v-down-fast">
                  {[...column4, ...column4].map((item, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-white/10 group cursor-pointer flex-shrink-0 bg-neutral-900"
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover grayscale contrast-125 group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white font-mono px-2 py-1 bg-black/70 border border-white/20">
                          @Abynakoblyn
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
