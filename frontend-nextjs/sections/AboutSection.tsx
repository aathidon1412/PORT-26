'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Award, Zap, Users, Wrench, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';
import ImageWithSkeleton from '@/components/ImageWithSkeleton';

const CATEGORY_BADGES = [
  { label: 'Technical', icon: Zap, gradient: 'from-cyan-500 to-blue-500' },
  { label: 'Non-Technical', icon: Users, gradient: 'from-violet-500 to-purple-500' },
  { label: 'Workshops', icon: Wrench, gradient: 'from-amber-500 to-orange-500' },
];

const AboutSection: React.FC = () => {
  const { colors } = useTheme();
  const [showBrochure, setShowBrochure] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowBrochure(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* ─── DEPARTMENT SECTION (existing) ─── */}
      <section className={`relative max-w-8xl lg:px-10 py-24 ${colors.bgPrimary} overflow-hidden transition-colors duration-300`}>
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-violet-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-blue-600/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-[95%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:pr-8"
            >
              <h4 className="text-amber-400 font-bold tracking-widest uppercase text-xs md:text-sm mb-4">
                Who We Are
              </h4>
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold ${colors.textPrimary} mb-6 leading-tight transition-colors duration-300`}>
                Department of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                  Information Technology
                </span>
              </h2>
              <p className={`${colors.textSecondary} text-lg leading-relaxed mb-6 text-justify transition-colors duration-300`}>
                Since its inception in 1998, our department has stood as a beacon of technical excellence, driven by a highly specialized faculty dedicated to shaping world-class engineers. With expertise spanning critical domains like Cyber Security, AI, and Cloud Computing, we empower students to master the complexities of the digital revolution and lead with confidence in a rapidly evolving tech landscape.            </p>
              <p className={`${colors.textTertiary} leading-relaxed font-light text-justify transition-colors duration-300`}>
                We are proud to be a nationally recognized hub of innovation, having earned the prestigious AICTE-CII Award for the Best Industry-Linked Department. Our curriculum is precision-engineered to balance advanced research with practical application, ensuring every graduate is "industry-ready" and prepared to deliver professional impact from day one.            </p>
            </motion.div>

            {/* Abstract Visual - The "Core" */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] lg:h-[500px] w-full bg-slate-900/40 border-white/10 rounded-[2rem] border backdrop-blur-sm overflow-hidden flex items-center justify-center group transition-colors duration-300"
            >
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

              {/* Glowing Core */}
              <div className="absolute w-40 h-40 bg-cyan-500/30 rounded-full blur-[60px] animate-pulse" />
              <div className="absolute w-64 h-64 bg-violet-500/20 rounded-full blur-[80px] animate-pulse delay-75" />

              {/* Central Content */}
              <div className="relative z-10 text-center p-8 backdrop-blur-sm rounded-3xl border border-white/5 bg-slate-950/30 shadow-2xl transition-colors duration-300">
                <div className="text-7xl font-serif font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                  25<span className="text-4xl align-top text-amber-400">+</span>
                </div>
                <div className={`${colors.textTertiary} uppercase tracking-[0.2em] text-xs font-bold transition-colors duration-300`}>
                  Years of Excellence
                </div>
              </div>

              {/* Floating Orbits */}
              <div className="absolute w-full h-full animate-[spin_20s_linear_infinite] opacity-30">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-cyan-500/30 rounded-full border-dashed" />
              </div>
              <div className="absolute w-full h-full animate-[spin_15s_linear_infinite_reverse] opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-violet-500/30 rounded-full" />
              </div>

              {/* Floating Icons */}
              <div className="absolute top-12 right-12 p-4 bg-slate-800/50 border-white/10 backdrop-blur-md rounded-2xl border animate-float shadow-lg transition-colors duration-300">
                <Cpu className="text-cyan-400 w-6 h-6" />
              </div>
              <div className="absolute bottom-16 left-12 p-4 bg-slate-800/50 border-white/10 backdrop-blur-md rounded-2xl border animate-float shadow-lg transition-colors duration-300" style={{ animationDelay: '2s' }}>
                <Award className="text-violet-400 w-6 h-6" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT PORT'26 SECTION ─── */}
      <section className={`relative max-w-8xl lg:px-10 py-24 ${colors.bgPrimary} overflow-hidden transition-colors duration-300`}>
        {/* Background Accents */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-gradient-to-br from-amber-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-cyan-600/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-[95%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* LEFT: Logo Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[400px] lg:h-[500px] w-full rounded-[2rem] border overflow-hidden border-white/10 bg-slate-900/40 backdrop-blur-sm transition-colors duration-300 flex items-center justify-center">
                <Image
                  src="/assets/imgs/logo1.jpeg"
                  alt="PORT'26 Logo"
                  width={480}
                  height={480}
                  className="object-contain p-4"
                />
              </div>
            </motion.div>

            {/* RIGHT: About PORT'26 Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:pl-4"
            >
              <h4 className="text-amber-400 font-bold tracking-widest uppercase text-xs md:text-sm mb-4">
                About the Event
              </h4>
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold ${colors.textPrimary} mb-6 leading-tight transition-colors duration-300`}>
                PORT
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
                  '26
                </span>
              </h2>

              <p className={`${colors.textSecondary} text-lg leading-relaxed mb-5 text-justify transition-colors duration-300`}>
                PORT'26 is a national-level technical symposium organised entirely by the students of the Department of Information Technology. Designed to ignite innovation and celebrate technology, it brings together bright minds from across the country to compete, collaborate, and learn.
              </p>
              <p className={`${colors.textTertiary} leading-relaxed font-light text-justify transition-colors duration-300 mb-4`}>
                The symposium features a diverse lineup spanning Technical events that test problem-solving prowess, Non-Technical events that spark creativity and teamwork, and hands-on Workshops led by industry experts. From AI-driven hackathons to fun-filled gaming showdowns, PORT'26 offers something for every tech enthusiast — all powered by the passion and energy of current students.
                <button
                  onClick={() => setShowBrochure(true)}
                  className="inline-flex items-center gap-1 mx-4 mb-8 font-semibold text-sm transition-colors duration-300 text-amber-400 hover:text-amber-300"
                >
                  View Brochure →
                </button>

              </p>


              {/* Category Badges */}
              <div className="flex flex-wrap gap-3">
                {CATEGORY_BADGES.map((badge) => (
                  <motion.div
                    key={badge.label}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border backdrop-blur-sm transition-all duration-300 bg-slate-800/60 border-white/10 hover:border-violet-500/50"
                  >
                    <div className={`p-1.5 rounded-lg bg-gradient-to-br ${badge.gradient}`}>
                      <badge.icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className={`text-sm font-semibold ${colors.textPrimary} transition-colors duration-300`}>
                      {badge.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      {/* Brochure Modal */}
      {showBrochure && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowBrochure(false)}
          />

          <div
            className="relative z-50 max-w-[95%] max-h-[95%] mx-auto p-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden border shadow-2xl bg-slate-900 border-white/10">
              <button
                aria-label="Close brochure"
                onClick={() => setShowBrochure(false)}
                className="absolute top-3 right-3 z-50 p-2 rounded-full bg-slate-800/80 shadow"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-4 flex items-center justify-center overflow-auto">
                <ImageWithSkeleton
                  src="/assets/imgs/brouchure_port.png"
                  alt="PORT'26 Brochure"
                  className="max-h-[80vh] w-auto max-w-full object-contain"
                  containerClassName="w-full flex items-center justify-center"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutSection;
