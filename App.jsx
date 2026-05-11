import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Trends from './components/Trends';
import Goals from './components/Goals';
import Activity from './components/Activity';
import Settings from './components/Settings';
import LandingPage from './components/LandingPage';

import Services from './components/Services';
import Philosophy from './components/Philosophy';
import Experience from './components/Experience';
import { View } from './types';

const App = () => {
  const [activeView, setActiveView] = useState(View.DASHBOARD);
  const [isLoading, setIsLoading] = useState(true);
  const [isLanding, setIsLanding] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate high-end loading experience
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleEnterApp = (userData, targetView) => {
    if (userData) {
      setUser(userData);
    }
    if (targetView) {
      setActiveView(targetView);
    }
    setIsLanding(false);
  };

  const renderContent = () => {
    switch (activeView) {
      case View.DASHBOARD: return <Dashboard user={user} />;
      case View.TRENDS: return <Trends user={user} />;
      case View.GOALS: return <Goals />;
      case View.ACTIVITY: return <Activity />;
      case View.SETTINGS: return <Settings user={user} />;
      case View.SERVICES: return <Services />;
      case View.PHILOSOPHY: return <Philosophy />;
      case View.EXPERIENCE: return <Experience />;
      default: return <Dashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-950 text-slate-100 selection:bg-primary/50">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-brand-950 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center gap-6"
            >
              <img src="/logo.png" alt="WellnessSynergy Logo" className="w-16 h-16 object-contain" />
              <h1 className="text-2xl font-bold tracking-widest uppercase opacity-80">WellnessSynergy</h1>
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="h-full bg-primary"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isLanding ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <LandingPage onEnter={handleEnterApp} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard-layout"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-screen"
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Sidebar activeView={activeView} setActiveView={setActiveView} user={user} />

            <main className="flex-1 lg:ml-64 min-h-screen relative">
              <div className="max-w-[1400px] mx-auto p-6 lg:p-10 pb-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeView}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {renderContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
