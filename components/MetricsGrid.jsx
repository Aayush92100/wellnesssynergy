
import React from 'react';
import { motion } from 'framer-motion';

const MetricCard = ({ label, value, subtext, icon, delay }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-[2.5rem] p-10 flex flex-col items-center text-center relative overflow-hidden group hover:bg-white/[0.04] transition-all duration-700"
    >
      {/* Subtle Icon in top right */}
      <div className="absolute top-8 right-8 opacity-20 group-hover:opacity-60 transition-opacity duration-500">
        <span className="material-symbols-outlined text-primary text-2xl font-light">{icon}</span>
      </div>

      {/* Circular Progress Container */}
      <div className="relative w-48 h-48 flex items-center justify-center mb-10">
        <svg className="w-full h-full transform -rotate-90 absolute top-0 left-0">
          {/* Background Track */}
          <circle
            className="text-white/[0.05]"
            strokeWidth="12"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="96"
            cy="96"
          />
          {/* Active Progress */}
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.8, delay: delay + 0.4, ease: [0.33, 1, 0.68, 1] }}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeLinecap="round"
            stroke="currentColor"
            className="text-primary"
            fill="transparent"
            r={radius}
            cx="96"
            cy="96"
          />
        </svg>

        {/* Centered Text Content */}
        <div className="relative flex flex-col items-center justify-center pt-2">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.8, duration: 0.6 }}
            className="text-5xl font-black tracking-tighter text-slate-100"
          >
            {value}%
          </motion.span>
          <span className="text-[11px] uppercase tracking-[0.25em] font-black text-slate-500 mt-1">
            {label}
          </span>
        </div>
      </div>

      {/* Bottom Subtext and Thin Bar */}
      <div className="space-y-6 w-full">
        <p className="text-sm font-semibold text-slate-400 group-hover:text-slate-300 transition-colors">
          {subtext}
        </p>
        <div className="h-[2px] w-full bg-white/[0.05] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1.2, delay: delay + 0.6 }}
            className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(0,102,102,0.4)]"
          />
        </div>
      </div>
    </motion.div>
  );
};

const MetricsGrid = () => {
  const metrics = [
    { label: 'Energy', value: 75, subtext: 'Current vitality level', icon: 'bolt', delay: 0.2 },
    { label: 'Focus', value: 92, subtext: 'Cognitive readiness', icon: 'psychology', delay: 0.3 },
    { label: 'Recovery', value: 64, subtext: 'Physical restoration', icon: 'bedtime', delay: 0.4 },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {metrics.map((m) => (
        <MetricCard key={m.label} {...m} />
      ))}
    </section>
  );
};

export default MetricsGrid;
