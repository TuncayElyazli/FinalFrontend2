import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Ticket, Video, Calendar, Sparkles } from 'lucide-react';
import { allMovies } from '../data/movies';
import TrailerModal from './TrailerModal';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [backdropError, setBackdropError] = useState(false);

  const movie = allMovies.find((m) => String(m.id) === String(id));

  if (!movie) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6 animate-fade-in text-center px-4">
        <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">404</p>
        <p className="text-gray-400 text-lg">Movie not found in our catalog.</p>
        <button
          onClick={() => navigate('/catalog')}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 py-3 rounded-full transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)]"
        >
          Back to Catalog
        </button>
      </div>
    );
  }

  // Determine backdrop URL with reliable fallback cascade
  const primaryBackdrop = !backdropError && movie.backdrop ? movie.backdrop : movie.poster;

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden animate-fade-in">
      {/* ─── Global Full-Page Ambient Blurred Backdrop ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src={primaryBackdrop}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover scale-125 blur-3xl opacity-20 filter brightness-75 contrast-125"
          onError={() => setBackdropError(true)}
        />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[60px]" />
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* ─── Top Hero Backdrop Banner ─── */}
      <div className="relative h-[65vh] min-h-[480px] w-full z-10 overflow-hidden">
        <img
          src={primaryBackdrop}
          alt={movie.title}
          className="w-full h-full object-cover object-top filter brightness-90 contrast-105 scale-100 transform transition-transform duration-1000 ease-out"
          onError={() => setBackdropError(true)}
        />
        {/* Cinema-grade Multi-directional gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-transparent" />

        {/* Back navigation button */}
        <div className="absolute top-24 left-8 max-w-[1440px] mx-auto z-20">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-300 hover:text-white bg-slate-900/70 hover:bg-slate-800/90 backdrop-blur-xl border border-white/15 px-5 py-2.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:scale-105 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
      </div>

      {/* ─── Main Movie Content Details Section ─── */}
      <div className="max-w-[1440px] mx-auto px-8 -mt-56 relative z-20 pb-28">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Poster Card with Glassmorphism Border */}
          <div className="flex-shrink-0 w-72 lg:w-80 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/15 group relative bg-slate-900/60 backdrop-blur-md">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Details & Information */}
          <div className="flex-1 pt-6 lg:pt-28">
            {/* Genre tags */}
            <div className="flex gap-2.5 mb-5 flex-wrap">
              {movie.genres?.map((genre) => (
                <span
                  key={genre}
                  className="px-4 py-1.5 bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-[0_0_10px_rgba(34,211,238,0.15)]"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-md">
              {movie.title}
            </h1>

            {/* Meta badges: Rating, Duration, Format */}
            <div className="flex flex-wrap items-center gap-6 text-sm mb-8">
              <div className="flex items-center gap-2 bg-slate-900/80 border border-yellow-500/20 px-4 py-2 rounded-xl backdrop-blur-md">
                <Star className="w-5 h-5 text-yellow-400 fill-current drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                <span className="text-white font-bold text-base">{movie.rating}</span>
                <span className="text-gray-500 text-xs font-medium">/ 10</span>
              </div>

              {movie.duration && (
                <div className="flex items-center gap-2 bg-slate-900/80 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md text-gray-300">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span className="font-medium">{movie.duration}</span>
                </div>
              )}

              <div className="flex items-center gap-2 bg-slate-900/80 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md text-gray-300">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="font-medium">IMAX 4K • Dolby Atmos</span>
              </div>
            </div>

            {/* Synopsis / Description */}
            <div className="mb-10 max-w-3xl">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-3">Overview</h2>
              <p className="text-gray-200 text-lg leading-relaxed font-normal bg-slate-900/40 border border-white/5 p-6 rounded-2xl backdrop-blur-md shadow-inner">
                {movie.description || 'Experience this masterclass in modern cinema on the largest screen with state-of-the-art acoustics.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-5">
              <button
                onClick={() => navigate(`/seats/${movie.id}`, { state: { movie } })}
                className="flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-9 py-4 rounded-2xl transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] hover:scale-105 text-base"
              >
                <Ticket className="w-5 h-5" />
                Book Tickets
              </button>

              {movie.youtubeId && (
                <button
                  onClick={() => setIsTrailerOpen(true)}
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-2xl backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 text-base"
                >
                  <Video className="w-5 h-5 text-cyan-400" />
                  Watch Trailer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        youtubeId={movie.youtubeId}
        title={movie.title}
      />
    </div>
  );
};

export default MovieDetails;
