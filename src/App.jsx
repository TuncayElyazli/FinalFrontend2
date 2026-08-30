import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import NowShowing from './components/NowShowing';
import MoviesCatalog from './components/MoviesCatalog';
import MovieDetails from './components/MovieDetails';
import SeatSelection from './components/SeatSelection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import AdminLayout from './components/AdminLayout';
import AdminLogin from './components/AdminLogin';
import ScrollToTop from './components/ScrollToTop';

// ── ProtectedRoute wrapper ────────────────────────────────────────────────────
// Reads from React state (isAdmin) passed as prop — never reads localStorage directly.
const ProtectedAdminRoute = ({ isAdmin, children }) => {
  return isAdmin ? children : <Navigate to="/admin/login" replace />;
};

// ── AdminLoginRoute: always clears stale token before showing login form ──────
const AdminLoginRoute = ({ isAdmin, onLoginSuccess }) => {
  useEffect(() => {
    // Wipe any persisted token every time this route mounts
    localStorage.removeItem('adminToken');
  }, []);

  // After the effect runs the parent will set isAdmin=false.
  // If somehow still true (first render), redirect to dashboard.
  return isAdmin
    ? <Navigate to="/admin" replace />
    : <AdminLogin onLoginSuccess={onLoginSuccess} />;
};

// ── Consumer layout (Navbar + Footer) ────────────────────────────────────────
const ConsumerLayout = ({ children, onOpenAuth, currentPath }) => (
  <>
    <Navbar onOpenAuth={onOpenAuth} currentPath={currentPath} />
    {children}
    <Footer />
  </>
);

// ── Home Page ─────────────────────────────────────────────────────────────────
const HomePage = ({ onBookNow }) => {
  const navigate = useNavigate();
  return (
    <>
      <HeroSection onBookNow={onBookNow} />
      <NowShowing onBookNow={onBookNow} onNavigate={() => navigate('/catalog')} />
    </>
  );
};

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialView, setAuthInitialView] = useState('login');

  // ── Admin auth state: ALWAYS starts as false (logged out) ─────────────────
  // We intentionally do NOT read localStorage here on mount so that a stale
  // persisted token can never silently bypass the login form.
  const [isAdmin, setIsAdmin] = useState(false);

  const openAuth = (viewType) => {
    setAuthInitialView(viewType);
    setIsAuthModalOpen(true);
  };

  const handleBookNow = (movie) => {
    navigate(`/seats/${movie.id}`, { state: { movie } });
    window.scrollTo(0, 0);
  };

  const handleAdminLoginSuccess = () => {
    setIsAdmin(true);
    navigate('/admin');
  };

  const handleAdminLogout = () => {
    // Clear both React state AND persisted token
    setIsAdmin(false);
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Pages that use the consumer Navbar + Footer
  const consumerPaths = ['/', '/catalog', '/movie/:id', '/seats/:id'];
  const currentPath = window.location.pathname;
  const isConsumerPage = !currentPath.startsWith('/admin');

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-cyan-500/30">
      <ScrollToTop />
      {isConsumerPage && (
        <Navbar onOpenAuth={openAuth} />
      )}

      <Routes>
        {/* ── Consumer Routes ───────────────────────────────────────────── */}
        <Route
          path="/"
          element={<HomePage onBookNow={handleBookNow} />}
        />
        <Route
          path="/catalog"
          element={<MoviesCatalog onBookNow={handleBookNow} />}
        />
        <Route
          path="/movie/:id"
          element={<MovieDetails />}
        />
        <Route
          path="/seats/:id"
          element={<SeatSelection onBack={() => navigate('/catalog')} />}
        />

        {/* ── Admin Routes ──────────────────────────────────────────────── */}
        <Route
          path="/admin/login"
          element={
            <AdminLoginRoute
              isAdmin={isAdmin}
              onLoginSuccess={handleAdminLoginSuccess}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute isAdmin={isAdmin}>
              <AdminLayout onLogout={handleAdminLogout} />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedAdminRoute isAdmin={isAdmin}>
              <AdminLayout onLogout={handleAdminLogout} />
            </ProtectedAdminRoute>
          }
        />

        {/* ── 404 Fallback ──────────────────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {isConsumerPage && !currentPath.startsWith('/seats') && <Footer />}

      {/* Consumer Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authInitialView}
        onNavigate={(view) => navigate(`/${view}`)}
      />
    </div>
  );
}

export default App;
