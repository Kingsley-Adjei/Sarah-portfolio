import React, { useState, useEffect, useRef } from 'react';
import { AnimatedFolder, FolderProject } from '@/components/ui/3d-folder';
import { MorphingCardStack } from '@/components/ui/morphing-card-stack';
import { Film, Clapperboard, Video, Sparkles, ArrowUpRight } from 'lucide-react';
import { getLenis } from '@/components/LenisProvider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface PortfolioScreenProps {
  onContactClick: () => void;
}

interface PortfolioCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    role: string;
    year: string;
    youtubeUrl?: string;
  }>;
}

const portfolioCategories: PortfolioCategory[] = [
  {
    id: 'directing',
    title: 'Directing',
    description: 'Narrative feature films, high-concept short films, and dramatic visual storytelling.',
    icon: <Film className="w-5 h-5 text-white" />,
    projects: [
      {
        id: 'dir-1',
        title: 'Whispers in the Wind (Official Trailer)',
        description: 'An atmospheric drama exploring memory, loss, and redemption in a coastal fishing village.',
        image: 'https://img.youtube.com/vi/VP3XJtT3xNo/maxresdefault.jpg',
        role: 'Director / Co-Writer',
        year: '2025',
        youtubeUrl: 'https://youtu.be/VP3XJtT3xNo',
      },
      {
        id: 'dir-2',
        title: 'Echoes of Silence',
        description: 'A neo-noir psychological thriller centered on an archivist unearthing forgotten audio recordings.',
        image: '/images/directing-2.webp',
        role: 'Director',
        year: '2025',
      },
      {
        id: 'dir-3',
        title: 'Chasing Shadows',
        description: 'A visually arresting documentary on underground performers surviving in modern metropolises.',
        image: '/images/directing-3.webp',
        role: 'Director / Cinematographer',
        year: '2024',
      },
      {
        id: 'dir-4',
        title: 'Fragments of Time',
        description: 'Experimental surrealist short exploring distorted timelines and nostalgic memories.',
        image: '/images/directing-4.webp',
        role: 'Director',
        year: '2024',
      },
      {
        id: 'dir-5',
        title: 'Midnight Monologues',
        description: 'Intimate character study examining isolation and connection across urban landscapes.',
        image: '/images/directing-5.webp',
        role: 'Director',
        year: '2024',
      },
      {
        id: 'dir-6',
        title: 'Nocturne in Blue',
        description: 'Stylized noir short exploring late-night confessions and hidden identities.',
        image: '/images/directing-6.webp',
        role: 'Director',
        year: '2023',
      },
      {
        id: 'dir-7',
        title: 'Tides of Grace',
        description: 'Poetic documentary capturing coastal heritage and generational storytelling.',
        image: '/images/directing-7.webp',
        role: 'Director',
        year: '2023',
      },
      {
        id: 'dir-8',
        title: 'Beyond the Frame',
        description: 'Behind-the-camera visual study on framing, light, and performance dynamics.',
        image: '/images/directing-8.webp',
        role: 'Director',
        year: '2023',
      },
      {
        id: 'dir-9',
        title: 'Silhouettes at Dusk',
        description: 'Anamorphic short film exploring twilight mood and unspoken subtext.',
        image: '/images/directing-9.webp',
        role: 'Director',
        year: '2022',
      },
      {
        id: 'dir-10',
        title: 'The Unseen Journey',
        description: 'Visual reel capturing directorial highlights across independent feature productions.',
        image: '/images/directing-10.webp',
        role: 'Director',
        year: '2022',
      },
    ],
  },
  {
    id: 'writing',
    title: 'Screenwriting',
    description: 'Character-driven feature screenplays, episodic series bibles, and original narrative treatments.',
    icon: <Clapperboard className="w-5 h-5 text-white" />,
    projects: [
      {
        id: 'writ-1',
        title: 'Beyond the Horizon',
        description: 'Feature screenplay about a rogue astronomer tracking an anomaly off the coast of West Africa.',
        image: '/images/screenwriting-1.webp',
        role: 'Screenwriter',
        year: '2025',
      },
      {
        id: 'writ-2',
        title: 'The Midnight Monologues',
        description: 'An anthology series chronicling interconnected midnight encounters across major international cities.',
        image: '/images/screenwriting-2.webp',
        role: 'Creator & Lead Writer',
        year: '2024',
      },
      {
        id: 'writ-3',
        title: 'Velvet Noir',
        description: 'Period drama script focusing on 1960s photojournalists during political transformation.',
        image: '/images/screenwriting-3.webp',
        role: 'Screenwriter',
        year: '2023',
      },
      {
        id: 'writ-4',
        title: 'Echoes of the Coast',
        description: 'Character study feature treatment depicting generational storytelling and unspoken heritage.',
        image: '/images/screenwriting-4.webp',
        role: 'Screenwriter',
        year: '2023',
      },
    ],
  },
  {
    id: 'acting',
    title: 'Performance',
    description: 'On-screen dramatic roles, voiceover performances, and physically demanding character studies.',
    icon: <Video className="w-5 h-5 text-white" />,
    projects: [
      {
        id: 'act-1',
        title: 'A Silent Plea (Official Trailer)',
        description: 'Lead dramatic role portraying Maya, a determined investigative officer facing moral dilemmas.',
        image: 'https://img.youtube.com/vi/VP3XJtT3xNo/maxresdefault.jpg',
        role: 'Lead Actress (Maya)',
        year: '2024',
        youtubeUrl: 'https://youtu.be/VP3XJtT3xNo',
      },
      {
        id: 'act-2',
        title: 'Behind the Glass',
        description: 'Supporting role in a psychological chamber drama focusing on confinement and truth.',
        image: '/images/performance-2.webp',
        role: 'Supporting Role (Clara)',
        year: '2024',
      },
      {
        id: 'act-3',
        title: 'The Interrogation',
        description: 'Tense two-character thriller piece executed in real-time camera tracking.',
        image: '/images/performance-3.webp',
        role: 'Lead Role (Detective Cole)',
        year: '2023',
      },
      {
        id: 'act-4',
        title: 'Echoes of Desire',
        description: 'Intense emotional study portraying a pianist grappling with creative identity.',
        image: '/images/performance-4.webp',
        role: 'Lead Actress',
        year: '2023',
      },
      {
        id: 'act-5',
        title: 'Solitude in Solace',
        description: 'Monodrama performance focusing on grief, memory, and personal resilience.',
        image: '/images/performance-5.webp',
        role: 'Solo Performance',
        year: '2023',
      },
      {
        id: 'act-6',
        title: 'Shadows of Gold',
        description: 'Period drama piece exploring family legacy and societal expectations.',
        image: '/images/performance-6.webp',
        role: 'Lead Role',
        year: '2023',
      },
      {
        id: 'act-7',
        title: 'The Final Soliloquy',
        description: 'Dramatic stage-to-screen adaptation of classic monologue work.',
        image: '/images/performance-7.webp',
        role: 'Lead Performer',
        year: '2022',
      },
      {
        id: 'act-8',
        title: 'Whispers of Dawn',
        description: 'Character piece following a woman navigating urban transformation.',
        image: '/images/performance-8.webp',
        role: 'Lead Role',
        year: '2022',
      },
      {
        id: 'act-9',
        title: 'Nocturnal Echoes',
        description: 'Experimental acting reel showcasing raw emotional range and vocal depth.',
        image: '/images/performance-9.webp',
        role: 'Lead Role',
        year: '2022',
      },
      {
        id: 'act-10',
        title: 'Crossroads',
        description: 'Short dramatic study examining choices and moral conviction.',
        image: '/images/performance-10.webp',
        role: 'Lead Actress',
        year: '2021',
      },
      {
        id: 'act-11',
        title: 'The Last Gesture',
        description: 'Nuanced physical theatre performance recorded live on location.',
        image: '/images/performance-11.webp',
        role: 'Lead Performer',
        year: '2021',
      },
    ],
  },
  {
    id: 'production',
    title: 'Production',
    description: 'End-to-end creative producing, line management, location scouting, and festival distribution strategy.',
    icon: <Sparkles className="w-5 h-5 text-white" />,
    projects: [
      {
        id: 'prod-1',
        title: 'Golden Hour Productions (Official Trailer)',
        description: 'Executive produced a 6-part mini series filmed across 3 international locations.',
        image: 'https://img.youtube.com/vi/VP3XJtT3xNo/maxresdefault.jpg',
        role: 'Executive Producer',
        year: '2025',
        youtubeUrl: 'https://youtu.be/VP3XJtT3xNo',
      },
      {
        id: 'prod-2',
        title: 'City Lights Narrative',
        description: 'Overseeing complete physical production logistics, crew assembly, and post-production workflows.',
        image: '/images/production-2.webp',
        role: 'Producer',
        year: '2024',
      },
      {
        id: 'prod-3',
        title: 'Unseen Cinema Initiative',
        description: 'Curating independent film showcases and funding mentorship grants for emerging voices.',
        image: '/images/production-3.webp',
        role: 'Creative Producer',
        year: '2024',
      },
      {
        id: 'prod-4',
        title: 'Coastal Horizons Shoot',
        description: 'Line producing complex water-based shoots and remote equipment logistics.',
        image: '/images/production-4.webp',
        role: 'Line Producer',
        year: '2023',
      },
      {
        id: 'prod-5',
        title: 'African Cinema Distribution',
        description: 'Developing festival strategy and theatrical rollouts across West Africa and Europe.',
        image: '/images/production-5.webp',
        role: 'Producer & Strategist',
        year: '2023',
      },
    ],
  },
  {
    id: 'bts',
    title: 'Behind The Scenes',
    description: 'On-set photography, anamorphic camera rigging, lighting setups, and directorial process documentation.',
    icon: <Film className="w-5 h-5 text-white" />,
    projects: [
      {
        id: 'bts-1',
        title: 'Anamorphic Rigging & Reel (Video)',
        description: 'Documenting 35mm anamorphic lens calibration and heavy lighting rigs on set.',
        image: '/images/bts-1.webp',
        role: 'BTS Director & Photographer',
        year: '2025',
        youtubeUrl: '/images/bts-blaco-video.mp4',
      },
      {
        id: 'bts-2',
        title: 'Directing the Ensemble',
        description: 'Intimate candid captures of scene blockings and director-actor collaborations.',
        image: '/images/bts-2.webp',
        role: 'BTS Photographer',
        year: '2024',
      },
      {
        id: 'bts-3',
        title: 'Night Shoot Logistics',
        description: 'High-contrast nocturnal set photography showing atmosphere and crew dedication.',
        image: '/images/bts-3.webp',
        role: 'BTS Photographer',
        year: '2024',
      },
      {
        id: 'bts-4',
        title: 'Location Scouting Stills',
        description: 'Architectural and landscape scouting documentation prior to principal photography.',
        image: '/images/bts-4.webp',
        role: 'BTS Photographer',
        year: '2023',
      },
    ],
  },
];

export default function PortfolioScreen({ onContactClick }: PortfolioScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory | null>(null);

  // Lock background body scroll & pause Lenis when modal overlay is open
  useEffect(() => {
    const lenis = getLenis();
    if (activeCategory) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [activeCategory]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reveal-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        '.folder-card-wrapper',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.folder-grid',
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#080808] text-white min-h-screen pt-28 pb-20 px-6 md:px-12 relative overflow-x-hidden">
      {/* 1. Header Hero Area */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-20 reveal-header">
        <div className="lg:col-span-8 space-y-4">
          <h1 className="text-4xl sm:text-7xl font-serif tracking-widest text-white uppercase leading-[1.05]">
            PORTFOLIO
          </h1>
          <p className="text-xl sm:text-3xl font-serif italic text-neutral-400">
            Directed by Sarah Adjei
          </p>
          <p className="max-w-2xl text-neutral-400 text-sm sm:text-base leading-relaxed font-light mt-4">
            A curated collection of cinematic works spanning directing, screenwriting, performance, and behind-the-scenes photography. Select a folder to view film details and trailers.
          </p>
        </div>

        <div className="lg:col-span-4 relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 grayscale contrast-125 shadow-2xl">
          <img
            src="/images/portfolio-hero.webp"
            alt="Sarah Adjei (Abyna Koblyn) — Director Portfolio Archive & Narrative Feature Films"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1600&auto=format&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
      </section>

      {/* 2. 3D Folders Grid Section */}
      <section className="max-w-7xl mx-auto space-y-12 border-t border-white/10 pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-neutral-400 font-semibold block mb-1">DISCIPLINES</span>
            <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-wider text-white">
              Explore By Category
            </h2>
          </div>
        </div>

        {/* 3D Folders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 folder-grid">
          {portfolioCategories.map((category) => {
            const folderProjects: FolderProject[] = category.projects.map((p) => ({
              id: p.id,
              title: p.title,
              image: p.image,
            }));

            return (
              <div key={category.id} className="folder-card-wrapper flex flex-col items-center">
                <AnimatedFolder
                  title={category.title}
                  projects={folderProjects}
                  onFolderClick={() => setActiveCategory(category)}
                  className="w-full"
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Fullscreen Morphing Catalog Overlay Modal (Click outside to dismiss, no close button) */}
      {activeCategory && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 flex flex-col items-center justify-start p-4 md:p-10 bg-black/95 backdrop-blur-2xl overflow-y-auto max-h-screen animate-in fade-in duration-300 cursor-pointer"
          onClick={() => setActiveCategory(null)}
        >
          {/* Header Bar */}
          <div
            className="w-full max-w-5xl flex items-center justify-between py-4 mb-4 border-b border-white/10 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              {activeCategory.icon}
              <div>
                <h2 className="text-xl md:text-2xl font-serif uppercase tracking-widest text-white">
                  {activeCategory.title}
                </h2>
                <p className="text-xs text-neutral-400 font-light">{activeCategory.description}</p>
              </div>
            </div>
          </div>

          {/* Morphing Card Stack Component */}
          <div
            className="w-full max-w-5xl py-4 my-auto cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <MorphingCardStack
              cards={activeCategory.projects.map((p) => ({
                id: p.id,
                title: p.title,
                description: p.description,
                image: p.image,
                role: p.role,
                year: p.year,
                youtubeUrl: p.youtubeUrl,
              }))}
              defaultLayout="list"
            />
          </div>
        </div>
      )}

      {/* 3. Bottom CTA Section */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-white/10 mt-28">
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-neutral-400 font-semibold block">COLLABORATIONS</span>
          <h3 className="font-serif tracking-widest text-3xl sm:text-5xl text-white uppercase leading-tight">
            LET&apos;S CREATE <br />
            SOMETHING <br />
            BEAUTIFUL TOGETHER
          </h3>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
            Every memorable film begins with a shared vision. Whether you have an early-stage screenplay that needs a distinctive visual direction, a brand narrative waiting to be brought to life, or a commercial project seeking a sharp creative touch—I am always eager to collaborate with passionate storytellers, production companies, and agencies worldwide.
          </p>
          <button
            onClick={onContactClick}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.25em] font-semibold hover:bg-neutral-200 transition-all rounded-none cursor-pointer shadow-lg hover:scale-105"
          >
            <span>Get In Touch</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
