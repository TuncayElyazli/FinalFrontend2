import React from 'react';
import { Edit2, Trash2, Mail, Shield } from 'lucide-react';

const AdminUsers = () => {
  const users = [
    { id: 1, name: 'Alice Cooper', email: 'alice@example.com', role: 'Admin', date: '2023-01-15' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', date: '2023-03-22' },
    { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User', date: '2023-06-10' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Moderator', date: '2023-08-05' },
    { id: 5, name: 'Evan Wright', email: 'evan@example.com', role: 'User', date: '2023-09-12' },
    { id: 6, name: 'Fiona Gallagher', email: 'fiona@example.com', role: 'User', date: '2023-11-20' },
  ];

  return (
    <div className="animate-fade-in relative max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">User Management</h2>
          <p className="text-sm text-gray-400">View and manage registered users and their permissions.</p>
        </div>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Search users..." 
            className="bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors w-64"
          />
        </div>
      </div>

      <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/50 border-b border-white/10">
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Joined Date</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-white">{user.name}</div>
                      <div className="text-sm text-gray-400 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" /> {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border flex items-center gap-1.5 w-max ${
                    user.role === 'Admin' 
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                      : user.role === 'Moderator'
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                        : 'bg-slate-800 text-gray-300 border-slate-700'
                  }`}>
                    {user.role === 'Admin' && <Shield className="w-3 h-3" />}
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(user.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
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
    </div>
  );
};

export default AdminUsers;
