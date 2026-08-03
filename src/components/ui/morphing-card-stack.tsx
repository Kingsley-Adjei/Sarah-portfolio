"use client"

import React, { useState, useEffect, type ReactNode } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { cn } from "@/lib/utils"
import { Grid3X3, LayoutList, Play, ExternalLink, Film } from "lucide-react"
import { getLenis } from "@/components/LenisProvider"

export type LayoutMode = "list" | "grid"

export interface CardData {
  id: string
  title: string
  description: string
  icon?: ReactNode
  color?: string
  image?: string
  role?: string
  year?: string
  youtubeUrl?: string
}

export interface MorphingCardStackProps {
  cards?: CardData[]
  className?: string
  defaultLayout?: LayoutMode
  onCardClick?: (card: CardData) => void
  onCloseOverlay?: () => void
}

const layoutIcons = {
  list: LayoutList,
  grid: Grid3X3,
}

export function MorphingCardStack({
  cards = [],
  className,
  defaultLayout = "list",
  onCardClick,
  onCloseOverlay,
}: MorphingCardStackProps) {
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout)
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null)
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null)

  // Prevent background scroll & pause Lenis when card details or video is open
  useEffect(() => {
    const lenis = getLenis()
    if (expandedCardId || activeVideoUrl) {
      document.body.style.overflow = "hidden"
      lenis?.stop()
    } else {
      document.body.style.overflow = ""
      lenis?.start()
    }
    return () => {
      document.body.style.overflow = ""
      lenis?.start()
    }
  }, [expandedCardId, activeVideoUrl])

  if (!cards || cards.length === 0) {
    return null
  }

  const containerStyles = {
    grid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl",
    list: "flex flex-col gap-4 w-full max-w-3xl",
  }

  const activeExpandedCard = cards.find((c) => c.id === expandedCardId)

  return (
    <div className={cn("space-y-6 w-full flex flex-col items-center", className)}>
      {/* Header Controls & Layout Mode Switcher */}
      <div className="flex items-center justify-between w-full max-w-5xl px-2">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-white" />
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
            {cards.length} Works Catalog
          </span>
        </div>

        <div className="flex items-center gap-1 bg-neutral-900/90 p-1 border border-white/15 backdrop-blur-md">
          {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
            const Icon = layoutIcons[mode]
            return (
              <button
                key={mode}
                onClick={(e) => {
                  e.stopPropagation()
                  setLayout(mode)
                }}
                className={cn(
                  "px-3 py-1.5 text-xs font-serif uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer",
                  layout === mode
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-neutral-400 hover:text-white hover:bg-white/10",
                )}
                aria-label={`Switch to ${mode} layout`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="capitalize">{mode}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Smooth Animated Cards Container */}
      <LayoutGroup>
        <motion.div layout className={cn(containerStyles[layout], "mx-auto w-full")}>
          <AnimatePresence mode="popLayout">
            {cards.map((card) => {
              const isExpanded = expandedCardId === card.id

              return (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: isExpanded ? 1.02 : 1,
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 28,
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setExpandedCardId(card.id)
                    onCardClick?.(card)
                  }}
                  className={cn(
                    "group relative overflow-hidden border border-white/10 bg-neutral-900/90 shadow-xl backdrop-blur-md transition-all duration-300 cursor-pointer",
                    "hover:border-white/40 hover:shadow-white/5",
                    layout === "grid" && "w-full aspect-[4/3]",
                    layout === "list" && "w-full flex items-center p-4",
                  )}
                  style={{
                    backgroundColor: card.color || undefined,
                  }}
                >
                  {/* Grid Layout View */}
                  {layout === "grid" ? (
                    <>
                      {card.image && (
                        <div className="absolute inset-0 z-0">
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                        </div>
                      )}
                      <div className="relative z-10 p-5 flex flex-col justify-between h-full">
                        <div className="flex items-start justify-between">
                          {card.year && (
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/90 px-2 py-0.5 bg-black/70 backdrop-blur-md border border-white/10">
                              {card.year}
                            </span>
                          )}
                          {card.youtubeUrl && (
                            <span className="p-2 bg-white text-black backdrop-blur-md shadow-md">
                              <Play className="w-3.5 h-3.5 fill-current" />
                            </span>
                          )}
                        </div>

                        <div className="space-y-1 mt-auto">
                          {card.role && (
                            <span className="text-[10px] uppercase tracking-widest text-neutral-300 font-medium block">
                              {card.role}
                            </span>
                          )}
                          <h3 className="font-serif text-lg tracking-wide text-white leading-tight">{card.title}</h3>
                          <p className="text-xs text-neutral-300 line-clamp-2 font-light">{card.description}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* List Layout View */
                    <div className="relative z-10 flex items-center justify-between w-full gap-4">
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        {card.image && (
                          <div className="w-16 h-16 sm:w-20 sm:h-20 overflow-hidden flex-shrink-0 border border-white/10">
                            <img
                              src={card.image}
                              alt={card.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-serif tracking-wider text-base text-white truncate">{card.title}</h3>
                            {card.year && (
                              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-white/10 text-neutral-300 border border-white/10">
                                {card.year}
                              </span>
                            )}
                          </div>
                          {card.role && <p className="text-xs text-neutral-300 font-medium mt-0.5">{card.role}</p>}
                          <p className="text-xs text-neutral-400 line-clamp-2 sm:line-clamp-1 mt-1 font-light">
                            {card.description}
                          </p>
                        </div>
                      </div>

                      {card.youtubeUrl && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveVideoUrl(card.youtubeUrl || null)
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 bg-white text-black text-xs uppercase tracking-[0.2em] font-semibold hover:bg-neutral-200 transition-all flex-shrink-0 cursor-pointer shadow-md"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Trailer</span>
                        </button>
                      )}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Fullscreen Expanded Card Modal - Click outside to dismiss (no close button) */}
      <AnimatePresence>
        {activeExpandedCard && (
          <div
            data-lenis-prevent
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300 cursor-pointer overflow-y-auto"
            onClick={() => setExpandedCardId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-4xl w-full bg-neutral-950 border border-white/15 overflow-hidden shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-7 relative aspect-video md:aspect-auto min-h-[300px]">
                  {activeExpandedCard.image && (
                    <img
                      src={activeExpandedCard.image}
                      alt={activeExpandedCard.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent md:hidden" />
                </div>

                <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between space-y-6">
                  <div>
                    {activeExpandedCard.year && (
                      <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
                        {activeExpandedCard.year} &bull; {activeExpandedCard.role || "Cinematic Work"}
                      </span>
                    )}
                    <h2 className="text-2xl md:text-3xl font-serif text-white uppercase tracking-wider">
                      {activeExpandedCard.title}
                    </h2>
                    <div className="w-12 h-[1px] bg-white/30 my-4" />
                    <p className="text-neutral-300 text-sm leading-relaxed font-light">
                      {activeExpandedCard.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    {activeExpandedCard.youtubeUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveVideoUrl(activeExpandedCard.youtubeUrl || null)
                        }}
                        className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-white text-black font-semibold text-xs uppercase tracking-[0.25em] hover:bg-neutral-200 transition-colors shadow-lg cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Watch Film Trailer</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Video Lightbox Player Modal - Click outside to dismiss (no close button) */}
      <AnimatePresence>
        {activeVideoUrl && (
          <div
            data-lenis-prevent
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300 cursor-pointer"
            onClick={() => setActiveVideoUrl(null)}
          >
            <div
              className="relative w-full max-w-5xl aspect-video overflow-hidden border border-white/15 shadow-2xl bg-black cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                if (!activeVideoUrl) return null;

                const isLocalVideo =
                  activeVideoUrl.endsWith(".mp4") ||
                  activeVideoUrl.endsWith(".webm") ||
                  activeVideoUrl.endsWith(".mov") ||
                  activeVideoUrl.includes(".mp4");

                if (isLocalVideo) {
                  return (
                    <video
                      src={activeVideoUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-contain bg-black"
                    >
                      Your browser does not support the video tag.
                    </video>
                  );
                }

                if (
                  activeVideoUrl.includes("youtube.com") ||
                  activeVideoUrl.includes("youtu.be")
                ) {
                  let embedUrl = activeVideoUrl;
                  if (activeVideoUrl.includes("youtu.be/")) {
                    const videoId = activeVideoUrl.split("youtu.be/")[1]?.split("?")[0];
                    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                  } else if (activeVideoUrl.includes("watch?v=")) {
                    const videoId = activeVideoUrl.split("watch?v=")[1]?.split("&")[0];
                    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                  } else if (!activeVideoUrl.includes("embed/")) {
                    embedUrl = activeVideoUrl.replace("watch?v=", "embed/").concat("?autoplay=1");
                  }

                  return (
                    <iframe
                      src={embedUrl}
                      title="Film Trailer"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  );
                }

                return (
                  <div className="flex flex-col items-center justify-center h-full space-y-4 p-8 text-center">
                    <Film className="w-16 h-16 text-white animate-pulse" />
                    <h3 className="text-xl font-serif text-white uppercase tracking-wider">Official Film Preview</h3>
                    <a
                      href={activeVideoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold text-xs uppercase tracking-[0.25em] hover:bg-neutral-200 transition-colors"
                    >
                      <span>Open Link</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MorphingCardStack
