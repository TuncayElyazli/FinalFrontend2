import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import NowShowing from './components/NowShowing';
import MoviesCatalog from './components/MoviesCatalog';
import SeatSelection from './components/SeatSelection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import AdminLayout from './components/AdminLayout';

function App() {
  const [currentView, setCurrentView] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return ['home', 'catalog', 'seats', 'admin'].includes(hash) ? hash : 'home';
  });
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialView, setAuthInitialView] = useState('login');

  const openAuth = (viewType) => {
    setAuthInitialView(viewType);
    setIsAuthModalOpen(true);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'catalog', 'seats', 'admin'].includes(hash)) {
        setCurrentView(hash);
      } else if (!hash) {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view) => {
    window.location.hash = view;
    window.scrollTo(0, 0);
  };

  const handleBookNow = (movie) => {
    setSelectedMovie(movie);
    setCurrentView('seats');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-cyan-500/30">
      {currentView !== 'admin' && (
        <Navbar onNavigate={handleNavigate} currentView={currentView} onOpenAuth={openAuth} />
      )}
      
      {currentView === 'home' && (
        <>
          <HeroSection onBookNow={handleBookNow} />
          <NowShowing onBookNow={handleBookNow} onNavigate={() => handleNavigate('catalog')} />
        </>
      )}

      {currentView === 'catalog' && (
        <MoviesCatalog onBookNow={handleBookNow} />
      )}

      {currentView === 'seats' && (
        <SeatSelection movie={selectedMovie} onBack={() => handleNavigate('catalog')} />
      )}

      {currentView === 'admin' && (
        <AdminLayout onExit={() => handleNavigate('home')} />
      )}

      {currentView !== 'seats' && currentView !== 'admin' && <Footer />}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialView={authInitialView} 
      />
    </div>
  );
}

export default App;
