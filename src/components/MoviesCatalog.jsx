import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Ticket, Filter, Video } from 'lucide-react';
import { allMovies } from '../data/movies';
import TrailerModal from './TrailerModal';

const MoviesCatalog = ({ onBookNow }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  
  // Extract unique genres from all movies
  const allGenres = ['All', ...new Set(allMovies.flatMap(movie => movie.genres))];

  const filteredMovies = activeFilter === 'All' 
    ? allMovies 
    : allMovies.filter(movie => movie.genres.includes(activeFilter));

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 animate-fade-in">
      <div className="max-w-[1440px] mx-auto px-8">
        
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2 flex items-center gap-3">
              <span className="w-2 h-10 bg-cyan-500 rounded-full inline-block"></span>
              Movies Catalog
            </h1>
            <p className="text-gray-400 text-lg">Browse our full collection of premium cinema experiences.</p>
          </div>
          
          <div className="flex items-center gap-3 overflow-x-auto pb-2 w-full md:w-auto">
            <Filter className="w-5 h-5 text-cyan-400 mr-2" />
            {allGenres.map(genre => (
              <button
                key={genre}
                onClick={() => setActiveFilter(genre)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                  activeFilter === genre 
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.5)] scale-105' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredMovies.map((movie, index) => (
            <Link 
              to={`/movie/${movie.id}`}
              key={movie.id} 
              className="group relative rounded-2xl overflow-hidden cursor-pointer animate-fade-in aspect-[2/3] block bg-slate-900 border border-white/5 hover:border-cyan-500/30 transition-all duration-300"
              style={{ animationDelay: `${(index % 10) * 50}ms` }}
            >
              <img 
                src={movie.poster} 
                alt={movie.title} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-50"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="absolute top-3 right-3 bg-slate-950/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1 shadow-lg transform group-hover:translate-y-1 transition-transform duration-300">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white text-sm font-semibold">{movie.rating}</span>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <p className="text-cyan-400 text-xs font-semibold mb-1 uppercase tracking-wider">
                  {movie.genres.join(', ')}
                </p>
                <h3 className="text-lg font-bold text-white mb-4 line-clamp-1 group-hover:line-clamp-none transition-all">
                  {movie.title}
                </h3>
                
                <div className="flex gap-2 w-full mt-4">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedTrailer(movie);
                    }}
                    title="Watch Trailer"
                    className="flex-shrink-0 w-12 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 py-2.5 rounded-xl flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <Video className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onBookNow(movie);
                    }}
                    className="flex-1 bg-cyan-500/20 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 border border-cyan-500/50 hover:border-cyan-500 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                  >
                    <Ticket className="w-4 h-4" />
                    Book
                  </button>
                </div>
              </div>
            </Link>
          ))}
          
          {filteredMovies.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-400 text-lg">No movies found for this category.</p>
            </div>
          )}
        </div>
      </div>

      <TrailerModal 
        isOpen={!!selectedTrailer} 
        onClose={() => setSelectedTrailer(null)} 
        youtubeId={selectedTrailer?.youtubeId}
        title={selectedTrailer?.title}
      />
    </div>
  );
};

export default MoviesCatalog;
