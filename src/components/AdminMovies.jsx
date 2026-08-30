import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { allMovies } from '../data/movies';

const AdminMovies = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="animate-fade-in relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Movies Management</h2>
          <p className="text-sm text-gray-400">Add, edit, or remove movies from the catalog.</p>
        </div>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)]"
        >
          <Plus className="w-5 h-5" />
          Add New Movie
        </button>
      </div>

      <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/50 border-b border-white/10">
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Movie</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Genres</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {allMovies.map((movie) => (
              <tr key={movie.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <img src={movie.poster} alt={movie.title} className="w-10 h-14 object-cover rounded shadow-md" />
                    <span className="font-medium text-white">{movie.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {movie.genres.join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {movie.rating}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20">Active</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-cyan-400 mx-2 transition-transform hover:scale-110">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-red-400 mx-2 transition-transform hover:scale-110">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Movie Drawer overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Add Movie Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[500px] bg-slate-900 border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Add New Movie</h3>
            <button onClick={() => setIsDrawerOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Movie Title</label>
              <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Enter title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Poster URL</label>
              <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="https://..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Rating</label>
                <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="e.g. 8.5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Duration (min)</label>
                <input type="number" className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="120" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
              <textarea rows="4" className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Movie plot..."></textarea>
            </div>
          </div>
          
          <div className="p-6 border-t border-white/10 flex justify-end gap-4">
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="px-6 py-2 rounded-lg font-medium text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-2 rounded-lg font-bold transition-colors"
            >
              Save Movie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMovies;
