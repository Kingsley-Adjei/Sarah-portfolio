"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";

// --- Carousel Context ---
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselApi = ReturnType<typeof useEmblaCarousel>[1];
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];
type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  autoplayDelay?: number;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

// --- Main Carousel Component ---
export const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      autoplayDelay = 3500,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const autoplayPlugin = React.useRef(
      Autoplay({ delay: autoplayDelay, stopOnInteraction: false, stopOnMouseEnter: true })
    );

    const combinedPlugins = plugins ? [autoplayPlugin.current, ...plugins] : [autoplayPlugin.current];

    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      combinedPlugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

// --- Carousel Content ---
export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden rounded-3xl">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

// --- Carousel Item ---
export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

// --- Carousel Controls (Positioned directly over the images) ---
export const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full border border-white/20 bg-black/70 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300 shadow-2xl cursor-pointer disabled:opacity-0 disabled:pointer-events-none",
        className
      )}
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full border border-white/20 bg-black/70 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300 shadow-2xl cursor-pointer disabled:opacity-0 disabled:pointer-events-none",
        className
      )}
      onClick={scrollNext}
      disabled={!canScrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

// --- Service Card Interface ---
export interface Service {
  number: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: React.ElementType;
  gradient?: string;
  image?: string;
  onClick?: () => void;
}

// Sub-component for individual cards
const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.08,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      onClick={service.onClick}
      className={cn(
        "relative flex h-[460px] w-full flex-col justify-between overflow-hidden rounded-3xl p-8 border border-white/10 group cursor-pointer shadow-2xl transition-all duration-500 hover:border-white/40",
        service.gradient || "bg-neutral-900"
      )}
    >
      {/* Background Image Layer */}
      {service.image && (
        <div className="absolute inset-0 z-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover grayscale contrast-125 brightness-[0.4] group-hover:scale-105 group-hover:brightness-[0.5] transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
      )}

      {/* Top Section: Small Subtitle Tag */}
      {service.subtitle && (
        <div className="relative z-10 flex items-center justify-start">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10">
            {service.subtitle}
          </span>
        </div>
      )}

      {/* Bottom Section: Title, Description & Link */}
      <div className="relative z-10 space-y-2 mt-auto">
        <h3 className="text-xl sm:text-2xl font-serif uppercase tracking-widest text-white leading-tight group-hover:text-neutral-200 transition-colors">
          {service.title}
        </h3>
        <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed line-clamp-3">
          {service.description}
        </p>

        <div className="pt-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
          <span>Explore Discipline</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
};

// Main exportable ServiceCarousel component
export const ServiceCarousel = ({
  services,
  onCardClick,
}: {
  services: Service[];
  onCardClick?: (service: Service) => void;
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div className="w-full max-w-7xl mx-auto relative px-2">
      <Carousel
        ref={ref}
        opts={{
          align: "start",
          loop: true,
        }}
        autoplayDelay={3500}
        className="relative"
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.1 }}
        >
          <CarouselContent>
            {services.map((service, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <ServiceCard
                    service={{
                      ...service,
                      onClick: () => onCardClick?.(service),
                    }}
                    index={index}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </motion.div>

        {/* Previous & Next Control Buttons floating directly over the pictures */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ServiceCarousel;
