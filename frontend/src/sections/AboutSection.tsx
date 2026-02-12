import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Award } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const AboutSection: React.FC = () => {
  const { theme, colors } = useTheme();

  return (
    <section className={`relative max-w-8xl lg:px-10 py-24 ${colors.bgPrimary} overflow-hidden transition-colors duration-300`}>
      {/* Abstract Background Elements */}
      <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b ${theme === 'light' ? 'from-violet-500/5' : 'from-violet-600/10'} to-transparent rounded-full blur-[120px] pointer-events-none`} />
      <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t ${theme === 'light' ? 'from-blue-500/5' : 'from-blue-600/10'} to-transparent rounded-full blur-[100px] pointer-events-none`} />

      <div className="w-full max-w-[95%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:pr-8"
          >
            <h4 className={`${theme === 'light' ? 'text-amber-700' : 'text-amber-400'} font-bold tracking-widest uppercase text-xs md:text-sm mb-4`}>
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
            className={`relative h-[400px] lg:h-[500px] w-full ${theme === 'light' ? 'bg-slate-100/60 border-slate-300' : 'bg-slate-900/40 border-white/10'} rounded-[2rem] border backdrop-blur-sm overflow-hidden flex items-center justify-center group transition-colors duration-300`}
          >
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Glowing Core */}
            <div className="absolute w-40 h-40 bg-cyan-500/30 rounded-full blur-[60px] animate-pulse" />
            <div className="absolute w-64 h-64 bg-violet-500/20 rounded-full blur-[80px] animate-pulse delay-75" />

            {/* Central Content */}
            <div className={`relative z-10 text-center p-8 backdrop-blur-sm rounded-3xl border ${theme === 'light' ? 'border-slate-200 bg-white/50' : 'border-white/5 bg-slate-950/30'} shadow-2xl transition-colors duration-300`}>
              <div className={`text-7xl font-serif font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-b ${theme === 'light' ? 'from-slate-900 to-slate-600' : 'from-white to-slate-400'}`}>
                25<span className={`text-4xl align-top ${theme === 'light' ? 'text-amber-600' : 'text-amber-400'}`}>+</span>
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
            <div className={`absolute top-12 right-12 p-4 ${theme === 'light' ? 'bg-white/80 border-slate-200' : 'bg-slate-800/50 border-white/10'} backdrop-blur-md rounded-2xl border animate-float shadow-lg transition-colors duration-300`}>
              <Cpu className={`${theme === 'light' ? 'text-cyan-600' : 'text-cyan-400'} w-6 h-6`} />
            </div>
            <div className={`absolute bottom-16 left-12 p-4 ${theme === 'light' ? 'bg-white/80 border-slate-200' : 'bg-slate-800/50 border-white/10'} backdrop-blur-md rounded-2xl border animate-float shadow-lg transition-colors duration-300`} style={{ animationDelay: '2s' }}>
              <Award className="text-violet-400 w-6 h-6" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
