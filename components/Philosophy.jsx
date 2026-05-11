
import React from 'react';
import { motion } from 'framer-motion';

const Philosophy = () => {
    return (
        <div className="space-y-12">
            <header className="space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-2xl">psychology</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black tracking-tight">Our Philosophy</h1>
                    </div>
                    <p className="text-lg text-slate-400 font-medium max-w-2xl">
                        We believe that true wellness is not just the absence of disease, but the presence of vitality.
                    </p>
                </motion.div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-8"
                >
                    <div className="bg-brand-900/50 border border-white/5 p-8 rounded-3xl">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="material-symbols-outlined text-emerald-400">eco</span>
                            Holistic Integration
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            We approach health through a holistic lens, understanding that physical health, mental clarity, and emotional stability are deeply interconnected. Our methods integrate modern science with timeless wisdom to treat the whole person, not just the symptoms.
                        </p>
                    </div>

                    <div className="bg-brand-900/50 border border-white/5 p-8 rounded-3xl">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="material-symbols-outlined text-blue-400">science</span>
                            Evidence-Based
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            Our strategies are grounded in the latest research in nutritional science, exercise physiology, and psychology. We don't rely on fads; we rely on proven methods that yield sustainable, long-term results for our clients.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-brand-900 p-10 rounded-[2.5rem] relative overflow-hidden flex flex-col justify-center min-h-[400px]"
                >
                    <div className="relative z-10 space-y-6">
                        <span className="text-primary font-bold tracking-widest uppercase">The Core Mission</span>
                        <h3 className="text-3xl lg:text-4xl font-black leading-tight">
                            "To empower individuals to reclaim their health and live with limitless energy and purpose."
                        </h3>
                        <div className="flex items-center gap-4 pt-4">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-white">fingerprint</span>
                            </div>
                            <div>
                                <p className="font-bold text-white">Uniquely Yours</p>
                                <p className="text-sm text-slate-400">Tailored to your DNA</p>
                            </div>
                        </div>
                    </div>

                    {/* Background Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
                    <div className="absolute -bottom-20 -right-20 opacity-5">
                        <span className="material-symbols-outlined text-[30rem]">spa</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Philosophy;
