
import React from 'react';
import { motion } from 'framer-motion';

const GoalProgress = () => {
  const goals = [
    { label: 'Daily Steps', current: 8432, target: 10000, unit: 'steps', icon: 'directions_walk' },
    { label: 'Mindfulness Minutes', current: 45, target: 60, unit: 'min', icon: 'self_improvement' },
    { label: 'Active Calories', current: 420, target: 500, unit: 'kcal', icon: 'local_fire_department' },
  ];

  return (
    <div className="glass p-10 rounded-[2.5rem] space-y-10">
      {goals.map((goal, idx) => (
        <div key={goal.label} className="group cursor-default">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors">{goal.icon}</span>
              <span className="font-bold text-slate-200 tracking-tight">{goal.label}</span>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-primary">{goal.current.toLocaleString()}</span>
              <span className="text-slate-500 font-bold ml-1 text-sm uppercase">/ {goal.target.toLocaleString()} {goal.unit}</span>
            </div>
          </div>
          <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(goal.current / goal.target) * 100}%` }}
              transition={{ duration: 1.2, delay: 0.2 * idx, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-gradient-to-r from-brand-600 to-primary rounded-full shadow-[0_0_15px_rgba(0,102,102,0.3)] group-hover:brightness-125 transition-all"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GoalProgress;
