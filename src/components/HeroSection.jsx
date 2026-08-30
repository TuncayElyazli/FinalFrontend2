import React, { useState, useEffect } from 'react';
import { Play, Calendar, Star, Info } from 'lucide-react';
import { trendingMovies } from '../data/movies';

const HeroSection = ({ onBookNow }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingMovies.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[85vh] min-h-[600px] bg-slate-950 overflow-hidden">
      {trendingMovies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0">
            <img 
              src={movie.backdrop} 
              alt={movie.title} 
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative h-full max-w-[1440px] mx-auto px-8 flex flex-col justify-end pb-24">
            <div className={`max-w-2xl ${index === currentIndex ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-semibold rounded-full border border-cyan-500/30 backdrop-blur-sm flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> {movie.rating} IMDb
                </span>
                <span className="px-3 py-1 bg-white/10 text-gray-300 text-xs font-semibold rounded-full border border-white/20 backdrop-blur-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> 2024
                </span>
                <span className="px-3 py-1 bg-white/10 text-gray-300 text-xs font-semibold rounded-full border border-white/20 backdrop-blur-sm">
                  {movie.genres.join(' • ')}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg leading-tight">
                {movie.title}
              </h1>
              
              <p className="text-lg text-gray-300 mb-8 max-w-xl drop-shadow-md leading-relaxed">
                {movie.description}
              </p>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => onBookNow(movie)}
                  className="flex items-center gap-2 bg-cyan-500 text-slate-950 px-8 py-3 rounded-full font-bold hover:bg-cyan-400 hover:scale-105 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all duration-300"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Book Tickets
                </button>
                <button className="flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 hover:scale-105 backdrop-blur-md transition-all duration-300">
                  <Info className="w-5 h-5" />
                  More Info
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Carousel Indicators */}
      <div className="absolute bottom-12 right-8 flex gap-2 z-20">
        {trendingMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-8 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'w-4 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
