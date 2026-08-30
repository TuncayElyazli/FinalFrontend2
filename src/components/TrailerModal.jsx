import React from 'react';
import { X } from 'lucide-react';

const TrailerModal = ({ isOpen, onClose, youtubeId, title }) => {
  if (!isOpen || !youtubeId) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.2)]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="text-xl font-bold text-white">{title || "Watch Trailer"}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="relative pt-[56.25%] bg-black">
          <iframe 
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
