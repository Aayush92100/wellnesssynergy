
import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
    const services = [
        {
            title: 'Holistic Health Coaching',
            description: 'Personalized guidance to balance your physical, mental, and emotional well-being using integrative approaches.',
            icon: 'self_improvement',
            color: 'bg-emerald-500',
        },
        {
            title: 'Nutritional Therapy',
            description: 'Customized nutrition plans designed to heal your gut, boost energy, and optimize metabolic health.',
            icon: 'nutrition',
            color: 'bg-orange-500',
        },
        {
            title: 'Stress Management',
            description: 'Evidence-based techniques including mindfulness, breathwork, and biofeedback to master stress resilience.',
            icon: 'spa',
            color: 'bg-blue-500',
        },
        {
            title: 'Fitness Programming',
            description: 'Tailored workout routines that align with your body type, goals, and lifestyle for sustainable results.',
            icon: 'fitness_center',
            color: 'bg-purple-500',
        },
        {
            title: 'Sleep Optimization',
            description: 'Deep dive analysis of your sleep patterns with actionable strategies to improve rest and recovery.',
            icon: 'bedtime',
            color: 'bg-indigo-500',
        },
        {
            title: 'Corporate Wellness',
            description: 'Comprehensive programs for organizations to boost employee morale, health, and productivity.',
            icon: 'domain',
            color: 'bg-rose-500',
        },
    ];

    return (
        <div className="space-y-12">
            {/* Header */}
            <header className="space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-2xl">medical_services</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black tracking-tight">Our Services</h1>
                    </div>
                    <p className="text-lg text-slate-400 font-medium max-w-2xl">
                        Empowering you with a comprehensive suite of wellness solutions tailored to your unique journey.
                    </p>
                </motion.div>
            </header>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <motion.div
                        key={service.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative bg-brand-900/50 border border-white/5 p-8 rounded-3xl hover:bg-brand-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden cursor-default"
                    >
                        <div className={`w-14 h-14 rounded-2xl ${service.color} bg-opacity-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                            <span className={`material-symbols-outlined text-3xl ${service.color.replace('bg-', 'text-')}`}>
                                {service.icon}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-primary transition-colors">
                            {service.title}
                        </h3>

                        <p className="text-slate-400 leading-relaxed text-sm">
                            {service.description}
                        </p>

                        <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-300 transform translate-x-1/2 -translate-y-1/2">
                            <span className="material-symbols-outlined text-9xl">{service.icon}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Services;
