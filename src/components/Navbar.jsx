import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film } from 'lucide-react';

const Navbar = ({ onOpenAuth }) => {
  const location = useLocation();

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
        <Link 
          to="/"
          className="flex items-center gap-2 cursor-pointer group"
        >
          <Film className="w-8 h-8 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:to-white transition-colors duration-300">
            CineVerse
          </span>
        </Link>
        
        <div className="flex items-center gap-8">
          <Link 
            to="/"
            className={`text-sm font-medium relative group transition-colors duration-300 ${location.pathname === '/' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
          >
            Home
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${location.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
          <Link 
            to="/catalog"
            className={`text-sm font-medium relative group transition-colors duration-300 ${location.pathname === '/catalog' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
          >
            Movies
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${location.pathname === '/catalog' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => onOpenAuth('login')}
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 px-4 py-2"
          >
            Login
          </button>

          <button 
            onClick={() => onOpenAuth('register')}
            className="text-sm font-medium bg-cyan-500 text-slate-950 px-6 py-2 rounded-full hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300 animate-pulse-slow"
          >
            Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
