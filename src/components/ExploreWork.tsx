import React from 'react';
import { ArrowUpRight, Film, Clapperboard, Video, Sparkles, Camera } from 'lucide-react';
import { ServiceCarousel, type Service } from '@/components/ui/services-card';

interface ExploreWorkProps {
  onViewPortfolioClick: () => void;
}

const services: Service[] = [
  {
    number: '01',
    title: 'DIRECTING',
    subtitle: 'NARRATIVE & FEATURE FILMS',
    description:
      'Commanding the set with high-contrast cinematography, precise staging, and intense character performance.',
    icon: Film,
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1600&auto=format&fit=crop',
  },
  {
    number: '02',
    title: 'SCREENWRITING',
    subtitle: 'SCRIPTS & TREATMENTS',
    description:
      'Developing sharp, nuanced feature screenplays, episodic series bibles, and original narrative treatments.',
    icon: Clapperboard,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1600&auto=format&fit=crop',
  },
  {
    number: '03',
    title: 'PERFORMANCE',
    subtitle: 'ON-SCREEN DRAMATIC ROLES',
    description:
      'Bringing raw emotion, physical vulnerability, and a commanding dramatic presence to every frame on screen.',
    icon: Video,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1600&auto=format&fit=crop',
  },
  {
    number: '04',
    title: 'PRODUCTION',
    subtitle: 'CREATIVE PRODUCING & LOGISTICS',
    description:
      'End-to-end creative producing, line management, location scouting, and festival distribution strategy worldwide.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1600&auto=format&fit=crop',
  },
  {
    number: '05',
    title: 'BEHIND THE SCENES',
    subtitle: 'SET PHOTOGRAPHY & RIGGING',
    description:
      'On-set lens calibration, high-contrast lighting configurations, and intimate directorial process captures.',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1600&auto=format&fit=crop',
  },
];

export default function ExploreWork({ onViewPortfolioClick }: ExploreWorkProps) {
  return (
    <section
      id="filmblog"
      className="py-24 md:py-36 px-6 md:px-12 bg-[#080808] border-t border-white/5 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.35em] text-neutral-400 font-semibold block">
              CINEMATIC ARCHIVE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif tracking-widest text-white uppercase leading-tight">
              Explore My Work
            </h2>
          </div>

          <button
            onClick={onViewPortfolioClick}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black text-xs uppercase tracking-[0.25em] font-semibold hover:bg-neutral-200 transition-colors shadow-lg cursor-pointer self-start md:self-auto"
          >
            <span>View Full Portfolio</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Service Carousel Component */}
        <ServiceCarousel
          services={services}
          onCardClick={() => onViewPortfolioClick()}
        />
      </div>
    </section>
  );
}
