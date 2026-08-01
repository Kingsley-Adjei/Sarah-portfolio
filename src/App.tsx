import { useState } from 'react';
import LenisProvider, { getLenis, scrollToTop } from '@/components/LenisProvider';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MeetSarah from '@/components/MeetSarah';
import ExploreWork from '@/components/ExploreWork';
import OnSetCollaborations from '@/components/OnSetCollaborations';
import ContactSection from '@/components/ContactSection';
import InstagramFeed from '@/components/InstagramFeed';
import Footer from '@/components/Footer';
import AboutScreen from '@/components/AboutScreen';
import PortfolioScreen from '@/components/PortfolioScreen';
import ContactScreen from '@/components/ContactScreen';
import ScrollCanvasAnimation from '@/components/ScrollCanvasAnimation';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');

  const handleContactClick = () => {
    setCurrentView('contact');
    scrollToTop();
  };

  const handleNavClick = (id: string) => {
    if (id === 'contact') {
      handleContactClick();
      return;
    }
    setCurrentView(id);
    scrollToTop();
  };

  const handleGetInTouchClick = () => {
    const target = document.getElementById('direct-collaboration');
    if (!target) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target, { offset: -90 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LenisProvider>
      <main className="min-h-screen bg-[#080808] text-[#f3f3f3] relative">
        <div className="film-grain-overlay" aria-hidden="true" />
        
        <Navbar
          currentView={currentView}
          setCurrentView={setCurrentView}
          onContactClick={handleContactClick}
        />

        {/* Dynamic View Controller */}
        {currentView === 'home' && (
          <div className="relative">
            <ScrollCanvasAnimation />
            <div className="relative z-10">
              <Hero onContactClick={handleContactClick} onGetInTouchClick={handleGetInTouchClick} />
              <MeetSarah />
              <ExploreWork onViewPortfolioClick={() => handleNavClick('portfolio')} />
              <OnSetCollaborations />
              <ContactSection />
              <InstagramFeed />
            </div>
          </div>
        )}

        {currentView === 'about' && (
          <AboutScreen onContactClick={handleContactClick} />
        )}

        {currentView === 'portfolio' && (
          <PortfolioScreen onContactClick={handleContactClick} />
        )}

        {currentView === 'contact' && (
          <ContactScreen />
        )}

        <Footer onNavClick={handleNavClick} />
      </main>
    </LenisProvider>
  );
}
