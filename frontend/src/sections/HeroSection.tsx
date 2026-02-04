import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/hero3/1920/1080" 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/70 to-slate-950" />
      </motion.div>

      <div className="relative z-10 max-w-8xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-amber-400 font-medium tracking-[0.2em] uppercase mb-4 text-sm md:text-base">
            March 15-17, 2026 • Tech City
          </h2>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-8 leading-tight">
            PORT <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-amber-300">
              2026
            </span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Where innovation meets excellence. Join us for the most prestigious technical and cultural symposium of the year.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transform hover:-translate-y-1">
              Register Now
            </Link>
            <Link to="/events" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:border-white/50 text-white text-lg font-medium rounded-full transition-all duration-300 backdrop-blur-sm hover:bg-white/5">
              Explore Events
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
