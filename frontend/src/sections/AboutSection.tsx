import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Award } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section className="relative max-w-8xl lg:px-10 py-24 bg-slate-950 overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Department of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                Information Technology
              </span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-6 text-justify">
              We are the architects of the digital realm, fostering a culture where code meets creativity. Our mission is to bridge the gap between theoretical knowledge and real-world application, empowering the next generation of tech leaders.
            </p>
            <p className="text-slate-400 leading-relaxed font-light text-justify">
              Through cutting-edge curriculum and industry-grade events like PORT, we provide a platform for students to challenge the status quo, innovate fearlessly, and engineer solutions for tomorrow's complex problems.
            </p>
          </motion.div>

          {/* Abstract Visual - The "Core" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] lg:h-[500px] w-full bg-slate-900/40 rounded-[2rem] border border-white/10 backdrop-blur-sm overflow-hidden flex items-center justify-center group"
          >
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            {/* Glowing Core */}
            <div className="absolute w-40 h-40 bg-cyan-500/30 rounded-full blur-[60px] animate-pulse" />
            <div className="absolute w-64 h-64 bg-violet-500/20 rounded-full blur-[80px] animate-pulse delay-75" />

            {/* Central Content */}
            <div className="relative z-10 text-center p-8 backdrop-blur-sm rounded-3xl border border-white/5 bg-slate-950/30 shadow-2xl">
              <div className="text-7xl font-serif font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                25<span className="text-4xl align-top text-amber-400">+</span>
              </div>
              <div className="text-slate-400 uppercase tracking-[0.2em] text-xs font-bold">
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
            <div className="absolute top-12 right-12 p-4 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/10 animate-float shadow-lg">
              <Cpu className="text-cyan-400 w-6 h-6" />
            </div>
            <div className="absolute bottom-16 left-12 p-4 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/10 animate-float shadow-lg" style={{ animationDelay: '2s' }}>
              <Award className="text-violet-400 w-6 h-6" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
