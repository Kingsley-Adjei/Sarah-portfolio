import Image from '@/components/ui/Image';

export default function InstagramFeed() {
  const images = [
    { src: '/images/sarah-portrait.png', alt: 'Sarah Adjei camera rigging' },
    { src: '/images/hero-set.png', alt: 'Film set monitors' },
    { src: '/images/screenplay.png', alt: 'Screenplay draft desk' },
    { src: '/images/performance.png', alt: 'Dramatic scene frame' },
    { src: '/images/cine-lens.png', alt: 'Cine camera lens' },
    { src: '/images/bts-slate.png', alt: 'Clapperboard slate' },
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Title Column */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-serif tracking-widest text-white uppercase">
            Follow My Journey
          </h2>
          <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">
            Follow @Abynakoblyn
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-xs uppercase tracking-[0.25em] py-3 px-6 border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 font-medium"
          >
            Visit Instagram
          </a>
        </div>

        {/* 6-Grid Image Collage */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((item, idx) => (
            <div
              key={idx}
              className="relative aspect-square rounded-sm overflow-hidden border border-white/10 group cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover grayscale contrast-125 group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white font-medium border border-white/30 px-3 py-1 bg-black/60">
                  @Abynakoblyn
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
