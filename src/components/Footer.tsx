import React from 'react';
import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavClick: (id: string) => void;
}

// Custom X (Twitter) SVG Icon
const XIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Custom WhatsApp SVG Icon
const WhatsAppIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 2.159.686 4.158 1.854 5.795L2.5 21.5l3.856-1.31A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.748 0-3.371-.478-4.767-1.309l-.342-.203-2.288.778.791-2.23-.223-.355C4.28 15.297 3.75 13.705 3.75 12c0-4.549 3.701-8.25 8.25-8.25s8.25 3.701 8.25 8.25S16.549 20 12 20z" />
  </svg>
);

export default function Footer({ onNavClick }: FooterProps) {
  return (
    <footer className="bg-[#050505] text-white py-16 sm:py-20 px-6 md:px-12 border-t border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-10 sm:space-y-12">
        {/* Brand Headline */}
        <div className="space-y-2">
          <h3 className="font-serif tracking-widest text-2xl sm:text-4xl font-medium uppercase text-white">
            ABYNA KOBLYN
          </h3>
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-neutral-400 font-mono">
            SARAH ADJEI &bull; FILMMAKER, DIRECTRESS & SCREENWRITER
          </p>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs uppercase tracking-[0.25em] font-medium">
          <button
            onClick={() => onNavClick('home')}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer py-1"
          >
            Home
          </button>
          <button
            onClick={() => onNavClick('about')}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer py-1"
          >
            About
          </button>
          <button
            onClick={() => onNavClick('portfolio')}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer py-1"
          >
            Portfolio
          </button>
          <button
            onClick={() => onNavClick('contact')}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer py-1"
          >
            Contact
          </button>
        </nav>

        {/* Contact Info Row */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-8 text-xs text-neutral-400 border-y border-white/5 py-6 w-full max-w-4xl">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-white/80" />
            <span>Accra, Ghana</span>
          </div>

          <a
            href="mailto:Abena_koblyn@gmail.com"
            className="flex items-center space-x-2 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4 text-white/80" />
            <span>Abena_koblyn@gmail.com</span>
          </a>

          <a
            href="https://wa.me/233277233774"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4 text-white/80" />
            <span>+233 27 723 3774</span>
          </a>
        </div>

        {/* Real Social Icons Row */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 text-neutral-400">
          {/* WhatsApp */}
          <a
            href="https://wa.me/233277233774"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 rounded-full bg-neutral-900 border border-white/10 hover:border-white/30 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer group"
            aria-label="WhatsApp Sarah Adjei (+233 27 723 3774)"
            title="Chat on WhatsApp (+233 27 723 3774)"
          >
            <WhatsAppIcon className="w-5 h-5 group-hover:scale-110 transition-transform text-white" />
            <span className="hidden sm:inline text-xs font-mono tracking-widest uppercase text-neutral-300 group-hover:text-white">
              WhatsApp
            </span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/abynakoblyn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 rounded-full bg-neutral-900 border border-white/10 hover:border-white/30 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer group"
            aria-label="Instagram @abynakoblyn"
            title="Instagram @abynakoblyn"
          >
            <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform text-white" />
            <span className="hidden sm:inline text-xs font-mono tracking-widest uppercase text-neutral-300 group-hover:text-white">
              Instagram
            </span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/abyna-koblyn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 rounded-full bg-neutral-900 border border-white/10 hover:border-white/30 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer group"
            aria-label="LinkedIn Abyna Koblyn"
            title="LinkedIn - Abyna Koblyn"
          >
            <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform text-white" />
            <span className="hidden sm:inline text-xs font-mono tracking-widest uppercase text-neutral-300 group-hover:text-white">
              LinkedIn
            </span>
          </a>

          {/* X (Twitter) */}
          <a
            href="https://x.com/abynakoblyn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 rounded-full bg-neutral-900 border border-white/10 hover:border-white/30 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer group"
            aria-label="X @abynakoblyn"
            title="X (Twitter) @abynakoblyn"
          >
            <XIcon className="w-4 h-4 group-hover:scale-110 transition-transform text-white" />
            <span className="hidden sm:inline text-xs font-mono tracking-widest uppercase text-neutral-300 group-hover:text-white">
              X (Twitter)
            </span>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-neutral-400 pt-6 border-t border-white/5 w-full">
          © {new Date().getFullYear()} SARAH ADJEI / ABYNA KOBLYN. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
