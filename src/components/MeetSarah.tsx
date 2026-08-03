import { useState, useRef, useEffect } from 'react';
import Image from '@/components/ui/Image';
import { ArrowRight, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function MeetSarah() {
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (textRef.current && imageRef.current) {
        // Slide & fade left text column on scroll down and up
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );

        // Slide & fade right image column on scroll down and up
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: 40, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );

        // Portrait inner image parallax
        const img = imageRef.current.querySelector('.portrait-img-inner');
        if (img) {
          gsap.to(img, {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-36 px-6 md:px-12 bg-[#080808] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Biography Text */}
        <div ref={textRef} className="lg:col-span-6 flex flex-col justify-center space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-medium">MEET,</p>
            <h2 className="text-3xl sm:text-5xl font-serif tracking-widest text-white uppercase mt-1">
              SARAH ADJEI
            </h2>
          </div>

          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-light">
            Sarah Adjei is a filmmaker, screenwriter, and actress dedicated to carving out raw, visually arresting narratives. Navigating the intersection of delicate human emotion and bold storytelling, she brings a distinctive, moody aesthetic to both independent cinema and commercial screens. Whether directing behind the lens, drafting scripts, or performing, her creative mission remains unyielding: telling stories that linger.
          </p>

          <div>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center text-xs uppercase tracking-[0.25em] font-medium text-white hover:text-neutral-400 transition-colors py-2 group cursor-pointer"
            >
              <span>Read Director Statement</span>
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Right Column: High Contrast Portrait Image Frame */}
        <div ref={imageRef} className="lg:col-span-6">
          <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden border border-white/10 glass-panel shadow-2xl group">
            <div className="absolute inset-0 w-full h-[120%] -top-[10%] portrait-img-inner">
              <Image
                src="/images/sarah-portrait.webp"
                alt="Sarah Adjei (Abyna Koblyn) — Director, Screenwriter & Actress Portrait in Accra, Ghana"
                fill
                className="object-cover object-center grayscale contrast-125"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Expanded Philosophy / Bio Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#080808]/90 backdrop-blur-xl flex items-center justify-center p-6 sm:p-12 animate-in fade-in duration-300">
          <div className="max-w-2xl w-full bg-[#121212] border border-white/15 p-8 sm:p-12 relative shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white p-2 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-serif uppercase tracking-widest text-white mb-6">
              Director Statement & Philosophy
            </h3>

            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              <p>
                &ldquo;For me, cinema is a medium of raw vulnerability. Every frame is an opportunity to explore the complex, unspoken layers of human relationships and culture.&rdquo;
              </p>
              <p>
                &ldquo;I treat writing as building the soul of a project, directing as shaping its heartbeat, and acting as living its truth. It’s about creating art that challenges, resonates, and moves the audience long after the credits roll.&rdquo;
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="px-6 py-2 bg-white text-black text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Close Statement
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
