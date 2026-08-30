import React, { useState } from 'react';
import { Film, Lock, User, Eye, EyeOff, Loader2, ShieldAlert, ShieldCheck } from 'lucide-react';

const AdminLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate a brief auth check delay
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        setSuccess(true);
        localStorage.setItem('adminToken', 'mock_admin_token_2024');
        setTimeout(() => {
          onLoginSuccess();
        }, 800);
      } else {
        setIsLoading(false);
        setError('Invalid username or password. Please try again.');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden animate-fade-in">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Glow blob */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md px-6">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-3 mb-3">
            <Film className="w-10 h-10 text-cyan-400" />
            <span className="text-3xl font-extrabold text-white tracking-wide">CineVerse</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/60 border border-white/10 px-4 py-1.5 rounded-full">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">Admin Access Only</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_60px_rgba(34,211,238,0.08)]">
          <h1 className="text-2xl font-bold text-white mb-1">Administrator Login</h1>
          <p className="text-gray-400 text-sm mb-8">Sign in to access the CineVerse control panel.</p>

          {success ? (
            <div className="flex flex-col items-center justify-center py-8 gap-4 animate-fade-in">
              <ShieldCheck className="w-16 h-16 text-emerald-400" />
              <p className="text-emerald-400 font-semibold text-lg">Access Granted</p>
              <p className="text-gray-400 text-sm">Redirecting to dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Username
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); setError(''); }}
                    autoComplete="username"
                    placeholder="Enter username"
                    className={`w-full bg-slate-950/60 border rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-1 transition-all ${
                      error ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30' : 'border-white/10 focus:border-cyan-400 focus:ring-cyan-400/30'
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    autoComplete="current-password"
                    placeholder="Enter password"
                    className={`w-full bg-slate-950/60 border rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-gray-600 focus:outline-none focus:ring-1 transition-all ${
                      error ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30' : 'border-white/10 focus:border-cyan-400 focus:ring-cyan-400/30'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                  <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <p className="text-red-400 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    Sign In to Admin Panel
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          &copy; {new Date().getFullYear()} CineVerse &mdash; Restricted Area
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
