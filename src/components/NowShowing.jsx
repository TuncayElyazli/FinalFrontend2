import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Ticket } from 'lucide-react';
import { nowShowing } from '../data/movies';

const NowShowing = ({ onBookNow, onNavigate }) => {
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex justify-between items-end mb-12 animate-fade-in">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <span className="w-2 h-8 bg-cyan-500 rounded-full inline-block"></span>
              Now Showing
            </h2>
            <p className="text-gray-400">Catch the latest blockbusters in premium quality.</p>
          </div>
          <button 
            onClick={onNavigate}
            className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors hover:underline underline-offset-4"
          >
            View All Movies
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {nowShowing.map((movie, index) => (
            <Link 
              to={`/movie/${movie.id}`}
              key={movie.id} 
              className="group relative rounded-2xl overflow-hidden cursor-pointer animate-fade-in aspect-[2/3] block bg-slate-900 border border-white/5 hover:border-cyan-500/30 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img 
                src={movie.poster} 
                alt={movie.title} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-50"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="absolute top-4 right-4 bg-slate-950/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1 shadow-lg transform group-hover:translate-y-1 transition-transform duration-300">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white text-sm font-semibold">{movie.rating}</span>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <p className="text-cyan-400 text-xs font-semibold mb-1 uppercase tracking-wider">
                  {movie.genres?.join(', ') || movie.genre}
                </p>
                <h3 className="text-xl font-bold text-white mb-4 line-clamp-1 group-hover:line-clamp-none transition-all">{movie.title}</h3>
                
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onBookNow(movie);
                  }}
                  className="w-full bg-cyan-500/20 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 border border-cyan-500/50 hover:border-cyan-500 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                >
                  <Ticket className="w-4 h-4" />
                  Quick Book
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NowShowing;
