import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavClick: (id: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  return (
    <footer className="bg-[#050505] text-white py-16 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-10">
        {/* Brand Name */}
        <div>
          <h3 className="font-serif tracking-widest text-2xl sm:text-3xl font-medium uppercase">
            ABENA KOBLYN
          </h3>
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 mt-1">
            SARAH ADJEI FILMMAKING & SCREENWRITING
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-8 text-xs uppercase tracking-[0.25em]">
          <button
            onClick={() => onNavClick('home')}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => onNavClick('about')}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => onNavClick('portfolio')}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            Portfolio
          </button>
          <button
            onClick={() => onNavClick('contact')}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Contact info row */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs text-neutral-400">
          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-white" />
            <span>Accra, Ghana</span>
          </div>
          <a
            href="mailto:Abena_koblyn@gmail.com"
            className="flex items-center space-x-2 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-white" />
            <span>Abena_koblyn@gmail.com</span>
          </a>
          <a
            href="tel:0277233774"
            className="flex items-center space-x-2 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-white" />
            <span>0277233774</span>
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-6 text-neutral-400">
          <a
            href="https://wa.me/233277233774"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors text-sm font-medium tracking-widest uppercase"
            aria-label="WhatsApp"
          >
            WhatsApp
          </a>
          <span className="text-white/20">•</span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors text-sm font-medium tracking-widest uppercase"
            aria-label="Instagram"
          >
            Instagram
          </a>
          <span className="text-white/20">•</span>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors text-sm font-medium tracking-widest uppercase"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
          <span className="text-white/20">•</span>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors text-sm font-medium tracking-widest uppercase"
            aria-label="X (Twitter)"
          >
            X
          </a>
        </div>

        {/* Copyright */}
        <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 pt-4 border-t border-white/5 w-full">
          © {new Date().getFullYear()} SARAH ADJEI / ABENA KOBLYN. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
