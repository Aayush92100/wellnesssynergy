
import React from 'react';

const Goals = () => {
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight">Active Goals</h1>
        <p className="text-lg text-slate-400 font-medium">Precision targets for your transformation.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1].map(i => (
          <div key={i} className="glass p-10 rounded-[2.5rem] group hover:bg-white/5 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">star_rate</span>
              </div>
              <span className="bg-primary/20 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">In Progress</span>
            </div>
            <h3 className="text-2xl font-black mb-2 group-hover:text-primary transition-colors">Marathon Preparation</h3>
            <p className="text-slate-400 font-medium mb-8">Increase weekly running volume by 15% consistently over 4 weeks.</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-500 uppercase tracking-widest">Progress</span>
                <span className="text-primary">65%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[65%] rounded-full" />
              </div>
            </div>
          </div>
        ))}
         {[1].map(i => (
          <div key={i} className="glass p-10 rounded-[2.5rem] group hover:bg-white/5 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">star_rate</span>
              </div>
              <span className="bg-primary/20 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">In Progress</span>
            </div>
            <h3 className="text-2xl font-black mb-2 group-hover:text-primary transition-colors">Meditation Practice</h3>
            <p className="text-slate-400 font-medium mb-8">Establish a daily 20-minute meditation routine for 4 weeks.</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-500 uppercase tracking-widest">Progress</span>
                <span className="text-primary">95%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[95%] rounded-full" />
              </div>
            </div>
          </div>
        ))}
       {[1].map(i => (
          <div key={i} className="glass p-10 rounded-[2.5rem] group hover:bg-white/5 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">star_rate</span>
              </div>
              <span className="bg-primary/20 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">In Progress</span>
            </div>
            <h3 className="text-2xl font-black mb-2 group-hover:text-primary transition-colors">Sleep Optimization</h3>
            <p className="text-slate-400 font-medium mb-8">Improve sleep quality and duration</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-500 uppercase tracking-widest">Progress</span>
                <span className="text-primary">55%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[55%] rounded-full" />
              </div>
            </div>
          </div>
        ))}
        {[1].map(i => (
          <div key={i} className="glass p-10 rounded-[2.5rem] group hover:bg-white/5 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">star_rate</span>
              </div>
              <span className="bg-primary/20 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">In Progress</span>
            </div>
            <h3 className="text-2xl font-black mb-2 group-hover:text-primary transition-colors">Hydration Target</h3>
            <p className="text-slate-400 font-medium mb-8">Establish daily drinking 2-3 Litre of water </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-500 uppercase tracking-widest">Progress</span>
                <span className="text-primary">85%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[85%] rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default Goals;
