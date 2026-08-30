import React, { useState } from 'react';

const AdminShowtimes = () => {
  const [toggles, setToggles] = useState({
    'morning': true,
    'afternoon': true,
    'evening': false,
    'midnight': true,
    'promotions': false
  });

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="animate-fade-in space-y-8 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Showtimes & Pricing</h2>
        <p className="text-sm text-gray-400">Manage screening schedules and ticket pricing configurations.</p>
      </div>

      <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Pricing Configuration</h3>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Standard Ticket Price ($)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input type="number" defaultValue="15" className="w-full bg-slate-950 border border-white/10 rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors text-lg" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Premium Ticket Price ($)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input type="number" defaultValue="25" className="w-full bg-slate-950 border border-white/10 rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors text-lg" />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Update Pricing
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Screening Availability</h3>
        
        <div className="space-y-6">
          {[
            { id: 'morning', label: 'Morning Shows (10 AM - 12 PM)', desc: 'Enable early bird screenings' },
            { id: 'afternoon', label: 'Afternoon Shows (1 PM - 5 PM)', desc: 'Standard matinee timings' },
            { id: 'evening', label: 'Evening Shows (6 PM - 10 PM)', desc: 'Prime time screenings' },
            { id: 'midnight', label: 'Midnight Shows (11 PM - 1 AM)', desc: 'Late night weekend specials' },
            { id: 'promotions', label: 'Enable Tuesday Promotions', desc: 'Apply 20% discount on all Tuesday tickets automatically' }
          ].map(item => (
            <div key={item.id} className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-white">{item.label}</p>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
              
              {/* Custom Tailwind Toggle */}
              <button
                onClick={() => handleToggle(item.id)}
                className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none ${
                  toggles[item.id] ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <div 
                  className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full transition-transform duration-300 shadow-md ${
                    toggles[item.id] ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminShowtimes;
