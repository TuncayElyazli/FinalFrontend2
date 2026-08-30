import React, { useState } from 'react';
import { LayoutDashboard, Film, Clock, Users, Settings, LogOut } from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import AdminMovies from './AdminMovies';
import AdminShowtimes from './AdminShowtimes';
import AdminUsers from './AdminUsers';

const AdminLayout = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const navigation = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'showtimes', label: 'Showtimes', icon: Clock },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <AdminDashboard />;
      case 'movies': return <AdminMovies />;
      case 'showtimes': return <AdminShowtimes />;
      case 'users': return <AdminUsers />;
      case 'settings': return <div className="p-8 text-white"><h2 className="text-2xl font-bold mb-4">Settings</h2><p className="text-gray-400">Settings configuration panel.</p></div>;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden animate-fade-in">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-white/10 flex flex-col transition-all duration-300">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <Film className="w-8 h-8 text-cyan-500 mr-3" />
          <span className="text-xl font-bold tracking-wider">CineAdmin</span>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 group ${
                activeTab === item.id 
                  ? 'bg-cyan-500/20 text-cyan-400 shadow-[inset_4px_0_0_0_rgba(34,211,238,1)]' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-4 transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={onLogout}
            className="w-full flex items-center px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 group"
          >
            <LogOut className="w-5 h-5 mr-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-950/50">
        <header className="h-20 bg-slate-900/50 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
              <span className="font-bold text-cyan-400 text-sm">AD</span>
            </div>
          </div>
        </header>
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
