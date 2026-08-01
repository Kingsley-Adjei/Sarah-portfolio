import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export default function OnSetCollaborations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      id: 'shelly',
      quote:
        'Sarah is the definition of a modern multi-hyphenate. Whether she is shaping the script or guiding the lens, her collaborative spirit elevates every single frame we touch.',
      author: 'Shelly Annan',
      role: 'Producer & Collaborator',
      rating: 5,
    },
    {
      id: 'ama',
      quote:
        'I knew she was a force from our very first scene together. Whether she is in front of the lens delivering a raw performance or behind it guiding the crew, Sarah brings a magnetic energy that elevates everyone on set.',
      author: 'Ama Boateng',
      role: 'Lead Actress & Collaborator',
      rating: 5,
    },
    {
      id: 'david',
      quote:
        'I knew she was a rare talent when I first read her treatment. Sarah writes with a deep psychological complexity and directs with an absolute visual authority that commands the screen.',
      author: 'David Mensah',
      role: 'Creative Director',
      rating: 5,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-36 px-6 md:px-12 bg-[#080808] border-t border-white/5 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-5xl font-serif tracking-widest text-white uppercase">
            On-Set Collaborations
          </h2>
          <div className="w-16 h-[2px] bg-white/30 mt-4" />
        </div>

        {/* Testimonials Marquee */}
        <div
          ref={containerRef}
          className="group -mx-6 md:-mx-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <div className="flex w-max px-6 md:px-12 animate-marquee group-hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="w-[300px] sm:w-[360px] md:w-[420px] shrink-0 border-l border-white/10 pl-8 md:pl-10 pr-6 md:pr-8"
              >
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < item.rating ? 'fill-white text-white' : 'text-white/20'}
                    />
                  ))}
                </div>

                <p className="text-sm sm:text-[15px] leading-relaxed font-light text-neutral-300">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 mt-7">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-xs font-semibold tracking-wide text-white">
                    {initials(item.author)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.author}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
