import React from 'react';
import { DollarSign, Film, Users, TrendingUp, LogOut } from 'lucide-react';

const AdminDashboard = ({ onLogout }) => {
  const stats = [
    { label: 'Total Revenue', value: '$124,500', icon: DollarSign, trend: '+12.5%', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Active Movies', value: '24', icon: Film, trend: '+3', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    { label: 'Total Users', value: '8,432', icon: Users, trend: '+420', color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { label: 'Occupancy Rate', value: '78%', icon: TrendingUp, trend: '+5%', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header row with Logout button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
          <p className="text-gray-400 text-sm mt-1">Welcome back, Administrator</p>
        </div>
        {onLogout && (
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 rounded-xl font-semibold text-sm transition-all duration-300 group"
          >
            <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Logout
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-slate-900 border border-white/10 rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(255,255,255,0.02)] hover:-translate-y-1 transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.label}</h3>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-6">Revenue Overview</h3>
          <div className="h-64 flex items-end justify-between gap-2 border-b border-l border-white/10 pb-2 pl-2">
            {/* Mock Chart Bars */}
            {[40, 60, 45, 80, 55, 90, 75].map((height, i) => (
              <div key={i} className="w-full bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500/30 rounded-t-sm transition-all duration-300 relative group cursor-pointer" style={{ height: `${height}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  ${(height * 1000).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500 px-2">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-6">Recent Bookings</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-white/5">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 font-bold text-sm">
                  U{i}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">User {i}</p>
                  <p className="text-xs text-gray-400">Dune: Part Two • 2 Tickets</p>
                </div>
                <span className="text-sm font-bold text-emerald-400">+$30</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
