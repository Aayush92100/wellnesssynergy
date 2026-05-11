
import React from 'react';
import { motion } from 'framer-motion';

const InsightsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="glass p-8 rounded-[2rem] border-l-4 border-primary group relative overflow-hidden"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-xl">lightbulb</span>
          </div>
          <h3 className="font-black text-lg text-primary tracking-tight">Focus Peak Detected</h3>
        </div>
        <p className="text-slate-300 leading-relaxed font-medium">
          Your focus peaked 2 hours earlier today compared to your weekly average. Consider an early recovery break at 2:30 PM to maintain momentum through the evening.
        </p>
        <div className="absolute -bottom-6 -right-6 opacity-5 group-hover:opacity-10 transition-opacity">
          <span className="material-symbols-outlined text-[8rem]">show_chart</span>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="glass p-8 rounded-[2rem] group relative overflow-hidden"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-xl">bedtime</span>
          </div>
          <h3 className="font-black text-lg text-slate-100 tracking-tight">Sleep Optimization</h3>
        </div>
        <p className="text-slate-400 leading-relaxed font-medium">
          You reached deep sleep 15 minutes faster last night. Your 10:00 PM wind-down routine with blue light blocking is showing consistent positive results.
        </p>
        <div className="absolute -bottom-6 -right-6 opacity-5 group-hover:opacity-10 transition-opacity">
          <span className="material-symbols-outlined text-[8rem]">nights_stay</span>
        </div>
      </motion.div>
    </div>
  );
};

export default InsightsGrid;
