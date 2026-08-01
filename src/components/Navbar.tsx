import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onContactClick: () => void;
}

export default function Navbar({ currentView, setCurrentView, onContactClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'filmblog', label: 'FILMBLOG' },
    { id: 'portfolio', label: 'PORTFOLIO' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);

    if (id === 'contact') {
      onContactClick();
      return;
    }

    if (id === 'filmblog') {
      setCurrentView('home');
      setTimeout(() => {
        const blogEl = document.getElementById('filmblog');
        if (blogEl) {
          blogEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    setCurrentView(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-[#080808]/85 backdrop-blur-md py-4 border-b border-white/10 shadow-2xl'
          : 'bg-transparent py-7'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left font-serif tracking-widest text-lg md:text-xl font-medium text-white hover:text-neutral-400 transition-colors cursor-pointer"
        >
          SARAH ADJEI
        </button>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 relative py-1 cursor-pointer ${isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-white transition-all" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-neutral-300 hover:text-white p-2 cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] bg-[#080808]/95 backdrop-blur-xl border-b border-white/10 flex flex-col px-8 py-10 space-y-6 z-40">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-left text-sm uppercase tracking-[0.2em] font-medium py-3 border-b border-white/5 cursor-pointer ${currentView === link.id ? 'text-white font-semibold' : 'text-neutral-400'
                }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
