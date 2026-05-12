import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { View } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const LandingPage = ({ onEnter }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [authData, setAuthData] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [pendingTargetView, setPendingTargetView] = useState(undefined);

  const handleNavClick = (view) => {
    setPendingTargetView(view);
    setAuthMode('login');
    setActiveModal('auth');
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    const endpoint = authMode === 'login' ? `${API_URL}/api/auth/login` : `${API_URL}/api/auth/register`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Success
      onEnter(data.user, pendingTargetView);
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/google/url`);
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Failed to get Google Auth URL', err);
    }
  };

  // Check if we just returned from Google Auth
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authDataParam = params.get('data');
    if (window.location.pathname === '/oauth/success' && authDataParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(authDataParam));
        // Clear the URL
        window.history.replaceState({}, document.title, "/");
        onEnter(userData, View.SETTINGS);
      } catch (e) {
        console.error("Failed to parse social login data");
      }
    }
  }, [onEnter]);

  return (
    <div className="bg-brand-950 overflow-x-hidden font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-20 h-24 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-[2px]">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="WellnessSynergy Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-bold tracking-tight text-white">WellnessSynergy</span>
        </div>

        <div className="hidden lg:flex items-center gap-12 text-sm font-medium text-slate-300">
          <button onClick={() => handleNavClick(View.SERVICES)} className="hover:text-primary transition-colors">Services</button>
          <button onClick={() => handleNavClick(View.PHILOSOPHY)} className="hover:text-primary transition-colors">Philosophy</button>
          <button onClick={() => handleNavClick(View.EXPERIENCE)} className="hover:text-primary transition-colors">Experience</button>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => { setAuthMode('login'); setActiveModal('auth'); }}
            className="text-sm font-bold text-white hover:text-primary transition-colors"
          >
            Log In
          </button>
          <button
            onClick={() => { setAuthMode('register'); setActiveModal('auth'); }}
            className="bg-primary hover:bg-brand-400 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-primary/20"
          >
            Join Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-6">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop"
            alt="Wellness Meditation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/60 to-black/30" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-accent font-bold text-xs uppercase tracking-[0.3em]"
          >
            <span className="material-symbols-outlined text-xs">adjust</span>
            The Next Evolution
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-6xl lg:text-8xl font-black tracking-tighter text-white leading-[1.1]"
          >
            Your Harmony, <br />
            <span className="text-accent italic font-serif font-light">Reimagined.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed opacity-80"
          >
            A holistic approach to wellness, designed for the modern lifestyle.
            Experience the intersection of technology and tranquility.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
          >
            <button
              onClick={() => { setAuthMode('register'); setActiveModal('auth'); }}
              className="bg-primary hover:bg-brand-400 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-2xl shadow-primary/30 flex items-center gap-3 group"
            >
              Begin Your Journey
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
            <button className="glass px-10 py-5 rounded-full font-bold text-lg text-white hover:bg-white/10 transition-all">
              View Rituals
            </button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
        >
          <span className="text-[10px] uppercase font-black tracking-[0.4em]">Scroll</span>
          <div className="w-px h-12 bg-white/30" />
        </motion.div>
      </section>

      {/* Core Features */}
      <section className="py-32 lg:py-48 px-8 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: 'self_improvement', title: 'Mindfulness', desc: 'Achieve deep presence through neuro-aesthetic guided sessions designed for cognitive endurance.' },
          { icon: 'bolt', title: 'Physical Vitality', desc: 'Optimize your body with biomechanically-informed movements tailored to your unique physiology.' },
          { icon: 'bedtime', title: 'Restorative Sleep', desc: 'Rejuvenate with science-backed circadian rest protocols that transform your recovery cycle.' }
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: idx * 0.1 }}
            className="glass rounded-[2.5rem] p-12 space-y-6 hover:bg-white/[0.04] transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">{feature.icon}</span>
            </div>
            <h3 className="text-2xl font-black tracking-tight">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed font-medium">
              {feature.desc}
            </p>
            <button className="text-primary font-bold flex items-center gap-2 group-hover:gap-3 transition-all pt-4">
              Explore <span className="material-symbols-outlined text-sm">north_east</span>
            </button>
          </motion.div>
        ))}
      </section>

      {/* Future of Wellness Section */}
      <section className="py-32 lg:py-48 px-8 lg:px-20 bg-brand-950/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp} className="space-y-8">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-tight">
              The Future of <br />
              <span className="text-primary">Personal Wellness</span>
            </h2>
            <p className="text-lg text-slate-400 font-medium leading-relaxed">
              Our philosophy combines ancestral wisdom with modern performance science.
              Every aspect of the Synergy program is curated to facilitate a flow state
              in your daily life.
            </p>
            <ul className="space-y-4">
              {['Personalized Wellness Architect', 'Biometric Performance Integration', 'Ambient Strain Discovery Focus'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-200 font-bold">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[3rem] overflow-hidden aspect-[4/3] shadow-2xl"
          >
            <img
              src="https://picsum.photos/id/28/2000/1500"
              alt="Zen meditation room"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
          </motion.div>
        </div>
      </section>

      {/* Ready to Evolve Section */}
      <section className="py-32 lg:py-48 px-8 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass max-w-5xl mx-auto rounded-[4rem] py-24 px-12 text-center space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-primary/5 blur-3xl rounded-full" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">Ready to evolve?</h2>
            <p className="text-lg text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
              Join an exclusive collective of high-performers and wellness enthusiasts.
            </p>
            <button
              onClick={() => { setAuthMode('register'); setActiveModal('auth'); }}
              className="mt-6 bg-primary hover:bg-brand-400 text-white px-12 py-5 rounded-full font-black text-xl transition-all shadow-2xl shadow-primary/40 active:scale-95"
            >
              Get Started Now
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="pt-32 pb-12 px-8 lg:px-20 bg-brand-950">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 border-b border-white/5 pb-20">
          <div className="col-span-2 md:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="WellnessSynergy Logo" className="w-8 h-8 object-contain" />
              <span className="text-xl font-bold tracking-tight text-white">WellnessSynergy</span>
            </div>
            <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-[200px]">
              Elevating human potential through balanced living and scientific innovation.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Platform</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li><a href="#" className="hover:text-primary transition-colors">Membership</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Study</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Resources</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Company</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li><a href="#" className="hover:text-primary transition-colors">Philosophy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Journal</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Connect</h4>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-xl">camera_alt</span>
              </div>
              <div className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-xl">alternate_email</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 flex flex-col md:row items-center justify-between gap-6 text-[11px] font-black uppercase tracking-widest text-slate-600">
          <p>© 2024 WellnessSynergy. All rights reserved.</p>
          <div className="flex gap-8">
            <button onClick={() => setActiveModal('privacy')} className="hover:text-primary transition-colors uppercase">Privacy Policy</button>
            <button onClick={() => setActiveModal('terms')} className="hover:text-primary transition-colors uppercase">Terms of Service</button>
            <button onClick={() => setActiveModal('cookies')} className="hover:text-primary transition-colors uppercase">Cookie Settings</button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <ModalOverlay onClose={() => { setActiveModal(null); setPendingTargetView(undefined); }}>
            {activeModal === 'experience' && (
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined">diamond</span>
                </div>
                <h3 className="text-2xl font-black">The Synergy Experience</h3>
                <p className="text-slate-400 leading-relaxed">
                  Our comprehensive platform guides you through a curated journey of self-improvement.
                  By integrating biometric data with personalized mindfulness and physical protocols,
                  we create a wellness path that adapts to your daily needs.
                </p>
                <div className="pt-4">
                  <button onClick={() => setActiveModal(null)} className="w-full bg-white/5 hover:bg-white/10 py-3 rounded-xl font-bold transition-colors">
                    Close
                  </button>
                </div>
              </div>
            )}

            {activeModal === 'auth' && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-black">{authMode === 'login' ? 'Welcome Back' : 'Join Synergy'}</h3>
                  <p className="text-slate-400 text-sm">
                    {authMode === 'login' ? 'Enter your credentials to access your dashboard' : 'Start your journey to holistic wellness today'}
                  </p>
                </div>

                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {authMode === 'register' && (
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white placeholder-slate-400"
                        placeholder="John Doe"
                        value={authData.name}
                        onChange={e => setAuthData({ ...authData, name: e.target.value })}
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white placeholder-slate-400"
                      placeholder="you@example.com"
                      value={authData.email}
                      onChange={e => setAuthData({ ...authData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
                    <input
                      type="password"
                      required
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white placeholder-slate-400"
                      placeholder="••••••••"
                      value={authData.password}
                      onChange={e => setAuthData({ ...authData, password: e.target.value })}
                    />
                  </div>

                  {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}

                  <button type="submit" className="w-full bg-primary hover:bg-brand-400 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 mt-2">
                    {authMode === 'login' ? 'Log In' : 'Create Account'}
                  </button>

                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-brand-900 px-4 text-slate-500">OR</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full bg-white text-black hover:bg-slate-100 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-3"
                  >
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                    Continue with Google
                  </button>
                </form>

                <div className="text-center text-sm text-slate-500">
                  {authMode === 'login' ? (
                    <p>Don't have an account? <button onClick={() => setAuthMode('register')} className="text-primary font-bold hover:underline">Sign up</button></p>
                  ) : (
                    <p>Already have an account? <button onClick={() => setAuthMode('login')} className="text-primary font-bold hover:underline">Log in</button></p>
                  )}
                </div>
              </div>
            )}

            {(activeModal === 'privacy' || activeModal === 'terms' || activeModal === 'cookies') && (
              <div className="space-y-4">
                <h3 className="text-2xl font-black capitalize">{activeModal}</h3>
                <div className="max-h-60 overflow-y-auto pr-2 space-y-4 text-slate-400 text-sm leading-relaxed">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <button onClick={() => setActiveModal(null)} className="w-full bg-white/5 hover:bg-white/10 py-3 rounded-xl font-bold transition-colors">
                  Close
                </button>
              </div>
            )}
          </ModalOverlay>
        )}
      </AnimatePresence>
    </div>
  );
};

// Modal Overlay Component (Moved outside to prevent re-renders)
const ModalOverlay = ({ children, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-brand-900 border border-white/10 p-8 rounded-3xl max-w-lg w-full shadow-2xl relative overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
      >
        <span className="material-symbols-outlined">close</span>
      </button>
      {children}
    </motion.div>
  </motion.div>
);

export default LandingPage;
