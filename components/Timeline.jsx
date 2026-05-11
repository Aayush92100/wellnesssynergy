
import React from 'react';
import { motion } from 'framer-motion';

const Timeline = () => {
  const activities = [
    { time: '08:30 AM', title: 'Morning Meditation', sub: '15 min Session Completed', status: 'completed' },
    { time: '10:15 AM', title: 'Deep Work Session', sub: 'High focus maintained for 90 min', status: 'active' },
    { time: '12:45 PM', title: 'Light Walk', sub: '2,450 steps recorded', status: 'active' },
    { time: '06:00 PM', title: 'Gym Session', sub: 'Strength Training Routine', status: 'scheduled' },
  ];

  return (
    <div className="glass p-10 rounded-[2.5rem] relative overflow-hidden">
      <div className="absolute left-14 top-12 bottom-12 w-px bg-white/10" />
      
      <div className="space-y-10 relative">
        {activities.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`relative pl-12 group ${item.status === 'scheduled' ? 'opacity-40' : ''}`}
          >
            {/* Connector Dot */}
            <div className={`absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-brand-950 transition-all duration-300 group-hover:scale-125 ${
              item.status === 'completed' ? 'bg-primary ring-primary/20' : 
              item.status === 'active' ? 'bg-primary/50' : 'bg-slate-500'
            }`} />

            <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-1">{item.time}</p>
            <h4 className="font-black text-slate-200 group-hover:text-primary transition-colors">{item.title}</h4>
            <p className="text-sm font-medium text-slate-400 mt-0.5">{item.sub}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
