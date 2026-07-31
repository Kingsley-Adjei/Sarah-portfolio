import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function OnSetCollaborations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (containerRef.current) {
        const cards = Array.from(containerRef.current.children);
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.15,
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
      cardStyle: 'bg-[#181818] text-white border-white/10',
    },
    {
      id: 'ama',
      quote:
        'I knew she was a force from our very first scene together. Whether she is in front of the lens delivering a raw performance or behind it guiding the crew, Sarah brings a magnetic energy that elevates everyone on set.',
      author: 'Ama Boateng',
      role: 'Lead Actress & Collaborator',
      cardStyle: 'bg-[#1a1a1a] text-white border-white/20 shadow-2xl scale-102',
    },
    {
      id: 'david',
      quote:
        'I knew she was a rare talent when I first read her treatment. Sarah writes with a deep psychological complexity and directs with an absolute visual authority that commands the screen.',
      author: 'David Mensah',
      role: 'Creative Director',
      cardStyle: 'bg-[#141414] text-white border-white/10',
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

        {/* Testimonials Editorial Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className={`p-8 md:p-10 rounded-sm border flex flex-col justify-between space-y-8 transition-transform duration-500 hover:-translate-y-2 hover-glow ${item.cardStyle}`}
            >
              <div className="space-y-4">
                <span className="font-serif text-4xl text-neutral-500 leading-none">&ldquo;</span>
                <p className="text-sm sm:text-base leading-relaxed font-light text-neutral-200">
                  {item.quote}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-xs uppercase tracking-[0.25em] font-semibold text-white">
                  — {item.author}
                </p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 mt-1">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
