
import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
    const experiences = [
        {
            year: '2026 - Present',
            role: 'Founder & Lead Wellness Architect',
            company: 'Wellness Synergy',
            description: 'Leading a diverse team of health professionals to deliver cutting-edge wellness programs to individuals and corporations globally.',
        },
        {
            year: '2020 - 2024',
            role: 'Senior Holistic Coach',
            company: 'Vitality Institute',
            description: 'Developed and supervised personalized health protocols for over 500+ clients, specializing in metabolic restoration and stress management.',
        },
        {
            year: '2016 - 2020',
            role: 'Clinical Nutritionist',
            company: 'GreenLeaf Health Center',
            description: 'Provided clinical nutrition counseling and devised therapeutic diet plans for patients with chronic lifestyle diseases.',
        },
        {
            year: '2014 - 2016',
            role: 'Sports Physiology Intern',
            company: 'Elite Performance Lab',
            description: 'Assisted in the physiological assessment and training recovery programs for elite athletes.',
        },
    ];

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
                            <span className="material-symbols-outlined text-primary text-2xl">history_edu</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black tracking-tight">Our Experience</h1>
                    </div>
                    <p className="text-lg text-slate-400 font-medium max-w-2xl">
                        Over a decade of dedication to the art and science of human performance and health.
                    </p>
                </motion.div>
            </header>

            <div className="relative border-l-2 border-white/10 ml-6 md:ml-10 space-y-12 py-4">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                        className="relative pl-8 md:pl-12"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-950 border-2 border-primary shadow-lg shadow-primary/50" />

                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                            <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                            <span className="text-primary font-bold text-sm bg-primary/10 px-3 py-1 rounded-full">{exp.year}</span>
                        </div>

                        <h4 className="text-lg text-slate-300 font-medium mb-3">{exp.company}</h4>

                        <p className="text-slate-400 max-w-3xl leading-relaxed">
                            {exp.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Experience;
