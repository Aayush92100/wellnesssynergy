
import React from 'react';
import { motion } from 'framer-motion';
import MetricsGrid from './MetricsGrid';
import InsightsGrid from './InsightsGrid';
import GoalProgress from './GoalProgress';
import Timeline from './Timeline';

const Dashboard = ({ user }) => {
  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-4 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-2"
        >
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Good Morning, <span className="text-primary italic">{user?.name ? user.name.split(' ')[0] : 'Guest'}</span>
          </h1>
          <p className="text-lg text-slate-400 font-medium">
            Your readiness score is <span className="text-emerald-400 font-bold">88%</span> today.
            You're performing well above your weekly average.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <button className="group bg-primary hover:bg-brand-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 relative overflow-hidden min-w-[240px]">
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="material-symbols-outlined text-2xl">timer</span>
            <span className="relative z-10">Start Focus Session</span>
          </button>
          <button className="glass p-4 rounded-2xl hover:bg-white/10 transition-colors group">
            <span className="material-symbols-outlined text-slate-400 group-hover:text-white transition-colors">notifications</span>
          </button>
        </motion.div>
      </header>

      {/* Main Stats */}
      <MetricsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Insights & Progress */}
        <div className="lg:col-span-8 space-y-10">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-xl">auto_fix_high</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight">Personalized Insights</h2>
            </div>
            <InsightsGrid />
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">track_changes</span>
                </div>
                <h2 className="text-2xl font-black tracking-tight">Weekly Goal Progress</h2>
              </div>
              <button className="text-sm font-bold text-primary uppercase tracking-widest hover:underline decoration-2 underline-offset-4">View All</button>
            </div>
            <GoalProgress />
          </section>
        </div>

        {/* Right Column: Timeline & Promo */}
        <div className="lg:col-span-4 space-y-10">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-xl">history</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight">Activity Timeline</h2>
            </div>
            <Timeline />
          </section>

          {/* Premium Upgrade Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-brand-600 p-8 rounded-[2rem] text-white relative overflow-hidden shadow-2xl shadow-brand-900/40 group cursor-pointer"
          >
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">workspace_premium</span>
              </div>
              <h3 className="font-black text-2xl">Unlock Wellness Pro</h3>
              <p className="text-white/80 leading-relaxed font-medium">
                Get advanced bio-feedback, deeper sleep analysis, and 1-on-1 coaching insights to reach your peak potential.
              </p>
              <button className="mt-2 bg-white text-primary px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95">
                Upgrade Now
              </button>
            </div>

            {/* Background Decoration */}
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-all duration-700 group-hover:scale-110">
              <span className="material-symbols-outlined text-[20rem]">workspace_premium</span>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
