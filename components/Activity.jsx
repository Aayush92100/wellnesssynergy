
import React from 'react';

const Activity = () => {
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight">Activity Log</h1>
        <p className="text-lg text-slate-400 font-medium">A detailed history of your movement and rest.</p>
      </header>

      <div className="glass rounded-[3rem] overflow-hidden">
        <div className="p-8 border-b border-white/5 bg-white/5 flex justify-between items-center">
          <h2 className="font-black text-xl">Recent Activity</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold">All</button>
            <button className="px-4 py-2 rounded-xl bg-white/5 text-slate-400 text-sm font-bold hover:bg-white/10">Workouts</button>
            <button className="px-4 py-2 rounded-xl bg-white/5 text-slate-400 text-sm font-bold hover:bg-white/10">Sleep</button>
          </div>
        </div>
        <div className="divide-y divide-white/5">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="p-8 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-900 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">fitness_center</span>
                </div>
                <div>
                  <h4 className="font-black text-lg">Heavy Lifting Session</h4>
                  <p className="text-slate-400 font-medium text-sm">Yesterday at 5:30 PM • 640 kcal burned</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-primary">1h 15m</p>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Duration</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activity;
