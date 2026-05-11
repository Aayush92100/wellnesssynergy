import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Trends = ({ user }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchTrends = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/fitness/trends?email=${encodeURIComponent(user.email)}`);
        const json = await response.json();
        if (response.ok && json.data) {
          // Format date for display
          const formattedData = json.data.map((item) => ({
            ...item,
            date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          }));
          setData(formattedData);
        }
      } catch (error) {
        console.error('Failed to fetch trends', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();

    // Set up live polling every 60 seconds to fetch fresh data
    const intervalId = setInterval(() => {
      fetchTrends();
    }, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [user]);

  // Safely get the latest day's stats for the Pie chart
  const latestData = data.length > 0 ? data[data.length - 1] : { calories: 0 };
  const caloriesBurned = latestData.calories || 0;

  // Assume a daily static goal of 2500 for the visualization, or math it out
  const calorieGoal = 2500;
  const caloriesRemaining = Math.max(0, calorieGoal - caloriesBurned);

  const pieData = [
    { name: 'Burned', value: caloriesBurned },
    { name: 'Remaining', value: caloriesRemaining },
  ];

  const COLORS = ['#F59E0B', '#ffffff10']; // Amber for energy/calories

  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight">Health Trends</h1>
        <p className="text-lg text-slate-400 font-medium">Long-term analysis of your wellness journey.</p>
      </header>

      {!user?.mobileDeviceConnected || data.length === 0 ? (
        <div className="grid grid-cols-1 gap-8">
          <div className="glass p-20 rounded-[3rem] flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-primary">analytics</span>
            </div>
            <div className="max-w-md">
              <h2 className="text-2xl font-black mb-3">No Account Connected</h2>
              <p className="text-slate-400 font-medium">To view your long term health and fitness trends, please connect your Google Fit account in Settings.</p>
            </div>
            <div className="flex gap-4">
              <div className="h-2 w-12 bg-primary rounded-full" />
              <div className="h-2 w-8 bg-white/10 rounded-full" />
              <div className="h-2 w-8 bg-white/10 rounded-full" />
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Top Row: Calories Pie Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full translate-x-10 -translate-y-10" />
              <h3 className="font-black text-xl flex items-center gap-3 w-full self-start mb-4 text-amber-500">
                <span className="material-symbols-outlined">local_fire_department</span>
                Active Energy
              </h3>

              <div className="h-48 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                      stroke="none"
                      isAnimationActive={true}
                      animationBegin={200}
                      animationDuration={1500}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff20', borderRadius: '1rem' }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-black text-white">{caloriesBurned}</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Kcal</span>
                </div>
              </div>
            </div>

            {/* Steps Overview takes up remaining space */}
            <div className="lg:col-span-2 glass p-8 rounded-[2.5rem] space-y-6">
              <h3 className="font-black text-xl flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">directions_walk</span>
                Steps Overview (Last 30 Days)
              </h3>
              <div className="h-[28rem] w-full text-sm pr-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
                    <XAxis dataKey="date" stroke="#94a3b8" tickLine={false} axisLine={false} dy={15} tick={{ fontSize: 12 }} />
                    <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} dx={-10} tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff20', borderRadius: '1rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="steps" name="Steps" stroke="#8b5cf6" strokeWidth={4} dot={false} activeDot={{ r: 8, fill: '#8b5cf6', strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="glass p-8 rounded-[2.5rem] space-y-6">
            <h3 className="font-black text-xl flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">route</span>
              Distance Overview (Kilometers)
            </h3>
            <div className="h-[28rem] w-full text-sm pr-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
                  <XAxis dataKey="date" stroke="#94a3b8" tickLine={false} axisLine={false} dy={15} tick={{ fontSize: 12 }} />
                  <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} dx={-10} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff20', borderRadius: '1rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="distanceKm" name="Distance (km)" stroke="#EC4899" strokeWidth={4} dot={false} activeDot={{ r: 8, fill: '#EC4899', strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Trends;
