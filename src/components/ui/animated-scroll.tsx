import React, { useState, useEffect, useRef } from 'react';

const pages = [
  {
    leftBgImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&auto=format&fit=crop&q=80',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      heading: 'SARAH ADJEI',
      description: 'Framing Stories That Linger. Director, Writer, Actress.',
    },
  },
  {
    leftBgImage: null,
    rightBgImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80',
    leftContent: {
      heading: 'MEET SARAH',
      description: 'Filmmaker and screenwriter bringing raw emotion and high contrast aesthetics to global cinema.',
    },
    rightContent: null,
  },
  {
    leftBgImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop&q=80',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      heading: 'SCREENWRITING',
      description: 'Developing sharp, nuanced screenplays that give voice to complex human narratives.',
    },
  },
  {
    leftBgImage: null,
    rightBgImage: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=1200&auto=format&fit=crop&q=80',
    leftContent: {
      heading: 'PERFORMANCE',
      description: 'Embodying intense psychological depth and authentic presence on screen.',
    },
    rightContent: null,
  },
  {
    leftBgImage: 'https://images.unsplash.com/photo-1512790182412-b19e6d61b397?w=1200&auto=format&fit=crop&q=80',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      heading: 'LET’S COLLABORATE',
      description: (
        <span className="text-sm font-light tracking-wider">
          Available for international directing, screenwriting, and commercial bookings.
        </span>
      ),
    },
  },
];

export default function ScrollAdventure() {
  const [currentPage, setCurrentPage] = useState(1);
  const numOfPages = pages.length;
  const animTime = 1000;
  const scrolling = useRef(false);

  const navigateUp = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  const navigateDown = () => {
    if (currentPage < numOfPages) setCurrentPage(p => p + 1);
  };

  const handleWheel = (e: WheelEvent) => {
    if (scrolling.current) return;
    scrolling.current = true;
    e.deltaY > 0 ? navigateDown() : navigateUp();
    setTimeout(() => (scrolling.current = false), animTime);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (scrolling.current) return;
    if (e.key === 'ArrowUp') {
      scrolling.current = true;
      navigateUp();
      setTimeout(() => (scrolling.current = false), animTime);
    } else if (e.key === 'ArrowDown') {
      scrolling.current = true;
      navigateDown();
      setTimeout(() => (scrolling.current = false), animTime);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage]);

  return (
    <div className="relative overflow-hidden h-screen bg-black">
      {pages.map((page, i) => {
        const idx = i + 1;
        const isActive = currentPage === idx;
        const upOff = 'translateY(-100%)';
        const downOff = 'translateY(100%)';
        const leftTrans = isActive ? 'translateY(0)' : downOff;
        const rightTrans = isActive ? 'translateY(0)' : upOff;

        return (
          <div key={idx} className="absolute inset-0">
            {/* Left Half */}
            <div
              className="absolute top-0 left-0 w-1/2 h-full transition-transform duration-[1000ms]"
              style={{ transform: leftTrans }}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat relative"
                style={{ backgroundImage: page.leftBgImage ? `url(${page.leftBgImage})` : undefined }}
              >
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-8">
                  {page.leftContent && (
                    <>
                      <h2 className="text-3xl font-serif uppercase tracking-widest mb-4 text-center">
                        {page.leftContent.heading}
                      </h2>
                      <p className="text-base text-neutral-300 font-light text-center max-w-md">
                        {page.leftContent.description}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Half */}
            <div
              className="absolute top-0 left-1/2 w-1/2 h-full transition-transform duration-[1000ms]"
              style={{ transform: rightTrans }}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat relative"
                style={{ backgroundImage: page.rightBgImage ? `url(${page.rightBgImage})` : undefined }}
              >
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-8">
                  {page.rightContent && (
                    <>
                      <h2 className="text-3xl font-serif uppercase tracking-widest mb-4 text-center">
                        {page.rightContent.heading}
                      </h2>
                      {typeof page.rightContent.description === 'string' ? (
                        <p className="text-base text-neutral-300 font-light text-center max-w-md">
                          {page.rightContent.description}
                        </p>
                      ) : (
                        <div className="text-base text-neutral-300 font-light text-center max-w-md">
                          {page.rightContent.description}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Slide Navigation Dots */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col space-y-3">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              currentPage === i + 1 ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
